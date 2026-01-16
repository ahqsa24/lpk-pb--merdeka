import { NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { checkAdmin, AuthenticatedRequest } from '@/lib/auth';

const prisma = new PrismaClient() as any;

const serializeBigInt = (obj: any) => {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value
    ));
}

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { type } = req.query;
            const folders = await prisma.content_folders.findMany({
                where: type ? { type: String(type) } : undefined,
                include: {
                    _count: {
                        select: { ebooks: true, videos: true }
                    }
                },
                orderBy: { created_at: 'desc' }
            });
            return res.json(serializeBigInt(folders));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching folders' });
        }
    }

    if (req.method === 'POST') {
        try {
            const { name, type, description } = req.body;

            if (!name || !type) {
                return res.status(400).json({ message: 'Name and Type are required' });
            }

            const folder = await prisma.content_folders.create({
                data: {
                    name,
                    type,
                    description
                }
            });
            return res.json(serializeBigInt(folder));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error creating folder' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

export default checkAdmin(handler);

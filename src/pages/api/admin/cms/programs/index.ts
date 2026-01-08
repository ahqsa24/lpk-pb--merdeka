import { NextApiRequest, NextApiResponse } from 'next';
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
            const programs = await prisma.cms_programs.findMany({
                orderBy: { order: 'asc' }
            });
            return res.json(serializeBigInt(programs));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching programs' });
        }
    }

    if (req.method === 'POST') {
        try {
            const { title, description, image_url, order } = req.body;
            const program = await prisma.cms_programs.create({
                data: {
                    title,
                    description,
                    image_url,
                    order: parseInt(order || '0')
                }
            });
            return res.json(serializeBigInt(program));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error creating program' });
        }
    }
}

export default checkAdmin(handler);

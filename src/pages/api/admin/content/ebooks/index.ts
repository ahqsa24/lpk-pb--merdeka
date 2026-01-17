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
            const { folder_id } = req.query;
            const ebooks = await prisma.ebooks.findMany({
                where: folder_id ? { folder_id: BigInt(String(folder_id)) } : undefined,
                orderBy: { created_at: 'desc' }
            });
            return res.json(serializeBigInt(ebooks));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching ebooks' });
        }
    }

    if (req.method === 'POST') {
        try {
            const { title, file_url, cover_url, description, folder_id } = req.body;

            if (!title || !file_url || !folder_id) {
                return res.status(400).json({ message: 'Title, File URL and Folder ID are required' });
            }

            const ebook = await prisma.ebooks.create({
                data: {
                    title,
                    file_url,
                    cover_url,
                    description,
                    folder_id: BigInt(folder_id)
                }
            });
            return res.json(serializeBigInt(ebook));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error creating ebook' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

export default checkAdmin(handler);

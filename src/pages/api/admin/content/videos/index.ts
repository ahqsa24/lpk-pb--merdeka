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
            const videos = await prisma.videos.findMany({
                where: folder_id ? { folder_id: BigInt(String(folder_id)) } : undefined,
                orderBy: { created_at: 'desc' }
            });
            return res.json(serializeBigInt(videos));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching videos' });
        }
    }

    if (req.method === 'POST') {
        try {
            const { title, url, duration, description, folder_id, cover_url } = req.body;

            if (!title || !url || !folder_id) {
                return res.status(400).json({ message: 'Title, URL and Folder ID are required' });
            }

            const video = await prisma.videos.create({
                data: {
                    title,
                    url,
                    cover_url,
                    duration: duration ? parseInt(duration) : null,
                    description,
                    folder_id: BigInt(folder_id)
                }
            });
            return res.json(serializeBigInt(video));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error creating video' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

export default checkAdmin(handler);

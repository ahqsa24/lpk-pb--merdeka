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
    const { id } = req.query;

    if (req.method === 'PUT') {
        try {
            const { title, url, duration, description, cover_url } = req.body;

            const video = await prisma.videos.update({
                where: { id: BigInt(String(id)) },
                data: {
                    title,
                    url,
                    cover_url,
                    duration: duration ? parseInt(duration) : null,
                    description
                }
            });
            return res.json(serializeBigInt(video));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error updating video' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            await prisma.videos.delete({
                where: { id: BigInt(String(id)) }
            });
            return res.status(200).json({ message: 'Video deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error deleting video' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

export default checkAdmin(handler);

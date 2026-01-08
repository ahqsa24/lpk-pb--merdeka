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
    const { id } = req.query;
    if (!id || typeof id !== 'string') return res.status(400).json({ message: 'Invalid ID' });

    if (req.method === 'PUT') {
        try {
            const { title, image_url, type, category } = req.body;
            const gallery = await prisma.cms_gallery.update({
                where: { id: BigInt(id) },
                data: { title, image_url, type: type || 'image', category }
            });
            return res.json(serializeBigInt(gallery));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error updating gallery item' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            await prisma.cms_gallery.delete({ where: { id: BigInt(id) } });
            return res.json({ success: true });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error deleting gallery item' });
        }
    }
}

export default checkAdmin(handler);

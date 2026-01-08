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
            const galleries = await prisma.cms_gallery.findMany({
                orderBy: { created_at: 'desc' }
            });
            return res.json(serializeBigInt(galleries));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching gallery' });
        }
    }

    if (req.method === 'POST') {
        try {
            const { title, image_url, type, category } = req.body;
            const gallery = await prisma.cms_gallery.create({
                data: { title, image_url, type: type || 'image', category }
            });
            return res.json(serializeBigInt(gallery));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error creating gallery item' });
        }
    }
}

export default checkAdmin(handler);

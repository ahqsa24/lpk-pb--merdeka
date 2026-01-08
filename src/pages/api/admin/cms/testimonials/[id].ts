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
            const { name, role, content, avatar_url, rating } = req.body;
            const testimonial = await prisma.cms_testimonials.update({
                where: { id: BigInt(id) },
                data: {
                    name,
                    role,
                    content,
                    avatar_url,
                    rating: parseInt(rating || '5')
                }
            });
            return res.json(serializeBigInt(testimonial));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error updating testimonial' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            await prisma.cms_testimonials.delete({ where: { id: BigInt(id) } });
            return res.json({ success: true });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error deleting testimonial' });
        }
    }
}

export default checkAdmin(handler);

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
            const testimonials = await prisma.cms_testimonials.findMany({
                orderBy: { created_at: 'desc' }
            });
            return res.json(serializeBigInt(testimonials));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching testimonials' });
        }
    }

    if (req.method === 'POST') {
        try {
            const { name, role, content, avatar_url, rating } = req.body;
            const testimonial = await prisma.cms_testimonials.create({
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
            return res.status(500).json({ message: 'Error creating testimonial' });
        }
    }
}

export default checkAdmin(handler);

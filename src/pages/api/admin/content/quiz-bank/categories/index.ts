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
            const categories = await prisma.quiz_categories.findMany({
                include: {
                    question_types: true
                },
                orderBy: { created_at: 'desc' }
            });
            return res.json(serializeBigInt(categories));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching categories' });
        }
    }

    if (req.method === 'POST') {
        try {
            const { name, description } = req.body;

            if (!name) {
                return res.status(400).json({ message: 'Name is required' });
            }

            const category = await prisma.quiz_categories.create({
                data: {
                    name,
                    description
                }
            });
            return res.json(serializeBigInt(category));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error creating category' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

export default checkAdmin(handler);

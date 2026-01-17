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

    if (req.method === 'GET') {
        try {
            const category = await prisma.quiz_categories.findUnique({
                where: { id: BigInt(String(id)) },
                include: {
                    question_types: {
                        include: {
                            _count: {
                                select: { question_bank: true }
                            }
                        }
                    }
                }
            });
            if (!category) return res.status(404).json({ message: 'Category not found' });
            return res.json(serializeBigInt(category));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching category' });
        }
    }

    if (req.method === 'PUT') {
        try {
            const { name, description } = req.body;
            const category = await prisma.quiz_categories.update({
                where: { id: BigInt(String(id)) },
                data: {
                    name,
                    description
                }
            });
            return res.json(serializeBigInt(category));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error updating category' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            await prisma.quiz_categories.delete({
                where: { id: BigInt(String(id)) }
            });
            return res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error deleting category' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

export default checkAdmin(handler);

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
            const type = await prisma.question_types.findUnique({
                where: { id: BigInt(String(id)) },
                include: {
                    category: true
                }
            });
            if (!type) return res.status(404).json({ message: 'Type not found' });
            return res.json(serializeBigInt(type));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching type' });
        }
    }

    if (req.method === 'PUT') {
        try {
            const { name } = req.body;
            const type = await prisma.question_types.update({
                where: { id: BigInt(String(id)) },
                data: { name }
            });
            return res.json(serializeBigInt(type));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error updating type' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            await prisma.question_types.delete({
                where: { id: BigInt(String(id)) }
            });
            return res.status(200).json({ message: 'Type deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error deleting type' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

export default checkAdmin(handler);

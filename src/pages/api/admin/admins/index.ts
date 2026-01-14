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
            // Show all admins and superAdmins to any authenticated admin
            const admins = await prisma.user.findMany({
                where: {
                    role: { in: ['admin', 'superAdmin'] }
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    created_at: true
                },
                orderBy: { created_at: 'desc' }
            });

            return res.json(serializeBigInt(admins));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching admins' });
        }
    }

    res.status(405).end();
}

export default checkAdmin(handler);

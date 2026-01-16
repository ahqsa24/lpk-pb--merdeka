import { NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { checkAuth, AuthenticatedRequest } from '@/lib/auth';

const prisma = new PrismaClient() as any;

const serializeBigInt = (obj: any) => {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value
    ));
}

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const userId = req.user?.id;

        const certificates = await prisma.certificates.findMany({
            where: { user_id: userId },
            include: {
                quiz: {
                    select: { title: true, start_date: true }
                }
            },
            orderBy: { issued_at: 'desc' }
        });

        return res.json(serializeBigInt(certificates));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching certificates' });
    }
}

export default checkAuth(handler);

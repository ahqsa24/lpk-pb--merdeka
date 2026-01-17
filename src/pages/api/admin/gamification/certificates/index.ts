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
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const certificates = await prisma.certificates.findMany({
            include: {
                user: {
                    select: { name: true, email: true }
                },
                quiz: {
                    select: { title: true }
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

export default checkAdmin(handler);

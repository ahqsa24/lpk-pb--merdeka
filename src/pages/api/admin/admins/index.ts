import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { checkAdmin, AuthenticatedRequest } from '@/lib/auth';

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
                    createdAt: true
                },
                orderBy: { createdAt: 'desc' }
            });

            const serializedAdmins = admins.map(admin => ({
                ...admin,
                createdAt: admin.createdAt.toISOString()
            }));

            return res.json(serializedAdmins);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching admins' });
        }
    }

    res.status(405).end();
}

export default checkAdmin(handler);

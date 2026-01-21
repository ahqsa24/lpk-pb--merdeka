import { NextApiResponse } from 'next';
import { checkAuth, AuthenticatedRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Check if user has 2FA enabled using Prisma
        const twoFactorRecord = await prisma.twoFactor.findUnique({
            where: { userId }
        });

        return res.status(200).json({
            enabled: twoFactorRecord?.enabled || false
        });
    } catch (error) {
        console.error('2FA status check error:', error);
        // If table doesn't exist yet or any error, return false
        return res.status(200).json({ enabled: false });
    }
}

export default checkAuth(handler);

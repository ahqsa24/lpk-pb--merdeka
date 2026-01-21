import { NextApiResponse } from 'next';
import { checkAuth, AuthenticatedRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Disable 2FA using Prisma transaction
        await prisma.$transaction([
            prisma.twoFactor.update({
                where: { userId },
                data: { enabled: false }
            }),
            prisma.user.update({
                where: { id: userId },
                data: { twoFactorEnabled: false }
            })
        ]);

        return res.status(200).json({
            success: true,
            message: '2FA disabled successfully'
        });
    } catch (error) {
        console.error('2FA disable error:', error);
        return res.status(500).json({ message: 'Error disabling 2FA' });
    }
}

export default checkAuth(handler);

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email passed is required' });
        }

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
            include: { twoFactor: true }
        });

        if (!user) {
            return res.status(200).json({
                require2FA: false
            });
        }

        const is2FAEnabled = user.twoFactor && user.twoFactor.enabled;

        return res.status(200).json({
            require2FA: !!is2FAEnabled,
            role: user.role
        });

    } catch (error) {
        console.error('Login check error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

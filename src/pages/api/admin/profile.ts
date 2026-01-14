import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { AuthenticatedRequest, checkAdmin } from '@/lib/auth';
import bcrypt from 'bcryptjs';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, password } = req.body;
    const userId = req.user?.id; // Assuming checkAdmin middleware populates this

    // Fallback if req.user is string or different shape, currently checkAdmin sets req.user to payload
    // The payload usually contains userId.

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const updateData: any = { name };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        await prisma.user.update({
            where: { id: userId },
            data: updateData,
        });

        return res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Profile update error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default checkAdmin(handler as any);

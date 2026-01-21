import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import * as OTPAuth from 'otpauth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { code, email } = req.body;

        if (!code || !email) {
            return res.status(400).json({ message: 'Code and email are required' });
        }

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
            include: { twoFactor: true }
        });

        if (!user || !user.twoFactor || !user.twoFactor.enabled) {
            return res.status(400).json({ message: 'Invalid request' });
        }

        // Verify TOTP code
        const totp = new OTPAuth.TOTP({
            issuer: 'LPK PB Merdeka',
            label: email,
            algorithm: 'SHA1',
            digits: 6,
            period: 30,
            secret: OTPAuth.Secret.fromBase32(user.twoFactor.secret),
        });

        const isValid = totp.validate({ token: code, window: 1 }) !== null;

        if (!isValid) {
            return res.status(400).json({ message: 'Invalid verification code' });
        }

        return res.status(200).json({
            success: true,
            message: 'Code verified'
        });
    } catch (error) {
        console.error('2FA code check error:', error);
        return res.status(500).json({ message: 'Verification failed' });
    }
}

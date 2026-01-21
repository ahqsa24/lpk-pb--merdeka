import { NextApiResponse } from 'next';
import { checkAuth, AuthenticatedRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import * as OTPAuth from 'otpauth';
import QRCode from 'qrcode';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const userId = req.user?.id;
        const userEmail = req.user?.email;

        if (!userId || !userEmail) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Generate TOTP secret
        const totp = new OTPAuth.TOTP({
            issuer: 'LPK PB Merdeka',
            label: userEmail,
            algorithm: 'SHA1',
            digits: 6,
            period: 30,
        });

        const secret = totp.secret.base32;

        // Generate OTP Auth URL
        const otpauthUrl = totp.toString();

        // Generate QR Code
        const qrCode = await QRCode.toDataURL(otpauthUrl);

        // Store secret in database using Prisma (not enabled yet)
        await prisma.twoFactor.upsert({
            where: { userId },
            create: {
                userId,
                secret,
                enabled: false
            },
            update: {
                secret
            }
        });

        return res.status(200).json({
            secret,
            qrCode,
            otpauthUrl
        });
    } catch (error) {
        console.error('2FA generate error:', error);
        return res.status(500).json({ message: 'Error generating 2FA secret' });
    }
}

export default checkAuth(handler);

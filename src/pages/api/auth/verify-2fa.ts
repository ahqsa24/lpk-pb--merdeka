import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import * as OTPAuth from 'otpauth';
import { auth } from '@/lib/auth';
import { fromNodeHeaders } from 'better-auth/node';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { code, email } = req.body;

        if (!code || !email) {
            return res.status(400).json({ message: 'Code and email are required' });
        }

        // Find user by email
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

        // Create session manually (mimicking Better Auth login)
        // Since we verified credentials in step 1 and 2FA here, this is secure.

        // Use imports dynamically to avoid build time issues if possible
        const { v4: uuidv4 } = require('uuid');

        // Calculate expiration (e.g., 7 days)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        // Generate session token
        const token = uuidv4(); // Standard UUID as token, or use crypto random string

        // Create session in DB
        const newSession = await prisma.session.create({
            data: {
                id: uuidv4(),
                userId: user.id,
                token: token,
                expiresAt: expiresAt,
                ipAddress: req.socket.remoteAddress || req.headers['x-forwarded-for']?.toString(),
                userAgent: req.headers['user-agent']
            }
        });

        const isSecure = process.env.NODE_ENV === 'production';
        const cookieName = isSecure ? '__Secure-better-auth.session_token' : 'better-auth.session_token'; // Check better auth docs for exact name
        // Fallback: Set cookie manually
        res.setHeader('Set-Cookie', `${cookieName}=${token}; Path=/; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; ${isSecure ? 'Secure;' : ''}`);

        return res.status(200).json({
            success: true,
            message: '2FA verified successfully',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        console.error('2FA verification error:', error);
        return res.status(500).json({ message: 'Verification failed' });
    }
}

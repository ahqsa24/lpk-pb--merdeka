import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import nodemailer from "nodemailer";

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
    database: prismaAdapter(prisma, {
        provider: 'mysql',
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
        requireEmailVerification: false, // Set to true if verification is needed
        async sendResetPassword({ user, url }) {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST || "smtp.gmail.com",
                port: Number(process.env.SMTP_PORT) || 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });

            const mailOptions = {
                from: process.env.SMTP_FROM || '"LPK Merdeka" <no-reply@lpk-merdeka.com>',
                to: user.email,
                subject: "Reset Password - LPK Merdeka",
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #DC2626; text-align: center;">Reset Password Anda</h2>
                        <p>Halo ${user.name},</p>
                        <p>Kami menerima permintaan untuk mereset password akun LPK Merdeka Anda. Klik tombol di bawah ini untuk membuat password baru:</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${url}" style="background-color: #DC2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
                        </div>
                        <p>Jika Anda tidak meminta ini, abaikan saja email ini.</p>
                        <p style="color: #666; font-size: 12px; margin-top: 30px; text-align: center;">LPK PB Merdeka</p>
                    </div>
                `,
            };

            await transporter.sendMail(mailOptions);
        },
    },
    user: {
        additionalFields: {
            role: {
                type: 'string',
                defaultValue: 'user',
                required: false,
            }
        }
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }
    }
});

export type Session = typeof auth.$Infer.Session;

import { fromNodeHeaders } from "better-auth/node";
import type { NextApiRequest, NextApiResponse } from "next";

export interface AuthenticatedRequest extends NextApiRequest {
    user?: typeof auth.$Infer.Session.user;
    session?: typeof auth.$Infer.Session.session;
}

export const checkAuth = (handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<any>) => async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
    });

    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = session.user;
    req.session = session.session;

    return handler(req, res);
};

export const checkAdmin = (handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<any>) => async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
    });

    // @ts-ignore - role is added via additionalFields but TS might not pick it up on the session type immediately
    if (!session || (session.user.role !== 'admin' && session.user.role !== 'superAdmin')) {
        return res.status(403).json({ message: "Forbidden" });
    }

    req.user = session.user;
    req.session = session.session;

    return handler(req, res);
};

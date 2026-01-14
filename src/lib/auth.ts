import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
    database: prismaAdapter(prisma, {
        provider: 'mysql',
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
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

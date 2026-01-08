import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'lpk-merdeka-secret-key-123';

export interface AuthenticatedRequest extends NextApiRequest {
    user?: {
        userId: string;
        email: string;
        role: string;
    };
}

export const checkAuth = (handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<any>) => {
    return async (req: AuthenticatedRequest, res: NextApiResponse) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ message: 'Authentication required' });
            }

            const token = authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Invalid token format' });
            }

            const decoded = jwt.verify(token, JWT_SECRET) as any;
            req.user = decoded;

            return handler(req, res);
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    };
};

export const checkAdmin = (handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<any>) => {
    return async (req: AuthenticatedRequest, res: NextApiResponse) => {
        return checkAuth(async (req, res) => {
            if (req.user?.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied: Admins only' });
            }
            return handler(req, res);
        })(req, res);
    };
};

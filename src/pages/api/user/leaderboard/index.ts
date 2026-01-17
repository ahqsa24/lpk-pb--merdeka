import { NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { checkAuth, AuthenticatedRequest } from '@/lib/auth';

const prisma = new PrismaClient() as any;

const serializeBigInt = (obj: any) => {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value
    ));
}

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const leaderboard = await prisma.gamification_profile.findMany({
            take: 20, // Top 20
            orderBy: { total_points: 'desc' },
            include: {
                user: {
                    select: { name: true, image: true }
                }
            }
        });

        // Add Rank
        const ranked = leaderboard.map((entry: any, index: number) => ({
            rank: index + 1,
            name: entry.user.name,
            image: entry.user.image,
            points: entry.total_points,
            level: entry.level
        }));

        return res.json(serializeBigInt(ranked));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching leaderboard' });
    }
}

export default checkAuth(handler);

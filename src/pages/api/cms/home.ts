import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient() as any;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const hero = await prisma.cms_hero.findFirst({
                where: { is_active: true }
            });
            return res.status(200).json(hero || {});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching home data' });
        }
    }
    res.status(405).end();
}

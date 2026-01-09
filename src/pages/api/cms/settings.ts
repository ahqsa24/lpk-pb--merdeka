import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient() as any;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const settings = await prisma.cms_settings.findMany();

            // Convert array to object for easier access
            const settingsObject = settings.reduce((acc: any, setting: any) => {
                acc[setting.key] = setting.value;
                return acc;
            }, {});

            return res.status(200).json(settingsObject);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching settings' });
        }
    }

    res.status(405).json({ message: 'Method not allowed' });
}

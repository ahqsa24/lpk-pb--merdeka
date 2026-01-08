import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { checkAdmin, AuthenticatedRequest } from '@/lib/auth';

const prisma = new PrismaClient() as any;

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const settings = await prisma.cms_settings.findMany();
            // Convert to object { key: value }
            const settingsObj: any = {};
            settings.forEach((s: any) => {
                settingsObj[s.key] = s.value;
            });
            return res.json(settingsObj);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching settings' });
        }
    }

    if (req.method === 'POST') {
        try {
            const data = req.body;
            // Expecting object { key: value, ... }
            const updates = Object.keys(data).map(async (key) => {
                return prisma.cms_settings.upsert({
                    where: { key },
                    update: { value: data[key] },
                    create: { key, value: data[key] }
                });
            });

            await Promise.all(updates);
            return res.json({ success: true });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error saving settings' });
        }
    }
}

export default checkAdmin(handler);

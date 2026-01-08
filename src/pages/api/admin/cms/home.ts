import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { checkAdmin, AuthenticatedRequest } from '@/lib/auth';

const prisma = new PrismaClient() as any;

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    // 2. Handle Methods
    if (req.method === 'GET') {
        try {
            // Fetch the first hero record (assuming single hero for now)
            const hero = await prisma.cms_hero.findFirst();
            return res.status(200).json(hero || {});
        } catch (error) {
            console.error('CMS Home GET Error:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else if (req.method === 'POST') {
        try {
            const { title, subtitle, image_url, cta_text, cta_link, is_active } = req.body;

            // Check if a record exists
            const existing = await prisma.cms_hero.findFirst();

            let result;
            if (existing) {
                // Update
                result = await prisma.cms_hero.update({
                    where: { id: existing.id },
                    data: {
                        title,
                        subtitle,
                        image_url,
                        cta_text,
                        cta_link,
                        is_active
                    }
                });
            } else {
                // Create
                result = await prisma.cms_hero.create({
                    data: {
                        title,
                        subtitle,
                        image_url,
                        cta_text,
                        cta_link,
                        is_active: is_active ?? true
                    }
                });
            }

            return res.status(200).json(result);
        } catch (error) {
            console.error('CMS Home POST Error:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default checkAdmin(handler);

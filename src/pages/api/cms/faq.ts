import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient() as any;

const serializeBigInt = (obj: any) => {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value
    ));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const faqs = await prisma.cms_faq.findMany({
                orderBy: { order: 'asc' }
            });
            return res.json(serializeBigInt(faqs));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching faqs' });
        }
    }
    res.status(405).end();
}

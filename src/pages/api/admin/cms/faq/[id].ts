import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { checkAdmin, AuthenticatedRequest } from '@/lib/auth';

const prisma = new PrismaClient() as any;

const serializeBigInt = (obj: any) => {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value
    ));
}

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    const { id } = req.query;
    if (!id || typeof id !== 'string') return res.status(400).json({ message: 'Invalid ID' });

    if (req.method === 'PUT') {
        const { question, answer, category, order } = req.body;
        const faq = await prisma.cms_faq.update({
            where: { id: BigInt(id) },
            data: { question, answer, category, order: parseInt(order || '0') }
        });
        return res.json(serializeBigInt(faq));
    }

    if (req.method === 'DELETE') {
        await prisma.cms_faq.delete({ where: { id: BigInt(id) } });
        return res.json({ success: true });
    }
}
export default checkAdmin(handler);

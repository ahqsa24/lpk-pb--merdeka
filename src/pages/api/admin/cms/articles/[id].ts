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

const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    const { id } = req.query;
    if (!id || typeof id !== 'string') return res.status(400).json({ message: 'Invalid ID' });

    if (req.method === 'PUT') {
        try {
            const { title, content, excerpt, thumbnail_url, author, is_published } = req.body;
            const slug = generateSlug(title);

            const article = await prisma.cms_articles.update({
                where: { id: BigInt(id) },
                data: {
                    title,
                    slug,
                    content,
                    excerpt,
                    thumbnail_url,
                    author,
                    is_published: is_published || false,
                    published_at: is_published ? new Date() : null
                }
            });
            return res.json(serializeBigInt(article));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error updating article' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            await prisma.cms_articles.delete({ where: { id: BigInt(id) } });
            return res.json({ success: true });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error deleting article' });
        }
    }
}

export default checkAdmin(handler);

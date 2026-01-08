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

// Helper to generate slug from title
const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const articles = await prisma.cms_articles.findMany({
                orderBy: { created_at: 'desc' }
            });
            return res.json(serializeBigInt(articles));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching articles' });
        }
    }

    if (req.method === 'POST') {
        try {
            const { title, content, excerpt, thumbnail_url, author, is_published } = req.body;
            const slug = generateSlug(title);

            const article = await prisma.cms_articles.create({
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
            return res.status(500).json({ message: 'Error creating article' });
        }
    }
}

export default checkAdmin(handler);

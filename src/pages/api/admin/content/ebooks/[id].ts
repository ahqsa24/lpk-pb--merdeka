import { NextApiResponse } from 'next';
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

    if (req.method === 'PUT') {
        try {
            const { title, file_url, cover_url, description } = req.body;

            const ebook = await prisma.ebooks.update({
                where: { id: BigInt(String(id)) },
                data: {
                    title,
                    file_url,
                    cover_url,
                    description
                }
            });
            return res.json(serializeBigInt(ebook));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error updating ebook' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            await prisma.ebooks.delete({
                where: { id: BigInt(String(id)) }
            });
            return res.status(200).json({ message: 'Ebook deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error deleting ebook' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

export default checkAdmin(handler);

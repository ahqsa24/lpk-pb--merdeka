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

    if (req.method === 'GET') {
        try {
            const folder = await prisma.content_folders.findUnique({
                where: { id: BigInt(String(id)) }
            });
            if (!folder) return res.status(404).json({ message: 'Folder not found' });
            return res.json(serializeBigInt(folder));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching folder' });
        }
    }

    if (req.method === 'PUT') {
        try {
            const { name, description } = req.body;

            const folder = await prisma.content_folders.update({
                where: { id: BigInt(String(id)) },
                data: {
                    name,
                    description
                }
            });
            return res.json(serializeBigInt(folder));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error updating folder' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            await prisma.content_folders.delete({
                where: { id: BigInt(String(id)) }
            });
            return res.status(200).json({ message: 'Folder deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error deleting folder' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

export default checkAdmin(handler);

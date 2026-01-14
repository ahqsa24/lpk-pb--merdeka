import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { checkAdmin, AuthenticatedRequest } from '@/lib/auth';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    const userId = id;

    if (req.method === 'GET') {
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId }
            });

            if (!user) return res.status(404).json({ message: 'User not found' });

            return res.status(200).json({
                ...user,
                id: user.id.toString(),
                created_at: user.createdAt.toISOString()
            });
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching user' });
        }
    }

    if (req.method === 'PUT') {
        const { name, email, password, role } = req.body;

        try {
            const updateData: any = {
                name,
                email,
                role,
                updatedAt: new Date()
            };

            if (password) {
                updateData.password = await bcrypt.hash(password, 10);
            }

            const user = await prisma.user.update({
                where: { id: userId },
                data: updateData
            });

            return res.status(200).json({
                message: 'User updated',
                user: { ...user, id: user.id.toString() }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error updating user' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            await prisma.user.delete({
                where: { id: userId }
            });
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error deleting user' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

export default checkAdmin(handler as any);

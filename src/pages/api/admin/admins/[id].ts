import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { checkAdmin, AuthenticatedRequest } from '@/lib/auth';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    // Get target user
    const targetUser = await prisma.user.findUnique({
        where: { id },
        select: { role: true }
    });

    if (!targetUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Check permissions
    const isSuperAdmin = req.user?.role === 'superAdmin';
    const isTargetSuperAdmin = targetUser.role === 'superAdmin';
    const isTargetAdmin = targetUser.role === 'admin';

    // Regular admin cannot modify superAdmin or other admins
    if (!isSuperAdmin && (isTargetSuperAdmin || isTargetAdmin)) {
        return res.status(403).json({
            message: 'You do not have permission to modify this user'
        });
    }

    if (req.method === 'PUT') {
        try {
            const { name, email, role } = req.body;

            // Regular admin cannot change role to admin or superAdmin
            if (!isSuperAdmin && (role === 'admin' || role === 'superAdmin')) {
                return res.status(403).json({
                    message: 'You do not have permission to assign admin roles'
                });
            }

            const updated = await prisma.user.update({
                where: { id },
                data: {
                    name,
                    email,
                    ...(isSuperAdmin && role ? { role } : {}) // Only superAdmin can change roles
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true
                }
            });

            return res.json({
                ...updated,
                createdAt: updated.createdAt.toISOString()
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error updating user' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            // Cannot delete superAdmin
            if (isTargetSuperAdmin) {
                return res.status(403).json({
                    message: 'SuperAdmin cannot be deleted'
                });
            }

            await prisma.user.delete({ where: { id } });
            return res.json({ success: true });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error deleting user' });
        }
    }

    res.status(405).end();
}

export default checkAdmin(handler);

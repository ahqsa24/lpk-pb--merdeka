import type { NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { checkAuth, AuthenticatedRequest } from '@/lib/auth';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const userId = req.user!.id;

            const user = await prisma.user.findUnique({
                where: { id: userId as any },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    gender: true,
                    birthDate: true,
                    birthPlace: true,
                    address: true,
                    phoneNumber: true,
                    photo_url: true,
                }
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    if (req.method === 'PUT') {
        try {
            const userId = req.user!.id;
            const { name, email, password, gender, birthDate, birthPlace, address, phoneNumber, photo_url } = req.body;

            const updateData: any = {
                name,
                email,
                gender,
                birthDate: birthDate ? new Date(birthDate) : null,
                birthPlace,
                address,
                phoneNumber,
                photo_url
            };

            // Check if email is already taken by another user
            if (email) {
                const existingUser = await prisma.user.findFirst({
                    where: {
                        email: email,
                        NOT: {
                            id: userId as any
                        }
                    }
                });
                if (existingUser) {
                    return res.status(400).json({ message: 'Email already in use' });
                }
            }

            if (password) {
                const bcrypt = require('bcryptjs');
                updateData.password = await bcrypt.hash(password, 10);
            }

            const updatedUser = await prisma.user.update({
                where: { id: userId as any },
                data: updateData,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    gender: true,
                    birthDate: true,
                    birthPlace: true,
                    address: true,
                    phoneNumber: true,
                    photo_url: true
                }
            });

            return res.status(200).json({
                message: 'Profile updated successfully',
                user: updatedUser
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error updating profile' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

export default checkAuth(handler as any);

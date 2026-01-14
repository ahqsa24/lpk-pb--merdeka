import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { checkAdmin, AuthenticatedRequest } from '@/lib/auth';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            // Lazy Expiration Check: Deactivate sessions where end_time has passed
            const activeSessions = await prisma.attendance_sessions.findMany({
                where: { isActive: true }
            });

            const now = new Date();
            const updates: any[] = [];

            for (const session of activeSessions) {
                const year = session.date.getUTCFullYear();
                const month = session.date.getUTCMonth();
                const day = session.date.getUTCDate();
                const hours = session.endTime.getUTCHours();
                const minutes = session.endTime.getUTCMinutes();

                // Construct expiration time (assuming session times are in WIB = UTC+7)
                let expiryDate = new Date(Date.UTC(year, month, day, hours - 7, minutes));

                // Handle crossing midnight
                const startHours = session.startTime.getUTCHours();
                const startMinutes = session.startTime.getUTCMinutes();
                const startDate = new Date(Date.UTC(year, month, day, startHours - 7, startMinutes));

                if (expiryDate <= startDate) {
                    expiryDate.setDate(expiryDate.getDate() + 1);
                }

                if (now > expiryDate) {
                    /*
                    // Temporarily disabled auto-expiration to debug visibility issues
                    updates.push(
                        prisma.attendance_sessions.update({
                            where: { id: session.id },
                            data: { isActive: false }
                        })
                    );
                    */
                }
            }

            if (updates.length > 0) {
                await Promise.all(updates);
            }

            const sessions = await prisma.attendance_sessions.findMany({
                orderBy: { date: 'desc' },
            });

            const serialized = sessions.map((s: any) => ({
                ...s,
                id: s.id.toString(),
                date: s.date.toISOString(),
                start_time: s.startTime.toISOString(),
                end_time: s.endTime.toISOString(),
                created_at: s.createdAt?.toISOString()
            }));

            return res.status(200).json(serialized);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching sessions' });
        }
    }

    if (req.method === 'POST') {
        const { title, date, start_time, end_time, is_active } = req.body;

        if (!title || !date || !start_time || !end_time) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        try {
            // Parse date as UTC noon to safely avoid timezone shifts
            const dateObj = new Date(date + 'T12:00:00Z');

            // Parse time as UTC to preserve the "Wall Clock" numbers (e.g. 17:00 input -> 17:00 UTC stored)
            // This aligns with our read logic that assumes DB stores "Wall Clock" values as UTC
            const startObj = new Date(`1970-01-01T${start_time}:00Z`);
            const endObj = new Date(`1970-01-01T${end_time}:00Z`);

            const newSession = await prisma.attendance_sessions.create({
                data: {
                    title,
                    date: dateObj,
                    startTime: startObj,
                    endTime: endObj,
                    isActive: is_active ?? true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });

            return res.status(201).json({
                message: 'Session created',
                session: { ...newSession, id: newSession.id.toString() }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error creating session' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

export default checkAdmin(handler as any);

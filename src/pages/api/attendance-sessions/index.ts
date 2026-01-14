import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { checkAuth, AuthenticatedRequest } from '@/lib/auth';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const userId = req.user!.id;

            // Lazy Expiration Check (kept for logic, but updates currently disabled)
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

                let expiryDate = new Date(Date.UTC(year, month, day, hours - 7, minutes));

                const startHours = session.startTime.getUTCHours();
                const startMinutes = session.startTime.getUTCMinutes();
                const startDate = new Date(Date.UTC(year, month, day, startHours - 7, startMinutes));

                if (expiryDate <= startDate) {
                    expiryDate.setDate(expiryDate.getDate() + 1);
                }

                if (now > expiryDate) {
                    /*
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

            // Fetch active sessions with user check-in status
            const sessions = await prisma.attendance_sessions.findMany({
                where: {
                    isActive: true,
                },
                include: {
                    attendance_records: {
                        where: {
                            userId: userId
                        },
                        select: {
                            id: true
                        }
                    }
                },
                orderBy: { date: 'desc' },
            });

            const serialized = sessions.map(session => {
                const isCheckedIn = session.attendance_records.length > 0;
                return {
                    id: session.id.toString(),
                    title: session.title,
                    date: session.date.toISOString(),
                    start_time: session.startTime.toISOString(),
                    end_time: session.endTime.toISOString(),
                    is_active: session.isActive,
                    is_checked_in: isCheckedIn,
                    check_in_id: isCheckedIn ? session.attendance_records[0].id.toString() : null
                };
            });

            return res.status(200).json(serialized);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching sessions' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

export default checkAuth(handler as any);

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { checkAdmin, AuthenticatedRequest } from '@/lib/auth';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid session ID' });
    }

    if (req.method === 'GET') {
        try {
            // Get attendance records for this session with user details
            const records = await prisma.attendance_records.findMany({
                where: { attendanceSessionId: BigInt(id) },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                },
                orderBy: { checkInTime: 'asc' }
            });

            // Remap for frontend consistency
            const mappedRecords = records.map((r: any) => ({
                ...r,
                id: r.id.toString(),
                attendanceSessionId: r.attendanceSessionId.toString(),
                checked_in_at: r.checkInTime, // Alias for frontend
                user: r.user // Map users relation to user field expected by frontend
            }));

            return res.json(mappedRecords);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching attendance records' });
        }
    }

    res.status(405).end();
}

export default checkAdmin(handler);

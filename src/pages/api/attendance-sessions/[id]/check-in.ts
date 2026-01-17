import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { checkAuth, AuthenticatedRequest } from '@/lib/auth';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { id } = req.query;

    if (!id || Array.isArray(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    const sessionId = BigInt(id);
    const userId = req.user!.id; // Verified by checkAuth

    try {
        // 1. Check if session exists and is active
        const session = await prisma.attendance_sessions.findUnique({
            where: { id: sessionId }
        });
        if (!session || !session.isActive) {
            return res.status(400).json({ message: 'Sesi tidak tersedia' });
        }

        // Time Check Logic (Strict)
        const now = new Date();
        const year = session.date.getUTCFullYear();
        const month = session.date.getUTCMonth();
        const day = session.date.getUTCDate();

        // Assuming endTime is stored with a dummy date component but correct time component
        // Adjust based on your DB storage pattern. Based on index.ts, it seems you adjust for UTC+7 (hours-7).
        // WARNING: If your database simply stores TIME as '1970-01-01 HH:MM:SS', then getUTCHours() extracts that time.
        // If your database connection or Prisma setup handles timezones, be careful.
        // Replicating index.ts logic for "expiryDate":

        const hours = session.endTime.getUTCHours();
        const minutes = session.endTime.getUTCMinutes();
        const seconds = session.endTime.getUTCSeconds();

        // Construct Expiry Date in UTC
        // Previously index.ts used (hours - 7) which suggests the DB might be storing Western Indonesian Time in UTC fields?
        // Or it's compensating for something. Let's stick to the same logic found in `index.ts` to be safe/consistent.
        let expiryDate = new Date(Date.UTC(year, month, day, hours - 7, minutes, seconds));

        // Start Time Construction to handling "next day" overlap if necessary
        const startHours = session.startTime.getUTCHours();
        const startMinutes = session.startTime.getUTCMinutes();
        const startDate = new Date(Date.UTC(year, month, day, startHours - 7, startMinutes));

        // If expiry is before start (e.g. Session 23:00 - 01:00), add 1 day to expiry
        if (expiryDate <= startDate) {
            expiryDate.setDate(expiryDate.getDate() + 1);
        }

        if (now > expiryDate) {
            return res.status(400).json({ message: 'Sesi kehadiran sudah ditutup (Waktu Habis)' });
        }

        // 2. Check duplicate
        const existing = await prisma.attendance_records.findFirst({
            where: {
                userId: userId,
                attendanceSessionId: sessionId
            }
        });

        if (existing) {
            return res.status(400).json({ message: 'Anda sudah absen di sesi ini' });
        }

        // 3. Create Record
        const record = await prisma.attendance_records.create({
            data: {
                userId: userId,
                attendanceSessionId: sessionId,
                checkInTime: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

        return res.status(200).json({
            message: 'Berhasil Check-in!',
            check_in_time: record.checkInTime.toISOString()
        });

    } catch (error) {
        console.error('Check-in error:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan sistem' });
    }
}

export default checkAuth(handler as any);

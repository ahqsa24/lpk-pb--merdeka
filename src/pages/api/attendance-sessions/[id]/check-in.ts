import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'lpk-merdeka-secret-key-123';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { id } = req.query;

    if (!id || Array.isArray(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    const sessionId = BigInt(id);

    // 1. Auth Check
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

    const token = authHeader.split(' ')[1];
    let userId;

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        userId = decoded.userId; // Now a String UUID
    } catch (e) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        // 2. Check if session exists and is active
        const session = await prisma.attendance_sessions.findUnique({
            where: { id: sessionId }
        });
        if (!session || !session.isActive) {
            return res.status(400).json({ message: 'Sesi tidak tersedia' });
        }

        // 3. Check duplicate
        const existing = await prisma.attendance_records.findFirst({
            where: {
                userId: userId,
                attendanceSessionId: sessionId
            }
        });

        if (existing) {
            return res.status(400).json({ message: 'Anda sudah absen di sesi ini' });
        }

        // 4. Create Record
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
            check_in_time: record.checkInTime.toISOString() // Client expects "check_in_time" field
        });

    } catch (error) {
        console.error('Check-in error:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan sistem' });
    }
}

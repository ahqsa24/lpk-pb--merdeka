import type { NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { checkAuth, AuthenticatedRequest } from '@/lib/auth';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const userId = req.user!.id;

    try {
        // 1. Attendance Stats
        const attendanceCount = await prisma.attendance_records.count({
            where: { userId: userId }
        });

        // 2. Free Content Stats (Total Available)
        const ebooksCount = await (prisma as any).ebooks.count();
        const videosCount = await (prisma as any).videos.count();

        // 3. Articles Count
        const articlesCount = await prisma.cms_articles.count({
            where: { is_published: true }
        });

        // 4. (Future) Quiz/Task Stats could go here

        return res.status(200).json({
            attendance_count: attendanceCount,
            ebooks_count: ebooksCount,
            videos_count: videosCount,
            articles_count: articlesCount
        });

    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return res.status(500).json({ message: 'Error fetching stats' });
    }
}

export default checkAuth(handler as any);

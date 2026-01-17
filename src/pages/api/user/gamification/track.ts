import { NextApiResponse } from 'next';
import { checkAuth, AuthenticatedRequest } from '@/lib/auth';
import { PointsService } from '@/lib/services/points-service';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { type, id } = req.body;
    const userId = req.user?.id;

    if (!userId || !type || !id) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }

    let points = 0;
    if (type === 'video') points = 50;
    if (type === 'ebook') points = 30;

    if (points === 0) {
        return res.status(400).json({ message: 'Invalid content type' });
    }

    const actionType = type === 'video' ? 'video_watch' : 'ebook_read';

    const result = await PointsService.awardPoints(userId, actionType, points, String(id));

    if (result.success) {
        return res.status(200).json({
            message: 'Points awarded',
            points: result.points,
            awarded: true
        });
    } else {
        // If failed (likely duplicate), return success but without points awarded
        return res.status(200).json({
            message: result.message || 'Points not awarded',
            awarded: false
        });
    }
}

export default checkAuth(handler);

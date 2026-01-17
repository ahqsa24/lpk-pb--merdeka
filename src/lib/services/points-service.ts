import { PrismaClient } from '@prisma/client';
import { GameConstants } from '../game-constants';

const prisma = new PrismaClient() as any;

export class PointsService {
    /**
     * Awards points to a user for a specific action.
     * Checks for duplicates if the action should be one-time (e.g., reading an ebook).
     */
    static async awardPoints(
        userId: string,
        actionType: 'quiz' | 'video_watch' | 'ebook_read' | 'daily_login',
        pointsBase: number,
        actionId?: string
    ) {
        try {
            // Check for duplicates for specific actions
            if (actionId && ['video_watch', 'ebook_read'].includes(actionType)) {
                const existingLog = await prisma.gamification_logs.findFirst({
                    where: {
                        user_id: userId,
                        action_type: actionType,
                        action_id: actionId
                    }
                });

                if (existingLog) {
                    return { success: false, message: 'Points already awarded for this item.' };
                }
            }

            // Determine if user is Paid/Premium (Placeholder logic)
            // Ideally, fetch user role or subscription status
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { role: true } // extend to subscription check later
            });

            // Multiplier Logic (e.g., Premium users get 1.5x)
            // const isPremium = user?.role === 'premium'; 
            const multiplier = 1;
            const finalPoints = Math.round(pointsBase * multiplier);

            await prisma.$transaction(async (tx: any) => {
                // Log the transaction
                await tx.gamification_logs.create({
                    data: {
                        user_id: userId,
                        action_type: actionType,
                        action_id: actionId,
                        points: finalPoints
                    }
                });

                // Update User Profile
                const profile = await tx.gamification_profile.findUnique({
                    where: { user_id: userId }
                });

                if (profile) {
                    const newTotal = profile.total_points + finalPoints;
                    const newLevel = Math.floor(newTotal / GameConstants.LEVELING.XP_PER_LEVEL) + 1;

                    await tx.gamification_profile.update({
                        where: { user_id: userId },
                        data: {
                            total_points: newTotal,
                            level: newLevel
                        }
                    });
                } else {
                    const newLevel = Math.floor(finalPoints / GameConstants.LEVELING.XP_PER_LEVEL) + 1;

                    await tx.gamification_profile.create({
                        data: {
                            user_id: userId,
                            total_points: finalPoints,
                            level: newLevel
                        }
                    });
                }
            });

            return { success: true, points: finalPoints };

        } catch (error) {
            console.error('[PointsService] Error awarding points:', error);
            return { success: false, error };
        }
    }
}

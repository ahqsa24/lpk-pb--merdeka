import { NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { checkAuth, AuthenticatedRequest } from '@/lib/auth';
import { CertificateGenerator } from '@/lib/services/certificate-generator';
import { GameConstants } from '@/lib/game-constants';

const prisma = new PrismaClient() as any;

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { id } = req.query; // Certificate ID (from database, likely BIGINT primary key)
    const userId = req.user?.id;

    if (!id) {
        return res.status(400).json({ message: 'Certificate ID required' });
    }

    try {
        // 1. Fetch Existing Certificate to Verify Ownership and Data
        const certificate = await prisma.certificates.findFirst({
            where: {
                id: BigInt(String(id)),
                user_id: userId
            },
            include: {
                quiz: true,
                user: true
            }
        });

        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }

        // 2. Generate New PDF (Using current User Name from DB)
        // This effectively fixes "wrong name" issues if they updated their profile
        const newFileUrl = await CertificateGenerator.generate(
            certificate.user.name,
            certificate.quiz.title,
            certificate.issued_at, // Keep original date? Or update? Usually keep original issue date.
            certificate.certificate_code // Keep original code
        );

        if (!newFileUrl) {
            throw new Error('Failed to generate PDF');
        }

        // 3. Update Database (url might be same, but file content changed)
        // If the generator creates a unique filename every time, we typically update the URL.
        // Our generator currently uses CODE in filename: `CERT-${certificateCode}.pdf`.
        // So the filename stays the same, but file content on disk is overwritten.
        // We just verify it worked.

        return res.json({
            message: 'Certificate regenerated successfully',
            file_url: newFileUrl
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error regenerating certificate' });
    }
}

export default checkAuth(handler);

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Semua field harus diisi' });
    }

    // Mock success response
    res.status(201).json({
        message: 'Registrasi berhasil',
        user: {
            name,
            email
        }
    });
}

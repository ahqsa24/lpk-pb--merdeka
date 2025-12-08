import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password } = req.body;

    // Simple mock validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password harus diisi' });
    }

    // Mock success response
    // In a real app, you would validate credentials against a database here
    res.status(200).json({
        message: 'Login berhasil',
        token: 'mock-jwt-token-xyz-123',
        user: {
            name: 'User Demo',
            email: email,
            role: 'user'
        }
    });
}

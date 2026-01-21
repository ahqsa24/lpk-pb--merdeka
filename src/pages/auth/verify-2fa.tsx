import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { FaShieldAlt, FaArrowLeft } from 'react-icons/fa';

export default function TwoFactorVerifyPage() {
    const router = useRouter();
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { email } = router.query;

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/verify-2fa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, email })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Invalid code');
            }

            // Redirect to dashboard after successful verification
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Two-Factor Authentication | LPK Merdeka</title>
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center p-4">
                <div className="max-w-md w-full">
                    {/* Back Button */}
                    <button
                        onClick={() => router.push('/auth/login')}
                        className="mb-4 text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors"
                    >
                        <FaArrowLeft />
                        Back to Login
                    </button>

                    {/* Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaShieldAlt className="text-3xl text-red-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                Two-Factor Authentication
                            </h1>
                            <p className="text-gray-600 text-sm">
                                Enter the 6-digit code from your authenticator app
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleVerify} className="space-y-6">
                            {/* Code Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Verification Code
                                </label>
                                <input
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    placeholder="000000"
                                    maxLength={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-center text-2xl font-mono tracking-widest"
                                    required
                                    autoFocus
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading || code.length !== 6}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Verifying...' : 'Verify & Continue'}
                            </button>
                        </form>

                        {/* Help Text */}
                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-500">
                                Can't access your authenticator app?
                            </p>
                            <button
                                onClick={() => router.push('/auth/login')}
                                className="text-xs text-red-600 hover:text-red-700 font-medium mt-1"
                            >
                                Contact Administrator
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { TwoFactorSetup } from '@/components/admin/TwoFactorSetup';
import { FaShieldAlt, FaUser } from 'react-icons/fa';

export default function AdminSecurityPage() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/auth/login');
        } else if (isAuthenticated && user) {
            if (user.role !== 'admin' && user.role !== 'superAdmin') {
                router.push('/dashboard');
            } else {
                setLoading(false);
            }
        }
    }, [isAuthenticated, user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 dark:border-zinc-700 border-t-red-600 dark:border-t-red-500"></div>
            </div>
        );
    }

    return (
        <AdminLayout title="Security Settings">
            <Head>
                <title>Security Settings | Admin - LPK Merdeka</title>
            </Head>

            <div className="space-y-6">
                {/* Header */}
                <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                            <FaShieldAlt className="text-2xl text-red-600 dark:text-red-500" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Security Settings</h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account security and authentication methods</p>
                        </div>
                    </div>
                </div>

                {/* User Info */}
                <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center border border-gray-200 dark:border-zinc-700">
                            {(user as any)?.photo_url || user?.image ? (
                                <img
                                    src={(user as any)?.photo_url || user?.image}
                                    alt={user?.name || 'Admin'}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                            ) : (
                                <FaUser className="text-2xl text-gray-400" />
                            )}
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{user?.name}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                            <span className="inline-block mt-1 px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-xs font-medium rounded-full">
                                {user?.role === 'superAdmin' ? 'Super Admin' : 'Admin'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 2FA Setup */}
                <TwoFactorSetup />

                {/* Security Tips */}
                <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 rounded-xl p-6">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2">
                        <FaShieldAlt />
                        Security Best Practices
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 dark:text-blue-500 mt-0.5">•</span>
                            <span>Enable Two-Factor Authentication for enhanced account security</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 dark:text-blue-500 mt-0.5">•</span>
                            <span>Use a strong, unique password that you don't use elsewhere</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 dark:text-blue-500 mt-0.5">•</span>
                            <span>Keep your authenticator app backed up and secure</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 dark:text-blue-500 mt-0.5">•</span>
                            <span>Never share your 2FA codes or backup keys with anyone</span>
                        </li>
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
}

import React, { useState } from 'react';
import Head from 'next/head';
import {
    FaKey, FaUserGraduate, FaUserShield, FaDatabase, FaChevronDown, FaChevronRight,
    FaCode, FaAward, FaVideo, FaFolder, FaGlobe, FaUsers, FaCalendarCheck, FaCog
} from 'react-icons/fa';

interface Endpoint {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    path: string;
    description: string;
    params?: Record<string, string>;
    body?: any;
    response?: any;
}

interface ApiGroup {
    title: string;
    description: string;
    icon: React.ReactNode;
    endpoints: Endpoint[];
}

const apiDocs: ApiGroup[] = [
    {
        title: 'Authentication',
        description: 'Endpoints provided by Better Auth for user management. Base URL: /api/auth',
        icon: <FaKey />,
        endpoints: [
            {
                method: 'POST',
                path: '/api/auth/sign-in/email',
                description: 'Authenticate user with Email and Password.',
                body: { email: 'user@example.com', password: 'password123', rememberMe: false },
                response: { session: "session_object", user: "user_object" }
            },
            {
                method: 'POST',
                path: '/api/auth/sign-up/email',
                description: 'Register a new user account.',
                body: { email: 'user@example.com', password: 'password123', name: 'Full Name' },
                response: { session: "session_object", user: "user_object" }
            },
            {
                method: 'POST',
                path: '/api/auth/sign-out',
                description: 'Sign out the current session.',
                body: {}
            },
            {
                method: 'GET',
                path: '/api/auth/session',
                description: 'Get the current active session and user profile.',
                response: { session: "session_object", user: { id: '...', role: 'user|admin' } }
            },
            {
                method: 'POST',
                path: '/api/auth/forget-password',
                description: 'Request a password reset link.',
                body: { email: 'user@example.com', redirectTo: '/reset-password' }
            },
            {
                method: 'POST',
                path: '/api/auth/reset-password',
                description: 'Reset password using token.',
                body: { token: '...', password: 'newPassword' }
            },
            {
                method: 'POST',
                path: '/api/auth/sign-in/social/google',
                description: 'Initiate Google OAuth login.',
                body: { callbackURL: '/dashboard' }
            }
        ]
    },
    {
        title: 'CMS / Landing Page',
        description: 'Manage public landing page content.',
        icon: <FaGlobe />,
        endpoints: [
            { method: 'GET', path: '/api/cms/hero', description: 'Get Hero section data (Title, Subtitle, Images).' },
            { method: 'PUT', path: '/api/cms/hero', description: 'Update Hero section (Admin only).', body: { title: 'New Title', subtitle: '...' } },
            { method: 'GET', path: '/api/cms/about', description: 'Get Home About section.' },
            { method: 'GET', path: '/api/cms/articles', description: 'List public articles/blog posts.' },
            { method: 'GET', path: '/api/cms/program', description: 'List available training programs.' },
            { method: 'GET', path: '/api/cms/testimonials', description: 'List user testimonials.' },
            { method: 'GET', path: '/api/cms/faq', description: 'List Frequently Asked Questions.' },
            { method: 'GET', path: '/api/cms/gallery', description: 'List Gallery images.' },
            { method: 'GET', path: '/api/cms/settings', description: 'Get General Site Settings (Contact, Socials).' },
            { method: 'GET', path: '/api/public/leaderboard', description: 'Get public leaderboard data.' },
        ]
    },
    {
        title: 'User Features',
        description: 'Dashboard features for students.',
        icon: <FaUserGraduate />,
        endpoints: [
            // Quizzes
            {
                method: 'GET',
                path: '/api/user/quizzes',
                description: 'List accessible quizzes.',
                response: [{ id: '1', title: 'Weekly Quiz', score: 80 }]
            },
            {
                method: 'POST',
                path: '/api/user/quizzes/[id]/start',
                description: 'Start a quiz session. Returns questions list and duration.',
                response: { questions: [{ id: 'q1', text: '...' }], duration: 30 }
            },
            {
                method: 'POST',
                path: '/api/user/quizzes/[id]/submit',
                description: 'Submit answers. Returns detailed results and delta points.',
                body: { answers: { "q1": "A" } },
                response: { score: 100, earnedPoints: 20, results: [] }
            },
            // Certificates
            {
                method: 'GET',
                path: '/api/user/certificates',
                description: 'List user earned certificates.'
            },
            {
                method: 'POST',
                path: '/api/user/certificates/[id]/regenerate',
                description: 'Regenerate certificate with latest profile name (Admin/User action).'
            },
            // Stats
            {
                method: 'GET',
                path: '/api/user/dashboard/stats',
                description: 'Get user dashboard statistics (Points, Rank, Completion).'
            },
            {
                method: 'GET',
                path: '/api/user/gamification/leaderboard',
                description: 'Get global leaderboard.'
            },
            // Attendance
            {
                method: 'GET',
                path: '/api/attendance-sessions',
                description: 'List active/available attendance sessions.'
            },
            {
                method: 'POST',
                path: '/api/attendance-sessions/[id]/check-in',
                description: 'Check-in to a session.',
                body: { location: 'Jakarta' }
            },
            // Profile
            {
                method: 'GET',
                path: '/api/user',
                description: 'Get current user profile details.'
            },
            {
                method: 'PUT',
                path: '/api/user',
                description: 'Update user profile (Name, Email, Password).',
                body: { name: 'New Name', email: 'new@email.com', password: 'newPassword' }
            }
        ]
    },
    {
        title: 'Admin Content',
        description: 'Manage educational content and quizzes.',
        icon: <FaDatabase />,
        endpoints: [
            {
                method: 'GET',
                path: '/api/admin/content/folders',
                description: 'List content folders. Filter by type.',
                params: { type: 'video|ebook' }
            },
            {
                method: 'POST',
                path: '/api/admin/content/folders',
                description: 'Create new folder.',
                body: { name: 'Math', type: 'video' }
            },
            {
                method: 'GET',
                path: '/api/admin/content/videos',
                description: 'List videos. Supports filtering by folder.',
                params: { folder_id: 'ID', uncategorized: 'true' }
            },
            {
                method: 'POST',
                path: '/api/admin/content/videos',
                description: 'Create new video.'
            },
            {
                method: 'GET',
                path: '/api/admin/content/ebooks',
                description: 'List ebooks. Supports filtering by folder.',
                params: { folder_id: 'ID' },
                response: [{ id: 'e1', title: 'Guide.pdf', file_url: '...' }]
            },
            {
                method: 'POST',
                path: '/api/admin/content/ebooks',
                description: 'Create new ebook.',
                body: { title: 'Book 1', file_url: '...', folder_id: 'ID', cover_url: '...' }
            },
            {
                method: 'POST',
                path: '/api/admin/content/weekly-quiz',
                description: 'Create/Update Weekly Quiz configuration.'
            },
            {
                method: 'GET',
                path: '/api/admin/content/quiz-bank/categories',
                description: 'List categories for Question Bank.'
            }
        ]
    },
    {
        title: 'Admin Management',
        description: 'User and System Administration.',
        icon: <FaUsers />,
        endpoints: [
            {
                method: 'GET',
                path: '/api/admin/users',
                description: 'List all registered users with pagination/search.'
            },
            {
                method: 'GET',
                path: '/api/admin/users/[id]',
                description: 'Get detailed user profile.'
            },
            {
                method: 'PUT',
                path: '/api/admin/users/[id]',
                description: 'Update user (Role, Status).'
            },
            {
                method: 'DELETE',
                path: '/api/admin/users/[id]',
                description: 'Delete user.'
            },
            {
                method: 'GET',
                path: '/api/admin/stats',
                description: 'Get global system statistics (Total Users, Quizzes, etc).'
            },
            {
                method: 'GET',
                path: '/api/admin/admins',
                description: 'List admin accounts.'
            },
            {
                method: 'POST',
                path: '/api/admin/admins',
                description: 'Create new admin account.',
                body: { name: 'Admin', email: 'admin@lpk.com', password: '...' }
            },
            {
                method: 'GET',
                path: '/api/admin/attendance-sessions',
                description: 'List all attendance sessions (Admin view).'
            },
            {
                method: 'POST',
                path: '/api/admin/attendance-sessions',
                description: 'Create attendance session (Generate QR).',
                body: { title: 'Session 1', location: 'Room A', valid_until: 'timestamp' }
            }
        ]
    }
];

export default function ApiDocs() {
    const [activeGroup, setActiveGroup] = useState<string>(apiDocs[0].title);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-800 dark:text-gray-200 font-sans">
            <Head>
                <title>API Documentation | LPK Merdeka</title>
            </Head>

            <div className="flex flex-col md:flex-row min-h-screen">
                {/* Sidebar */}
                <aside className="w-full md:w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 flex-shrink-0">
                    <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
                        <div className="flex items-center gap-3 text-red-600 dark:text-red-500 font-bold text-xl">
                            <FaCode />
                            <span>API Docs</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Internal Developer Resources</p>
                    </div>
                    <nav className="p-4 space-y-1">
                        {apiDocs.map(group => (
                            <button
                                key={group.title}
                                onClick={() => setActiveGroup(group.title)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeGroup === group.title
                                    ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800'
                                    }`}
                            >
                                <span className={activeGroup === group.title ? 'text-red-500' : 'text-gray-400'}>{group.icon}</span>
                                {group.title}
                                {activeGroup === group.title && <FaChevronRight className="ml-auto text-xs" />}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto max-h-screen">
                    {apiDocs.map(group => (
                        activeGroup === group.title && (
                            <div key={group.title} className="p-8 max-w-4xl mx-auto animate-in fade-in duration-300">
                                <header className="mb-10">
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                                        {group.icon} {group.title}
                                    </h1>
                                    <p className="text-lg text-gray-500">{group.description}</p>
                                </header>

                                <div className="space-y-12">
                                    {group.endpoints.map((endpoint, idx) => (
                                        <div key={idx} className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                                            {/* Header */}
                                            <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex flex-col md:flex-row md:items-center gap-4">
                                                <div className={`px-3 py-1 rounded-md text-sm font-bold font-mono w-fit ${endpoint.method === 'GET' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                                    endpoint.method === 'POST' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                        endpoint.method === 'PUT' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                                                            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                    }`}>
                                                    {endpoint.method}
                                                </div>
                                                <code className="text-lg font-semibold text-gray-800 dark:text-gray-200 font-mono break-all">
                                                    {endpoint.path}
                                                </code>
                                            </div>

                                            {/* Details */}
                                            <div className="p-6 space-y-6">
                                                <p className="text-gray-600 dark:text-gray-300">{endpoint.description}</p>

                                                {endpoint.params && (
                                                    <div>
                                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">URL Parameters</h4>
                                                        <div className="bg-gray-50 dark:bg-zinc-950 rounded-lg p-4 border border-gray-100 dark:border-zinc-800">
                                                            {Object.entries(endpoint.params).map(([key, desc]) => (
                                                                <div key={key} className="flex gap-4 text-sm font-mono mb-2 last:mb-0">
                                                                    <span className="text-red-600 dark:text-red-400 min-w-[100px]">{key}</span>
                                                                    <span className="text-gray-500">{desc}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {endpoint.body && (
                                                    <div>
                                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Request Body</h4>
                                                        <pre className="bg-gray-900 text-gray-200 p-4 rounded-lg overflow-x-auto font-mono text-sm border border-gray-800">
                                                            {JSON.stringify(endpoint.body, null, 2)}
                                                        </pre>
                                                    </div>
                                                )}

                                                {endpoint.response && (
                                                    <div>
                                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Response Example</h4>
                                                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto font-mono text-sm border border-gray-800">
                                                            {JSON.stringify(endpoint.response, null, 2)}
                                                        </pre>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </main>
            </div>
        </div>
    );
}

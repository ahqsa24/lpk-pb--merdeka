import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { useSearch } from '@/context/SearchContext';
import { FaCertificate, FaDownload, FaCalendarAlt } from 'react-icons/fa';
import Link from 'next/link';

interface Certificate {
    id: string;
    certificate_code: string;
    file_url: string;
    issued_at: string;
    user: {
        name: string;
        email: string;
    };
    quiz: {
        title: string;
    };
}

export default function AdminCertificates() {
    const { searchQuery } = useSearch();
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const res = await fetch('/api/admin/gamification/certificates');
                if (res.ok) {
                    setCertificates(await res.json());
                }
            } catch (error) {
                console.error("Failed to fetch certificates", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCertificates();
    }, []);

    const filteredData = certificates.filter(item =>
        item.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.certificate_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <AdminLayout title="Issued Certificates">
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden transition-colors">
                <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <FaCertificate className="text-blue-500 dark:text-blue-400" /> Certificates Log
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">History of all certificates issued to users</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {/* Desktop Table */}
                    <table className="hidden md:table w-full">
                        <thead className="bg-gray-50 dark:bg-zinc-800 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Code</th>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Quiz Title</th>
                                <th className="px-6 py-4">Issued At</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                        Loading certificates...
                                    </td>
                                </tr>
                            ) : filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No certificates found.
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((cert) => (
                                    <tr key={cert.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-gray-500 dark:text-gray-400">
                                            {cert.certificate_code}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-900 dark:text-white">{cert.user.name}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{cert.user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                                            {cert.quiz.title}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {formatDate(cert.issued_at)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={cert.file_url}
                                                target="_blank"
                                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors text-sm font-medium"
                                            >
                                                <FaDownload size={12} /> Download
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Mobile Card List */}
                    <div className="md:hidden space-y-4 p-4">
                        {loading ? (
                            <div className="text-center text-gray-500 dark:text-gray-400">Loading...</div>
                        ) : filteredData.length === 0 ? (
                            <div className="text-center text-gray-500 dark:text-gray-400">No certificates found.</div>
                        ) : (
                            filteredData.map((cert) => (
                                <div key={cert.id} className="bg-white dark:bg-zinc-800 rounded-xl p-4 border border-gray-100 dark:border-zinc-700 shadow-sm space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white">{cert.user.name}</h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{cert.user.email}</p>
                                        </div>
                                        <span className="font-mono text-[10px] bg-gray-100 dark:bg-zinc-700 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300">
                                            {cert.certificate_code}
                                        </span>
                                    </div>

                                    <div className="text-sm text-gray-700 dark:text-gray-300">
                                        <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">Finished:</span> <br />
                                        {cert.quiz.title}
                                    </div>

                                    <div className="flex justify-between items-center border-t border-gray-100 dark:border-zinc-700 pt-3">
                                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                            <FaCalendarAlt /> {formatDate(cert.issued_at)}
                                        </div>
                                        <Link
                                            href={cert.file_url}
                                            target="_blank"
                                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors text-sm font-medium"
                                        >
                                            <FaDownload size={12} /> Download
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

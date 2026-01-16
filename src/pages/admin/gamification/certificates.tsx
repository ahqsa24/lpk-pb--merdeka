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
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <FaCertificate className="text-blue-500" /> Certificates Log
                        </h2>
                        <p className="text-sm text-gray-500">History of all certificates issued to users</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Code</th>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Quiz Title</th>
                                <th className="px-6 py-4">Issued At</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        Loading certificates...
                                    </td>
                                </tr>
                            ) : filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No certificates found.
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((cert) => (
                                    <tr key={cert.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-gray-500">
                                            {cert.certificate_code}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-900">{cert.user.name}</div>
                                            <div className="text-xs text-gray-500">{cert.user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">
                                            {cert.quiz.title}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {formatDate(cert.issued_at)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={cert.file_url}
                                                target="_blank"
                                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                                            >
                                                <FaDownload size={12} /> Download
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}

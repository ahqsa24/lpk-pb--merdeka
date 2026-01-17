import React from 'react';
import Head from 'next/head';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { FolderManager } from '@/components/admin/content/FolderManager';

export default function EbooksIndex() {
    return (
        <AdminLayout title="Content: E-Books">
            <Head>
                <title>Manage E-Books | Admin</title>
            </Head>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="border-b border-gray-100 pb-4 mb-6">
                    <h2 className="text-xl font-bold text-gray-800">E-Book Library</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage digital books and documents organized by folders.</p>
                </div>

                <FolderManager type="ebook" baseUrl="/admin/content/ebooks" />
            </div>
        </AdminLayout>
    );
}

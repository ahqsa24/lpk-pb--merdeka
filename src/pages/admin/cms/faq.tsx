import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { FaEdit, FaTrash, FaPlus, FaQuestionCircle } from 'react-icons/fa';
import { ConfirmationModal } from '@/components/shared/molecules/ConfirmationModal';

interface FAQ {
    id: string; // BigInt serialized
    question: string;
    answer: string;
    category: string;
    order: number;
}

export default function CMSFAQ() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({ question: '', answer: '', category: 'General', order: 0, id: '' });
    const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    };

    const fetchFaqs = async () => {
        try {
            const res = await fetch('/api/admin/cms/faq', { headers: getAuthHeaders() });
            if (res.ok) {
                const data = await res.json();
                setFaqs(data);
            }
        } catch (error) {
            console.error('Failed to fetch FAQs', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    const handleDeleteClick = (id: string) => {
        setDeleteTargetId(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deleteTargetId) return;
        try {
            const res = await fetch(`/api/admin/cms/faq/${deleteTargetId}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            if (res.ok) {
                setFaqs(faqs.filter(f => f.id !== deleteTargetId));
            } else {
                alert('Failed to delete FAQ');
            }
        } catch (error) {
            alert('Error deleting FAQ');
        } finally {
            setIsDeleteModalOpen(false);
            setDeleteTargetId(null);
        }
    };

    const handleEdit = (faq: FAQ) => {
        setFormData({
            question: faq.question,
            answer: faq.answer,
            category: faq.category || 'General',
            order: faq.order,
            id: faq.id
        });
        setFormMode('edit');
        setIsFormOpen(true);
    };

    const handleCreate = () => {
        setFormData({ question: '', answer: '', category: 'General', order: faqs.length + 1, id: '' });
        setFormMode('create');
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = formMode === 'create' ? '/api/admin/cms/faq' : `/api/admin/cms/faq/${formData.id}`;
        const method = formMode === 'create' ? 'POST' : 'PUT';

        try {
            const res = await fetch(url, {
                method,
                headers: getAuthHeaders(),
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setIsFormOpen(false);
                fetchFaqs();
            } else {
                alert('Operation failed');
            }
        } catch (error) {
            alert('Error submitting form');
        }
    };

    return (
        <AdminLayout title="CMS: FAQ">
            <Head>
                <title>Manage FAQ | Admin</title>
            </Head>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <FaQuestionCircle className="text-red-500" /> FAQ List
                    </h2>
                    <button
                        onClick={handleCreate}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
                    >
                        <FaPlus /> Add FAQ
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Question</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Answer</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Order</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">Loading...</td>
                                </tr>
                            ) : faqs.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No FAQs found.</td>
                                </tr>
                            ) : (
                                faqs.map((faq) => (
                                    <tr key={faq.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-medium text-gray-900 max-w-xs">{faq.question}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 max-w-sm truncate">{faq.answer}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{faq.order}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(faq)}
                                                    className="p-2 hover:bg-gray-100 rounded-lg text-blue-600 transition"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(faq.id)}
                                                    className="p-2 hover:bg-gray-100 rounded-lg text-red-600 transition"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Form */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-800">
                                {formMode === 'create' ? 'Add FAQ' : 'Edit FAQ'}
                            </h3>
                            <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.question}
                                    onChange={e => setFormData({ ...formData, question: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.answer}
                                    onChange={e => setFormData({ ...formData, answer: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <input
                                        type="text" // Or select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Hapus FAQ?"
                message="Yakin ingin menghapus pertanyaan ini?"
                isDanger={true}
                confirmText="Hapus"
            />
        </AdminLayout>
    );
}

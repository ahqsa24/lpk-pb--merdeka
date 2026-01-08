import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { FaEdit, FaTrash, FaPlus, FaList, FaImage } from 'react-icons/fa';
import { ConfirmationModal } from '@/components/shared/molecules/ConfirmationModal';

interface Program {
    id: string; // Serialized from BigInt
    title: string;
    description: string;
    image_url: string;
    order: number;
}

export default function CMSPrograms() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', image_url: '', order: 0, id: '' });
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

    const fetchPrograms = async () => {
        try {
            const res = await fetch('/api/admin/cms/programs', {
                headers: getAuthHeaders()
            });
            if (res.ok) {
                const data = await res.json();
                setPrograms(data);
            }
        } catch (error) {
            console.error('Failed to fetch programs', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    const handleDeleteClick = (id: string) => {
        setDeleteTargetId(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deleteTargetId) return;

        try {
            const res = await fetch(`/api/admin/cms/programs/${deleteTargetId}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            if (res.ok) {
                setPrograms(programs.filter(p => p.id !== deleteTargetId));
            } else {
                alert('Failed to delete program');
            }
        } catch (error) {
            alert('Error deleting program');
        } finally {
            setIsDeleteModalOpen(false);
            setDeleteTargetId(null);
        }
    };

    const handleEdit = (program: Program) => {
        setFormData({
            title: program.title,
            description: program.description,
            image_url: program.image_url,
            order: program.order,
            id: program.id
        });
        setFormMode('edit');
        setIsFormOpen(true);
    };

    const handleCreate = () => {
        setFormData({ title: '', description: '', image_url: '', order: programs.length + 1, id: '' });
        setFormMode('create');
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const url = formMode === 'create' ? '/api/admin/cms/programs' : `/api/admin/cms/programs/${formData.id}`;
        const method = formMode === 'create' ? 'POST' : 'PUT';

        try {
            const res = await fetch(url, {
                method,
                headers: getAuthHeaders(),
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setIsFormOpen(false);
                fetchPrograms();
            } else {
                alert('Operation failed');
            }
        } catch (error) {
            alert('Error submitting form');
        }
    };

    return (
        <AdminLayout title="CMS: Programs">
            <Head>
                <title>Manage Programs | Admin</title>
            </Head>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <FaList className="text-red-500" /> Program List
                    </h2>
                    <button
                        onClick={handleCreate}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
                    >
                        <FaPlus /> Add Program
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Image</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Title</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Description</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Order</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">Loading...</td>
                                </tr>
                            ) : programs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No programs found.</td>
                                </tr>
                            ) : (
                                programs.map((program) => (
                                    <tr key={program.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="w-16 h-10 bg-gray-100 rounded overflow-hidden border border-gray-200">
                                                {program.image_url ? (
                                                    <img src={program.image_url} alt={program.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <FaImage />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{program.title}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{program.description}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{program.order}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(program)}
                                                    className="p-2 hover:bg-gray-100 rounded-lg text-blue-600 transition"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(program.id)}
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
                                {formMode === 'create' ? 'Add Program' : 'Edit Program'}
                            </h3>
                            <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input
                                    type="text"
                                    value={formData.image_url}
                                    onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                    placeholder="https://..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                />
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
                title="Hapus Program?"
                message="Yakin ingin menghapus program ini?"
                isDanger={true}
                confirmText="Hapus"
            />
        </AdminLayout>
    );
}

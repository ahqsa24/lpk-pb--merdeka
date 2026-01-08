import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaUserShield } from 'react-icons/fa';
import { ConfirmationModal } from '@/components/shared/molecules/ConfirmationModal';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

export default function AdminsManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'admin', id: '' });
    const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    };

    const fetchAdmins = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/admin/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setUsers(data.filter((u: User) => u.role === 'admin'));
            }
        } catch (error) {
            console.error('Failed to fetch admins', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Open Delete Modal
    const handleDeleteClick = (id: string) => {
        setDeleteTargetId(id);
        setIsDeleteModalOpen(true);
    };

    // Confirm Delete Action
    const handleConfirmDelete = async () => {
        if (!deleteTargetId) return;

        try {
            const res = await fetch(`/api/admin/users/${deleteTargetId}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            if (res.ok) {
                setUsers(users.filter(u => u.id !== deleteTargetId));
            } else {
                alert('Failed to delete admin');
            }
        } catch (error) {
            alert('Error deleting admin');
        } finally {
            setIsDeleteModalOpen(false);
            setDeleteTargetId(null);
        }
    };

    const handleEdit = (user: User) => {
        setFormData({
            name: user.name,
            email: user.email,
            password: '',
            role: 'admin',
            id: user.id
        });
        setFormMode('edit');
        setIsFormOpen(true);
    };

    const handleCreate = () => {
        setFormData({ name: '', email: '', password: '', role: 'admin', id: '' });
        setFormMode('create');
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const url = formMode === 'create' ? '/api/admin/users' : `/api/admin/users/${formData.id}`;
        const method = formMode === 'create' ? 'POST' : 'PUT';

        try {
            const res = await fetch(url, {
                method,
                headers: getAuthHeaders(),
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setIsFormOpen(false);
                fetchAdmins(); // Refresh list
            } else {
                const data = await res.json();
                alert(data.message || 'Operation failed');
            }
        } catch (error) {
            alert('Error submitting form');
        }
    };

    return (
        <AdminLayout title="Admin Management">
            <Head>
                <title>Manage Admins | Admin</title>
            </Head>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-4 items-center">
                    <div className="relative w-full md:w-64">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search admins..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500"
                        />
                    </div>
                    <button
                        onClick={handleCreate}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
                    >
                        <FaPlus /> Add Admin
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Email</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Joined</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">Loading admins...</td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No admins found.</td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                                                    <FaUserShield size={14} />
                                                </div>
                                                <div className="font-medium text-gray-900">{user.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    className="p-2 hover:bg-gray-100 rounded-lg text-blue-600 transition"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(user.id)}
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
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-800">
                                {formMode === 'create' ? 'Create New Admin' : 'Edit Admin'}
                            </h3>
                            <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password {formMode === 'edit' && <span className="text-gray-400 font-normal">(Leave blank to keep current)</span>}
                                </label>
                                <input
                                    type="password"
                                    required={formMode === 'create'}
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                />
                            </div>

                            <input type="hidden" value="admin" />

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
                                    {formMode === 'create' ? 'Create Admin' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Hapus Admin?"
                message="Apakah Anda yakin ingin menghapus admin ini? Tindakan ini tidak dapat dibatalkan."
                isDanger={true}
                confirmText="Hapus"
                cancelText="Batal"
            />
        </AdminLayout>
    );
}

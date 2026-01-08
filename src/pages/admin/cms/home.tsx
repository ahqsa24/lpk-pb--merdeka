import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { FaSave, FaImage, FaSpinner } from 'react-icons/fa';

export default function CMSHome() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        image_url: '',
        cta_text: '',
        cta_link: '',
        is_active: true
    });

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/admin/cms/home', {
                headers: getAuthHeaders()
            });
            if (res.ok) {
                const data = await res.json();
                if (data && Object.keys(data).length > 0) {
                    setFormData({
                        title: data.title || '',
                        subtitle: data.subtitle || '',
                        image_url: data.image_url || '',
                        cta_text: data.cta_text || '',
                        cta_link: data.cta_link || '',
                        is_active: data.is_active ?? true
                    });
                }
            }
        } catch (error) {
            console.error('Failed to fetch CMS data', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch('/api/admin/cms/home', {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                alert('Content updated successfully!');
            } else {
                alert('Failed to update content');
            }
        } catch (error) {
            alert('Error saving content');
        } finally {
            setSaving(false);
        }
    };

    return (
        <AdminLayout title="CMS: Beranda (Hero)">
            <Head>
                <title>Manage Home | Admin</title>
            </Head>

            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50">
                        <h2 className="text-lg font-bold text-gray-800">Edit Hero Section</h2>
                        <p className="text-sm text-gray-500">Manage the main content displayed at the top of the home page.</p>
                    </div>

                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Loading...</div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Preview Image */}
                            {formData.image_url && (
                                <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 mb-6 group">
                                    <img
                                        src={formData.image_url}
                                        alt="Hero Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white opacity-0 group-hover:opacity-100 transition">
                                        <p className="font-semibold text-sm bg-black/50 px-3 py-1 rounded">Image Preview</p>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Headline (Title)</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                            placeholder="e.g. Membangun Karir Profesional..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Background Image URL</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={formData.image_url}
                                                onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                                placeholder="https://..."
                                            />
                                            <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                                                <FaImage />
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">Use a valid image URL.</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.is_active ? 'bg-green-500' : 'bg-gray-200'}`}
                                            >
                                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.is_active ? 'translate-x-6' : 'translate-x-1'}`} />
                                            </button>
                                            <span className="text-sm text-gray-600">{formData.is_active ? 'Active' : 'Inactive'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Headline (Description)</label>
                                        <textarea
                                            rows={4}
                                            value={formData.subtitle}
                                            onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                            placeholder="Description text..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
                                            <input
                                                type="text"
                                                value={formData.cta_text}
                                                onChange={e => setFormData({ ...formData, cta_text: e.target.value })}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                                placeholder="e.g. Daftar Sekarang"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
                                            <input
                                                type="text"
                                                value={formData.cta_link}
                                                onChange={e => setFormData({ ...formData, cta_link: e.target.value })}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                                placeholder="/auth/register"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

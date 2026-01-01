'use client';

import { useState, useEffect } from 'react';
import { Trash2, Edit, Save, X, ExternalLink } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

interface Portfolio {
    id: number;
    title: string;
    image: string | null;
    duration: string;
    detail: string;
    link: string | null;
    order: number;
}

export default function PortfolioPage() {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<{ title: string; image: string; duration: string; detail: string; link: string; order: number | string }>({ title: '', image: '', duration: '', detail: '', link: '', order: 1 });

    useEffect(() => {
        fetchPortfolios();
    }, []);

    const fetchPortfolios = async () => {
        try {
            const res = await fetch('/api/portfolio');
            const data = await res.json();
            setPortfolios(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching portfolios:', error);
            setPortfolios([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await fetch(`/api/portfolio/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            } else {
                await fetch('/api/portfolio', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            }
            setFormData({ title: '', image: '', duration: '', detail: '', link: '', order: 1 });
            setEditingId(null);
            fetchPortfolios();
        } catch (error) {
            console.error('Error saving portfolio:', error);
        }
    };

    const handleEdit = (portfolio: Portfolio) => {
        setEditingId(portfolio.id);
        setFormData({
            title: portfolio.title,
            image: portfolio.image || '',
            duration: portfolio.duration,
            detail: portfolio.detail,
            link: portfolio.link || '',
            order: portfolio.order,
        });
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this portfolio item?')) return;
        try {
            await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
            fetchPortfolios();
        } catch (error) {
            console.error('Error deleting portfolio:', error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Portfolio</h1>

            {/* Form */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{editingId ? 'Edit Portfolio' : 'Add Portfolio Item'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
                            <input
                                type="text"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="e.g., 2023 - Present"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Project Image</label>
                        <ImageUploader value={formData.image} onChange={(url) => setFormData({ ...formData, image: url })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Details *</label>
                        <textarea
                            value={formData.detail}
                            onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Project Link</label>
                        <input
                            type="url"
                            value={formData.link}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="https://"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                        <input
                            type="number"
                            value={formData.order || ''}
                            onChange={(e) => setFormData({ ...formData, order: e.target.value === '' ? '' : Number(e.target.value) })}
                            onBlur={(e) => {
                                const num = Number(e.target.value);
                                if (!e.target.value || isNaN(num) || num < 1) {
                                    setFormData({ ...formData, order: 1 });
                                }
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            min="1"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                            <Save size={18} />{editingId ? 'Update' : 'Add'} Portfolio
                        </button>
                        {editingId && (
                            <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', image: '', duration: '', detail: '', link: '', order: 1 }); }} className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                                <X size={18} />Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Portfolio List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolios.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        {item.image && <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />}
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                                <span className="text-sm text-gray-500">{item.duration}</span>
                            </div>
                            <p className="text-gray-600 mb-4">{item.detail}</p>
                            {item.link && (
                                <a href={item.link} target="_blank" className="text-indigo-600 hover:underline flex items-center gap-1 text-sm mb-4">
                                    <ExternalLink size={14} />Visit Project
                                </a>
                            )}
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(item)} className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                                    <Edit size={16} className="inline mr-1" />Edit
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                                    <Trash2 size={16} className="inline mr-1" />Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

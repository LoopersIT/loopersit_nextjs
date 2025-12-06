'use client';

import { useState, useEffect } from 'react';
import { Trash2, Edit, Save, X, TrendingUp } from 'lucide-react';

interface ProjectSummary {
    id: number;
    figure: string;
    detail: string;
    order: number;
}

export default function ProjectSummaryPage() {
    const [summaries, setSummaries] = useState<ProjectSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({ figure: '', detail: '', order: 1 });

    useEffect(() => {
        fetchSummaries();
    }, []);

    const fetchSummaries = async () => {
        try {
            const res = await fetch('/api/project-summary');
            const data = await res.json();
            setSummaries(data);
        } catch (error) {
            console.error('Error fetching project summaries:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await fetch(`/api/project-summary/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            } else {
                await fetch('/api/project-summary', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            }
            setFormData({ figure: '', detail: '', order: 1 });
            setEditingId(null);
            fetchSummaries();
        } catch (error) {
            console.error('Error saving project summary:', error);
        }
    };

    const handleEdit = (summary: ProjectSummary) => {
        setEditingId(summary.id);
        setFormData({ figure: summary.figure, detail: summary.detail, order: summary.order });
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this statistic?')) return;
        try {
            await fetch(`/api/project-summary/${id}`, { method: 'DELETE' });
            fetchSummaries();
        } catch (error) {
            console.error('Error deleting project summary:', error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <TrendingUp size={32} className="text-indigo-600" />
                <h1 className="text-3xl font-bold text-gray-800">Project Statistics</h1>
            </div>

            {/* Form */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{editingId ? 'Edit Statistic' : 'Add New Statistic'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Figure/Number *</label>
                            <input
                                type="text"
                                value={formData.figure}
                                onChange={(e) => setFormData({ ...formData, figure: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="e.g., 100+ or 5K"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                            <input
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                min="1"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                        <input
                            type="text"
                            value={formData.detail}
                            onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g., Happy Clients or Projects Completed"
                            required
                        />
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                            <Save size={18} />{editingId ? 'Update' : 'Add'} Statistic
                        </button>
                        {editingId && (
                            <button type="button" onClick={() => { setEditingId(null); setFormData({ figure: '', detail: '', order: 1 }); }} className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                                <X size={18} />Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {summaries.map((stat) => (
                    <div key={stat.id} className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                        <div className="relative z-10">
                            <div className="text-4xl font-bold mb-2">{stat.figure}</div>
                            <div className="text-indigo-100 font-medium">{stat.detail}</div>
                            <div className="text-xs text-indigo-200 mt-2">Order: {stat.order}</div>
                        </div>
                        <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(stat)} className="flex-1 px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-sm">
                                <Edit size={14} className="inline mr-1" />Edit
                            </button>
                            <button onClick={() => handleDelete(stat.id)} className="flex-1 px-3 py-1 bg-red-500/50 hover:bg-red-500/70 rounded text-sm">
                                <Trash2 size={14} className="inline mr-1" />Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {summaries.length === 0 && (
                <div className="bg-white rounded-xl shadow-md p-12 text-center text-gray-500">
                    <TrendingUp size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>No statistics yet. Add your first statistic above.</p>
                </div>
            )}
        </div>
    );
}

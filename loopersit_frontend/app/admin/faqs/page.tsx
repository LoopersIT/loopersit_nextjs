'use client';

import { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, Save, X } from 'lucide-react';

interface FAQ {
    id: number;
    question: string;
    answer: string;
    order: number;
}

export default function FAQsPage() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({ question: '', answer: '', order: 1 });

    useEffect(() => {
        fetchFAQs();
    }, []);

    const fetchFAQs = async () => {
        try {
            const res = await fetch('/api/faqs');
            const data = await res.json();
            setFaqs(data);
        } catch (error) {
            console.error('Error fetching FAQs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await fetch(`/api/faqs/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            } else {
                await fetch('/api/faqs', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            }
            setFormData({ question: '', answer: '', order: 1 });
            setEditingId(null);
            fetchFAQs();
        } catch (error) {
            console.error('Error saving FAQ:', error);
        }
    };

    const handleEdit = (faq: FAQ) => {
        setEditingId(faq.id);
        setFormData({ question: faq.question, answer: faq.answer, order: faq.order });
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this FAQ?')) return;
        try {
            await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
            fetchFAQs();
        } catch (error) {
            console.error('Error deleting FAQ:', error);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData({ question: '', answer: '', order: 1 });
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">FAQ Management</h1>
            </div>

            {/* Add/Edit Form */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    {editingId ? 'Edit FAQ' : 'Add New FAQ'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                        <input
                            type="text"
                            value={formData.question}
                            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                        <textarea
                            value={formData.answer}
                            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                        <input
                            type="number"
                            value={formData.order}
                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            min="1"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            <Save size={18} />
                            {editingId ? 'Update' : 'Add'} FAQ
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                <X size={18} />
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* FAQs List */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">All FAQs ({faqs.length})</h2>
                </div>
                {faqs.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No FAQs yet. Add your first FAQ above.
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {faqs.map((faq) => (
                            <div key={faq.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
                                        <p className="text-gray-600 whitespace-pre-wrap">{faq.answer}</p>
                                        <span className="inline-block mt-2 text-xs text-gray-500">Order: {faq.order}</span>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => handleEdit(faq)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(faq.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

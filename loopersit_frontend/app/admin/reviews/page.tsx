'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Review {
    id: number;
    name: string;
    designation: string | null;
    image: string | null;
    review: string;
    order: number;
}

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        image: '',
        review: '',
        order: 1,
    });

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await fetch('/api/reviews');
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = editingId ? `/api/reviews/${editingId}` : '/api/reviews';
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                fetchReviews();
                resetForm();
            } else {
                alert('Failed to save review');
            }
        } catch (error) {
            console.error('Error saving review:', error);
            alert('Failed to save review');
        }
    };

    const handleEdit = (review: Review) => {
        setFormData({
            name: review.name,
            designation: review.designation || '',
            image: review.image || '',
            review: review.review,
            order: review.order,
        });
        setEditingId(review.id);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this review?')) return;

        try {
            const response = await fetch(`/api/reviews/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchReviews();
            } else {
                alert('Failed to delete review');
            }
        } catch (error) {
            console.error('Error deleting review:', error);
            alert('Failed to delete review');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            designation: '',
            image: '',
            review: '',
            order: 1,
        });
        setEditingId(null);
        setShowForm(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Reviews</h1>
                    <p className="text-gray-600">Manage customer testimonials</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
                >
                    <Plus size={20} />
                    Add Review
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">
                        {editingId ? 'Edit Review' : 'Add New Review'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                                <input
                                    type="text"
                                    value={formData.designation}
                                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Review *</label>
                            <textarea
                                value={formData.review}
                                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                                required
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                {editingId ? 'Update' : 'Create'} Review
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-md border border-gray-100">
                {reviews.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-gray-500 text-lg">No reviews yet</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {reviews.map((review) => (
                            <div key={review.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-800">{review.name}</h3>
                                        {review.designation && (
                                            <p className="text-sm text-gray-500 mb-2">{review.designation}</p>
                                        )}
                                        <p className="text-gray-700">{review.review}</p>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => handleEdit(review)}
                                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(review.id)}
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

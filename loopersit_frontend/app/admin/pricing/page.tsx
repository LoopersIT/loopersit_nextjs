'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Pricing {
    id: number;
    name: string;
    priceRange: string;
    order: number;
    features: { id: number; feature: string; order: number }[];
}

export default function PricingPage() {
    const [pricingPlans, setPricingPlans] = useState<Pricing[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        priceRange: '',
        order: 1,
    });

    useEffect(() => {
        fetchPricing();
    }, []);

    const fetchPricing = async () => {
        try {
            const response = await fetch('/api/pricing');
            const data = await response.json();
            // Ensure data is an array before setting state
            setPricingPlans(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching pricing:', error);
            setPricingPlans([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = editingId ? `/api/pricing/${editingId}` : '/api/pricing';
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                fetchPricing();
                resetForm();
            } else {
                alert('Failed to save pricing plan');
            }
        } catch (error) {
            console.error('Error saving pricing:', error);
            alert('Failed to save pricing plan');
        }
    };

    const handleEdit = (pricing: Pricing) => {
        setFormData({
            name: pricing.name,
            priceRange: pricing.priceRange,
            order: pricing.order,
        });
        setEditingId(pricing.id);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this pricing plan?')) return;

        try {
            const response = await fetch(`/api/pricing/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchPricing();
            } else {
                alert('Failed to delete pricing plan');
            }
        } catch (error) {
            console.error('Error deleting pricing:', error);
            alert('Failed to delete pricing plan');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            priceRange: '',
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
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Pricing Plans</h1>
                    <p className="text-gray-600">Manage your pricing tiers</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
                >
                    <Plus size={20} />
                    Add Plan
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">
                        {editingId ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Plan Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="e.g., Basic"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range *</label>
                                <input
                                    type="text"
                                    value={formData.priceRange}
                                    onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="e.g., $99-$299"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                                    min="1"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                {editingId ? 'Update' : 'Create'} Plan
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pricingPlans.map((plan) => (
                    <div
                        key={plan.id}
                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 p-6"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
                                <p className="text-indigo-600 font-semibold text-lg mt-1">{plan.priceRange}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(plan)}
                                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(plan.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                            <p className="text-sm font-semibold text-gray-700 mb-2">
                                {plan.features.length} Features
                            </p>
                            <ul className="space-y-2 mb-4">
                                {plan.features.slice(0, 3).map((feature) => (
                                    <li key={feature.id} className="text-sm text-gray-600 flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">✓</span>
                                        <span>{feature.feature}</span>
                                    </li>
                                ))}
                                {plan.features.length > 3 && (
                                    <li className="text-sm text-gray-500 italic">
                                        +{plan.features.length - 3} more...
                                    </li>
                                )}
                            </ul>
                            <Link
                                href={`/admin/pricing/${plan.id}`}
                                className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                <Plus size={16} /> Manage Features
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {pricingPlans.length === 0 && !showForm && (
                <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100">
                    <p className="text-gray-500 text-lg mb-4">No pricing plans yet</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        <Plus size={20} />
                        Create Your First Plan
                    </button>
                </div>
            )}
        </div>
    );
}

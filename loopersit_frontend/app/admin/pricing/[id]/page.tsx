'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2, GripVertical } from 'lucide-react';

interface Feature {
    id: number;
    feature: string;
    order: number;
}

interface Pricing {
    id: number;
    name: string;
    priceRange: string;
    order: number;
    features: Feature[];
}

export default function EditPricingPage() {
    const params = useParams();
    const router = useRouter();
    const [pricing, setPricing] = useState<Pricing | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        priceRange: '',
        order: 1,
    });
    const [newFeature, setNewFeature] = useState('');

    useEffect(() => {
        fetchPricing();
    }, [params.id]);

    const fetchPricing = async () => {
        try {
            const res = await fetch(`/api/pricing/${params.id}`);
            if (!res.ok) {
                router.push('/admin/pricing');
                return;
            }
            const data = await res.json();
            setPricing(data);
            setFormData({
                name: data.name,
                priceRange: data.priceRange,
                order: data.order,
            });
        } catch (error) {
            console.error('Error fetching pricing:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`/api/pricing/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push('/admin/pricing');
            } else {
                alert('Failed to save pricing plan');
            }
        } catch (error) {
            console.error('Error saving pricing:', error);
            alert('Failed to save pricing plan');
        } finally {
            setSaving(false);
        }
    };

    const handleAddFeature = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newFeature.trim()) return;

        try {
            const res = await fetch(`/api/pricing/${params.id}/features`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ feature: newFeature }),
            });

            if (res.ok) {
                setNewFeature('');
                fetchPricing();
            } else {
                alert('Failed to add feature');
            }
        } catch (error) {
            console.error('Error adding feature:', error);
            alert('Failed to add feature');
        }
    };

    const handleDeleteFeature = async (featureId: number) => {
        if (!confirm('Delete this feature?')) return;

        try {
            const res = await fetch(`/api/pricing/${params.id}/features?featureId=${featureId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                fetchPricing();
            } else {
                alert('Failed to delete feature');
            }
        } catch (error) {
            console.error('Error deleting feature:', error);
            alert('Failed to delete feature');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!pricing) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Pricing plan not found</p>
                <Link href="/admin/pricing" className="text-indigo-600 hover:underline mt-4 inline-block">
                    Back to Pricing
                </Link>
            </div>
        );
    }

    return (
        <div>
            <Link href="/admin/pricing" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6">
                <ArrowLeft size={20} />
                Back to Pricing Plans
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Plan Details */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Plan Details</h2>
                    <form onSubmit={handleSave} className="space-y-4">
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                            <input
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                min="1"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                </div>

                {/* Features Management */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Features ({pricing.features.length})</h2>

                    {/* Add Feature Form */}
                    <form onSubmit={handleAddFeature} className="flex gap-2 mb-6">
                        <input
                            type="text"
                            value={newFeature}
                            onChange={(e) => setNewFeature(e.target.value)}
                            placeholder="Add a new feature..."
                            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            <Plus size={20} />
                        </button>
                    </form>

                    {/* Features List */}
                    <div className="space-y-2">
                        {pricing.features.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">No features added yet</p>
                        ) : (
                            pricing.features.map((feature) => (
                                <div
                                    key={feature.id}
                                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group"
                                >
                                    <GripVertical size={18} className="text-gray-400" />
                                    <span className="flex-1 text-gray-700">{feature.feature}</span>
                                    <button
                                        onClick={() => handleDeleteFeature(feature.id)}
                                        className="p-2 text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

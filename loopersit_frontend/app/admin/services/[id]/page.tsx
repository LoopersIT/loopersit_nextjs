'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ImageUploader from '@/components/admin/ImageUploader';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface ServiceOffer {
    id?: number;
    offer: string;
    order: number;
}

interface SubService {
    id?: number;
    name: string;
    slug: string;
    description: string;
    order: number;
}

interface Service {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string | null;
    homeIcon: string | null;
    order: number;
    offers: ServiceOffer[];
    subservices: SubService[];
}

export default function EditServicePage() {
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState<{
        name: string;
        description: string;
        image: string;
        homeIcon: string;
        order: number | string;
    }>({
        name: '',
        description: '',
        image: '',
        homeIcon: '',
        order: 1,
    });
    const [offers, setOffers] = useState<ServiceOffer[]>([]);
    const [subservices, setSubservices] = useState<SubService[]>([]);
    const [newOffer, setNewOffer] = useState('');
    const [newSubservice, setNewSubservice] = useState({ name: '', description: '' });

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await fetch(`/api/services/${params.id}`);
                if (response.ok) {
                    const service: Service = await response.json();
                    setFormData({
                        name: service.name,
                        description: service.description,
                        image: service.image || '',
                        homeIcon: service.homeIcon || '',
                        order: service.order,
                    });
                    setOffers(service.offers || []);
                    setSubservices(service.subservices || []);
                } else {
                    alert('Service not found');
                    router.push('/admin/services');
                }
            } catch (error) {
                console.error('Error fetching service:', error);
                alert('Failed to fetch service');
                router.push('/admin/services');
            } finally {
                setFetching(false);
            }
        };
        fetchService();
    }, [params.id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`/api/services/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push('/admin/services');
            } else {
                alert('Failed to update service');
            }
        } catch (error) {
            console.error('Error updating service:', error);
            alert('Failed to update service');
        } finally {
            setLoading(false);
        }
    };

    const addOffer = async () => {
        if (!newOffer.trim()) return;
        try {
            const response = await fetch(`/api/services/${params.id}/offers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ offer: newOffer, order: offers.length + 1 }),
            });
            if (response.ok) {
                const offer = await response.json();
                setOffers([...offers, offer]);
                setNewOffer('');
            }
        } catch (error) {
            console.error('Error adding offer:', error);
        }
    };

    const removeOffer = async (offerId: number) => {
        try {
            const response = await fetch(`/api/services/${params.id}/offers?offerId=${offerId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setOffers(offers.filter(o => o.id !== offerId));
            }
        } catch (error) {
            console.error('Error removing offer:', error);
        }
    };

    const addSubservice = async () => {
        if (!newSubservice.name.trim()) return;
        try {
            const slug = newSubservice.name.toLowerCase().replace(/\s+/g, '-');
            const response = await fetch(`/api/services/${params.id}/subservices`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newSubservice, slug, order: subservices.length + 1 }),
            });
            if (response.ok) {
                const sub = await response.json();
                setSubservices([...subservices, sub]);
                setNewSubservice({ name: '', description: '' });
            }
        } catch (error) {
            console.error('Error adding subservice:', error);
        }
    };

    const removeSubservice = async (subId: number) => {
        try {
            const response = await fetch(`/api/services/${params.id}/subservices?subserviceId=${subId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setSubservices(subservices.filter(s => s.id !== subId));
            }
        } catch (error) {
            console.error('Error removing subservice:', error);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div>
            <Link
                href="/admin/services"
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6"
            >
                <ArrowLeft size={20} />
                Back to Services
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Service</h1>
                <p className="text-gray-600">Update service details, offers, and subservices</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Main Form */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Service Details</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Service Name *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="e.g., Web Development"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Describe your service..."
                            />
                        </div>

                        <ImageUploader
                            label="Service Image"
                            value={formData.image}
                            onChange={(url) => setFormData({ ...formData, image: url })}
                        />

                        <ImageUploader
                            label="Home Icon"
                            value={formData.homeIcon}
                            onChange={(url) => setFormData({ ...formData, homeIcon: url })}
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Display Order
                            </label>
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
                                min="1"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                </div>

                {/* Offers & Subservices */}
                <div className="space-y-8">
                    {/* Offers */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Service Offers</h2>

                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={newOffer}
                                onChange={(e) => setNewOffer(e.target.value)}
                                placeholder="Add new offer..."
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                onClick={addOffer}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                            >
                                <Plus size={20} />
                            </button>
                        </div>

                        <ul className="space-y-2">
                            {offers.map((offer) => (
                                <li key={offer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-700">{offer.offer}</span>
                                    <button
                                        onClick={() => offer.id && removeOffer(offer.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </li>
                            ))}
                            {offers.length === 0 && (
                                <li className="text-gray-400 text-center py-4">No offers yet</li>
                            )}
                        </ul>
                    </div>

                    {/* Subservices */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Subservices</h2>

                        <div className="space-y-2 mb-4">
                            <input
                                type="text"
                                value={newSubservice.name}
                                onChange={(e) => setNewSubservice({ ...newSubservice, name: e.target.value })}
                                placeholder="Subservice name..."
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            <textarea
                                value={newSubservice.description}
                                onChange={(e) => setNewSubservice({ ...newSubservice, description: e.target.value })}
                                placeholder="Description..."
                                rows={2}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                onClick={addSubservice}
                                className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                            >
                                Add Subservice
                            </button>
                        </div>

                        <ul className="space-y-2">
                            {subservices.map((sub) => (
                                <li key={sub.id} className="p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="font-medium text-gray-800">{sub.name}</h4>
                                            <p className="text-sm text-gray-500">{sub.description}</p>
                                        </div>
                                        <button
                                            onClick={() => sub.id && removeSubservice(sub.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </li>
                            ))}
                            {subservices.length === 0 && (
                                <li className="text-gray-400 text-center py-4">No subservices yet</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

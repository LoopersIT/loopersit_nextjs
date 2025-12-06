'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface Service {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string | null;
    order: number;
    offers: any[];
    subservices: any[];
}

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch('/api/services');
            const data = await response.json();
            setServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        try {
            const response = await fetch(`/api/services/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchServices();
            } else {
                alert('Failed to delete service');
            }
        } catch (error) {
            console.error('Error deleting service:', error);
            alert('Failed to delete service');
        }
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
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Services</h1>
                    <p className="text-gray-600">Manage your services and offerings</p>
                </div>
                <Link
                    href="/admin/services/new"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
                >
                    <Plus size={20} />
                    Add Service
                </Link>
            </div>

            {services.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100">
                    <p className="text-gray-500 text-lg mb-4">No services yet</p>
                    <Link
                        href="/admin/services/new"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        <Plus size={20} />
                        Create Your First Service
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden"
                        >
                            {service.image && (
                                <div className="relative h-48 bg-gray-100">
                                    <Image
                                        src={service.image}
                                        alt={service.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

                                <div className="flex gap-2 text-sm text-gray-500 mb-4">
                                    <span>{service.offers.length} offers</span>
                                    <span>•</span>
                                    <span>{service.subservices.length} subservices</span>
                                </div>

                                <div className="flex gap-2">
                                    <Link
                                        href={`/admin/services/${service.id}`}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                                    >
                                        <Edit size={16} />
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(service.id)}
                                        className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

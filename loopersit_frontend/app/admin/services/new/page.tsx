'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/admin/ImageUploader';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewServicePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push('/admin/services');
            } else {
                const data = await response.json().catch(() => ({}));
                const errorMsg = data.error || 'Failed to create service';
                alert(errorMsg + (response.status === 401 ? '. Please log in again.' : ''));
            }
        } catch (error) {
            console.error('Error creating service:', error);
            alert('Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

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
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Service</h1>
                <p className="text-gray-600">Create a new service offering</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 max-w-3xl">
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

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Service'}
                        </button>
                        <Link
                            href="/admin/services"
                            className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

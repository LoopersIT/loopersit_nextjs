'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Briefcase, MessageSquare, FileText, DollarSign, Plus } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        services: 0,
        reviews: 0,
        pages: 0,
        pricing: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [services, reviews, pages, pricing] = await Promise.all([
                    fetch('/api/services').then((r) => r.json()),
                    fetch('/api/reviews').then((r) => r.json()),
                    fetch('/api/pages').then((r) => r.json()),
                    fetch('/api/pricing').then((r) => r.json()),
                ]);

                setStats({
                    services: services.length || 0,
                    reviews: reviews.length || 0,
                    pages: pages.length || 0,
                    pricing: pricing.length || 0,
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const cards = [
        {
            title: 'Services',
            count: stats.services,
            icon: Briefcase,
            href: '/admin/services',
            color: 'from-blue-500 to-blue-600',
        },
        {
            title: 'Reviews',
            count: stats.reviews,
            icon: MessageSquare,
            href: '/admin/reviews',
            color: 'from-green-500 to-green-600',
        },
        {
            title: 'Pages',
            count: stats.pages,
            icon: FileText,
            href: '/admin/pages',
            color: 'from-purple-500 to-purple-600',
        },
        {
            title: 'Pricing Plans',
            count: stats.pricing,
            icon: DollarSign,
            href: '/admin/pricing',
            color: 'from-orange-500 to-orange-600',
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
                <p className="text-gray-600">Welcome to your admin panel</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <Link
                            key={card.href}
                            href={card.href}
                            className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color}`}>
                                    <Icon className="text-white" size={24} />
                                </div>
                                <Plus className="text-gray-400 group-hover:text-gray-600 transition-colors" size={20} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-1">{card.title}</h3>
                            <p className="text-3xl font-bold text-gray-900">{card.count}</p>
                        </Link>
                    );
                })}
            </div>

            <div className="mt-8 bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link
                        href="/admin/services"
                        className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                        <Plus size={20} className="text-blue-600" />
                        <span className="font-medium text-blue-900">Add Service</span>
                    </Link>
                    <Link
                        href="/admin/reviews"
                        className="flex items-center gap-3 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
                    >
                        <Plus size={20} className="text-green-600" />
                        <span className="font-medium text-green-900">Add Review</span>
                    </Link>
                    <Link
                        href="/admin/pages"
                        className="flex items-center gap-3 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
                    >
                        <Plus size={20} className="text-purple-600" />
                        <span className="font-medium text-purple-900">Add Page</span>
                    </Link>
                    <Link
                        href="/admin/pricing"
                        className="flex items-center gap-3 p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors"
                    >
                        <Plus size={20} className="text-orange-600" />
                        <span className="font-medium text-orange-900">Add Pricing</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

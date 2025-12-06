'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';

interface Page {
    id: number;
    title: string;
    slug: string;
    linkOnFooter: boolean;
    content: string;
}

export default function PagesManagementPage() {
    const [pages, setPages] = useState<Page[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            const response = await fetch('/api/pages');
            const data = await response.json();
            setPages(data);
        } catch (error) {
            console.error('Error fetching pages:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this page?')) return;

        try {
            const response = await fetch(`/api/pages/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchPages();
            } else {
                alert('Failed to delete page');
            }
        } catch (error) {
            console.error('Error deleting page:', error);
            alert('Failed to delete page');
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
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Pages</h1>
                    <p className="text-gray-600">Manage content pages</p>
                </div>
                <Link
                    href="/admin/pages/new"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
                >
                    <Plus size={20} />
                    Add Page
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-100">
                {pages.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-gray-500 text-lg mb-4">No pages yet</p>
                        <Link
                            href="/admin/pages/new"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            <Plus size={20} />
                            Create Your First Page
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {pages.map((page) => (
                            <div key={page.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-bold text-gray-800">{page.title}</h3>
                                            {page.linkOnFooter && (
                                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                                                    In Footer
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500 mb-2">/{page.slug}</p>
                                        <div
                                            className="text-gray-700 text-sm line-clamp-2"
                                            dangerouslySetInnerHTML={{ __html: page.content }}
                                        />
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <Link
                                            href={`/admin/pages/${page.id}`}
                                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                        >
                                            <Edit size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(page.id)}
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

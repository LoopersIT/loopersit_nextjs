'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Page {
    id: number;
    title: string;
    slug: string;
    content: string;
    linkOnFooter: boolean;
}

export default function EditPagePage() {
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        linkOnFooter: false,
    });

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const response = await fetch(`/api/pages/${params.id}`);
                if (response.ok) {
                    const page: Page = await response.json();
                    setFormData({
                        title: page.title,
                        content: page.content,
                        linkOnFooter: page.linkOnFooter,
                    });
                } else {
                    alert('Page not found');
                    router.push('/admin/pages');
                }
            } catch (error) {
                console.error('Error fetching page:', error);
                alert('Failed to fetch page');
                router.push('/admin/pages');
            } finally {
                setFetching(false);
            }
        };
        fetchPage();
    }, [params.id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`/api/pages/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push('/admin/pages');
            } else {
                alert('Failed to update page');
            }
        } catch (error) {
            console.error('Error updating page:', error);
            alert('Failed to update page');
        } finally {
            setLoading(false);
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
                href="/admin/pages"
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6"
            >
                <ArrowLeft size={20} />
                Back to Pages
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Page</h1>
                <p className="text-gray-600">Update your content page</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 max-w-5xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Page Title *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            maxLength={50}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="e.g., Privacy Policy"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content *
                        </label>
                        <RichTextEditor
                            value={formData.content}
                            onChange={(content) => setFormData({ ...formData, content })}
                            placeholder="Write your page content here..."
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="linkOnFooter"
                            checked={formData.linkOnFooter}
                            onChange={(e) => setFormData({ ...formData, linkOnFooter: e.target.checked })}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="linkOnFooter" className="text-sm font-medium text-gray-700">
                            Show link in website footer
                        </label>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <Link
                            href="/admin/pages"
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

'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    // Don't apply auth check for login page
    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        if (!isLoginPage && status === 'unauthenticated') {
            router.push('/admin/login');
        }
    }, [status, router, isLoginPage]);

    // Login page - render without sidebar
    if (isLoginPage) {
        return children;
    }

    // Protected pages - show loading state
    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    // Protected pages - require authentication
    if (!session) {
        return null;
    }

    // Protected pages - render with sidebar
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                <AdminSidebar />
                <main className="flex-1 ml-64">
                    <div className="p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

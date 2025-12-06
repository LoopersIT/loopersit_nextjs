'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
    LayoutDashboard,
    Settings,
    FileText,
    MessageSquare,
    Briefcase,
    DollarSign,
    LogOut,
    HelpCircle,
    Users,
    Folder,
    BarChart3,
} from 'lucide-react';

const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Services', href: '/admin/services', icon: Briefcase },
    { name: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
    { name: 'Pages', href: '/admin/pages', icon: FileText },
    { name: 'Pricing', href: '/admin/pricing', icon: DollarSign },
    { name: 'FAQ', href: '/admin/faqs', icon: HelpCircle },
    { name: 'Team', href: '/admin/members', icon: Users },
    { name: 'Portfolio', href: '/admin/portfolio', icon: Folder },
    { name: 'Statistics', href: '/admin/project-summary', icon: BarChart3 },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push('/admin/login');
    };

    return (
        <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-indigo-900 to-purple-900 text-white shadow-2xl">
            <div className="p-6 border-b border-white/10">
                <h1 className="text-2xl font-bold">LoopersIT</h1>
                <p className="text-sm text-indigo-200 mt-1">Admin Panel</p>
            </div>

            <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                ? 'bg-white/20 text-white shadow-lg'
                                : 'text-indigo-100 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-indigo-100 hover:bg-white/10 hover:text-white transition-all"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </div>
    );
}

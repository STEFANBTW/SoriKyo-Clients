'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Calendar,
    Scissors,
    Users,
    Heart,
    Package,
    BarChart3,
    Settings,
    LogOut
} from 'lucide-react';

// Navigation items
const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Bookings', href: '/admin/bookings', icon: Calendar },
    { label: 'Services', href: '/admin/services', icon: Scissors },
    { label: 'Staff', href: '/admin/staff', icon: Users },
    { label: 'Clients', href: '/admin/customers', icon: Heart },
    { label: 'Inventory', href: '/admin/inventory', icon: Package },
    { label: 'Reports', href: '/admin/reports', icon: BarChart3 },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === '/admin') {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-800 text-slate-300 z-50 flex flex-col">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <span className="text-xl font-bold text-white tracking-tight">
                    PRG <span className="text-purple-500">Admin</span>
                </span>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {navItems.map((item) => {
                    const active = isActive(item.href);
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${active
                                    ? 'bg-purple-600/10 text-purple-400'
                                    : 'hover:bg-slate-800 hover:text-slate-100'
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${active ? 'text-purple-500' : 'text-slate-500 group-hover:text-slate-400'}`} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* User */}
            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-slate-900">
                        A
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-200 truncate group-hover:text-white">Admin User</p>
                        <p className="text-xs text-slate-500 truncate">admin@prg.com</p>
                    </div>
                    <LogOut className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
                </div>
            </div>
        </aside>
    );
}


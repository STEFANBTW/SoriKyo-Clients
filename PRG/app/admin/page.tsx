import { Metadata } from 'next';
import Link from 'next/link';
import {
    Calendar,
    Users,
    DollarSign,
    Star,
    Plus,
    Scissors,
    Megaphone,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal,
    Clock
} from 'lucide-react';

/**
 * PRG Admin Dashboard - Main Page
 * Customized for Purple Rain Galore Salon & Spa
 */

export const metadata: Metadata = {
    title: 'Admin Dashboard | Purple Rain Galore',
    description: 'Manage your salon and spa operations',
};

// Quick stats cards
const stats = [
    { label: "Today's Bookings", value: 12, change: '+3', positive: true, icon: Calendar },
    { label: 'Active Clients', value: 847, change: '+15%', positive: true, icon: Users },
    { label: 'Revenue (MTD)', value: '₦2.4M', change: '+22%', positive: true, icon: DollarSign },
    { label: 'Service Rating', value: '4.9', change: '+0.1', positive: true, icon: Star },
];

// Quick actions
const quickActions = [
    { label: 'New Booking', href: '/admin/bookings/new', icon: Plus, color: 'text-purple-600' },
    { label: 'Add Service', href: '/admin/services/new', icon: Scissors, color: 'text-pink-600' },
    { label: 'View Schedule', href: '/admin/schedule', icon: Calendar, color: 'text-blue-600' },
    { label: 'Send Promo', href: '/admin/marketing', icon: Megaphone, color: 'text-amber-600' },
];

export default function AdminDashboard() {
    return (
        <>
            {/* Header */}
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                        Dashboard
                    </h2>
                    <p className="text-slate-500 mt-1">Overview of your salon performance today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white text-slate-700 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium">
                        Export Report
                    </button>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm text-sm font-medium">
                        View Analytics
                    </button>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.label}
                            className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-slate-50 rounded-lg">
                                    <Icon className="w-5 h-5 text-slate-600" />
                                </div>
                                <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${stat.positive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                                    }`}>
                                    {stat.positive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900 mb-1 tracking-tight">{stat.value}</p>
                            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickActions.map((action) => {
                        const Icon = action.icon;
                        return (
                            <Link
                                key={action.href}
                                href={action.href}
                                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 group flex items-center gap-3"
                            >
                                <div className={`p-2 rounded-lg bg-slate-50 group-hover:bg-purple-50 transition-colors`}>
                                    <Icon className={`w-5 h-5 ${action.color}`} />
                                </div>
                                <span className="font-semibold text-slate-700 group-hover:text-purple-700 transition-colors">{action.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Today's Schedule Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Bookings */}
                <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-900">Upcoming Bookings</h3>
                        <Link href="/admin/bookings" className="text-sm font-medium text-slate-500 hover:text-purple-600 transition-colors">
                            View all
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {[
                            { time: '2:00 PM', client: 'Amara Johnson', service: 'Royal Silk Press', stylist: 'Nneka' },
                            { time: '2:30 PM', client: 'Chidi Okonkwo', service: 'Classic Fade', stylist: 'Emeka' },
                            { time: '3:00 PM', client: 'Fatima Bello', service: 'Gel Manicure', stylist: 'Blessing' },
                        ].map((booking, i) => (
                            <div key={i} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center text-slate-500 text-sm font-medium">
                                        <Clock className="w-4 h-4 mr-1.5 text-slate-400" />
                                        {booking.time}
                                    </div>
                                    <div>
                                        <p className="text-slate-900 font-semibold">{booking.client}</p>
                                        <p className="text-xs text-slate-500">{booking.service}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                                    {booking.stylist}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Staff On Duty */}
                <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-900">Staff On Duty</h3>
                        <Link href="/admin/staff" className="text-sm font-medium text-slate-500 hover:text-purple-600 transition-colors">
                            Manage
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {[
                            { name: 'Nneka Adeyemi', role: 'Lead Stylist', status: 'busy', appointments: 5 },
                            { name: 'Emeka Obi', role: 'Barber', status: 'available', appointments: 3 },
                            { name: 'Blessing Uche', role: 'Nail Tech', status: 'available', appointments: 4 },
                        ].map((staff, i) => (
                            <div key={i} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200">
                                        {staff.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-slate-900 font-semibold">{staff.name}</p>
                                        <p className="text-xs text-slate-500">{staff.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${staff.status === 'available' ? 'bg-emerald-500' : 'bg-amber-500'
                                        }`} />
                                    <span className="text-sm font-medium text-slate-500 capitalize">{staff.status}</span>
                                    <button className="ml-4 p-1 text-slate-400 hover:text-slate-600">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

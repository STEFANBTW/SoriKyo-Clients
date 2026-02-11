import { Metadata } from 'next';
import Link from 'next/link';

/**
 * Bookings Management Page
 * View and manage appointments
 */
export const metadata: Metadata = {
    title: 'Bookings | PRG Admin',
};

// Placeholder bookings data
const bookings = [
    {
        id: 'BK001',
        client: 'Amara Johnson',
        email: 'amara@test.com',
        service: 'Royal Silk Press',
        stylist: 'Nneka Adeyemi',
        date: '2026-02-09',
        time: '14:00',
        status: 'confirmed',
        amount: 12000,
    },
    {
        id: 'BK002',
        client: 'Chidi Okonkwo',
        email: 'chidi@test.com',
        service: 'Classic Fade',
        stylist: 'Emeka Obi',
        date: '2026-02-09',
        time: '14:30',
        status: 'pending',
        amount: 5000,
    },
    {
        id: 'BK003',
        client: 'Fatima Bello',
        email: 'fatima@test.com',
        service: 'Gel Art Manicure',
        stylist: 'Blessing Uche',
        date: '2026-02-09',
        time: '15:00',
        status: 'confirmed',
        amount: 8000,
    },
    {
        id: 'BK004',
        client: 'Kemi Williams',
        email: 'kemi@test.com',
        service: 'Deep Tissue Massage',
        stylist: 'Ngozi',
        date: '2026-02-09',
        time: '16:00',
        status: 'completed',
        amount: 25000,
    },
    {
        id: 'BK005',
        client: 'Tolu Adebayo',
        email: 'tolu@test.com',
        service: 'Signature Balayage',
        stylist: 'Nneka Adeyemi',
        date: '2026-02-10',
        time: '10:00',
        status: 'confirmed',
        amount: 45000,
    },
];

const statusColors: Record<string, string> = {
    confirmed: 'bg-emerald-100 text-emerald-700 .dark:bg-emerald-500/20 .dark:text-emerald-400 border-emerald-200 .dark:border-emerald-500/30',
    pending: 'bg-amber-100 text-amber-700 .dark:bg-amber-500/20 .dark:text-amber-400 border-amber-200 .dark:border-amber-500/30',
    completed: 'bg-blue-100 text-blue-700 .dark:bg-blue-500/20 .dark:text-blue-400 border-blue-200 .dark:border-blue-500/30',
    cancelled: 'bg-red-100 text-red-700 .dark:bg-red-500/20 .dark:text-red-400 border-red-200 .dark:border-red-500/30',
};

export default function BookingsPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 .dark:text-white tracking-tight">Bookings</h1>
                    <p className="text-slate-500 .dark:text-gray-400 mt-1">Manage appointments and schedules</p>
                </div>
                <Link
                    href="/admin/bookings/new"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02]"
                >
                    + New Booking
                </Link>
            </div>

            {/* Date Navigation */}
            <div className="flex items-center gap-4 bg-white .dark:bg-white/5 p-4 rounded-xl border border-slate-200 .dark:border-white/10 shadow-sm">
                <button className="p-2 rounded-lg text-slate-500 .dark:text-white/60 hover:bg-slate-100 .dark:hover:bg-white/10 transition-colors">
                    ←
                </button>
                <div className="flex-1 text-center">
                    <h2 className="text-lg font-bold text-slate-900 .dark:text-white">Sunday, February 9, 2026</h2>
                    <p className="text-sm font-medium text-slate-500 .dark:text-gray-400">5 appointments today</p>
                </div>
                <button className="p-2 rounded-lg text-slate-500 .dark:text-white/60 hover:bg-slate-100 .dark:hover:bg-white/10 transition-colors">
                    →
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map((filter) => (
                    <button
                        key={filter}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${filter === 'All'
                            ? 'bg-purple-100 text-purple-700 .dark:bg-white/10 .dark:text-white'
                            : 'text-slate-600 .dark:text-white/60 hover:bg-slate-100 .dark:hover:bg-white/5 hover:text-slate-900 .dark:hover:text-white'
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Bookings Table */}
            <div className="rounded-2xl bg-white .dark:bg-white/5 backdrop-blur-xl border border-slate-200 .dark:border-white/10 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200 .dark:border-white/10 bg-slate-50/50 .dark:bg-white/5">
                                <th className="text-left p-5 text-xs font-bold uppercase tracking-wider text-slate-500 .dark:text-gray-400">ID</th>
                                <th className="text-left p-5 text-xs font-bold uppercase tracking-wider text-slate-500 .dark:text-gray-400">Client</th>
                                <th className="text-left p-5 text-xs font-bold uppercase tracking-wider text-slate-500 .dark:text-gray-400">Service</th>
                                <th className="text-left p-5 text-xs font-bold uppercase tracking-wider text-slate-500 .dark:text-gray-400">Stylist</th>
                                <th className="text-left p-5 text-xs font-bold uppercase tracking-wider text-slate-500 .dark:text-gray-400">Time</th>
                                <th className="text-left p-5 text-xs font-bold uppercase tracking-wider text-slate-500 .dark:text-gray-400">Amount</th>
                                <th className="text-left p-5 text-xs font-bold uppercase tracking-wider text-slate-500 .dark:text-gray-400">Status</th>
                                <th className="text-right p-5 text-xs font-bold uppercase tracking-wider text-slate-500 .dark:text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 .dark:divide-white/5">
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="group hover:bg-slate-50 .dark:hover:bg-white/5 transition-colors">
                                    <td className="p-5">
                                        <span className="text-slate-500 .dark:text-gray-400 text-sm font-mono">{booking.id}</span>
                                    </td>
                                    <td className="p-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 .dark:bg-white/10 flex items-center justify-center text-xs font-bold text-slate-600 .dark:text-white">
                                                {booking.client.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-slate-900 .dark:text-white font-semibold text-sm">{booking.client}</p>
                                                <p className="text-xs text-slate-400 .dark:text-gray-500">{booking.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5 text-slate-700 .dark:text-gray-300 font-medium text-sm">{booking.service}</td>
                                    <td className="p-5 text-slate-500 .dark:text-gray-400 text-sm">{booking.stylist}</td>
                                    <td className="p-5">
                                        <p className="text-slate-900 .dark:text-white font-bold text-sm">{booking.time}</p>
                                        <p className="text-xs text-slate-500 .dark:text-gray-500">{booking.date}</p>
                                    </td>
                                    <td className="p-5 text-slate-700 .dark:text-gray-300 font-medium text-sm">₦{booking.amount.toLocaleString()}</td>
                                    <td className="p-5">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusColors[booking.status]}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="p-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50 .dark:hover:bg-purple-900/20 transition-colors" title="View Details">
                                                Details
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 .dark:border-white/10">
                <p className="text-sm text-slate-500 .dark:text-gray-400">Showing 5 of 127 bookings</p>
                <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 .dark:text-gray-400 hover:bg-slate-100 .dark:hover:bg-white/5 transition-colors disabled:opacity-50">
                        Previous
                    </button>
                    <button className="px-4 py-2 rounded-lg text-sm font-bold bg-purple-600 text-white shadow-md shadow-purple-500/20">1</button>
                    <button className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 .dark:text-gray-400 hover:bg-slate-100 .dark:hover:bg-white/5 transition-colors">
                        2
                    </button>
                    <button className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 .dark:text-gray-400 hover:bg-slate-100 .dark:hover:bg-white/5 transition-colors">
                        3
                    </button>
                    <button className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 .dark:text-gray-400 hover:bg-slate-100 .dark:hover:bg-white/5 transition-colors">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

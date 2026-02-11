import { Metadata } from 'next';
import Link from 'next/link';

/**
 * Services Management Page
 * CRUD for salon services
 */

export const metadata: Metadata = {
    title: 'Services | PRG Admin',
};

// Placeholder services - will be replaced with Supabase data
const services = [
    { id: 'hair-royal-silk', name: 'Royal Silk Press', category: 'Hair', price: 12000, duration: 90, active: true },
    { id: 'hair-balayage', name: 'Signature Balayage', category: 'Hair', price: 45000, duration: 180, active: true },
    { id: 'hair-braids', name: 'Goddess Locs', category: 'Hair', price: 35000, duration: 240, active: true },
    { id: 'spa-massage', name: 'Deep Tissue Massage', category: 'Spa', price: 25000, duration: 60, active: true },
    { id: 'spa-facial', name: 'Hydra Glow Facial', category: 'Spa', price: 35000, duration: 75, active: true },
    { id: 'nails-gel', name: 'Gel Art Manicure', category: 'Nails', price: 8000, duration: 45, active: true },
    { id: 'nails-pedi', name: 'Luxury Pedicure', category: 'Nails', price: 6000, duration: 45, active: true },
    { id: 'aesthetics-lash', name: 'Classic Lash Extensions', category: 'Aesthetics', price: 20000, duration: 90, active: false },
];

const categoryColors: Record<string, string> = {
    Hair: 'bg-purple-100 text-purple-700 .dark:bg-purple-500/20 .dark:text-purple-300 border-purple-200 .dark:border-purple-500/30',
    Spa: 'bg-teal-100 text-teal-700 .dark:bg-teal-500/20 .dark:text-teal-300 border-teal-200 .dark:border-teal-500/30',
    Nails: 'bg-rose-100 text-rose-700 .dark:bg-rose-500/20 .dark:text-rose-300 border-rose-200 .dark:border-rose-500/30',
    Aesthetics: 'bg-blue-100 text-blue-700 .dark:bg-blue-500/20 .dark:text-blue-300 border-blue-200 .dark:border-blue-500/30',
};

export default function ServicesPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 .dark:text-white tracking-tight">Services</h1>
                    <p className="text-slate-500 .dark:text-gray-400 mt-1">Manage your service offerings</p>
                </div>
                <Link
                    href="/admin/services/new"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02]"
                >
                    + Add Service
                </Link>
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {['All', 'Hair', 'Spa', 'Nails', 'Aesthetics'].map((filter) => (
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

            {/* Services Table */}
            <div className="rounded-2xl bg-white .dark:bg-white/5 backdrop-blur-xl border border-slate-200 .dark:border-white/10 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200 .dark:border-white/10 bg-slate-50/50 .dark:bg-white/5">
                                <th className="text-left p-5 text-xs font-bold uppercase tracking-wider text-slate-500 .dark:text-gray-400">Service</th>
                                <th className="text-left p-5 text-xs font-bold uppercase tracking-wider text-slate-500 .dark:text-gray-400">Category</th>
                                <th className="text-left p-5 text-xs font-bold uppercase tracking-wider text-slate-500 .dark:text-gray-400">Price</th>
                                <th className="text-left p-5 text-xs font-bold uppercase tracking-wider text-slate-500 .dark:text-gray-400">Duration</th>
                                <th className="text-left p-5 text-xs font-bold uppercase tracking-wider text-slate-500 .dark:text-gray-400">Status</th>
                                <th className="text-right p-5 text-xs font-bold uppercase tracking-wider text-slate-500 .dark:text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 .dark:divide-white/5">
                            {services.map((service) => (
                                <tr key={service.id} className="group hover:bg-slate-50 .dark:hover:bg-white/5 transition-colors">
                                    <td className="p-5">
                                        <div className="font-semibold text-slate-900 .dark:text-white text-sm">{service.name}</div>
                                        <div className="text-xs text-slate-400 .dark:text-gray-500 font-mono mt-0.5">{service.id}</div>
                                    </td>
                                    <td className="p-5">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${categoryColors[service.category]}`}>
                                            {service.category}
                                        </span>
                                    </td>
                                    <td className="p-5 text-slate-700 .dark:text-gray-300 font-medium text-sm">₦{service.price.toLocaleString()}</td>
                                    <td className="p-5 text-slate-500 .dark:text-gray-400 text-sm">{service.duration} min</td>
                                    <td className="p-5">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${service.active
                                            ? 'bg-emerald-100 text-emerald-700 .dark:bg-emerald-500/20 .dark:text-emerald-400 border border-emerald-200 .dark:border-emerald-500/30'
                                            : 'bg-slate-100 text-slate-600 .dark:bg-slate-700/50 .dark:text-slate-400 border border-slate-200 .dark:border-slate-600'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${service.active ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                                            {service.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="p-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50 .dark:hover:bg-purple-900/20 transition-colors" title="Edit Service">
                                                Edit
                                            </button>
                                            <button className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 .dark:hover:bg-red-900/20 transition-colors" title="Delete Service">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

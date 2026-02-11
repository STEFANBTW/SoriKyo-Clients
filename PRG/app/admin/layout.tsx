import { Metadata } from 'next';
import AdminSidebar from './components/AdminSidebar';

/**
 * Admin Layout
 * Wraps all admin pages with consistent styling and sidebar
 */

export const metadata: Metadata = {
    title: {
        template: '%s | PRG Admin',
        default: 'Admin Dashboard | Purple Rain Galore',
    },
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-8 relative z-10 min-h-screen animate-fade-in">
                <div className="max-w-7xl mx-auto space-y-6">
                    {children}
                </div>
            </main>
        </div>
    );
}

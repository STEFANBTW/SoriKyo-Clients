"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { schemaRegistry } from '@/app/admin/lib/schema';

export default function StudioLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex h-screen bg-gray-900 text-gray-400 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/5 flex flex-col">
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
                            <span className="text-gray-900 text-sm">📦</span>
                        </div>
                        <span className="text-white font-bold tracking-wider text-sm">PRG STUDIO</span>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-8 mt-4">
                    {/* Main Tools */}
                    <div>
                        <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4 pl-2">Tools</h3>
                        <ul className="space-y-1">
                            <NavItem href="/admin/app/studio" icon="🏠" label="Desk" active={pathname === '/admin/app/studio'} />
                            <NavItem href="/admin/app/studio/vision" icon="📊" label="Vision" active={pathname?.includes('/studio/vision')} />
                        </ul>
                    </div>

                    {/* Document Types */}
                    <div>
                        <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4 pl-2">Content</h3>
                        <ul className="space-y-1">
                            {schemaRegistry.map((type) => (
                                <NavItem
                                    key={type.name}
                                    href={`/admin/app/studio/desk/${type.name}`}
                                    icon="📄"
                                    label={type.title}
                                    active={pathname?.includes(`/studio/desk/${type.name}`)}
                                />
                            ))}
                        </ul>
                    </div>

                    {/* System */}
                    <div>
                        <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4 pl-2">System</h3>
                        <ul className="space-y-1">
                            <NavItem href="/admin/app/studio/users" icon="👥" label="Users" active={pathname === '/admin/app/studio/users'} />
                            <NavItem href="/admin/app/studio/settings" icon="⚙️" label="Settings" active={pathname === '/admin/app/studio/settings'} />
                        </ul>
                    </div>
                </nav>

                {/* Footer info */}
                <div className="p-4 border-t border-white/5 text-[10px] text-white/20 font-mono">
                    V1.0.0-BETA // PRG-STABLE
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/20 backdrop-blur-lg">
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-cyan-500/50 tracking-tighter">PROJECT / PRG-STUDIO</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold">
                            + NEW DOCUMENT
                        </button>
                    </div>
                </header>

                <section className="flex-1 overflow-y-auto p-8">
                    {children}
                </section>
            </main>
        </div>
    );
}

function NavItem({ href, icon, label, active }: { href: string, icon: string, label: string, active?: boolean }) {
    return (
        <li>
            <Link
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                    }`}
            >
                <span className="text-lg">{icon}</span>
                <span className="text-sm font-medium">{label}</span>
            </Link>
        </li>
    );
}

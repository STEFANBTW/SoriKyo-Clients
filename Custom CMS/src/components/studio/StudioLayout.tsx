"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Settings, Database, Plus, Users } from 'lucide-react';
import { schemaRegistry } from '@/lib/schema';

export default function StudioLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex h-screen bg-eclipse text-steel overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 glass border-r border-white/5 flex flex-col">
                <div className="p-6 border-b border-white/5 bg-graphite/20">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-custom bg-cyan flex items-center justify-center glow-cyan">
                            <Database size={18} className="text-eclipse" />
                        </div>
                        <span className="text-white font-bold tracking-wider text-sm">OMNI-CMS</span>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-8 mt-4">
                    {/* Main Tools */}
                    <div>
                        <h3 className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-4 pl-2">Tools</h3>
                        <ul className="space-y-1">
                            <NavItem href="/studio" icon={<LayoutDashboard size={18} />} label="Desk" active={pathname === '/studio'} />
                            <NavItem href="/studio/vision" icon={<Database size={18} />} label="Vision" active={pathname === '/studio/vision'} />
                        </ul>
                    </div>

                    {/* Document Types */}
                    <div>
                        <h3 className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-4 pl-2">Content</h3>
                        <ul className="space-y-1">
                            {schemaRegistry.map((type) => (
                                <NavItem
                                    key={type.name}
                                    href={`/studio/desk/${type.name}`}
                                    icon={<FileText size={18} />}
                                    label={type.title}
                                    active={pathname.includes(`/studio/desk/${type.name}`)}
                                />
                            ))}
                        </ul>
                    </div>

                    {/* System */}
                    <div>
                        <h3 className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-4 pl-2">System</h3>
                        <ul className="space-y-1">
                            <NavItem href="/studio/users" icon={<Users size={18} />} label="Users" active={pathname === '/studio/users'} />
                            <NavItem href="/studio/settings" icon={<Settings size={18} />} label="Settings" active={pathname === '/studio/settings'} />
                        </ul>
                    </div>
                </nav>

                {/* Footer info */}
                <div className="p-4 border-t border-white/5 text-[10px] text-white/20 font-mono">
                    V1.0.0-BETA // PRG-STABLE
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]">
                <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 glass shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-cyan/50 tracking-tighter">PROJECT / OMNI-MASTER</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="btn-primary flex items-center gap-2 text-xs py-1.5">
                            <Plus size={14} /> NEW DOCUMENT
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

function NavItem({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <li>
            <Link
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-custom transition-all duration-200 group relative ${active
                        ? 'bg-cyan/10 text-cyan border border-cyan/20'
                        : 'text-steel hover:bg-white/5 hover:text-white border border-transparent'
                    }`}
            >
                <span className={`${active ? 'text-cyan' : 'text-steel group-hover:text-cyan'} transition-colors duration-200`}>
                    {icon}
                </span>
                <span className="text-sm font-medium">{label}</span>
                {active && (
                    <span className="absolute left-[-4px] top-1/4 bottom-1/4 w-[2px] bg-cyan shadow-[0_0_8px_#00e5ff]" />
                )}
            </Link>
        </li>
    );
}

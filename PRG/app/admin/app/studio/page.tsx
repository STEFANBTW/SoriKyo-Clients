export default function StudioPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome to your Content Lake</h1>
                <p className="text-steel max-w-2xl">
                    Everything you edit here is stored as high-performance JSONB in Supabase.
                    Use the desk to create and manage documents based on your TypeScript schemas.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Documents" value="0" detail="Synced with Supabase" />
                <StatCard title="Schema Types" value="2" detail="Authored in code" />
                <StatCard title="System Health" value="100%" detail="Real-time: Connected" />
            </div>
        </div>
    );
}

function StatCard({ title, value, detail }: { title: string, value: string, detail: string }) {
    return (
        <div className="glass p-6 rounded-custom border border-white/10 hover:border-cyan/30 transition-colors group">
            <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4 group-hover:text-cyan/50 transition-colors">{title}</div>
            <div className="text-4xl font-bold text-white mb-2">{value}</div>
            <div className="text-[10px] font-mono text-white/20 uppercase">{detail}</div>
        </div>
    );
}

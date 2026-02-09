import { schemaRegistry } from '@/lib/schema';
import FieldResolver from '@/components/studio/FieldResolver';

export default function DeskPage({ params }: { params: { type: string } }) {
    const schema = schemaRegistry.find((s) => s.name === params.type);

    if (!schema) {
        return <div className="text-white">Schema not found: {params.type}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <header className="flex justify-between items-end border-b border-white/5 pb-8">
                <div>
                    <h1 className="text-4xl font-bold text-white tracking-tight">{schema.title}</h1>
                    <p className="text-steel mt-2">Create and manage documents of type <code className="text-cyan">{schema.name}</code></p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 border border-white/10 rounded-custom text-xs font-bold hover:bg-white/5 transition-colors">CANCEL</button>
                    <button className="btn-primary px-6 py-2 text-xs font-bold uppercase tracking-widest">PUBLISH</button>
                </div>
            </header>

            <section className="glass rounded-custom p-10 space-y-8 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                    <span className="text-[10px] font-mono text-cyan tracking-[0.3em] uppercase">Document Editor // Online</span>
                </div>

                <div className="space-y-8">
                    {schema.fields.map((field) => (
                        <FieldResolver key={field.name} field={field} control={null} />
                    ))}
                </div>
            </section>

            <footer className="pt-12 text-[10px] font-mono text-white/10 text-center">
                DOC_ID: NEW_DOCUMENT // STATUS: DRAFT
            </footer>
        </div>
    );
}

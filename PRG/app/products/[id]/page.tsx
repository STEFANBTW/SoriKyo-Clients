import { createClient } from '@/utils/supabase/server';
import { Metadata } from 'next';
import Link from 'next/link';
import { WhatsAppButton } from '@/components/features/WhatsAppButton';
import { notFound } from 'next/navigation';
import { ProductStageWrapper } from '@/components/3d/ProductStageWrapper';

type Props = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const supabase = await createClient();
    const { data: product } = await supabase.from('products').select('name, description').eq('id', params.id).single();

    if (!product) return { title: 'Product Not Found' };

    return {
        title: `${product.name} | PRG Collection`,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description || '',
        }
    };
}

export default async function ProductDetailPage(props: Props) {
    const params = await props.params;
    const supabase = await createClient();
    const { data: product } = await supabase.from('products').select('*').eq('id', params.id).single();

    if (!product) notFound();

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 container mx-auto">
            <Link href="/products" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-8 transition-colors">
                &larr; Back to Collection
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left: 3D Stage or Image */}
                <div className="w-full">
                    <ProductStageWrapper
                        modelUrl={product.model_url}
                        imageUrl={product.image_url}
                        scale={1.5} // Adjust scale as needed
                    />
                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-widest">
                            {product.model_url ? 'Drag to Rotate • Scroll to Zoom' : 'High Quality Preview'}
                        </p>
                    </div>
                </div>

                {/* Right: Details */}
                <div className="space-y-8 glass-noir p-8 md:p-12 rounded-3xl border border-white/10">
                    <div>
                        <span className="text-prg-secondary text-xs font-bold tracking-[0.2em] uppercase">{product.category || 'Beauty'}</span>
                        <h1 className="text-4xl md:text-5xl font-serif mt-2 mb-4">{product.name}</h1>
                        <p className="text-2xl font-light text-white">₦{product.price?.toLocaleString()}</p>
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <p className="text-text-secondary leading-relaxed">{product.description}</p>
                    </div>

                    <div className="pt-8 border-t border-white/10">
                        <WhatsAppButton
                            phoneNumber="2348000000000" // Replace with actual
                            message={`Hi PRG, I am interested in purchasing "${product.name}". Is it in stock?`}
                            label="Order via WhatsApp"
                        />
                        <p className="text-xs text-gray-500 mt-4 text-center">
                            Secure checkout and delivery coordination happens directly via our concierge team on WhatsApp.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

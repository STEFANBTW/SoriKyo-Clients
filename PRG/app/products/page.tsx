import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Luxury Beauty Products | PRG Shop',
    description: 'Explore our curated collection of premium skincare, haircare, and beauty products available at Purple Rain Galore.',
};

export default async function ProductsPage() {
    const supabase = await createClient();
    const { data: products } = await supabase.from('products').select('*');

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 container mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-serif mb-4">The PRG Collection</h1>
                <p className="text-text-secondary max-w-2xl mx-auto">
                    Curated excellence for your daily ritual.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products?.map((product) => (
                    <Link
                        href={`/products/${product.id}`}
                        key={product.id}
                        className="group block relative aspect-[3/4] overflow-hidden rounded-2xl glass-noir border border-white/10 hover:border-prg-primary/50 transition-colors"
                    >
                        {product.image_url ? (
                            <Image
                                src={product.image_url}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        ) : (
                            <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/20">
                                No Image
                            </div>
                        )}

                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                            <h3 className="text-xl font-serif text-white mb-1 group-hover:text-prg-primary transition-colors">{product.name}</h3>
                            <p className="text-sm text-gray-300 mb-2 line-clamp-2">{product.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-white">₦{product.price?.toLocaleString()}</span>
                                <span className="text-xs uppercase tracking-wider text-prg-secondary opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">View Details &rarr;</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {(!products || products.length === 0) && (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                    <p className="text-xl text-gray-400">Our collection is being curated. Check back soon.</p>
                </div>
            )}
        </div>
    );
}

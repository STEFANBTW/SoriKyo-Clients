'use client';

import dynamic from 'next/dynamic';

const ProductStageComponent = dynamic(() => import('@/components/3d/ProductStage').then(mod => mod.ProductStage), {
    ssr: false,
    loading: () => <div className="w-full h-[400px] bg-white/5 animate-pulse rounded-3xl" />
});

export function ProductStageWrapper({ modelUrl, imageUrl, scale }: { modelUrl?: string, imageUrl?: string, scale?: number }) {
    return <ProductStageComponent modelUrl={modelUrl} imageUrl={imageUrl} scale={scale} />;
}

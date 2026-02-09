'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, OrbitControls, Float } from '@react-three/drei';
import { useAccessibilityStore } from '@/store/accessibility';

interface ProductStageProps {
    modelUrl?: string; // Path to .glb file
    imageUrl?: string; // Fallback image
    scale?: number;
}

function Model({ url, scale = 1 }: { url: string, scale: number }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} scale={scale} />;
}

export const ProductStage = ({ modelUrl, imageUrl, scale = 1 }: ProductStageProps) => {
    const { reducedMotion } = useAccessibilityStore();

    // If no model or reduced motion requested, show fallback image (parallax effect could be added here)
    if (!modelUrl) {
        return (
            <div className="relative w-full h-[400px] flex items-center justify-center bg-transparent group overflow-hidden rounded-3xl border border-white/10">
                {imageUrl ? (
                    <div className="relative w-full h-full">
                        {/* 2.5D Parallax Fallback would go here - simplified for now */}
                        <img
                            src={imageUrl}
                            alt="Product View"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                            <span className="text-white/60 text-xs tracking-widest uppercase mb-1">2D Preview Mode</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-muted-foreground flex flex-col items-center gap-2">
                        <svg className="w-10 h-10 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs uppercase tracking-widest">No Model Available</span>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="w-full h-[400px] relative rounded-3xl overflow-hidden glass-noir border border-white/10">
            <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.6}>
                        {reducedMotion ? (
                            <Model url={modelUrl} scale={scale} />
                        ) : (
                            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                                <Model url={modelUrl} scale={scale} />
                            </Float>
                        )}
                    </Stage>
                </Suspense>
                <OrbitControls
                    autoRotate={!reducedMotion}
                    autoRotateSpeed={0.5}
                    enableZoom={false}
                    makeDefault
                />
            </Canvas>
            <div className="absolute bottom-4 right-4 text-[10px] text-white/40 uppercase tracking-widest pointer-events-none">
                Interactive 3D
            </div>
        </div>
    );
};

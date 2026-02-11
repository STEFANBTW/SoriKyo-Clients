'use client';

import VirtualTryOn from '@/components/VirtualTryOn/VirtualTryOn';

export default function VTOTestPage() {
    return (
        <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">
                    Virtual Try-On <span className="text-purple-500">Beta</span>
                </h1>

                <div className="bg-neutral-800 p-4 rounded-2xl shadow-2xl border border-neutral-700">
                    <VirtualTryOn />
                </div>

                <p className="text-neutral-400 mt-6 text-center max-w-lg mx-auto">
                    Experimental Feature: Uses MediaPipe Face Mesh (468 points) and Three.js for real-time tracking.
                    <br />
                    <span className="text-sm">Allow camera access to test.</span>
                </p>
            </div>
        </div>
    );
}

'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useState, useEffect } from 'react';
import { Vector3, Color, AdditiveBlending, MathUtils } from 'three';
import { useAccessibilityStore } from '@/store/accessibility';
import { Environment, Stars } from '@react-three/drei';

// PRG Palette
// DESIGNER CONTROL: PRG Theme Rain Colors
// Effect: Changes the color of falling "Purple Rain" drops.
const COLORS = {
    rainDark: "#A855F7", // Bright Purple for Dark Mode
    rainLight: "#4C1D95", // Deep Purple for Light Mode
    gust: "#E879F9",      // Pink/Magenta for Gusts
};


const count = 3000;

function Rain({ reducedMotion, theme }: { reducedMotion: boolean, theme: string }) {
    const mesh = useRef<any>(null);
    const { viewport } = useThree();

    // Create random positions and speeds
    const [positions, speeds, gustOffsets] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const speeds = new Float32Array(count);
        const gustOffsets = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 50;     // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 50; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
            // Slower base speed
            speeds[i] = 0.05 + Math.random() * 0.15;
            gustOffsets[i] = Math.random() * Math.PI * 2;
        }
        return [positions, speeds, gustOffsets];
    }, []);

    useFrame((state) => {
        if (!mesh.current) return;

        const time = state.clock.getElapsedTime();
        const positionsAttr = mesh.current.geometry.attributes.position;
        const positionsArray = positionsAttr.array;

        // Gust logic: Peaky, periodic strong wind
        // Using power function to create "calm intervals" followed by "gusts"
        const baseWave = (Math.sin(time * 0.3) + 1) * 0.5; // Slow wave 0-1
        const gustStrength = Math.pow(baseWave, 5); // Stays low, peaks sharply. 0 to 1.

        const gustDirectionX = Math.sin(time * 0.2) > 0 ? 1 : -1;

        for (let i = 0; i < count; i++) {
            // Drop logic
            let y = positionsArray[i * 3 + 1];
            let x = positionsArray[i * 3];

            // Speed modified by reduced motion pref
            const speed = reducedMotion ? speeds[i] * 0.2 : speeds[i];

            // Speed up significantly during gust
            const currentSpeed = speed * (1 + gustStrength * 2); // Calm -> Fast burst, reduced gust impact

            y -= currentSpeed;

            // Wind effect: X movement
            if (!reducedMotion) {
                // Base slight drift + Strong gust push
                x += (Math.sin(time + gustOffsets[i]) * 0.01) + (gustStrength * 0.2 * gustDirectionX);
            }

            // Reset if out of bounds
            if (y < -10) { // Reset higher up
                y = 10 + Math.random() * 5; // New random Y in a smaller range
                x = (Math.random() - 0.5) * 25; // New random X in a smaller range
                // Slower base speed: 0.02 - 0.06 (was ~0.05 - 0.20)
                speeds[i] = 0.02 + Math.random() * 0.04;
            }
            if (x > 25) x = -25;
            if (x < -25) x = 25;


            positionsArray[i * 3 + 1] = y;
            positionsArray[i * 3] = x;
        }

        positionsAttr.needsUpdate = true;
    });

    const rainColor = theme === 'dark' ? COLORS.rainDark : COLORS.rainLight;

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                color={rainColor}
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

export default function Scene() {
    const { reducedMotion, theme } = useAccessibilityStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <Stars radius={100} depth={50} count={reducedMotion ? 500 : 2000} factor={4} saturation={0} fade speed={reducedMotion ? 0.2 : 1} />
                <Rain reducedMotion={reducedMotion} theme={theme} />
                {/* DESIGNER CONTROL: Depth Fog
                    Adjust args 2nd and 3rd numbers (5, 30) for fog density.
                    Effect: Creates distance blur in the 3D scene. */}
                <fog attach="fog" args={[theme === 'dark' ? '#020617' : '#ffffff', 5, 30]} />

            </Canvas>
        </div>
    );
}

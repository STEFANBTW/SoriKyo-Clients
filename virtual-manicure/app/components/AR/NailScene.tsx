"use client";

import { NormalizedLandmark, Landmark } from "@mediapipe/tasks-vision";
import * as THREE from "three";
import NailMesh from "./NailMesh";
import { Environment } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

function DebugLandmarks({ landmarks, calibration }: { landmarks: NormalizedLandmark[]; calibration: { scaleX: number; scaleY: number; offsetX: number; offsetY: number } }) {
    const groupRef = useRef<THREE.Group>(null);
    const { width, height } = useThree((state) => state.viewport);

    useFrame(() => {
        if (!groupRef.current) return;

        landmarks.forEach((landmark, i) => {
            const mesh = groupRef.current?.children[i] as THREE.Mesh;
            if (mesh) {
                const x = (landmark.x - 0.5) * calibration.scaleX * -width;
                const y = -(landmark.y - 0.5) * calibration.scaleY * height;
                mesh.position.set(x, y, 0);
            }
        });
    });

    return (
        <group ref={groupRef}>
            {landmarks.map((_, i) => (
                <mesh key={i}>
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshBasicMaterial color={i % 4 === 0 ? "blue" : "red"} depthTest={false} />
                </mesh>
            ))}
        </group>
    );
}

interface NailSceneProps {
    landmarks: NormalizedLandmark[][];
    worldLandmarks: Landmark[][];
    style: { color: string; roughness: number; metalness: number; opacity: number };
    calibration: { scaleX: number; scaleY: number; offsetX: number; offsetY: number };
    videoTexture: THREE.VideoTexture | null;
}

export default function NailScene({ landmarks, worldLandmarks, style, calibration, videoTexture }: NailSceneProps) {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />

            {/* Adaptive Lighting Environment: Use Video Feed if available, else fallback */}
            {videoTexture ? (
                <Environment map={videoTexture} />
            ) : (
                <Environment preset="studio" />
            )}

            {landmarks.length > 0 && landmarks.map((handSplines, handIndex) => {
                // Ensure we have corresponding world landmarks
                const worldHand = worldLandmarks[handIndex];
                if (!worldHand) return null;

                return (
                    <group key={handIndex}>
                        {[0, 1, 2, 3, 4].map((fingerIndex) => (
                            <NailMesh
                                key={fingerIndex}
                                fingerIndex={fingerIndex}
                                landmarks={handSplines}
                                worldLandmarks={worldHand}
                                style={style}
                                calibration={calibration}
                            />
                        ))}
                    </group>
                );
            })}
            {/* DEBUG: Show all landmarks as dots */}
            {landmarks.map((handSplines, i) => (
                <DebugLandmarks key={`debug-${i}`} landmarks={handSplines} calibration={calibration} />
            ))}
        </>
    );
}

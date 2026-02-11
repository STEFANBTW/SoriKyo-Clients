'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { NormalizedLandmark } from '@mediapipe/tasks-vision';

interface AccessoryProps {
    landmarks: NormalizedLandmark[];
    landmarkIndex: number; // The point to attach to (e.g., earlobe)
    videoWidth: number;
    videoHeight: number;
    type: 'earring' | 'nose-ring';
}

export function Accessory({ landmarks, landmarkIndex, videoWidth, videoHeight, type }: AccessoryProps) {
    const meshRef = useRef<THREE.Group>(null);

    // Physics State
    const velocity = useRef(new THREE.Vector3(0, 0, 0));
    const previousPosition = useRef(new THREE.Vector3(0, 0, 0));

    useFrame((state, delta) => {
        if (!landmarks || !landmarks[landmarkIndex] || !meshRef.current) return;

        const lm = landmarks[landmarkIndex];
        const aspect = videoWidth / videoHeight;
        const scale = 10; // Must match FaceMeshLayer scale

        // Target position (where the earlobe is now)
        const targetX = (0.5 - lm.x) * scale * aspect;
        const targetY = (0.5 - lm.y) * scale;
        const targetZ = -lm.z * scale;
        const targetPos = new THREE.Vector3(targetX, targetY, targetZ);

        // Physics Simulation (Dangling effect)
        // We want the accessory to "trail" behind the movement and swing.
        // 1. Get head velocity (current pos - prev pos)
        // 2. Apply inertia

        // Simplest approach: Determine "rotation" of the dangle.
        // The anchor point is targetPos.
        // The dangling part (child mesh) should swing.

        // Let's just move the Group to the anchor point for now.
        // And simulate physics on a sub-mesh rotation.

        meshRef.current.position.copy(targetPos);

        // Calculate velocity for sway
        const currentVel = targetPos.clone().sub(previousPosition.current).divideScalar(delta);

        // Ideally we rotate the earring based on this velocity (opposite direction)
        // E.g., if moving Left, earring swings Right.

        // Sway logic (very basic)
        const swayFactor = 0.5;
        const targetRotationZ = -currentVel.x * swayFactor; // Swing in Z plane based on X movement
        const targetRotationX = currentVel.z * swayFactor;  // Swing in X plane based on Z movement

        // Lerp rotation for smoothness
        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetRotationZ, 0.1);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.1);

        previousPosition.current.copy(targetPos);
    });

    return (
        <group ref={meshRef}>
            {/* Visual Representation of the Accessory */}
            {type === 'earring' && (
                <mesh position={[0, -0.5, 0]}> {/* Offset so it dangles BELOW the attachment point */}
                    <coneGeometry args={[0.1, 0.5, 16]} /> {/* A pendant shape */}
                    <meshStandardMaterial color="gold" metalness={1} roughness={0.2} />
                </mesh>
            )}
            {type === 'nose-ring' && (
                <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                    <torusGeometry args={[0.05, 0.01, 8, 16]} />
                    <meshStandardMaterial color="silver" metalness={1} roughness={0.2} />
                </mesh>
            )}

            {/* Debug Attachment Point */}
            {/* <mesh>
          <sphereGeometry args={[0.05]} />
          <meshBasicMaterial color="blue" />
      </mesh> */}
        </group>
    );
}

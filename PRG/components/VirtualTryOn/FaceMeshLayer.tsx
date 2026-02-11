'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { NormalizedLandmark } from '@mediapipe/tasks-vision';
import { FACE_LANDMARKS } from './face-landmarks';

interface FaceMeshLayerProps {
    landmarks: NormalizedLandmark[];
    videoWidth: number;
    videoHeight: number;
}

export function FaceMeshLayer({ landmarks, videoWidth, videoHeight }: FaceMeshLayerProps) {
    const meshRef = useRef<THREE.Group>(null);

    // Geometry for features
    const lipGeometry = useMemo(() => new THREE.BufferGeometry(), []);
    const leftEyeGeometry = useMemo(() => new THREE.BufferGeometry(), []);
    const rightEyeGeometry = useMemo(() => new THREE.BufferGeometry(), []);

    const updateGeometry = (geo: THREE.BufferGeometry, indices: number[], landmarks: NormalizedLandmark[], closeLoop: boolean = true) => {
        const positions = [];
        const aspect = videoWidth / videoHeight;
        const scale = 10;

        for (const index of indices) {
            const lm = landmarks[index];
            if (lm) {
                const x = (0.5 - lm.x) * scale * aspect;
                const y = (0.5 - lm.y) * scale;
                const z = -lm.z * scale;
                positions.push(x, y, z);
            }
        }

        // Close the loop if needed (for lines)
        if (closeLoop && indices.length > 0) {
            const first = landmarks[indices[0]];
            const x = (0.5 - first.x) * scale * aspect;
            const y = (0.5 - first.y) * scale;
            const z = -first.z * scale;
            positions.push(x, y, z);
        }

        const vectors = [];
        for (let i = 0; i < positions.length; i += 3) {
            vectors.push(new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]));
        }
        geo.setFromPoints(vectors);
        geo.computeVertexNormals();
    };

    useFrame(() => {
        if (landmarks) {
            updateGeometry(lipGeometry, FACE_LANDMARKS.LIPS_OUTER, landmarks, true);
            updateGeometry(leftEyeGeometry, FACE_LANDMARKS.LEFT_EYE, landmarks, true);
            updateGeometry(rightEyeGeometry, FACE_LANDMARKS.RIGHT_EYE, landmarks, true);
        }
    });


    return (
        <group ref={meshRef}>
            {/* Lips (Lipstick) */}
            <lineLoop geometry={lipGeometry}>
                <lineBasicMaterial color="#D61C4E" linewidth={4} />
            </lineLoop>

            {/* Eyeshadow (Upper Eye Outline/Liner) */}
            <lineLoop geometry={leftEyeGeometry}>
                <lineBasicMaterial color="#360036" linewidth={3} opacity={0.6} transparent />
            </lineLoop>
            <lineLoop geometry={rightEyeGeometry}>
                <lineBasicMaterial color="#360036" linewidth={3} opacity={0.6} transparent />
            </lineLoop>
        </group>
    );
}

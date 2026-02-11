"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { NormalizedLandmark, Landmark } from "@mediapipe/tasks-vision";

interface NailMeshProps {
    landmarks: NormalizedLandmark[]; // 2D landmarks for position
    worldLandmarks: Landmark[];      // 3D landmarks for rotation
    fingerIndex: number;             // 0=Thumb, 1=Index, etc.
    style: { color: string; roughness: number; metalness: number; opacity: number };
    calibration: { scaleX: number; scaleY: number; offsetX: number; offsetY: number };
}

const FINGER_Config = [
    { dip: 3, tip: 4 },   // Thumb
    { dip: 7, tip: 8 },   // Index
    { dip: 11, tip: 12 }, // Middle
    { dip: 15, tip: 16 }, // Ring
    { dip: 19, tip: 20 }, // Pinky
];

export default function NailMesh({ landmarks, worldLandmarks, fingerIndex, style, calibration }: NailMeshProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const config = FINGER_Config[fingerIndex];

    // Smoothness state
    const targetPosition = useRef(new THREE.Vector3());
    const targetQuaternion = useRef(new THREE.Quaternion());
    const targetScale = useRef(new THREE.Vector3(1, 1, 1));

    // Create nail geometry (Tube/Cylinder segment)
    const geometry = useMemo(() => {
        // A half-cylinder or curved plane
        // Radius top, Radius bottom, Height, RadialSegments, HeightSegments, OpenEnded
        // ThetaStart, ThetaLength (to make it a curve, not a full cylinder)
        const geo = new THREE.CylinderGeometry(0.5, 0.5, 1, 16, 1, true, 0, Math.PI);

        // We removed baked rotation to make Matrix4 math easier to reason about.
        // Initial state: Y is up (length), Z is Front (opening of cylinder is back)
        // Cylinder OpenEnded true, thetaLength PI.
        // With thetaStart 0, thetaLength PI:
        // It draws from X+ around Y axis to X-. The "opening" is at Z-. The "hump" is at Z+.
        // Hump at Z+ matches our 'upActual' vector in the Matrix.

        // We modify it slightly to make it more nail-shaped
        // Scale X to make it flatter (not fully semi-circle)
        geo.scale(1, 1, 0.5);

        return geo;
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        // 1. POSITION (From 2D landmarks mapped to calibrated Screen Space)
        const tip2D = landmarks[config.tip];

        const { width, height } = state.viewport;

        // Center mapping (-0.5 .. 0.5)
        const x_centered = (tip2D.x - 0.5);
        const y_centered = (tip2D.y - 0.5);

        // Apply object-cover calibration
        // Note: scaleX/scaleY are > 1 if video is cropped.
        const x_scaled = x_centered * calibration.scaleX;
        const y_scaled = y_centered * calibration.scaleY;

        // Map to Viewport World Units
        // Mirror X for selfie mode
        const x_final = x_scaled * -width;
        const y_final = -y_scaled * height; // Y is inverted in 3D

        // Update Target Position (Don't set directly)
        targetPosition.current.set(x_final, y_final, 0);

        // 2. ROTATION (From 3D worldLandmarks)
        const dip3D = worldLandmarks[config.dip];
        const tip3D = worldLandmarks[config.tip];

        const vDip = new THREE.Vector3(dip3D.x, dip3D.y, dip3D.z);
        const vTip = new THREE.Vector3(tip3D.x, tip3D.y, tip3D.z);

        // Forward = Finger Direction (DIP -> Tip)
        const forward = new THREE.Vector3().subVectors(vTip, vDip).normalize();

        // Calculate Palm Normal for "Up" reference
        const wrist = new THREE.Vector3(worldLandmarks[0].x, worldLandmarks[0].y, worldLandmarks[0].z);
        const indexMCP = new THREE.Vector3(worldLandmarks[5].x, worldLandmarks[5].y, worldLandmarks[5].z);
        const pinkyMCP = new THREE.Vector3(worldLandmarks[17].x, worldLandmarks[17].y, worldLandmarks[17].z);

        const palmVec1 = new THREE.Vector3().subVectors(indexMCP, wrist);
        const palmVec2 = new THREE.Vector3().subVectors(pinkyMCP, wrist);
        // Palm Normal points out of palm (assuming right hand rule order)
        const palmNormal = new THREE.Vector3().crossVectors(palmVec1, palmVec2).normalize();

        // Nail Normal (Z direction of mesh) should be opposite to Palm Normal (Back of hand)
        const backOfHand = palmNormal.clone().negate();

        // Construct Basis Vectors via Gram-Schmidt
        // Y = Forward (Along finger)
        // Z = Normal (Out of nail)
        // X = Right (Side of nail)

        // 1. Y is fixed (Forward)
        const yAxis = forward.clone();

        // 2. X is perpendicular to Y and "BackOfHand".
        const xAxis = new THREE.Vector3().crossVectors(yAxis, backOfHand).normalize();

        // 3. Z is perpendicular to X and Y
        const zAxis = new THREE.Vector3().crossVectors(xAxis, yAxis).normalize();


        const rotationMatrix = new THREE.Matrix4();
        rotationMatrix.makeBasis(xAxis, yAxis, zAxis);

        // Update Target Rotation
        targetQuaternion.current.setFromRotationMatrix(rotationMatrix);

        // 3. SCALE
        // Scale based on finger length
        // Approx length in world coords (meters) ~ 0.02 - 0.03
        const fingerLen = vDip.distanceTo(vTip);
        // Geometry is 1 unit high.
        // We want mesh to be ~ fingerLen * scalar

        // Also width?
        // Let's use a heuristic based on landmarks 2D distance?
        // World coords are better for consistent 3D size.

        // R3F Viewport is effectively at z=0.
        // Hand is at z ~ -0.5 meters in MediaPipe world?
        // Wait, MP World Landmarks are relative to wrist origin usually.
        // Keep it simple: Static scale for now, maybe dynamic later.

        // meshRef.current.scale.set(0.012, fingerLen, 0.012); 
        targetScale.current.set(0.012, fingerLen, 0.012);

        // 4. INTERPOLATION (Smoothing)
        const alpha = 0.5; // Smoothing factor (0.1 = very smooth/slow, 0.9 = responsive/jittery)

        meshRef.current.position.lerp(targetPosition.current, alpha);
        meshRef.current.quaternion.slerp(targetQuaternion.current, alpha);
        meshRef.current.scale.lerp(targetScale.current, alpha);

        // 5. OCCLUSION (Hide if palm is facing camera)
        // We know 'zAxis' is the Nail/Surface Normal (pointing OUT of the nail).
        // Camera looks down -Z axis in Three.js (but our camera is at +Z looking at 0).
        // So Camera View Vector is (0, 0, 1) roughly? relative to world.
        // Actually, we can just check the Z component of the transformed Normal.

        // Transform the zAxis (Nail Normal) by the current rotation to get World Normal?
        // Actually 'zAxis' IS already in "World" space (relative to our scene calculation).

        // If zAxis.z is POSITIVE, it's pointing TOWARDS the camera (Visible).
        // If zAxis.z is NEGATIVE, it's pointing AWAY (Occluded by finger).

        // However, this depends on how we defined 'backOfHand'.
        // backOfHand = -palmNormal.
        // If palm faces camera, palmNormal.z > 0.
        // So backOfHand.z < 0.
        // So if backOfHand.z is negative, we are looking at the palm -> Hide Nails.

        // Let's smooth the visibility transition too (opacity?)
        const isVisible = backOfHand.z > -0.2; // Threshold to allow slight side view

        // DEBUG: Force visible to rule out occlusion logic failure
        // const isVisible = backOfHand.z > -0.2; 
        meshRef.current.visible = true;
    });

    return (
        <mesh ref={meshRef} geometry={geometry}>
            <meshPhysicalMaterial
                color={style.color}
                roughness={style.roughness}
                metalness={style.metalness}
                clearcoat={1.0}
                clearcoatRoughness={0.1}
                transparent={true}
                opacity={style.opacity}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

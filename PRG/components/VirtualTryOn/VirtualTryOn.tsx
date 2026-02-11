'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FaceLandmarker, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Import our sub-components
import { FaceMeshLayer } from './FaceMeshLayer';
import { Accessory } from './Accessory';
import { FACE_LANDMARKS } from './face-landmarks';

interface VirtualTryOnProps { }

export default function VirtualTryOn({ }: VirtualTryOnProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker | null>(null);
    const [webcamEnabled, setWebcamEnabled] = useState(false);
    const [landmarks, setLandmarks] = useState<any>(null); // To pass to R3F
    const [videoDims, setVideoDims] = useState({ width: 0, height: 0 });

    // 1. Initialize FaceLandmarker
    useEffect(() => {
        async function initMediaPipe() {
            const vision = await FilesetResolver.forVisionTasks(
                'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
            );
            const landmarker = await FaceLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
                    delegate: 'GPU'
                },
                outputFaceBlendshapes: true,
                runningMode: 'VIDEO',
                numFaces: 1
            });
            setFaceLandmarker(landmarker);
        }
        initMediaPipe();
    }, []);

    // 2. Enable Webcam
    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720, facingMode: 'user' } }).then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.onloadedmetadata = () => {
                        setWebcamEnabled(true);
                        if (videoRef.current) {
                            setVideoDims({
                                width: videoRef.current.videoWidth,
                                height: videoRef.current.videoHeight
                            });
                        }
                    };
                }
            });
        }
    }, []);

    // 3. Process Frames Loop
    useEffect(() => {
        let animationFrameId: number;

        const renderLoop = async () => {
            if (faceLandmarker && videoRef.current && webcamEnabled) {
                // Ensure video is playing
                if (videoRef.current.currentTime > 0 && !videoRef.current.paused && !videoRef.current.ended) {
                    const startTimeMs = performance.now();
                    try {
                        const result = faceLandmarker.detectForVideo(videoRef.current, startTimeMs);
                        if (result.faceLandmarks && result.faceLandmarks.length > 0) {
                            setLandmarks(result.faceLandmarks[0]);
                        }
                    } catch (e) {
                        console.error("MediaPipe error:", e);
                    }
                }
            }
            animationFrameId = requestAnimationFrame(renderLoop);
        };

        if (webcamEnabled && faceLandmarker) {
            renderLoop();
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [faceLandmarker, webcamEnabled]);


    return (
        <div className="relative w-full aspect-video bg-black overflow-hidden rounded-xl">
            {/* Webcam Feed */}
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute top-0 left-0 w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
                style={{ zIndex: 0 }}
            />

            {/* R3F Canvas Overlay */}
            <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
                <Canvas gl={{ alpha: true }} className="w-full h-full">
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <directionalLight position={[-10, 5, 5]} intensity={0.5} />

                    {landmarks && videoDims.width > 0 && (
                        <group>
                            <FaceMeshLayer
                                landmarks={landmarks}
                                videoWidth={videoDims.width}
                                videoHeight={videoDims.height}
                            />

                            {/* Earrings */}
                            <Accessory
                                landmarks={landmarks}
                                landmarkIndex={FACE_LANDMARKS.LEFT_EARLOBE}
                                videoWidth={videoDims.width}
                                videoHeight={videoDims.height}
                                type="earring"
                            />
                            <Accessory
                                landmarks={landmarks}
                                landmarkIndex={FACE_LANDMARKS.RIGHT_EARLOBE}
                                videoWidth={videoDims.width}
                                videoHeight={videoDims.height}
                                type="earring"
                            />
                        </group>
                    )}
                </Canvas>
            </div>

            {!webcamEnabled && (
                <div className="absolute inset-0 flex items-center justify-center text-white z-20 bg-black/50">
                    <p>Loading Camera & AI Model...</p>
                </div>
            )}
        </div>
    );
}

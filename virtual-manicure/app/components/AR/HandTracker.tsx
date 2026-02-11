"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { HandLandmarker, FilesetResolver, NormalizedLandmark, Landmark } from "@mediapipe/tasks-vision";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import NailScene from "./NailScene";
import StyleSelector from "../UI/StyleSelector";

export default function HandTracker() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [landmarker, setLandmarker] = useState<HandLandmarker | null>(null);
    const [landmarks, setLandmarks] = useState<NormalizedLandmark[][]>([]);
    const [worldLandmarks, setWorldLandmarks] = useState<Landmark[][]>([]);

    // Premium Style State
    const [nailStyle, setNailStyle] = useState({
        color: '#E0115F',
        roughness: 0.15,
        metalness: 0.1,
        opacity: 0.9
    });

    const [calibration, setCalibration] = useState({ scaleX: 1, scaleY: 1, offsetX: 0, offsetY: 0 });
    const [videoTexture, setVideoTexture] = useState<THREE.VideoTexture | null>(null);
    const requestRef = useRef<number>(0);
    const [debugInfo, setDebugInfo] = useState({ fps: 0, hands: 0, status: 'Initializing' });
    const lastFrameTime = useRef(performance.now());

    // Initialize MediaPipe HandLandmarker
    useEffect(() => {
        const initLandmarker = async () => {
            try {
                const vision = await FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
                );
                const handLandmarker = await HandLandmarker.createFromOptions(vision, {
                    baseOptions: {
                        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
                        delegate: "GPU",
                    },
                    runningMode: "VIDEO",
                    numHands: 2,
                });
                setLandmarker(handLandmarker);
                console.log("HandLandmarker initialized");
            } catch (error) {
                console.error("Error initializing HandLandmarker:", error);
            }
        };
        initLandmarker();
    }, []);

    // Setup Camera
    const predictWebcam = useCallback(() => {
        if (landmarker && videoRef.current && videoRef.current.readyState >= 2) {
            const startTimeMs = performance.now();
            const results = landmarker.detectForVideo(videoRef.current, startTimeMs);

            if (results.landmarks) {
                setLandmarks(results.landmarks);
                setWorldLandmarks(results.worldLandmarks);

                // Debug Stats
                const now = performance.now();
                const fps = Math.round(1000 / (now - lastFrameTime.current));
                lastFrameTime.current = now;
                setDebugInfo(prev => ({ ...prev, fps, hands: results.landmarks.length, status: 'Tracking' }));
            }

            requestRef.current = requestAnimationFrame(predictWebcam);
        } else {
            requestRef.current = requestAnimationFrame(predictWebcam);
        }
    }, [landmarker]);

    // Setup Camera
    useEffect(() => {
        const startCamera = async () => {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: {
                            facingMode: "user",
                            width: { ideal: 1280 },
                            height: { ideal: 720 },
                        },
                    });
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.addEventListener("loadeddata", predictWebcam);
                    }
                } catch (error) {
                    console.error("Error accessing camera:", error);
                }
            }
        };

        startCamera();

        startCamera();

        // Handle Resize / Calibration
        const handleResize = () => {
            if (videoRef.current) {
                const video = videoRef.current;
                const videoAspect = video.videoWidth / video.videoHeight;
                const screenAspect = window.innerWidth / window.innerHeight;

                let scaleX = 1, scaleY = 1, offsetX = 0, offsetY = 0;

                // object-cover logic matching CSS
                if (screenAspect > videoAspect) {
                    // Screen is wider than video: Video is cropped top/bottom
                    // Width matches, Height is larger in virtual space
                    // virtualHeight = width / videoAspect
                    // scaleY = virtualHeight / height
                    const virtualHeight = window.innerWidth / videoAspect;
                    scaleY = virtualHeight / window.innerHeight;
                    offsetY = (virtualHeight - window.innerHeight) / 2;
                } else {
                    // Screen is taller/narrower: Video is cropped left/right
                    // Height matches, Width is larger
                    const virtualWidth = window.innerHeight * videoAspect;
                    scaleX = virtualWidth / window.innerWidth;
                    offsetX = (virtualWidth - window.innerWidth) / 2;
                }

                setCalibration({ scaleX, scaleY, offsetX, offsetY });
            }
        };

        window.addEventListener('resize', handleResize);
        // Also call on video metadata load
        if (videoRef.current) {
            videoRef.current.addEventListener('loadedmetadata', handleResize);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [landmarker, predictWebcam]);



    return (
        <div className="relative w-screen h-screen overflow-hidden bg-black">
            {/* Video Feed */}
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute top-0 left-0 w-full h-full object-cover transform -scale-x-100"
            />

            {/* AR Overlay */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ width: '100%', height: '100%' }}>
                    <NailScene
                        landmarks={landmarks}
                        worldLandmarks={worldLandmarks}
                        style={nailStyle}
                        calibration={calibration}
                        videoTexture={videoTexture}
                    />
                </Canvas>
            </div>

            <StyleSelector currentStyle={nailStyle} onSelect={setNailStyle} />

            {/* Debug Overlay */}
            <div className="absolute top-4 left-4 bg-black/80 text-green-400 p-4 rounded font-mono text-xs z-50 pointer-events-none border border-green-900">
                <div>STATUS: {debugInfo.status}</div>
                <div>HANDS: {debugInfo.hands}</div>
                <div>FPS: {debugInfo.fps}</div>
                <div>RES: {videoRef.current?.videoWidth}x{videoRef.current?.videoHeight}</div>
                <div className="mt-2 text-white/50">Model: {landmarker ? 'Ready' : 'Loading...'}</div>
            </div>
        </div>
    );
}

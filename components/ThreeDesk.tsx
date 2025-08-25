'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

// ===== Static Camera - No Parallax =====
function StaticCamera() {
  // No-op: camera is set statically via Canvas
  return null;
}

// ===== Duck Model: always at [0,0,0], NO rotation or wobble =====
function DuckStatic() {
  const meshRef = useRef<THREE.Group>(null);
  const [gltf, setGltf] = useState<any>(null);

  // Load duck once
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load('/duck.glb', (gltf) => {
      setGltf(gltf);
    });
  }, []);

  // Animate duck to remain static at center (no rotation)
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.set(0, 0, 0); // lock center
      meshRef.current.rotation.set(0, 0, 0); // no wobble or tilt
    }
  });

  if (!gltf) return null;

  return (
    <primitive
      object={gltf.scene}
      ref={meshRef}
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
    />
  );
}

// ===== Main Desk Scene =====
export default function ThreeDesk() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <StaticCamera />
        <DuckStatic />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

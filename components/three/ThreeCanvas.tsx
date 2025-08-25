'use client';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

function Scene() {
  return (
    <mesh>
      <boxGeometry args={[2,2,2]} />
      <meshStandardMaterial color="#77e0c4" />
    </mesh>
  );
}

export default function ThreeCanvas() {
  return (
    <Canvas camera={{ position: [4,4,6], fov: 50 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 10]} intensity={1.3} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}

'use client';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './Model';

export default function ModelViewer({
  layer1Url,
  layer2Url,
  opacity
}: {
  layer1Url: string;
  layer2Url: string;
  opacity: number;
}) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: 240,
      background: '#141923',
      borderRadius: 12,
      overflow: 'hidden'
    }}>
      <Canvas
        shadows
        camera={{ position: [0, 2, 5], fov: 50 }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <ambientLight intensity={0.42} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1.15} castShadow />
        <Suspense fallback={
          <mesh>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial color="#292c33" />
          </mesh>
        }>
          <Model layer1Url={layer1Url} layer2Url={layer2Url} opacity={opacity} />
        </Suspense>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  );
}

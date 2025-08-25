'use client';
import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function DeskObject3D({ path, position = [0, 0, 0], name = 'Model' }) {
  const { scene } = useGLTF(path);
  return (
    <group position={position} name={name}>
      <primitive object={scene} dispose={null} />
    </group>
  );
}

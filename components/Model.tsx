'use client';
import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function Model({
  layer1Url,
  layer2Url,
  opacity
}: {
  layer1Url: string;
  layer2Url: string;
  opacity: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const { gl } = useThree();

  // Memoized texture loaders to avoid repeated loads
  const [layer1, layer2] = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const t1 = layer1Url ? loader.load(layer1Url) : null;
    const t2 = layer2Url ? loader.load(layer2Url) : null;
    [t1, t2].forEach((t) => {
      if (t) {
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.anisotropy = gl.capabilities.getMaxAnisotropy();
      }
    });
    return [t1, t2];
    // eslint-disable-next-line
  }, [layer1Url, layer2Url]);

  // Clean up textures when they change
  useEffect(() => {
    return () => {
      layer1 && layer1.dispose();
      layer2 && layer2.dispose();
    };
  }, [layer1, layer2]);

  // Update material uniforms when textures or opacity change
  useEffect(() => {
    if (materialRef.current) {
      if (layer1) materialRef.current.uniforms.texture1.value = layer1;
      if (layer2) materialRef.current.uniforms.texture2.value = layer2;
      materialRef.current.uniforms.opacity.value = opacity;
    }
  }, [layer1, layer2, opacity]);

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.opacity.value = opacity;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.2}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          texture1: { value: layer1 },
          texture2: { value: layer2 },
          opacity: { value: opacity }
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D texture1;
          uniform sampler2D texture2;
          uniform float opacity;
          varying vec2 vUv;
          void main() {
            vec4 base = texture2D(texture1, vUv);
            vec4 overlay = texture2D(texture2, vUv);
            gl_FragColor = mix(base, overlay, opacity);
          }
        `}
      />
    </mesh>
  );
}

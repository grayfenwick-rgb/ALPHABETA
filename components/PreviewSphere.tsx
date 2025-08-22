<<<<<<< HEAD
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';

// Child mesh for texture preview
function SphereMesh({ texture }: { texture: THREE.Texture }) {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

// Main preview component
export default function PreviewSphere({
  textureUrl,
  onClick,
  size = 100
}: {
  textureUrl: string;
  onClick: () => void;
  size?: number;
}) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!textureUrl) return;
    const loader = new THREE.TextureLoader();
    loader.load(textureUrl, setTexture, undefined, () => setTexture(null));
    // Clean up texture when unmounted or url changes
    return () => {
      if (texture) texture.dispose();
    };
    // eslint-disable-next-line
  }, [textureUrl]);

  return (
    <div
      onClick={onClick}
      style={{
        width: size,
        height: size,
        cursor: 'pointer',
        background: '#161b26',
        borderRadius: '50%',
        overflow: 'hidden',
        border: '2px solid #232b39',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      title="Click to select this texture"
    >
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <ambientLight />
        {texture && <SphereMesh texture={texture} />}
      </Canvas>
    </div>
  );
}
=======
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';

// Child mesh for texture preview
function SphereMesh({ texture }: { texture: THREE.Texture }) {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

// Main preview component
export default function PreviewSphere({
  textureUrl,
  onClick,
  size = 100
}: {
  textureUrl: string;
  onClick: () => void;
  size?: number;
}) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!textureUrl) return;
    const loader = new THREE.TextureLoader();
    loader.load(textureUrl, setTexture, undefined, () => setTexture(null));
    // Clean up texture when unmounted or url changes
    return () => {
      if (texture) texture.dispose();
    };
    // eslint-disable-next-line
  }, [textureUrl]);

  return (
    <div
      onClick={onClick}
      style={{
        width: size,
        height: size,
        cursor: 'pointer',
        background: '#161b26',
        borderRadius: '50%',
        overflow: 'hidden',
        border: '2px solid #232b39',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      title="Click to select this texture"
    >
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <ambientLight />
        {texture && <SphereMesh texture={texture} />}
      </Canvas>
    </div>
  );
}
>>>>>>> ffee54565313e6c582194a584a21b586b60de224

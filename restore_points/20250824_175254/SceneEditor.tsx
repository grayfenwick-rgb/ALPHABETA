'use client';
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

const FONT_URL = '/fonts/helvetiker_regular.typeface.json';
const TEXTURE_URLS = [
  '/textures/1.jpg',
  '/textures/2.jpg',
  '/textures/3.jpg',
  '/textures/4.jpg',
  '/textures/5.jpg',
  '/textures/6.jpg',
  '/textures/7.jpg',
  '/textures/8.jpg',
];

const VIEWPORTS = [
  { name: 'Perspective', camera: 'persp' },
  { name: 'Top', camera: 'top' },
  { name: 'Front', camera: 'front' },
  { name: 'Side', camera: 'side' },
];

const getCameraPosition = (type: string) => {
  switch (type) {
    case 'persp':   return [6, 5, 8];
    case 'top':     return [0, 12, 0];
    case 'front':   return [0, 0, 12];
    case 'side':    return [12, 0, 0];
    default:        return [6, 5, 8];
  }
};

const getCameraUp = (type: string) => {
  switch (type) {
    case 'top':     return [0, 0, -1];
    default:        return [0, 1, 0];
  }
};

export default function SceneEditor() {
  const [maximized, setMaximized] = useState<number | null>(null);
  const [transformMode, setTransformMode] = useState<'translate' | 'rotate' | 'scale'>('translate');
  const [activeIdx, setActiveIdx] = useState<number>(8);

  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const renderers = useRef<THREE.WebGLRenderer[]>([]);
  const cameras = useRef<THREE.Camera[]>([]);
  const controls = useRef<(OrbitControls | null)[]>([]);
  const transformControls = useRef<TransformControls[]>([]);
  const scenes = useRef<THREE.Scene[]>([]);

  const objectsRef = useRef<{ cubes: THREE.Mesh[], text: THREE.Mesh | null }>({ cubes: [], text: null });

  const updateActiveObject = (cb: (obj: THREE.Mesh) => void) => {
    const { cubes, text } = objectsRef.current;
    if (activeIdx < 8) cb(cubes[activeIdx]);
    else if (text) cb(text);
  };

  useEffect(() => {
    const mainScene = new THREE.Scene();
    mainScene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 8, 10);
    mainScene.add(dirLight);

    const cubes: THREE.Mesh[] = [];
    const loader = new THREE.TextureLoader();
    for (let i = 0; i < 8; i++) {
      const tex = loader.load(TEXTURE_URLS[i]);
      const mat = new THREE.MeshStandardMaterial({ map: tex });
      const geo = new THREE.BoxGeometry(0.95, 0.95, 0.95);
      const mesh = new THREE.Mesh(geo, mat);
      const row = Math.floor(i / 4);
      const col = i % 4;
      mesh.position.x = -3 + col * 2;
      mesh.position.y = 1.2 - row * 2.0;
      mesh.position.z = 0;
      cubes.push(mesh);
      mainScene.add(mesh);
    }

    let textMesh: THREE.Mesh | null = null;
    let fontLoaded = false;
    new FontLoader().load(FONT_URL, font => {
      const textGeo = new TextGeometry('ABC', { font, size: 1, height: 0.25 });
      const textMat = new THREE.MeshStandardMaterial({ color: 0x32ff98 });
      textMesh = new THREE.Mesh(textGeo, textMat);
      textMesh.position.set(-2, 2.1, 0.7);
      mainScene.add(textMesh);
      objectsRef.current.text = textMesh;
      fontLoaded = true;
    });

    objectsRef.current.cubes = cubes;
    objectsRef.current.text = textMesh;

    for (let idx = 0; idx < 4; idx++) {
      let panelDiv = panelRefs.current[idx];
      if (!panelDiv) continue;
      while (panelDiv.firstChild) panelDiv.removeChild(panelDiv.firstChild);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setClearColor(0x232323, 1);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(panelDiv.clientWidth, panelDiv.clientHeight);
      panelDiv.appendChild(renderer.domElement);
      renderers.current[idx] = renderer;

      let cam: THREE.PerspectiveCamera | THREE.OrthographicCamera;
      const [x, y, z] = getCameraPosition(VIEWPORTS[idx].camera);
      if (VIEWPORTS[idx].camera === 'persp') {
        cam = new THREE.PerspectiveCamera(70, panelDiv.clientWidth / panelDiv.clientHeight, 0.1, 1000);
        cam.position.set(x, y, z);
      } else {
        const aspect = panelDiv.clientWidth / panelDiv.clientHeight;
        cam = new THREE.OrthographicCamera(-6 * aspect, 6 * aspect, 5, -3, 0.1, 100);
        cam.position.set(x, y, z);
        cam.up.set(...getCameraUp(VIEWPORTS[idx].camera));
        cam.lookAt(0, 0, 0);
      }
      cameras.current[idx] = cam;

      if (VIEWPORTS[idx].camera === 'persp') {
        controls.current[idx] = new OrbitControls(cam, renderer.domElement);
        controls.current[idx]!.enableDamping = true;
        controls.current[idx]!.dampingFactor = 0.08;
        controls.current[idx]!.minDistance = 4;
        controls.current[idx]!.maxDistance = 16;
      } else {
        controls.current[idx] = null;
      }

      const tc = new TransformControls(cam, renderer.domElement);
      tc.setMode(transformMode);
      tc.size = 0.9;
      tc.visible = false;
      tc.addEventListener('dragging-changed', e => {
        if (controls.current[idx]) controls.current[idx]!.enabled = !e.value;
      });
      transformControls.current[idx] = tc;
      mainScene.add(tc);

      renderer.domElement.addEventListener('pointerdown', e => {
        if (e.button !== 0) return;
        const rect = renderer.domElement.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        const mouse = new THREE.Vector2(x, y);

        let cam = cameras.current[idx];
        let pickables = [...cubes];
        if (fontLoaded && textMesh) pickables.push(textMesh);
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, cam);
        const intersects = raycaster.intersectObjects(pickables);
        if (intersects.length > 0) {
          const obj = intersects[0].object;
          let found = cubes.findIndex(c => c === obj);
          if (found !== -1) setActiveIdx(found);
          else if (textMesh && obj === textMesh) setActiveIdx(8);
        }
      });

      renderer.domElement.ondblclick = e => {
        setMaximized(m => (m === idx ? null : idx));
      };
    }

    scenes.current = [mainScene, mainScene, mainScene, mainScene];

    let running = true;
    function renderLoop() {
      for (let i = 0; i < 4; i++) {
        const tc = transformControls.current[i];
        tc.setMode(transformMode);
        if (activeIdx < 8) tc.attach(cubes[activeIdx]);
        else if (textMesh) tc.attach(textMesh);
        tc.visible = true;
      }
      cubes.forEach((mesh, i) => {
        mesh.rotation.y += 0.005 + i * 0.001;
        mesh.rotation.x += 0.003 + i * 0.001;
      });
      if (textMesh) textMesh.rotation.y += 0.01;
      for (let idx = 0; idx < 4; idx++) {
        if (!renderers.current[idx] || !cameras.current[idx]) continue;
        if (controls.current[idx]) controls.current[idx]!.update();
        renderers.current[idx]!.render(scenes.current[idx], cameras.current[idx]!);
      }
      if (running) requestAnimationFrame(renderLoop);
    }
    renderLoop();

    const handleResize = () => {
      for (let idx = 0; idx < 4; idx++) {
        const panel = panelRefs.current[idx];
        const renderer = renderers.current[idx];
        const cam = cameras.current[idx];
        if (!panel || !renderer || !cam) continue;
        renderer.setSize(panel.clientWidth, panel.clientHeight);
        if ('aspect' in cam) {
          (cam as any).aspect = panel.clientWidth / panel.clientHeight;
        }
        if (cam instanceof THREE.OrthographicCamera) {
          const aspect = panel.clientWidth / panel.clientHeight;
          cam.left = -6 * aspect;
          cam.right = 6 * aspect;
          cam.top = 5;
          cam.bottom = -3;
          cam.updateProjectionMatrix();
        }
        if (cam instanceof THREE.PerspectiveCamera) {
          cam.aspect = panel.clientWidth / panel.clientHeight;
          cam.updateProjectionMatrix();
        }
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      running = false;
      for (let idx = 0; idx < 4; idx++) {
        renderers.current[idx]?.dispose();
        controls.current[idx]?.dispose?.();
        transformControls.current[idx]?.dispose?.();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [transformMode, activeIdx]);

  const PanelLabel = ({ text }: { text: string }) => (
    <div style={{
      position: 'absolute',
      left: 10,
      top: 8,
      color: '#fff',
      fontWeight: 700,
      fontSize: 16,
      textShadow: '1px 1px 4px #0008',
      letterSpacing: 2,
      userSelect: 'none',
      pointerEvents: 'none',
      zIndex: 2,
    }}>{text}</div>
  );

  const TransformBar = () => (
    <div style={{
      position: 'absolute',
      right: 14,
      top: 12,
      zIndex: 2,
      display: 'flex',
      gap: 9,
      userSelect: 'none',
      background: '#232323d9',
      borderRadius: 8,
      padding: '6px 9px',
      border: '1.5px solid #444',
      boxShadow: '0 2px 8px #0002'
    }}>
      <button
        onClick={() => setTransformMode('translate')}
        style={{
          fontWeight: transformMode === 'translate' ? 700 : 400,
          color: '#ff3c2e', background: 'none', border: 'none', fontSize: 16, cursor: 'pointer'
        }}>Move</button>
      <button
        onClick={() => setTransformMode('rotate')}
        style={{
          fontWeight: transformMode === 'rotate' ? 700 : 400,
          color: '#43e6ff', background: 'none', border: 'none', fontSize: 16, cursor: 'pointer'
        }}>Rotate</button>
      <button
        onClick={() => setTransformMode('scale')}
        style={{
          fontWeight: transformMode === 'scale' ? 700 : 400,
          color: '#32ff98', background: 'none', border: 'none', fontSize: 16, cursor: 'pointer'
        }}>Scale</button>
    </div>
  );

  const panelStyle: React.CSSProperties = maximized === null
    ? {
        position: 'relative',
        width: '50%',
        height: '50%',
        boxSizing: 'border-box',
        border: '2px solid #232323',
        borderRadius: 0,
        overflow: 'hidden',
        background: '#181818'
      }
    : {
        position: 'absolute',
        left: 0, top: 0, right: 0, bottom: 0,
        width: '100%', height: '100%',
        zIndex: 10,
        border: '2px solid #232323',
        borderRadius: 14,
        background: '#181818'
      };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minWidth: 500,
      minHeight: 440,
      background: '#161616',
      borderRadius: 16,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      boxShadow: '0 2px 20px #000b',
      position: 'relative'
    }}>
      <TransformBar />
      <div style={{
        display: maximized === null ? 'flex' : 'block',
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'relative',
        flexWrap: 'wrap'
      }}>
        {VIEWPORTS.map((view, idx) =>
          (maximized === null || maximized === idx) && (
            <div
              key={view.name}
              ref={el => panelRefs.current[idx] = el}
              style={{
                ...panelStyle,
                ...(maximized === null ? {
                  borderRight: idx % 2 === 0 ? '1.5px solid #232323' : undefined,
                  borderBottom: idx < 2 ? '1.5px solid #232323' : undefined
                } : {})
              }}
            >
              <PanelLabel text={view.name} />
            </div>
          )
        )}
      </div>
    </div>
  );
}

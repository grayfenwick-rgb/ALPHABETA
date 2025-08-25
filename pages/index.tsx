'use client';
import React from 'react';

import ErrorBoundary  from '../components/ErrorBoundary';
import FloatingPanel  from '../components/FloatingPanel';
import LayerPanel     from '../components/LayerPanel';
import FontSelector   from '../components/FontSelector';
import SceneEditor    from '../components/SceneEditor';

export default function Home() {
  const container_style = { width: '100vw', height: '100vh', background: '#191a23' };

  return (
    <ErrorBoundary>
      <div style={container_style}>
        <FloatingPanel default={{ x: 30,   y: 60,  width: 220, height: 220 }} title="Layers" id="layers">
          <LayerPanel />
        </FloatingPanel>

        <FloatingPanel default={{ x: 320,  y: 80,  width: 700, height: 420 }} title="Scene Editor" id="scene">
          <SceneEditor />
        </FloatingPanel>

        <FloatingPanel default={{ x: 1080, y: 110, width: 240, height: 180 }} title="Font Selector" id="font">
          <FontSelector />
        </FloatingPanel>
      </div>
    </ErrorBoundary>
  );
}

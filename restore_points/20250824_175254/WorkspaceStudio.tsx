'use client';
import React from 'react';
import FloatingPanel from './FloatingPanel';
import SceneEditor from './SceneEditor';
import LayerPanel from './LayerPanel';
import FontSelector from './FontSelector';

export default function WorkspaceStudio() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#161720',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <FloatingPanel
        id="scene-editor"
        title="Scene Editor"
        defaultPos={{ x: 120, y: 100 }}
        defaultSize={{ w: 1180, h: 720 }}
        darkMode={true}
      >
        <SceneEditor />
      </FloatingPanel>
      <FloatingPanel
        id="layers"
        title="Layers"
        defaultPos={{ x: 20, y: 40 }}
        defaultSize={{ w: 340, h: 500 }}
        darkMode={true}
      >
        <LayerPanel />
      </FloatingPanel>
      <FloatingPanel
        id="fonts"
        title="Font Selector"
        defaultPos={{ x: 1420, y: 120 }}
        defaultSize={{ w: 390, h: 420 }}
        darkMode={true}
      >
        <FontSelector />
      </FloatingPanel>
    </div>
  );
}

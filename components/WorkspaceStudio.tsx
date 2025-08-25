'use client';
import React from 'react';
import FloatingPanel from './FloatingPanel';
import SceneEditor from './SceneEditor';

// Add more panel imports here if needed

export default function WorkspaceStudio() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#181818',
      }}
    >
      {/* Scene Editor Floating Panel */}
      <FloatingPanel
        id="scene-editor"
        title="Scene Editor"
        defaultPos={{ x: 120, y: 100 }}
        defaultSize={{ w: 1180, h: 720 }}
        darkMode={true}
      >
        <SceneEditor />
      </FloatingPanel>

      {/* Add any other <FloatingPanel> components here for additional tools */}
    </div>
  );
}

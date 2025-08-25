from pathlib import Path

# Base path should be where this script is placed (project root)
base_path = Path(__file__).resolve().parent
components_dir = base_path / "components"
components_dir.mkdir(parents=True, exist_ok=True)

files = {
    "DeskObject.tsx": '''
'use client';
import React from 'react';

export default function DeskObject({ imageSrc, alt, onClick, style }: {
  imageSrc: string;
  alt: string;
  onClick: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <img
      src={imageSrc}
      alt={alt}
      onClick={onClick}
      style={{
        position: 'absolute',
        width: '80px',
        cursor: 'pointer',
        ...style
      }}
    />
  );
}
''',

    "DeskCovers.tsx": '''
'use client';
import React, { useState } from 'react';
import FloatingPanel from './FloatingPanel';
import ToolsPanel from './ToolsPanel';
import ThreeViewer from './ThreeViewer';
import DeskObject from './DeskObject';

export default function DeskCovers() {
  const [showTools, setShowTools] = useState(false);
  const [showViewer, setShowViewer] = useState(false);

  return (
    <>
      <DeskObject
        imageSrc="/desk/coffee-mug.png"
        alt="Coffee Mug"
        onClick={() => setShowTools(true)}
        style={{ bottom: '80px', left: '100px' }}
      />
      <DeskObject
        imageSrc="/desk/postit-note.png"
        alt="Post-it Note"
        onClick={() => setShowViewer(true)}
        style={{ bottom: '100px', left: '200px' }}
      />
      {showTools && (
        <FloatingPanel id="ToolsPanel" title="Tools Panel" defaultPos={{ x: 100, y: 100 }}>
          <ToolsPanel />
        </FloatingPanel>
      )}
      {showViewer && (
        <FloatingPanel id="ThreeViewer" title="3D Viewer" defaultPos={{ x: 300, y: 100 }}>
          <ThreeViewer />
        </FloatingPanel>
      )}
    </>
  );
}
'''
}

for name, code in files.items():
    dest = components_dir / name
    dest.write_text(code.strip(), encoding="utf-8")
    print(f"✅ Created {dest}")

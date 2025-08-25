import os

# Directory setup
COMP = 'components'
PAGES = 'pages'
os.makedirs(COMP, exist_ok=True)
os.makedirs(PAGES, exist_ok=True)

files = {
    os.path.join(COMP, 'FloatingPanel.tsx'): """'use client';
import React, { useRef, useState } from 'react';

export default function FloatingPanel({
  children, default: def, title = '', id = ''
}: {
  children: React.ReactNode,
  default: { x: number, y: number, width: number, height: number },
  title?: string,
  id?: string,
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: def.x, y: def.y });
  const [dragging, setDragging] = useState(false);
  const [snapActive, setSnapActive] = useState(false);
  const [snapGlow, setSnapGlow] = useState(0);

  // Snap zones
  const snapZones = [
    { x: 30, y: 60 },
    { x: 320, y: 80 },
    { x: 1080, y: 110 }
  ];
  function handleMouseDown(e: React.MouseEvent) {
    if (e.button !== 0) return;
    setDragging(true);
    e.preventDefault();
  }
  function handleMouseUp(e: MouseEvent) {
    setDragging(false);
    setSnapActive(false);
    setSnapGlow(0);
  }
  function handleMouseMove(e: MouseEvent) {
    if (!dragging) return;
    let x = e.clientX - (def.width / 2);
    let y = e.clientY - 24;
    let snap = false;
    let glow = 0;
    if (e.ctrlKey) {
      let closest = null, minDist = 99999;
      for (let z of snapZones) {
        let d = Math.hypot(x - z.x, y - z.y);
        if (d < minDist) { minDist = d; closest = z; }
      }
      if (minDist < 40) {
        x = closest.x;
        y = closest.y;
        snap = true;
        glow = 1;
      } else if (minDist < 120) {
        snap = true;
        glow = (120 - minDist) / 120;
      }
    }
    setSnapActive(snap);
    setSnapGlow(glow);
    setPos({ x, y });
  }
  React.useEffect(() => {
    if (!dragging) return;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  });

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        width: def.width,
        height: def.height,
        background: '#23232b',
        color: '#eee',
        borderRadius: 10,
        boxShadow: snapActive
          ? `0 0 ${12 + snapGlow * 12}px 4px ${snapGlow === 1 ? '#fff' : \`rgba(255,0,0,\${snapGlow * 0.7})\`}`
          : '0 4px 16px 0 #0a0a12',
        border: '1.5px solid #32323d',
        zIndex: 100,
        cursor: dragging ? 'grabbing' : 'grab',
        transition: snapGlow === 1 ? 'box-shadow 0.08s' : 'box-shadow 0.25s'
      }}
      onMouseDown={handleMouseDown}
    >
      <div style={{ fontWeight: 700, fontSize: 15, padding: 6 }}>{title}</div>
      <div style={{ width: '100%', height: '100%' }}>{children}</div>
    </div>
  );
}
""",

    os.path.join(COMP, 'LayerPanel.tsx'): """'use client';
export default function LayerPanel() {
  return <div style={{padding:16}}>Layers<br/>[panel]</div>;
}
""",

    os.path.join(COMP, 'FontSelector.tsx'): """'use client';
export default function FontSelector() {
  return <div style={{padding:16}}>Font Selector<br/>[panel]</div>;
}
""",

    os.path.join(COMP, 'SceneEditor.tsx'): """'use client';
export default function SceneEditor() {
  return <div style={{padding:16}}>Scene Editor<br/>3D preview will appear here</div>;
}
""",

    os.path.join(PAGES, 'index.tsx'): """'use client';
import FloatingPanel from '../components/FloatingPanel';
import LayerPanel from '../components/LayerPanel';
import FontSelector from '../components/FontSelector';
import SceneEditor from '../components/SceneEditor';

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#191a23' }}>
      <FloatingPanel default={{ x: 30, y: 60, width: 220, height: 220 }} title="Layers" id="layers">
        <LayerPanel />
      </FloatingPanel>
      <FloatingPanel default={{ x: 320, y: 80, width: 700, height: 420 }} title="Scene Editor" id="scene">
        <SceneEditor />
      </FloatingPanel>
      <FloatingPanel default={{ x: 1080, y: 110, width: 240, height: 180 }} title="Font Selector" id="font">
        <FontSelector />
      </FloatingPanel>
    </div>
  );
}
"""
}

for path, content in files.items():
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✔️ Wrote {path}")

print("\nAll core panel code replaced. Run `npm run dev` and test snapping, movement, and glow.")

import os

FLOATING_PANEL_PATH = os.path.join('components', 'FloatingPanel.tsx')

floating_panel_code = ''''use client';
import React, { useRef, useState } from 'react';
import { Rnd } from 'react-rnd';

export default function FloatingPanel({children, ...props}) {
  const [dragging, setDragging] = useState(false);
  const [snapActive, setSnapActive] = useState(false);
  const [snapTarget, setSnapTarget] = useState(null);

  const handleDragStart = (e) => {
    setDragging(true);
    setSnapActive(e.ctrlKey);
  };

  const handleDragStop = () => {
    setDragging(false);
    setSnapActive(false);
    setSnapTarget(null);
  };

  // Dummy snap logic — replace with your own for advanced snap-to-panel
  const handleDrag = (e, d) => {
    if (!snapActive) return;
    // Example: Snap to left edge if close
    if (d.x < 30 && d.x > -30) setSnapTarget('left');
    else setSnapTarget(null);
  };

  // White glow when ctrl-dragging, stronger when about to snap
  let glow = '';
  if (dragging && snapActive) {
    glow = snapTarget
      ? '0 0 32px 10px white, 0 0 64px 16px white'
      : '0 0 10px 3px #fff8';
  }

  return (
    <Rnd
      bounds="parent"
      onDragStart={handleDragStart}
      onDragStop={handleDragStop}
      onDrag={handleDrag}
      style={{
        borderRadius: 12,
        boxShadow: glow,
        transition: snapTarget ? 'box-shadow 0.15s cubic-bezier(.4,2,.2,1)' : 'box-shadow 0.18s',
        background: '#222',
        color: '#eee',
        padding: 0,
        zIndex: 100,
        border: snapActive ? '2px solid #fff' : 'none'
      }}
      {...props}
    >
      {children}
      {/* Optional: Snap overlay */}
      {dragging && snapActive && snapTarget && (
        <div style={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          border: '4px solid white',
          borderRadius: 12,
          boxShadow: '0 0 32px 8px white'
        }}/>
      )}
    </Rnd>
  );
}
'''

def safe_write(path, code):
    bak = path + '.bak'
    if os.path.exists(path):
        os.rename(path, bak)
        print(f'✔️ Backed up {path} to {bak}')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(code)
        print(f'✔️ Wrote new {path}')

os.makedirs('components', exist_ok=True)
safe_write(FLOATING_PANEL_PATH, floating_panel_code)
print('✔️ FloatingPanel.tsx updated with Ctrl+snap+white glow (restore .bak to undo).')

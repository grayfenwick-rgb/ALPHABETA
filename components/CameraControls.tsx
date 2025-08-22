'use client';
import React from 'react';

const MODES = ['perspective','orthographic','isometric'] as const;
type Mode = typeof MODES[number];

export default function CameraControls({
  onSnap, mode, setMode, autoCenter, setAutoCenter
}:{
  onSnap?:(v:'top'|'left'|'right'|'rear')=>void,
  mode: Mode,
  setMode:(m:Mode)=>void,
  autoCenter: boolean,
  setAutoCenter:(a:boolean)=>void
}) {
  return (
    <div>
      <h3>Camera Controls</h3>
      <div style={{display:'flex',gap:9,marginBottom:8}}>
        {MODES.map(m =>
          <button key={m} className="select" onClick={()=>setMode(m)} style={{fontWeight:mode===m?900:400}}>
            {m[0].toUpperCase()+m.slice(1)}
          </button>
        )}
        <button className="select" onClick={()=>setAutoCenter(a=>!a)}>{autoCenter?'✔️':'❌'} Auto Center</button>
      </div>
      <div style={{display:'flex',gap:7}}>
        <button className="select" onClick={()=>onSnap?.('top')}>Top</button>
        <button className="select" onClick={()=>onSnap?.('left')}>Left</button>
        <button className="select" onClick={()=>onSnap?.('right')}>Right</button>
        <button className="select" onClick={()=>onSnap?.('rear')}>Rear</button>
      </div>
    </div>
  );
}

<<<<<<< HEAD
'use client';
import React, { useState } from 'react';

const DEMO_ANGLES = [
  { name:'Front', src:'/preview_front.png' },
  { name:'Left', src:'/preview_left.png' },
  { name:'Right', src:'/preview_right.png' },
  { name:'Top', src:'/preview_top.png' }
];

export default function SnapshotCarousel({ onCapture }:{ onCapture?:(steps:number)=>void }) {
  const [current, setCurrent] = useState(0);
  return (
    <div>
      <h3>Snapshot Carousel</h3>
      <div style={{display:'flex',alignItems:'center',gap:7}}>
        <button className="select" onClick={()=>setCurrent((c)=>c>0?c-1:DEMO_ANGLES.length-1)}>◀️</button>
        <img src={DEMO_ANGLES[current].src} alt={DEMO_ANGLES[current].name} style={{height:48,width:48,borderRadius:6,background:'#232b39'}}/>
        <button className="select" onClick={()=>setCurrent((c)=>c<DEMO_ANGLES.length-1?c+1:0)}>▶️</button>
        <div style={{marginLeft:10}}>{DEMO_ANGLES[current].name}</div>
        <button className="select" onClick={()=>onCapture?.(DEMO_ANGLES.length)}>📸 Capture All</button>
      </div>
    </div>
  );
}
=======
'use client';
import React, { useState } from 'react';

const DEMO_ANGLES = [
  { name:'Front', src:'/preview_front.png' },
  { name:'Left', src:'/preview_left.png' },
  { name:'Right', src:'/preview_right.png' },
  { name:'Top', src:'/preview_top.png' }
];

export default function SnapshotCarousel({ onCapture }:{ onCapture?:(steps:number)=>void }) {
  const [current, setCurrent] = useState(0);
  return (
    <div>
      <h3>Snapshot Carousel</h3>
      <div style={{display:'flex',alignItems:'center',gap:7}}>
        <button className="select" onClick={()=>setCurrent((c)=>c>0?c-1:DEMO_ANGLES.length-1)}>◀️</button>
        <img src={DEMO_ANGLES[current].src} alt={DEMO_ANGLES[current].name} style={{height:48,width:48,borderRadius:6,background:'#232b39'}}/>
        <button className="select" onClick={()=>setCurrent((c)=>c<DEMO_ANGLES.length-1?c+1:0)}>▶️</button>
        <div style={{marginLeft:10}}>{DEMO_ANGLES[current].name}</div>
        <button className="select" onClick={()=>onCapture?.(DEMO_ANGLES.length)}>📸 Capture All</button>
      </div>
    </div>
  );
}
>>>>>>> ffee54565313e6c582194a584a21b586b60de224

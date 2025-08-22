<<<<<<< HEAD
'use client';
import React from 'react';

const STYLES = [
  'Photorealistic','Neon','Graffiti','Steampunk','Retro','Vaporwave','Low-poly','Cartoon'
];

export default function StyleSelector({ value, onChange }:{ value:string, onChange:(v:string)=>void }) {
  return (
    <div>
      <h3>Style Selector</h3>
      <div style={{display:'flex',gap:9,flexWrap:'wrap'}}>
        {STYLES.map(style =>
          <button className="select" key={style} onClick={()=>onChange(style)}
            style={{fontWeight:value===style?900:400,background:value===style?'#232b39':'#181f2c'}}>
            {style}
          </button>
        )}
        <button className="select" style={{fontWeight:800}} onClick={()=>{
          const s = STYLES[Math.floor(Math.random()*STYLES.length)];
          onChange(s);
        }}>🎲 Random Style</button>
      </div>
    </div>
  );
}
=======
'use client';
import React from 'react';

const STYLES = [
  'Photorealistic','Neon','Graffiti','Steampunk','Retro','Vaporwave','Low-poly','Cartoon'
];

export default function StyleSelector({ value, onChange }:{ value:string, onChange:(v:string)=>void }) {
  return (
    <div>
      <h3>Style Selector</h3>
      <div style={{display:'flex',gap:9,flexWrap:'wrap'}}>
        {STYLES.map(style =>
          <button className="select" key={style} onClick={()=>onChange(style)}
            style={{fontWeight:value===style?900:400,background:value===style?'#232b39':'#181f2c'}}>
            {style}
          </button>
        )}
        <button className="select" style={{fontWeight:800}} onClick={()=>{
          const s = STYLES[Math.floor(Math.random()*STYLES.length)];
          onChange(s);
        }}>🎲 Random Style</button>
      </div>
    </div>
  );
}
>>>>>>> ffee54565313e6c582194a584a21b586b60de224

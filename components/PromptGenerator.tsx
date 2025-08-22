<<<<<<< HEAD
'use client';
import React from 'react';

const DEMO_PROMPTS = [
  "Graffiti style A in neon lights",
  "Chrome B with water droplets",
  "Retro wave C",
  "Steampunk D with cogs",
  "Vaporwave E"
];

export default function PromptGenerator({ onPick }:{ onPick?:(p:string)=>void }) {
  return (
    <div>
      <h3>Prompt Generator</h3>
      <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>
        {DEMO_PROMPTS.map((p,i) =>
          <button key={i} className="select" onClick={()=>onPick?.(p)}>{p}</button>
        )}
        <button className="select" style={{fontWeight:800}} onClick={()=>{
          const p = DEMO_PROMPTS[Math.floor(Math.random()*DEMO_PROMPTS.length)];
          onPick?.(p);
        }}>🎲 Random Prompt</button>
      </div>
    </div>
  );
}
=======
'use client';
import React from 'react';

const DEMO_PROMPTS = [
  "Graffiti style A in neon lights",
  "Chrome B with water droplets",
  "Retro wave C",
  "Steampunk D with cogs",
  "Vaporwave E"
];

export default function PromptGenerator({ onPick }:{ onPick?:(p:string)=>void }) {
  return (
    <div>
      <h3>Prompt Generator</h3>
      <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>
        {DEMO_PROMPTS.map((p,i) =>
          <button key={i} className="select" onClick={()=>onPick?.(p)}>{p}</button>
        )}
        <button className="select" style={{fontWeight:800}} onClick={()=>{
          const p = DEMO_PROMPTS[Math.floor(Math.random()*DEMO_PROMPTS.length)];
          onPick?.(p);
        }}>🎲 Random Prompt</button>
      </div>
    </div>
  );
}
>>>>>>> ffee54565313e6c582194a584a21b586b60de224

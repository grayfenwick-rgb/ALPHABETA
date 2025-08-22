<<<<<<< HEAD
'use client';
import React, { useState, useRef } from 'react';

const PRESET_FONTS = [
  'Arial','Impact','Georgia','Courier New','Inter','Roboto','Oswald','Lobster'
];

export default function FontSelector({onFont}:{onFont?:(f:string)=>void}){
  const [fonts, setFonts] = useState([...PRESET_FONTS]);
  const [active, setActive] = useState('Inter');
  const ref = useRef<HTMLInputElement>(null);

  function handleDrop(e:any){
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if(file && file.name.match(/\.(ttf|otf)$/i)){
      const url = URL.createObjectURL(file);
      const name = file.name.replace(/\..+$/,'');
      setFonts(f=>[...f, name]);
      setActive(name);
      // Actually apply font: load via @font-face (left for advanced users)
      onFont?.(name);
    }
  }

  return (
    <div style={{padding:'8px 2px'}} onDragOver={e=>e.preventDefault()} onDrop={handleDrop}>
      <h3>Font Selector</h3>
      <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>
        {fonts.map(f=>
          <button className="select" style={{
            fontFamily:f, fontSize:18, fontWeight:800, padding:'6px 14px',
            background: active===f ? '#333' : '#202a3e'
          }} key={f} onClick={()=>{setActive(f);onFont?.(f);}}>{f}</button>
        )}
      </div>
      <div style={{marginTop:7,fontSize:13,color:'#9aa4b2'}}>
        Drag and drop .ttf or .otf here to add custom font
      </div>
      <input ref={ref} type="file" style={{display:'none'}} accept=".ttf,.otf" />
    </div>
  );
}
=======
'use client';
import React, { useState, useRef } from 'react';

const PRESET_FONTS = [
  'Arial','Impact','Georgia','Courier New','Inter','Roboto','Oswald','Lobster'
];

export default function FontSelector({onFont}:{onFont?:(f:string)=>void}){
  const [fonts, setFonts] = useState([...PRESET_FONTS]);
  const [active, setActive] = useState('Inter');
  const ref = useRef<HTMLInputElement>(null);

  function handleDrop(e:any){
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if(file && file.name.match(/\.(ttf|otf)$/i)){
      const url = URL.createObjectURL(file);
      const name = file.name.replace(/\..+$/,'');
      setFonts(f=>[...f, name]);
      setActive(name);
      // Actually apply font: load via @font-face (left for advanced users)
      onFont?.(name);
    }
  }

  return (
    <div style={{padding:'8px 2px'}} onDragOver={e=>e.preventDefault()} onDrop={handleDrop}>
      <h3>Font Selector</h3>
      <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>
        {fonts.map(f=>
          <button className="select" style={{
            fontFamily:f, fontSize:18, fontWeight:800, padding:'6px 14px',
            background: active===f ? '#333' : '#202a3e'
          }} key={f} onClick={()=>{setActive(f);onFont?.(f);}}>{f}</button>
        )}
      </div>
      <div style={{marginTop:7,fontSize:13,color:'#9aa4b2'}}>
        Drag and drop .ttf or .otf here to add custom font
      </div>
      <input ref={ref} type="file" style={{display:'none'}} accept=".ttf,.otf" />
    </div>
  );
}
>>>>>>> ffee54565313e6c582194a584a21b586b60de224

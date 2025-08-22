<<<<<<< HEAD
'use client';
import React, { useState } from 'react';

export default function ColorPalettePanel({
  palette,
  onPick,
  onSave
}:{
  palette:string[],
  onPick:(c:string)=>void,
  onSave?:(p:string[])=>void
}) {
  const [newCol, setNewCol] = useState("#c1c1c1");
  function add(){
    if(!palette.includes(newCol)) onSave?.([...palette, newCol]);
  }
  function remove(col:string){
    onSave?.(palette.filter(c=>c!==col));
  }
  return (
    <div>
      <h3>Palette</h3>
      <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:8}}>
        {palette.map(c=>
          <span key={c} style={{
            width:30, height:30, borderRadius:8, display:'inline-block', background:c,
            border:'2px solid #232b39',cursor:'pointer'
          }} onClick={()=>onPick(c)} title="Apply color">
            <span style={{
              display:'block',textAlign:'center',color:'#111',fontSize:10,fontWeight:800
            }}>{c.replace('#','')}</span>
            <button onClick={e=>{e.stopPropagation();remove(c);}} style={{fontSize:12,padding:'1px 3px',marginTop:2,background:'#fff4',border:'none',borderRadius:4}}>✕</button>
          </span>
        )}
        <input type="color" value={newCol} onChange={e=>setNewCol(e.target.value)} />
        <button className="select" style={{fontSize:13,padding:'4px 8px'}} onClick={add}>+ Add</button>
      </div>
    </div>
  );
}
=======
'use client';
import React, { useState } from 'react';

export default function ColorPalettePanel({
  palette,
  onPick,
  onSave
}:{
  palette:string[],
  onPick:(c:string)=>void,
  onSave?:(p:string[])=>void
}) {
  const [newCol, setNewCol] = useState("#c1c1c1");
  function add(){
    if(!palette.includes(newCol)) onSave?.([...palette, newCol]);
  }
  function remove(col:string){
    onSave?.(palette.filter(c=>c!==col));
  }
  return (
    <div>
      <h3>Palette</h3>
      <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:8}}>
        {palette.map(c=>
          <span key={c} style={{
            width:30, height:30, borderRadius:8, display:'inline-block', background:c,
            border:'2px solid #232b39',cursor:'pointer'
          }} onClick={()=>onPick(c)} title="Apply color">
            <span style={{
              display:'block',textAlign:'center',color:'#111',fontSize:10,fontWeight:800
            }}>{c.replace('#','')}</span>
            <button onClick={e=>{e.stopPropagation();remove(c);}} style={{fontSize:12,padding:'1px 3px',marginTop:2,background:'#fff4',border:'none',borderRadius:4}}>✕</button>
          </span>
        )}
        <input type="color" value={newCol} onChange={e=>setNewCol(e.target.value)} />
        <button className="select" style={{fontSize:13,padding:'4px 8px'}} onClick={add}>+ Add</button>
      </div>
    </div>
  );
}
>>>>>>> ffee54565313e6c582194a584a21b586b60de224

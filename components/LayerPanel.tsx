<<<<<<< HEAD
'use client';
import React from 'react';

type BlendMode = 'normal' | 'multiply' | 'screen' | 'overlay';
type Layer = {
  id: string;
  name: string;
  type: 'texture'|'color'|'effect'|'style';
  visible: boolean;
  blend: BlendMode;
  data: any; // texture url, color code, etc.
};

export default function LayerPanel({
  layers,
  onChange
}:{
  layers: Layer[],
  onChange: (layers: Layer[])=>void
}) {
  function toggle(id:string){
    onChange(layers.map(l=>l.id===id ? {...l, visible:!l.visible}:l));
  }
  function del(id:string){
    onChange(layers.filter(l=>l.id!==id));
  }
  function up(id:string){
    const idx = layers.findIndex(l=>l.id===id);
    if(idx>0){
      const arr = [...layers];
      [arr[idx-1], arr[idx]] = [arr[idx], arr[idx-1]];
      onChange(arr);
    }
  }
  function down(id:string){
    const idx = layers.findIndex(l=>l.id===id);
    if(idx>-1 && idx<layers.length-1){
      const arr = [...layers];
      [arr[idx], arr[idx+1]] = [arr[idx+1], arr[idx]];
      onChange(arr);
    }
  }
  function blend(id:string, b:BlendMode){
    onChange(layers.map(l=>l.id===id ? {...l, blend:b}:l));
  }

  return (
    <div>
      <h3>Layers</h3>
      <div>
        {layers.map((l,i)=>(
          <div key={l.id} style={{
            display:'flex', alignItems:'center', background: l.visible ? '#252a35':'#181e28', padding:'6px 10px', marginBottom:6, borderRadius:7
          }}>
            <span style={{fontWeight:800, marginRight:9, width:20}}>{i+1}</span>
            <span style={{marginRight:10}}>{l.name}</span>
            <select value={l.blend} onChange={e=>blend(l.id, e.target.value as BlendMode)} style={{marginRight:8}}>
              <option value="normal">normal</option>
              <option value="multiply">multiply</option>
              <option value="screen">screen</option>
              <option value="overlay">overlay</option>
            </select>
            <button className="select" style={{marginRight:6}} onClick={()=>toggle(l.id)}>{l.visible?'👁':'🚫'}</button>
            <button className="select" style={{marginRight:6}} onClick={()=>up(l.id)}>▲</button>
            <button className="select" style={{marginRight:6}} onClick={()=>down(l.id)}>▼</button>
            <button className="select" onClick={()=>del(l.id)}>🗑</button>
          </div>
        ))}
      </div>
    </div>
  )
}
=======
'use client';
import React from 'react';

type BlendMode = 'normal' | 'multiply' | 'screen' | 'overlay';
type Layer = {
  id: string;
  name: string;
  type: 'texture'|'color'|'effect'|'style';
  visible: boolean;
  blend: BlendMode;
  data: any; // texture url, color code, etc.
};

export default function LayerPanel({
  layers,
  onChange
}:{
  layers: Layer[],
  onChange: (layers: Layer[])=>void
}) {
  function toggle(id:string){
    onChange(layers.map(l=>l.id===id ? {...l, visible:!l.visible}:l));
  }
  function del(id:string){
    onChange(layers.filter(l=>l.id!==id));
  }
  function up(id:string){
    const idx = layers.findIndex(l=>l.id===id);
    if(idx>0){
      const arr = [...layers];
      [arr[idx-1], arr[idx]] = [arr[idx], arr[idx-1]];
      onChange(arr);
    }
  }
  function down(id:string){
    const idx = layers.findIndex(l=>l.id===id);
    if(idx>-1 && idx<layers.length-1){
      const arr = [...layers];
      [arr[idx], arr[idx+1]] = [arr[idx+1], arr[idx]];
      onChange(arr);
    }
  }
  function blend(id:string, b:BlendMode){
    onChange(layers.map(l=>l.id===id ? {...l, blend:b}:l));
  }

  return (
    <div>
      <h3>Layers</h3>
      <div>
        {layers.map((l,i)=>(
          <div key={l.id} style={{
            display:'flex', alignItems:'center', background: l.visible ? '#252a35':'#181e28', padding:'6px 10px', marginBottom:6, borderRadius:7
          }}>
            <span style={{fontWeight:800, marginRight:9, width:20}}>{i+1}</span>
            <span style={{marginRight:10}}>{l.name}</span>
            <select value={l.blend} onChange={e=>blend(l.id, e.target.value as BlendMode)} style={{marginRight:8}}>
              <option value="normal">normal</option>
              <option value="multiply">multiply</option>
              <option value="screen">screen</option>
              <option value="overlay">overlay</option>
            </select>
            <button className="select" style={{marginRight:6}} onClick={()=>toggle(l.id)}>{l.visible?'👁':'🚫'}</button>
            <button className="select" style={{marginRight:6}} onClick={()=>up(l.id)}>▲</button>
            <button className="select" style={{marginRight:6}} onClick={()=>down(l.id)}>▼</button>
            <button className="select" onClick={()=>del(l.id)}>🗑</button>
          </div>
        ))}
      </div>
    </div>
  )
}
>>>>>>> ffee54565313e6c582194a584a21b586b60de224

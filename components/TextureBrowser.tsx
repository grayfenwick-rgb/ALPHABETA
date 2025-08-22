<<<<<<< HEAD
'use client';
import React, { useState } from 'react';

const DEMO_TEXTURES = [
  {name:'Metal Grid', url:'/ambientcg/metal_grid.jpg'},
  {name:'Rusty Plate', url:'/ambientcg/rust_plate.jpg'},
  {name:'Rough Concrete', url:'/ambientcg/concrete_rough.jpg'}
];

export default function TextureBrowser({ onPick }:{ onPick:(url:string)=>void }) {
  const [query, setQuery] = useState('');
  const filtered = DEMO_TEXTURES.filter(t => t.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <div>
      <h3>Texture Browser</h3>
      <input
        type="text"
        placeholder="Search textures…"
        value={query}
        onChange={e=>setQuery(e.target.value)}
        style={{marginBottom:8,display:'block',width:'100%',fontSize:15,padding:'4px 10px'}}
      />
      <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
        {filtered.map((t,i)=>
          <div key={i} style={{cursor:'pointer',background:'#222b',borderRadius:7,padding:4}} onClick={()=>onPick(t.url)}>
            <img src={t.url} alt={t.name} style={{width:66,height:66,borderRadius:5,background:'#232b39',objectFit:'cover'}}/>
            <div style={{fontSize:13,color:'#aaf',marginTop:3}}>{t.name}</div>
          </div>
        )}
      </div>
    </div>
  );
}
=======
'use client';
import React, { useState } from 'react';

const DEMO_TEXTURES = [
  {name:'Metal Grid', url:'/ambientcg/metal_grid.jpg'},
  {name:'Rusty Plate', url:'/ambientcg/rust_plate.jpg'},
  {name:'Rough Concrete', url:'/ambientcg/concrete_rough.jpg'}
];

export default function TextureBrowser({ onPick }:{ onPick:(url:string)=>void }) {
  const [query, setQuery] = useState('');
  const filtered = DEMO_TEXTURES.filter(t => t.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <div>
      <h3>Texture Browser</h3>
      <input
        type="text"
        placeholder="Search textures…"
        value={query}
        onChange={e=>setQuery(e.target.value)}
        style={{marginBottom:8,display:'block',width:'100%',fontSize:15,padding:'4px 10px'}}
      />
      <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
        {filtered.map((t,i)=>
          <div key={i} style={{cursor:'pointer',background:'#222b',borderRadius:7,padding:4}} onClick={()=>onPick(t.url)}>
            <img src={t.url} alt={t.name} style={{width:66,height:66,borderRadius:5,background:'#232b39',objectFit:'cover'}}/>
            <div style={{fontSize:13,color:'#aaf',marginTop:3}}>{t.name}</div>
          </div>
        )}
      </div>
    </div>
  );
}
>>>>>>> ffee54565313e6c582194a584a21b586b60de224

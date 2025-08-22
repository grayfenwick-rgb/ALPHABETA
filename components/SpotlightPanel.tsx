<<<<<<< HEAD
'use client';
import React from 'react';

const DEMO_ITEMS = [
  { name:'Neon A', img:'/demo_a.png', user:'User1' },
  { name:'Chrome B', img:'/demo_b.png', user:'User2' }
];

export default function SpotlightPanel() {
  return (
    <div>
      <h3>Spotlight</h3>
      <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>
        {DEMO_ITEMS.map((item,i)=>
          <div key={i} style={{background:'#161b26',padding:9,borderRadius:9,width:110,textAlign:'center'}}>
            <img src={item.img} alt={item.name} style={{width:70,height:70,borderRadius:8,marginBottom:6,background:'#222'}}/>
            <div style={{fontWeight:800,fontSize:15}}>{item.name}</div>
            <div style={{color:'#8cc'}}>@{item.user}</div>
          </div>
        )}
      </div>
      <div style={{marginTop:13}}>
        <button className="select" style={{padding:'6px 16px'}}>+ Upload Creation</button>
      </div>
    </div>
  );
}
=======
'use client';
import React from 'react';

const DEMO_ITEMS = [
  { name:'Neon A', img:'/demo_a.png', user:'User1' },
  { name:'Chrome B', img:'/demo_b.png', user:'User2' }
];

export default function SpotlightPanel() {
  return (
    <div>
      <h3>Spotlight</h3>
      <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>
        {DEMO_ITEMS.map((item,i)=>
          <div key={i} style={{background:'#161b26',padding:9,borderRadius:9,width:110,textAlign:'center'}}>
            <img src={item.img} alt={item.name} style={{width:70,height:70,borderRadius:8,marginBottom:6,background:'#222'}}/>
            <div style={{fontWeight:800,fontSize:15}}>{item.name}</div>
            <div style={{color:'#8cc'}}>@{item.user}</div>
          </div>
        )}
      </div>
      <div style={{marginTop:13}}>
        <button className="select" style={{padding:'6px 16px'}}>+ Upload Creation</button>
      </div>
    </div>
  );
}
>>>>>>> ffee54565313e6c582194a584a21b586b60de224

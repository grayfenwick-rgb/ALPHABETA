<<<<<<< HEAD
'use client';
import React, { useRef, useState } from 'react';
import ThreeViewer from '../components/ThreeViewer';
import TextureBrowser from '../components/TextureBrowser';
import CameraControls from '../components/CameraControls';
import SnapshotCarousel from '../components/SnapshotCarousel';
import StyleSelector from '../components/StyleSelector';
import PromptGenerator from '../components/PromptGenerator';
import SpotlightPanel from '../components/SpotlightPanel';

export default function Page() {
  const viewerRef = useRef<any>(null);
  const [texture, setTexture] = useState<string>('');
  const [mode, setMode] = useState<'perspective'|'orthographic'|'isometric'>('perspective');
  const [autoCenter, setAutoCenter] = useState(true);
  const [style, setStyle] = useState('photorealistic');
  const [prompt, setPrompt] = useState('');
  const [lang, setLang] = useState('en');

  const handleSnap = (view:'top'|'left'|'right'|'rear')=>{
    if(viewerRef.current && viewerRef.current.setRotationY) {
      if(view==='top') viewerRef.current.setRotationY(0);
      if(view==='left') viewerRef.current.setRotationY(-Math.PI/2);
      if(view==='right') viewerRef.current.setRotationY(Math.PI/2);
      if(view==='rear') viewerRef.current.setRotationY(Math.PI);
    }
  };

  const handleCapture = (steps:number)=>{
    // Example: Capture PNGs at rotations, download them (stub)
    alert(`Would capture ${steps} angles (carousel spin)`);
  };

  const handleMagicWand = async()=>{
    setPrompt('Generating...');
    const { submitToHorde, pollHorde } = await import('../utils/stablehorde');
    try {
      const id = await submitToHorde(prompt, style);
      const img = await pollHorde(id);
      setTexture(img);
      setPrompt('Done!');
    } catch(e:any){
      setPrompt('Failed: ' + (e?.message || e));
    }
  };

  return (
    <div style={{display:'flex', flexDirection:'column', minHeight:'100vh', background:'#141923'}}>
      <div style={{display:'flex', alignItems:'center', padding:'12px 32px', borderBottom:'1px solid #222'}}>
        <img src="/alphabeta_logo.png" alt="AlphaBeta" style={{height:42, marginRight:14}} />
        <h1 style={{margin:0, fontWeight:900, letterSpacing:'0.05em'}}>AlphaBeta</h1>
        <div style={{marginLeft:'auto', display:'flex', alignItems:'center', gap:14}}>
          <label style={{color:'#9aa4b2', fontWeight:700}}>Language:</label>
          <select className="select" value={lang} onChange={e=>setLang(e.target.value)}>
            <option value="en">English</option>
            <option value="cy">Welsh</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="zh">Chinese</option>
            <option value="ko">Korean</option>
            <option value="pt-BR">Portuguese (BR)</option>
            <option value="ar">Arabic</option>
          </select>
        </div>
      </div>
      <div style={{display:'flex', gap:24, padding:32}}>
        <div style={{flex:'1 1 0', minWidth:460}}>
          <ThreeViewer ref={viewerRef} textureUrl={texture} mode={mode} autoCenter={autoCenter}/>
          <CameraControls onSnap={handleSnap} mode={mode} setMode={setMode} autoCenter={autoCenter} setAutoCenter={setAutoCenter} />
          <SnapshotCarousel onCapture={handleCapture} />
          <StyleSelector value={style} onChange={setStyle}/>
          <div style={{margin:'18px 0 10px 0', display:'flex', gap:10}}>
            <PromptGenerator onPick={setPrompt}/>
            <button className="select" onClick={handleMagicWand}>🪄 Magic Wand</button>
            <span style={{color:'#88f', fontWeight:600}}>{prompt}</span>
          </div>
        </div>
        <div style={{flex:'1 1 0', minWidth:420, maxWidth:460}}>
          <TextureBrowser onPick={setTexture}/>
          <SpotlightPanel/>
        </div>
      </div>
    </div>
  );
}
=======
'use client';
import React, { useRef, useState } from 'react';
import ThreeViewer from '../components/ThreeViewer';
import TextureBrowser from '../components/TextureBrowser';
import CameraControls from '../components/CameraControls';
import SnapshotCarousel from '../components/SnapshotCarousel';
import StyleSelector from '../components/StyleSelector';
import PromptGenerator from '../components/PromptGenerator';
import SpotlightPanel from '../components/SpotlightPanel';

export default function Page() {
  const viewerRef = useRef<any>(null);
  const [texture, setTexture] = useState<string>('');
  const [mode, setMode] = useState<'perspective'|'orthographic'|'isometric'>('perspective');
  const [autoCenter, setAutoCenter] = useState(true);
  const [style, setStyle] = useState('photorealistic');
  const [prompt, setPrompt] = useState('');
  const [lang, setLang] = useState('en');

  const handleSnap = (view:'top'|'left'|'right'|'rear')=>{
    if(viewerRef.current && viewerRef.current.setRotationY) {
      if(view==='top') viewerRef.current.setRotationY(0);
      if(view==='left') viewerRef.current.setRotationY(-Math.PI/2);
      if(view==='right') viewerRef.current.setRotationY(Math.PI/2);
      if(view==='rear') viewerRef.current.setRotationY(Math.PI);
    }
  };

  const handleCapture = (steps:number)=>{
    // Example: Capture PNGs at rotations, download them (stub)
    alert(`Would capture ${steps} angles (carousel spin)`);
  };

  const handleMagicWand = async()=>{
    setPrompt('Generating...');
    const { submitToHorde, pollHorde } = await import('../utils/stablehorde');
    try {
      const id = await submitToHorde(prompt, style);
      const img = await pollHorde(id);
      setTexture(img);
      setPrompt('Done!');
    } catch(e:any){
      setPrompt('Failed: ' + (e?.message || e));
    }
  };

  return (
    <div style={{display:'flex', flexDirection:'column', minHeight:'100vh', background:'#141923'}}>
      <div style={{display:'flex', alignItems:'center', padding:'12px 32px', borderBottom:'1px solid #222'}}>
        <img src="/alphabeta_logo.png" alt="AlphaBeta" style={{height:42, marginRight:14}} />
        <h1 style={{margin:0, fontWeight:900, letterSpacing:'0.05em'}}>AlphaBeta</h1>
        <div style={{marginLeft:'auto', display:'flex', alignItems:'center', gap:14}}>
          <label style={{color:'#9aa4b2', fontWeight:700}}>Language:</label>
          <select className="select" value={lang} onChange={e=>setLang(e.target.value)}>
            <option value="en">English</option>
            <option value="cy">Welsh</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="zh">Chinese</option>
            <option value="ko">Korean</option>
            <option value="pt-BR">Portuguese (BR)</option>
            <option value="ar">Arabic</option>
          </select>
        </div>
      </div>
      <div style={{display:'flex', gap:24, padding:32}}>
        <div style={{flex:'1 1 0', minWidth:460}}>
          <ThreeViewer ref={viewerRef} textureUrl={texture} mode={mode} autoCenter={autoCenter}/>
          <CameraControls onSnap={handleSnap} mode={mode} setMode={setMode} autoCenter={autoCenter} setAutoCenter={setAutoCenter} />
          <SnapshotCarousel onCapture={handleCapture} />
          <StyleSelector value={style} onChange={setStyle}/>
          <div style={{margin:'18px 0 10px 0', display:'flex', gap:10}}>
            <PromptGenerator onPick={setPrompt}/>
            <button className="select" onClick={handleMagicWand}>🪄 Magic Wand</button>
            <span style={{color:'#88f', fontWeight:600}}>{prompt}</span>
          </div>
        </div>
        <div style={{flex:'1 1 0', minWidth:420, maxWidth:460}}>
          <TextureBrowser onPick={setTexture}/>
          <SpotlightPanel/>
        </div>
      </div>
    </div>
  );
}
>>>>>>> ffee54565313e6c582194a584a21b586b60de224

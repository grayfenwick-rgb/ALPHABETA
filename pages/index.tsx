<<<<<<< HEAD
'use client';
import dynamic from "next/dynamic";
import React, { useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import ToolsPanel from '../components/ToolsPanel';
import ThreeViewer from '../components/ThreeViewer';
import LayerPanel from '../components/LayerPanel';
import UndoRedoPanel from '../components/UndoRedoPanel';
import ExportPanel from '../components/ExportPanel';
import ColorPalettePanel from '../components/ColorPalettePanel';
import PresetPanel from '../components/PresetPanel';
import ResetLayoutPanel from '../components/ResetLayoutPanel';
import FontSelector from '../components/FontSelector';
import Keyboard from '../components/Keyboard';
import TextureBrowser from '../components/TextureBrowser';
import StyleSelector from '../components/StyleSelector';
import CameraControls from '../components/CameraControls';
import SnapshotCarousel from '../components/SnapshotCarousel';
import SpotlightPanel from '../components/SpotlightPanel';
import PromptGenerator from '../components/PromptGenerator';
import LEDTicker from '../components/LEDTicker';

const ARModelViewer = dynamic(() => import("../components/ARModelViewer"), { ssr: false });

const defaultWindows = [
  { key:'three', title:'3D Viewer', x:340, y:100, w:660, h:500 },
  { key:'tools', title:'Tools', x:1050, y:100, w:370, h:540 },
  { key:'ar', title:'AR Viewer', x:1050, y:650, w:380, h:230 },
  { key:'layers', title:'Layers', x:1450, y:350, w:310, h:190 },
  { key:'undo', title:'Undo/Redo', x:700, y:650, w:200, h:80 },
  { key:'export', title:'Export', x:900, y:650, w:190, h:80 },
  { key:'palette', title:'Palette', x:1250, y:560, w:230, h:160 },
  { key:'presets', title:'Presets', x:350, y:650, w:230, h:110 },
  { key:'reset', title:'Reset Layout', x:1500, y:650, w:160, h:80 },
  { key:'font', title:'Font Selector', x:40, y:100, w:270, h:170 },
  { key:'keyboard', title:'Keyboard', x:40, y:280, w:320, h:180 },
  { key:'textures', title:'Textures', x:40, y:470, w:320, h:230 },
  { key:'styles', title:'Style Selector', x:380, y:40, w:300, h:80 },
  { key:'controls', title:'Camera Controls', x:1050, y:560, w:320, h:90 },
  { key:'carousel', title:'Snapshot Carousel', x:700, y:40, w:340, h:80 },
  { key:'spotlight', title:'Spotlight', x:1400, y:200, w:380, h:260 },
  { key:'prompt', title:'Prompt Generator', x:40, y:40, w:320, h:60 }
];

function Page() {
  const viewerRef = useRef<any>(null);

  // Centralized state for all tools and 3D controls
  const [text, setText] = useState("A");
  const [font, setFont] = useState("/fonts/Roboto-Bold.ttf");
  const [bevelEnabled, setBevelEnabled] = useState(true);
  const [bevelSize, setBevelSize] = useState(0.03);
  const [bevelThickness, setBevelThickness] = useState(0.04);
  const [extrude, setExtrude] = useState(0.15);
  const [rotationY, setRotationY] = useState(0);
  const [scale, setScale] = useState(1.17);
  const [textureUrl, setTextureUrl] = useState("");
  const [modelUrl, setModelUrl] = useState("");

  const [mode, setMode] = useState<'perspective'|'orthographic'|'isometric'>('perspective');
  const [autoCenter, setAutoCenter] = useState(true);
  const [style, setStyle] = useState('photorealistic');
  const [prompt, setPrompt] = useState('');
  const [lang, setLang] = useState('en');
  const [windows, setWindows] = useState(defaultWindows);

  const [layers, setLayers] = useState<any[]>([]);
  const [palette, setPalette] = useState<string[]>(['#ffffff', '#c2c2c2', '#d94f4f']);
  const [presets, setPresets] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Floating window fullscreen/maximize state
  const [fullscreen, setFullscreen] = useState<{[k:string]:boolean}>({});
  const [lastWindowState, setLastWindowState] = useState<{[k:string]:any}>({});

  // Master Hide/Show for all panels
  const [allHidden, setAllHidden] = useState(false);

  // Radial tools menu (no "TOOLS" label in ToolsPanel)
  const [toolsOpen, setToolsOpen] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const radialTools = ["Move", "Select", "Brush", "Eraser", "Fill", "Eyedropper", "Crop"];

  function pushHistory(state:any){
    setHistory(h=>[...h.slice(0,historyIndex+1),state]);
    setHistoryIndex(i=>i+1);
  }
  function undo(){
    if(historyIndex>0){
      setHistoryIndex(i=>i-1);
    }
  }
  function redo(){
    if(historyIndex<history.length-1){
      setHistoryIndex(i=>i+1);
    }
  }

  function moveWindow(key:string, data:any) {
    setWindows(ws=>ws.map(w=>w.key===key ? {...w, ...data} : w));
  }

  // Double-click panel header handler for fullscreen toggle
  function handlePanelHeaderDoubleClick(key:string, win:any) {
    setFullscreen(fs => {
      if (!fs[key]) {
        setLastWindowState(prev => ({
          ...prev,
          [key]: { x: win.x, y: win.y, w: win.w, h: win.h }
        }));
      }
      return { ...fs, [key]: !fs[key] };
    });
  }

  const LANGS = [
    {value:'en', label:'English'}, {value:'cy', label:'Welsh'}, {value:'es', label:'Spanish'},
    {value:'fr', label:'French'}, {value:'de', label:'German'}, {value:'it', label:'Italian'},
    {value:'ja', label:'Japanese'}, {value:'zh', label:'Chinese'}, {value:'ko', label:'Korean'},
    {value:'pt-BR', label:'Portuguese (BR)'}, {value:'ar', label:'Arabic'}
  ];

  // Panel content rendering with state wiring
  const renderWindow = (win:any) => {
    const isFull = fullscreen[win.key];
    let rndProps:any = {
      minWidth:180, minHeight:70, bounds:"parent", style:{
        zIndex: isFull?99999:10,
        background:'#181f2c',
        border:'1.5px solid #232b39',
        borderRadius:12,
        boxShadow:'0 2px 16px #090c18bb',
        overflow:'hidden',
        padding:0,
        display:'flex',
        flexDirection:'column'
      },
      onDragStop: (_:any,d:any)=>moveWindow(win.key, {x:d.x, y:d.y}),
      onResizeStop: (_:any, __:any, ref:any, ___:any, pos:any)=>moveWindow(win.key, {
        w:parseInt(ref.style.width), h:parseInt(ref.style.height), ...pos
      })
    };
    if (!isFull) {
      const last = lastWindowState[win.key];
      rndProps.default = last
        ? { x:last.x, y:last.y, width:last.w, height:last.h }
        : { x:win.x, y:win.y, width:win.w, height:win.h };
    }
    function PanelHeader({title}:any) {
      return (
        <div
          onDoubleClick={()=>handlePanelHeaderDoubleClick(win.key, win)}
          style={{
            background:'#232b39',
            padding:'7px 16px',
            fontWeight:800,
            fontSize:17,
            letterSpacing:'.02em',
            color:'#e7eefd',
            borderBottom:'1px solid #263042',
            cursor:'pointer', userSelect:'none',
            display:'flex', alignItems:'center', justifyContent:'space-between'
          }}>
          <span>{title}</span>
          {fullscreen[win.key] && (
            <span style={{
              fontWeight:900, fontSize:18, color:'#64e7c5', marginLeft:14
            }}>FULLSCREEN</span>
          )}
        </div>
      );
    }
    let content = null;
    switch(win.key) {
      case 'three':
        content = <ThreeViewer
          text={text}
          font={font}
          textureUrl={textureUrl}
          mode={mode}
          autoCenter={autoCenter}
          modelUrl={modelUrl}
          bevelEnabled={bevelEnabled}
          bevelSize={bevelSize}
          bevelThickness={bevelThickness}
          fontSize={2.5}
          extrude={extrude}
          rotationY={rotationY}
          scale={scale}
        />;
        break;
      case 'tools':
        content = <ToolsPanel
          text={text} setText={setText}
          font={font} setFont={setFont}
          bevelEnabled={bevelEnabled} setBevelEnabled={setBevelEnabled}
          bevelSize={bevelSize} setBevelSize={setBevelSize}
          bevelThickness={bevelThickness} setBevelThickness={setBevelThickness}
          extrude={extrude} setExtrude={setExtrude}
          rotationY={rotationY} setRotationY={setRotationY}
          scale={scale} setScale={setScale}
          textureUrl={textureUrl} setTextureUrl={setTextureUrl}
          modelUrl={modelUrl} setModelUrl={setModelUrl}
        />;
        break;
      case 'ar':
        content = <ARModelViewer src={modelUrl || "/models/A.glb"} />;
        break;
      case 'layers':
        content = <LayerPanel layers={layers} onChange={setLayers}/>;
        break;
      case 'undo':
        content = <UndoRedoPanel undo={undo} redo={redo} canUndo={historyIndex>0} canRedo={historyIndex<history.length-1}/>;
        break;
      case 'export':
        content = <ExportPanel onExportImage={()=>alert('Export image!')} onExportModel={()=>alert('Export model!')}/>;
        break;
      case 'palette':
        content = <ColorPalettePanel palette={palette} onPick={c=>alert('Apply color '+c)} onSave={setPalette}/>;
        break;
      case 'presets':
        content = <PresetPanel presets={presets} onSave={name=>{
          const preset = {name, layers, palette, style, font};
          setPresets(ps=>[...ps, preset]);
        }} onLoad={p=>{
          setLayers(p.layers||[]); setPalette(p.palette||[]); setStyle(p.style||''); setFont(p.font||'/fonts/Roboto-Bold.ttf');
        }}/>;
        break;
      case 'reset':
        content = <ResetLayoutPanel onReset={()=>setWindows(defaultWindows)}/>;
        break;
      case 'font':
        content = <FontSelector onFont={setFont}/>;
        break;
      case 'keyboard':
        content = <Keyboard onKey={k => setText(t => t + k)} />;
        break;
      case 'textures':
        content = <TextureBrowser onPick={setTextureUrl}/>;
        break;
      case 'styles':
        content = <StyleSelector value={style} onChange={setStyle}/>;
        break;
      case 'controls':
        content = <CameraControls onSnap={(view)=>{}} mode={mode} setMode={setMode} autoCenter={autoCenter} setAutoCenter={setAutoCenter}/>;
        break;
      case 'carousel':
        content = <SnapshotCarousel onCapture={steps=>alert(`Would capture ${steps} angles (carousel spin)`)} />;
        break;
      case 'spotlight':
        content = <SpotlightPanel/>;
        break;
      case 'prompt':
        content = <PromptGenerator onPick={setPrompt}/>;
        break;
      default:
        content = null;
    }
    if (isFull) {
      return (
        <div
          key={win.key}
          style={{
            position: 'fixed',
            zIndex: 99999,
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#181f2c',
            border: '2px solid #232b39',
            borderRadius: 0,
            boxShadow: '0 2px 16px #090c18bb',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <PanelHeader title={win.title}/>
          <div style={{padding:14, flex:1, overflow:'auto', background:'#181f2c'}}>{content}</div>
        </div>
      );
    }
    return (
      <Rnd key={win.key} {...rndProps}>
        <PanelHeader title={win.title}/>
        <div style={{padding:14, flex:1, overflow:'auto', background:'#181f2c'}}>{content}</div>
      </Rnd>
    );
  };

  return (
    <div style={{position:'relative', width:'100vw', height:'100vh', overflow:'hidden', background:'#141923'}}>
      {/* Centered logo as background */}
      <div style={{
        position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        zIndex:0, pointerEvents:'none', opacity:0.35
      }}>
        <img src="/alphabeta_logo.png" alt="AlphaBeta Logo" style={{width:480, maxWidth:'48vw', maxHeight:'48vh'}}/>
      </div>
      {/* LED Ticker Banner */}
      <LEDTicker name="Gray" language={lang} onPromptClick={setPrompt}/>
      {/* Header bar with language picker */}
      <div style={{
        position:'absolute', top:0, left:0, width:'100vw', height:64, background:'#161b26',
        borderBottom:'2.5px solid #232b39', zIndex:101
      }}>
        <div style={{
          display:'flex', alignItems:'center', height:64, padding:'0 36px'
        }}>
          <div style={{fontWeight:900, fontSize:35, letterSpacing:'0.10em', color:'#e7eefd'}}>AlphaBeta</div>
          <div style={{marginLeft:'auto', display:'flex', alignItems:'center', gap:20}}>
            <label style={{color:'#9aa4b2', fontWeight:700, fontSize:17}}>Language:</label>
            <select className="select" style={{fontSize:17}} value={lang} onChange={e=>setLang(e.target.value)}>
              {LANGS.map(l=><option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
          </div>
        </div>
      </div>
      {/* Floating: Hide and Tools buttons */}
      <div style={{ position: "fixed", bottom: 36, left: 32, zIndex: 1000, display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Master Hide Button */}
        <div
          style={{
            width: 60,
            height: 36,
            background: "#212121",
            borderRadius: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#fff",
            fontFamily: "Roboto, Arial, sans-serif",
            fontWeight: 500,
            fontSize: 16,
            letterSpacing: 1,
            border: "2px solid #2a2a2a",
            marginBottom: 2,
            boxShadow: allHidden
              ? "0 0 14px 2px #42aaff, 0 0 3px #fff"
              : "0 2px 10px rgba(0,0,0,0.10)",
            transition: "box-shadow 0.2s, background 0.2s"
          }}
          title={allHidden ? "Show All Panels" : "Hide All Panels"}
          onClick={() => setAllHidden(h => !h)}
        >
          {allHidden ? "SHOW" : "HIDE"}
        </div>
        {/* Tools Button (radial trigger, no label) */}
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 2px 14px rgba(0,0,0,0.10)",
            border: "2px solid #e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "border 0.2s"
          }}
          onClick={() => setToolsOpen(t => !t)}
        >
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "#222", color: "#fff", display: "flex",
            alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700
          }}>
            🛠️
          </div>
        </div>
        {/* Radial Menu */}
        {toolsOpen && (
          <div style={{
            position: "fixed",
            left: 32 + 27,
            bottom: 36 + 27,
            zIndex: 1001,
            pointerEvents: "none"
          }}>
            {radialTools.map((tool, i) => {
              const radius = 85;
              const angleStep = (2 * Math.PI) / radialTools.length;
              const angle = -Math.PI / 2 + i * angleStep;
              const x = radius * Math.cos(angle);
              const y = radius * Math.sin(angle);
              return (
                <div
                  key={tool}
                  style={{
                    position: "absolute",
                    left: x,
                    top: -y,
                    width: 80,
                    height: 36,
                    background: activeTool === tool ? "#ffd700" : "#f0f0f0",
                    border: "2px solid #bbb",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Roboto, Arial, sans-serif",
                    color: "#222",
                    fontWeight: 500,
                    fontSize: 15,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    pointerEvents: "auto",
                    cursor: "pointer",
                    userSelect: "none",
                    transition: "background 0.2s"
                  }}
                  onClick={() => {
                    setActiveTool(tool);
                    setToolsOpen(false);
                  }}
                >
                  {tool}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Floating windows */}
      <div style={{width:'100vw', height:'calc(100vh - 60px)', position:'absolute', top:64, left:0, zIndex:5}}>
        {!allHidden && windows.map(renderWindow)}
      </div>
    </div>
  );
}

export default Page;
=======
'use client';
import dynamic from "next/dynamic";
import React, { useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import ToolsPanel from '../components/ToolsPanel';
import ThreeViewer from '../components/ThreeViewer';
import LayerPanel from '../components/LayerPanel';
import UndoRedoPanel from '../components/UndoRedoPanel';
import ExportPanel from '../components/ExportPanel';
import ColorPalettePanel from '../components/ColorPalettePanel';
import PresetPanel from '../components/PresetPanel';
import ResetLayoutPanel from '../components/ResetLayoutPanel';
import FontSelector from '../components/FontSelector';
import Keyboard from '../components/Keyboard';
import TextureBrowser from '../components/TextureBrowser';
import StyleSelector from '../components/StyleSelector';
import CameraControls from '../components/CameraControls';
import SnapshotCarousel from '../components/SnapshotCarousel';
import SpotlightPanel from '../components/SpotlightPanel';
import PromptGenerator from '../components/PromptGenerator';
import LEDTicker from '../components/LEDTicker';

const ARModelViewer = dynamic(() => import("../components/ARModelViewer"), { ssr: false });

const defaultWindows = [
  { key:'three', title:'3D Viewer', x:340, y:100, w:660, h:500 },
  { key:'tools', title:'Tools', x:1050, y:100, w:370, h:540 },
  { key:'ar', title:'AR Viewer', x:1050, y:650, w:380, h:230 },
  { key:'layers', title:'Layers', x:1450, y:350, w:310, h:190 },
  { key:'undo', title:'Undo/Redo', x:700, y:650, w:200, h:80 },
  { key:'export', title:'Export', x:900, y:650, w:190, h:80 },
  { key:'palette', title:'Palette', x:1250, y:560, w:230, h:160 },
  { key:'presets', title:'Presets', x:350, y:650, w:230, h:110 },
  { key:'reset', title:'Reset Layout', x:1500, y:650, w:160, h:80 },
  { key:'font', title:'Font Selector', x:40, y:100, w:270, h:170 },
  { key:'keyboard', title:'Keyboard', x:40, y:280, w:320, h:180 },
  { key:'textures', title:'Textures', x:40, y:470, w:320, h:230 },
  { key:'styles', title:'Style Selector', x:380, y:40, w:300, h:80 },
  { key:'controls', title:'Camera Controls', x:1050, y:560, w:320, h:90 },
  { key:'carousel', title:'Snapshot Carousel', x:700, y:40, w:340, h:80 },
  { key:'spotlight', title:'Spotlight', x:1400, y:200, w:380, h:260 },
  { key:'prompt', title:'Prompt Generator', x:40, y:40, w:320, h:60 }
];

function Page() {
  const viewerRef = useRef<any>(null);

  // Centralized state for all tools and 3D controls
  const [text, setText] = useState("A");
  const [font, setFont] = useState("/fonts/Roboto-Bold.ttf");
  const [bevelEnabled, setBevelEnabled] = useState(true);
  const [bevelSize, setBevelSize] = useState(0.03);
  const [bevelThickness, setBevelThickness] = useState(0.04);
  const [extrude, setExtrude] = useState(0.15);
  const [rotationY, setRotationY] = useState(0);
  const [scale, setScale] = useState(1.17);
  const [textureUrl, setTextureUrl] = useState("");
  const [modelUrl, setModelUrl] = useState("");

  const [mode, setMode] = useState<'perspective'|'orthographic'|'isometric'>('perspective');
  const [autoCenter, setAutoCenter] = useState(true);
  const [style, setStyle] = useState('photorealistic');
  const [prompt, setPrompt] = useState('');
  const [lang, setLang] = useState('en');
  const [windows, setWindows] = useState(defaultWindows);

  const [layers, setLayers] = useState<any[]>([]);
  const [palette, setPalette] = useState<string[]>(['#ffffff', '#c2c2c2', '#d94f4f']);
  const [presets, setPresets] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Floating window fullscreen/maximize state
  const [fullscreen, setFullscreen] = useState<{[k:string]:boolean}>({});
  const [lastWindowState, setLastWindowState] = useState<{[k:string]:any}>({});

  // Master Hide/Show for all panels
  const [allHidden, setAllHidden] = useState(false);

  // Radial tools menu (no "TOOLS" label in ToolsPanel)
  const [toolsOpen, setToolsOpen] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const radialTools = ["Move", "Select", "Brush", "Eraser", "Fill", "Eyedropper", "Crop"];

  function pushHistory(state:any){
    setHistory(h=>[...h.slice(0,historyIndex+1),state]);
    setHistoryIndex(i=>i+1);
  }
  function undo(){
    if(historyIndex>0){
      setHistoryIndex(i=>i-1);
    }
  }
  function redo(){
    if(historyIndex<history.length-1){
      setHistoryIndex(i=>i+1);
    }
  }

  function moveWindow(key:string, data:any) {
    setWindows(ws=>ws.map(w=>w.key===key ? {...w, ...data} : w));
  }

  // Double-click panel header handler for fullscreen toggle
  function handlePanelHeaderDoubleClick(key:string, win:any) {
    setFullscreen(fs => {
      if (!fs[key]) {
        setLastWindowState(prev => ({
          ...prev,
          [key]: { x: win.x, y: win.y, w: win.w, h: win.h }
        }));
      }
      return { ...fs, [key]: !fs[key] };
    });
  }

  const LANGS = [
    {value:'en', label:'English'}, {value:'cy', label:'Welsh'}, {value:'es', label:'Spanish'},
    {value:'fr', label:'French'}, {value:'de', label:'German'}, {value:'it', label:'Italian'},
    {value:'ja', label:'Japanese'}, {value:'zh', label:'Chinese'}, {value:'ko', label:'Korean'},
    {value:'pt-BR', label:'Portuguese (BR)'}, {value:'ar', label:'Arabic'}
  ];

  // Panel content rendering with state wiring
  const renderWindow = (win:any) => {
    const isFull = fullscreen[win.key];
    let rndProps:any = {
      minWidth:180, minHeight:70, bounds:"parent", style:{
        zIndex: isFull?99999:10,
        background:'#181f2c',
        border:'1.5px solid #232b39',
        borderRadius:12,
        boxShadow:'0 2px 16px #090c18bb',
        overflow:'hidden',
        padding:0,
        display:'flex',
        flexDirection:'column'
      },
      onDragStop: (_:any,d:any)=>moveWindow(win.key, {x:d.x, y:d.y}),
      onResizeStop: (_:any, __:any, ref:any, ___:any, pos:any)=>moveWindow(win.key, {
        w:parseInt(ref.style.width), h:parseInt(ref.style.height), ...pos
      })
    };
    if (!isFull) {
      const last = lastWindowState[win.key];
      rndProps.default = last
        ? { x:last.x, y:last.y, width:last.w, height:last.h }
        : { x:win.x, y:win.y, width:win.w, height:win.h };
    }
    function PanelHeader({title}:any) {
      return (
        <div
          onDoubleClick={()=>handlePanelHeaderDoubleClick(win.key, win)}
          style={{
            background:'#232b39',
            padding:'7px 16px',
            fontWeight:800,
            fontSize:17,
            letterSpacing:'.02em',
            color:'#e7eefd',
            borderBottom:'1px solid #263042',
            cursor:'pointer', userSelect:'none',
            display:'flex', alignItems:'center', justifyContent:'space-between'
          }}>
          <span>{title}</span>
          {fullscreen[win.key] && (
            <span style={{
              fontWeight:900, fontSize:18, color:'#64e7c5', marginLeft:14
            }}>FULLSCREEN</span>
          )}
        </div>
      );
    }
    let content = null;
    switch(win.key) {
      case 'three':
        content = <ThreeViewer
          text={text}
          font={font}
          textureUrl={textureUrl}
          mode={mode}
          autoCenter={autoCenter}
          modelUrl={modelUrl}
          bevelEnabled={bevelEnabled}
          bevelSize={bevelSize}
          bevelThickness={bevelThickness}
          fontSize={2.5}
          extrude={extrude}
          rotationY={rotationY}
          scale={scale}
        />;
        break;
      case 'tools':
        content = <ToolsPanel
          text={text} setText={setText}
          font={font} setFont={setFont}
          bevelEnabled={bevelEnabled} setBevelEnabled={setBevelEnabled}
          bevelSize={bevelSize} setBevelSize={setBevelSize}
          bevelThickness={bevelThickness} setBevelThickness={setBevelThickness}
          extrude={extrude} setExtrude={setExtrude}
          rotationY={rotationY} setRotationY={setRotationY}
          scale={scale} setScale={setScale}
          textureUrl={textureUrl} setTextureUrl={setTextureUrl}
          modelUrl={modelUrl} setModelUrl={setModelUrl}
        />;
        break;
      case 'ar':
        content = <ARModelViewer src={modelUrl || "/models/A.glb"} />;
        break;
      case 'layers':
        content = <LayerPanel layers={layers} onChange={setLayers}/>;
        break;
      case 'undo':
        content = <UndoRedoPanel undo={undo} redo={redo} canUndo={historyIndex>0} canRedo={historyIndex<history.length-1}/>;
        break;
      case 'export':
        content = <ExportPanel onExportImage={()=>alert('Export image!')} onExportModel={()=>alert('Export model!')}/>;
        break;
      case 'palette':
        content = <ColorPalettePanel palette={palette} onPick={c=>alert('Apply color '+c)} onSave={setPalette}/>;
        break;
      case 'presets':
        content = <PresetPanel presets={presets} onSave={name=>{
          const preset = {name, layers, palette, style, font};
          setPresets(ps=>[...ps, preset]);
        }} onLoad={p=>{
          setLayers(p.layers||[]); setPalette(p.palette||[]); setStyle(p.style||''); setFont(p.font||'/fonts/Roboto-Bold.ttf');
        }}/>;
        break;
      case 'reset':
        content = <ResetLayoutPanel onReset={()=>setWindows(defaultWindows)}/>;
        break;
      case 'font':
        content = <FontSelector onFont={setFont}/>;
        break;
      case 'keyboard':
        content = <Keyboard onKey={k => setText(t => t + k)} />;
        break;
      case 'textures':
        content = <TextureBrowser onPick={setTextureUrl}/>;
        break;
      case 'styles':
        content = <StyleSelector value={style} onChange={setStyle}/>;
        break;
      case 'controls':
        content = <CameraControls onSnap={(view)=>{}} mode={mode} setMode={setMode} autoCenter={autoCenter} setAutoCenter={setAutoCenter}/>;
        break;
      case 'carousel':
        content = <SnapshotCarousel onCapture={steps=>alert(`Would capture ${steps} angles (carousel spin)`)} />;
        break;
      case 'spotlight':
        content = <SpotlightPanel/>;
        break;
      case 'prompt':
        content = <PromptGenerator onPick={setPrompt}/>;
        break;
      default:
        content = null;
    }
    if (isFull) {
      return (
        <div
          key={win.key}
          style={{
            position: 'fixed',
            zIndex: 99999,
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#181f2c',
            border: '2px solid #232b39',
            borderRadius: 0,
            boxShadow: '0 2px 16px #090c18bb',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <PanelHeader title={win.title}/>
          <div style={{padding:14, flex:1, overflow:'auto', background:'#181f2c'}}>{content}</div>
        </div>
      );
    }
    return (
      <Rnd key={win.key} {...rndProps}>
        <PanelHeader title={win.title}/>
        <div style={{padding:14, flex:1, overflow:'auto', background:'#181f2c'}}>{content}</div>
      </Rnd>
    );
  };

  return (
    <div style={{position:'relative', width:'100vw', height:'100vh', overflow:'hidden', background:'#141923'}}>
      {/* Centered logo as background */}
      <div style={{
        position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        zIndex:0, pointerEvents:'none', opacity:0.35
      }}>
        <img src="/alphabeta_logo.png" alt="AlphaBeta Logo" style={{width:480, maxWidth:'48vw', maxHeight:'48vh'}}/>
      </div>
      {/* LED Ticker Banner */}
      <LEDTicker name="Gray" language={lang} onPromptClick={setPrompt}/>
      {/* Header bar with language picker */}
      <div style={{
        position:'absolute', top:0, left:0, width:'100vw', height:64, background:'#161b26',
        borderBottom:'2.5px solid #232b39', zIndex:101
      }}>
        <div style={{
          display:'flex', alignItems:'center', height:64, padding:'0 36px'
        }}>
          <div style={{fontWeight:900, fontSize:35, letterSpacing:'0.10em', color:'#e7eefd'}}>AlphaBeta</div>
          <div style={{marginLeft:'auto', display:'flex', alignItems:'center', gap:20}}>
            <label style={{color:'#9aa4b2', fontWeight:700, fontSize:17}}>Language:</label>
            <select className="select" style={{fontSize:17}} value={lang} onChange={e=>setLang(e.target.value)}>
              {LANGS.map(l=><option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
          </div>
        </div>
      </div>
      {/* Floating: Hide and Tools buttons */}
      <div style={{ position: "fixed", bottom: 36, left: 32, zIndex: 1000, display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Master Hide Button */}
        <div
          style={{
            width: 60,
            height: 36,
            background: "#212121",
            borderRadius: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#fff",
            fontFamily: "Roboto, Arial, sans-serif",
            fontWeight: 500,
            fontSize: 16,
            letterSpacing: 1,
            border: "2px solid #2a2a2a",
            marginBottom: 2,
            boxShadow: allHidden
              ? "0 0 14px 2px #42aaff, 0 0 3px #fff"
              : "0 2px 10px rgba(0,0,0,0.10)",
            transition: "box-shadow 0.2s, background 0.2s"
          }}
          title={allHidden ? "Show All Panels" : "Hide All Panels"}
          onClick={() => setAllHidden(h => !h)}
        >
          {allHidden ? "SHOW" : "HIDE"}
        </div>
        {/* Tools Button (radial trigger, no label) */}
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 2px 14px rgba(0,0,0,0.10)",
            border: "2px solid #e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "border 0.2s"
          }}
          onClick={() => setToolsOpen(t => !t)}
        >
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "#222", color: "#fff", display: "flex",
            alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700
          }}>
            🛠️
          </div>
        </div>
        {/* Radial Menu */}
        {toolsOpen && (
          <div style={{
            position: "fixed",
            left: 32 + 27,
            bottom: 36 + 27,
            zIndex: 1001,
            pointerEvents: "none"
          }}>
            {radialTools.map((tool, i) => {
              const radius = 85;
              const angleStep = (2 * Math.PI) / radialTools.length;
              const angle = -Math.PI / 2 + i * angleStep;
              const x = radius * Math.cos(angle);
              const y = radius * Math.sin(angle);
              return (
                <div
                  key={tool}
                  style={{
                    position: "absolute",
                    left: x,
                    top: -y,
                    width: 80,
                    height: 36,
                    background: activeTool === tool ? "#ffd700" : "#f0f0f0",
                    border: "2px solid #bbb",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Roboto, Arial, sans-serif",
                    color: "#222",
                    fontWeight: 500,
                    fontSize: 15,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    pointerEvents: "auto",
                    cursor: "pointer",
                    userSelect: "none",
                    transition: "background 0.2s"
                  }}
                  onClick={() => {
                    setActiveTool(tool);
                    setToolsOpen(false);
                  }}
                >
                  {tool}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Floating windows */}
      <div style={{width:'100vw', height:'calc(100vh - 60px)', position:'absolute', top:64, left:0, zIndex:5}}>
        {!allHidden && windows.map(renderWindow)}
      </div>
    </div>
  );
}

export default Page;
>>>>>>> ffee54565313e6c582194a584a21b586b60de224

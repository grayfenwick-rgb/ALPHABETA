<<<<<<< HEAD
'use client';
import React, { useEffect, useRef, useState } from 'react';

const DEFAULTS = {
  color: '#1cf34b',
  bg: '#091018',
  opacity: 0.94,
  speed: 45, // px/sec
  size: 36,
};

const DEMO_POOL = [
  "Create a neon graffiti letter on a brick wall",
  "A photorealistic chrome A with liquid reflections",
  "Retro-futuristic 'B' with synthwave colors",
  "Steampunk 'C', brass and copper with rivets",
  "Low-poly D made of glowing glass shards",
  "Surreal melting E, Dali style",
  "Ancient rune 'F' carved in obsidian",
  "80s arcade 'G' with LED border lights",
  "Vaporwave pink marble 'H' floating in space",
  "Cyberpunk glitch effect 'I', city backdrop"
];

function getPromptPool(language:string, theme:string): string[] {
  let pool = [...DEMO_POOL];
  if(theme && theme !== 'all') pool = pool.filter(p => p.toLowerCase().includes(theme));
  return pool;
}

export default function LEDTicker({
  name = 'Gray',
  language = 'en',
  theme = 'all',
  onPromptClick,
}:{
  name?: string,
  language?: string,
  theme?: string,
  onPromptClick?: (prompt:string)=>void,
}) {
  const [pool, setPool] = useState<string[]>(getPromptPool(language, theme));
  const [color, setColor] = useState(DEFAULTS.color);
  const [bg, setBg] = useState(DEFAULTS.bg);
  const [opacity, setOpacity] = useState(DEFAULTS.opacity);
  const [speed, setSpeed] = useState(DEFAULTS.speed);
  const [size, setSize] = useState(DEFAULTS.size);
  const [paused, setPaused] = useState(false);
  const [show, setShow] = useState(true);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [welcome, setWelcome] = useState(true);
  const [farewell, setFarewell] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);

  // EFFECT: update prompt pool when language/theme changes
  useEffect(() => {
    setPool(getPromptPool(language, theme));
  }, [language, theme]);

  // EFFECT: interval for prompt rotation
  useEffect(() => {
    if(!show) return;
    let index = 0;
    setCurrentPrompt(`👋 Welcome, ${name}!`);
    setWelcome(true);
    setFarewell(false);
    const interval = setInterval(() => {
      if(paused) return;
      if(welcome) {
        setWelcome(false);
        setCurrentPrompt(pool[index % pool.length]);
        index++;
        return;
      }
      setCurrentPrompt(pool[index % pool.length]);
      index++;
    }, Math.max(1000, 3500 + 150 * (size-24)));
    return ()=>clearInterval(interval);
  }, [show, pool, paused, name, welcome, size]);

  // Unmount effect: farewell
  useEffect(() => {
    return ()=>{
      setCurrentPrompt(`👋 Goodbye, ${name}!`);
      setFarewell(true);
    };
  }, [name]);

  // Reset scroll on prompt change
  useEffect(()=>{
    if(!tickerRef.current) return;
    const el = tickerRef.current;
    el.scrollLeft = 0;
  }, [currentPrompt]);

  // Dot-matrix LED effect
  function ledify(text:string){
    return (
      <span
        style={{
          letterSpacing: 3,
          fontFamily: "'Share Tech Mono', 'Courier New', Courier, monospace",
          fontWeight: 800,
          fontSize: size,
          color: color,
          textShadow: `0 0 5px ${color}, 0 0 2px #000`,
          filter: 'contrast(1.25) brightness(1.25) drop-shadow(0 1px 4px #222b)',
          textTransform: 'uppercase',
          userSelect: 'none',
          cursor: onPromptClick ? 'pointer':'default',
          whiteSpace: 'nowrap',
          display: 'inline-block'
        }}
        onClick={() => onPromptClick?.(currentPrompt)}
        title="Click to use this prompt"
      >
        {text}
      </span>
    );
  }

  // Controls
  const controls = (
    <div style={{
      display: 'flex', gap: 14, alignItems: 'center', marginLeft: 16,
      fontSize: 15, color: '#fff', background: '#232b3944', padding: '3px 12px', borderRadius: 10
    }}>
      <label>Color: <input type="color" value={color} onChange={e=>setColor(e.target.value)}/></label>
      <label>BG: <input type="color" value={bg} onChange={e=>setBg(e.target.value)}/></label>
      <label>Opacity: <input type="range" min={0.2} max={1} step={0.01} value={opacity} onChange={e=>setOpacity(Number(e.target.value))} /></label>
      <label>Speed: <input type="range" min={10} max={140} value={speed} onChange={e=>setSpeed(Number(e.target.value))}/></label>
      <label>Text Size: <input type="range" min={18} max={86} value={size} onChange={e=>setSize(Number(e.target.value))}/></label>
      <button className="select" style={{padding:'2px 9px'}} onClick={()=>setPaused(p=>!p)}>{paused ? "▶️" : "⏸"}</button>
      <button className="select" style={{padding:'2px 9px'}} onClick={()=>setCurrentPrompt(pool[Math.floor(Math.random()*pool.length)])}>⟳ Refresh</button>
      <button className="select" style={{padding:'2px 9px'}} onClick={()=>setShow(false)}>✕ Hide</button>
    </div>
  );

  if(!show) return <button style={{
    position:'absolute',top:2,left:'50%',transform:'translateX(-50%)',zIndex:3333,
    background:'#111a',border:'1.5px solid #232b39',borderRadius:8,padding:'4px 18px',color:'#1cf34b'
  }} onClick={()=>setShow(true)}>Show LED Ticker</button>

  return (
    <div style={{
      width: '100vw',
      background: bg,
      opacity: opacity,
      borderBottom: '2.5px solid #070c18',
      position: 'fixed',
      top: 66,
      left: 0,
      zIndex: 900,
      height: size*1.9,
      display:'flex',
      alignItems:'center'
    }}>
      <div ref={tickerRef} style={{
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        marginLeft: 40,
        marginRight: 24,
        fontSize: size,
        textAlign:'center',
        cursor:'pointer'
      }}>
        {ledify(currentPrompt)}
      </div>
      {controls}
    </div>
  );
}
=======
'use client';
import React, { useEffect, useRef, useState } from 'react';

const DEFAULTS = {
  color: '#1cf34b',
  bg: '#091018',
  opacity: 0.94,
  speed: 45, // px/sec
  size: 36,
};

const DEMO_POOL = [
  "Create a neon graffiti letter on a brick wall",
  "A photorealistic chrome A with liquid reflections",
  "Retro-futuristic 'B' with synthwave colors",
  "Steampunk 'C', brass and copper with rivets",
  "Low-poly D made of glowing glass shards",
  "Surreal melting E, Dali style",
  "Ancient rune 'F' carved in obsidian",
  "80s arcade 'G' with LED border lights",
  "Vaporwave pink marble 'H' floating in space",
  "Cyberpunk glitch effect 'I', city backdrop"
];

function getPromptPool(language:string, theme:string): string[] {
  let pool = [...DEMO_POOL];
  if(theme && theme !== 'all') pool = pool.filter(p => p.toLowerCase().includes(theme));
  return pool;
}

export default function LEDTicker({
  name = 'Gray',
  language = 'en',
  theme = 'all',
  onPromptClick,
}:{
  name?: string,
  language?: string,
  theme?: string,
  onPromptClick?: (prompt:string)=>void,
}) {
  const [pool, setPool] = useState<string[]>(getPromptPool(language, theme));
  const [color, setColor] = useState(DEFAULTS.color);
  const [bg, setBg] = useState(DEFAULTS.bg);
  const [opacity, setOpacity] = useState(DEFAULTS.opacity);
  const [speed, setSpeed] = useState(DEFAULTS.speed);
  const [size, setSize] = useState(DEFAULTS.size);
  const [paused, setPaused] = useState(false);
  const [show, setShow] = useState(true);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [welcome, setWelcome] = useState(true);
  const [farewell, setFarewell] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);

  // EFFECT: update prompt pool when language/theme changes
  useEffect(() => {
    setPool(getPromptPool(language, theme));
  }, [language, theme]);

  // EFFECT: interval for prompt rotation
  useEffect(() => {
    if(!show) return;
    let index = 0;
    setCurrentPrompt(`👋 Welcome, ${name}!`);
    setWelcome(true);
    setFarewell(false);
    const interval = setInterval(() => {
      if(paused) return;
      if(welcome) {
        setWelcome(false);
        setCurrentPrompt(pool[index % pool.length]);
        index++;
        return;
      }
      setCurrentPrompt(pool[index % pool.length]);
      index++;
    }, Math.max(1000, 3500 + 150 * (size-24)));
    return ()=>clearInterval(interval);
  }, [show, pool, paused, name, welcome, size]);

  // Unmount effect: farewell
  useEffect(() => {
    return ()=>{
      setCurrentPrompt(`👋 Goodbye, ${name}!`);
      setFarewell(true);
    };
  }, [name]);

  // Reset scroll on prompt change
  useEffect(()=>{
    if(!tickerRef.current) return;
    const el = tickerRef.current;
    el.scrollLeft = 0;
  }, [currentPrompt]);

  // Dot-matrix LED effect
  function ledify(text:string){
    return (
      <span
        style={{
          letterSpacing: 3,
          fontFamily: "'Share Tech Mono', 'Courier New', Courier, monospace",
          fontWeight: 800,
          fontSize: size,
          color: color,
          textShadow: `0 0 5px ${color}, 0 0 2px #000`,
          filter: 'contrast(1.25) brightness(1.25) drop-shadow(0 1px 4px #222b)',
          textTransform: 'uppercase',
          userSelect: 'none',
          cursor: onPromptClick ? 'pointer':'default',
          whiteSpace: 'nowrap',
          display: 'inline-block'
        }}
        onClick={() => onPromptClick?.(currentPrompt)}
        title="Click to use this prompt"
      >
        {text}
      </span>
    );
  }

  // Controls
  const controls = (
    <div style={{
      display: 'flex', gap: 14, alignItems: 'center', marginLeft: 16,
      fontSize: 15, color: '#fff', background: '#232b3944', padding: '3px 12px', borderRadius: 10
    }}>
      <label>Color: <input type="color" value={color} onChange={e=>setColor(e.target.value)}/></label>
      <label>BG: <input type="color" value={bg} onChange={e=>setBg(e.target.value)}/></label>
      <label>Opacity: <input type="range" min={0.2} max={1} step={0.01} value={opacity} onChange={e=>setOpacity(Number(e.target.value))} /></label>
      <label>Speed: <input type="range" min={10} max={140} value={speed} onChange={e=>setSpeed(Number(e.target.value))}/></label>
      <label>Text Size: <input type="range" min={18} max={86} value={size} onChange={e=>setSize(Number(e.target.value))}/></label>
      <button className="select" style={{padding:'2px 9px'}} onClick={()=>setPaused(p=>!p)}>{paused ? "▶️" : "⏸"}</button>
      <button className="select" style={{padding:'2px 9px'}} onClick={()=>setCurrentPrompt(pool[Math.floor(Math.random()*pool.length)])}>⟳ Refresh</button>
      <button className="select" style={{padding:'2px 9px'}} onClick={()=>setShow(false)}>✕ Hide</button>
    </div>
  );

  if(!show) return <button style={{
    position:'absolute',top:2,left:'50%',transform:'translateX(-50%)',zIndex:3333,
    background:'#111a',border:'1.5px solid #232b39',borderRadius:8,padding:'4px 18px',color:'#1cf34b'
  }} onClick={()=>setShow(true)}>Show LED Ticker</button>

  return (
    <div style={{
      width: '100vw',
      background: bg,
      opacity: opacity,
      borderBottom: '2.5px solid #070c18',
      position: 'fixed',
      top: 66,
      left: 0,
      zIndex: 900,
      height: size*1.9,
      display:'flex',
      alignItems:'center'
    }}>
      <div ref={tickerRef} style={{
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        marginLeft: 40,
        marginRight: 24,
        fontSize: size,
        textAlign:'center',
        cursor:'pointer'
      }}>
        {ledify(currentPrompt)}
      </div>
      {controls}
    </div>
  );
}
>>>>>>> ffee54565313e6c582194a584a21b586b60de224

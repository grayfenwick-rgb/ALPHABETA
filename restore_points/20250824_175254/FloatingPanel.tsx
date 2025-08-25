'use client';
import React, { useState, useRef, useEffect } from 'react';

type PanelProps = {
  id: string;
  title?: string;
  children: React.ReactNode;
  defaultPos?: { x: number; y: number };
  defaultSize?: { w: number; h: number };
  minW?: number;
  minH?: number;
  darkMode?: boolean;
  lockResize?: boolean;
  lockDrag?: boolean;
};

const storageKey = (id: string) => `panel-pos-size-${id}`;

// Utility to clamp position/size within window bounds
function clampPanel(
  x: number, y: number, w: number, h: number,
  minW: number, minH: number
) {
  const margin = 18;
  const maxW = window.innerWidth - margin;
  const maxH = window.innerHeight - margin;
  w = Math.max(minW, Math.min(w, maxW));
  h = Math.max(minH, Math.min(h, maxH));
  x = Math.max(margin - w, Math.min(x, window.innerWidth - margin));
  y = Math.max(0, Math.min(y, window.innerHeight - margin));
  return { x, y, w, h };
}

export default function FloatingPanel({
  id,
  title,
  children,
  defaultPos = { x: 160, y: 120 },
  defaultSize = { w: 480, h: 360 },
  minW = 320,
  minH = 160,
  darkMode = true,
  lockResize = false,
  lockDrag = false
}: PanelProps) {
  // Panel state (position, size, z, fullscreen)
  const [pos, setPos] = useState<{ x: number; y: number }>(defaultPos);
  const [size, setSize] = useState<{ w: number; h: number }>(defaultSize);
  const [z, setZ] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [drag, setDrag] = useState<{ dx: number; dy: number; initX: number; initY: number } | null>(null);
  const [resizing, setResizing] = useState<{ dw: number; dh: number; initW: number; initH: number } | null>(null);
  const [glow, setGlow] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);

  // --- LOCALSTORAGE (persist position/size/fullscreen)
  useEffect(() => {
    // Try to restore position/size from storage
    const raw = localStorage.getItem(storageKey(id));
    if (raw) {
      try {
        const saved = JSON.parse(raw);
        if (saved.x != null && saved.y != null && saved.w && saved.h) {
          setPos({ x: saved.x, y: saved.y });
          setSize({ w: saved.w, h: saved.h });
          setFullscreen(!!saved.fullscreen);
        }
      } catch { }
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem(storageKey(id),
      JSON.stringify({ x: pos.x, y: pos.y, w: size.w, h: size.h, fullscreen })
    );
  }, [id, pos, size, fullscreen]);

  // --- Z-INDEX: Bring to front when clicked
  useEffect(() => {
    if (!fullscreen) setZ(Date.now());
  }, [fullscreen]);

  // --- DRAGGING
  function handleDragStart(e: React.MouseEvent) {
    if (lockDrag) return;
    setGlow(true);
    setZ(Date.now());
    setDrag({
      dx: e.clientX - pos.x,
      dy: e.clientY - pos.y,
      initX: pos.x,
      initY: pos.y
    });
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', onDragEnd);
  }
  function onDrag(e: MouseEvent) {
    setPos(prev => clampPanel(
      e.clientX - (drag?.dx || 0),
      e.clientY - (drag?.dy || 0),
      size.w, size.h, minW, minH
    ));
  }
  function onDragEnd() {
    setGlow(false);
    setDrag(null);
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', onDragEnd);
  }

  // --- RESIZING
  function handleResizeStart(e: React.MouseEvent) {
    if (lockResize) return;
    setGlow(true);
    setZ(Date.now());
    setResizing({
      dw: e.clientX - (pos.x + size.w),
      dh: e.clientY - (pos.y + size.h),
      initW: size.w,
      initH: size.h
    });
    window.addEventListener('mousemove', onResize);
    window.addEventListener('mouseup', onResizeEnd);
    e.stopPropagation();
    e.preventDefault();
  }
  function onResize(e: MouseEvent) {
    let w = e.clientX - pos.x - (resizing?.dw || 0);
    let h = e.clientY - pos.y - (resizing?.dh || 0);
    setSize(prev => {
      const clamped = clampPanel(pos.x, pos.y, w, h, minW, minH);
      return { w: clamped.w, h: clamped.h };
    });
  }
  function onResizeEnd() {
    setGlow(false);
    setResizing(null);
    window.removeEventListener('mousemove', onResize);
    window.removeEventListener('mouseup', onResizeEnd);
  }

  // --- DOUBLE CLICK = FULLSCREEN TO VIEWPORT
  function handleDoubleClick(e: React.MouseEvent) {
    setFullscreen(f => !f);
    setZ(Date.now());
    setGlow(true);
    setTimeout(() => setGlow(false), 350);
  }

  // --- KEYBOARD ESC TO EXIT FULLSCREEN
  useEffect(() => {
    function esc(e: KeyboardEvent) {
      if (e.key === 'Escape' && fullscreen) setFullscreen(false);
    }
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [fullscreen]);

  // --- WINDOW RESIZE: Keep panel on screen
  useEffect(() => {
    function handleWinResize() {
      setPos(prev => clampPanel(prev.x, prev.y, size.w, size.h, minW, minH));
      setSize(prev => clampPanel(pos.x, pos.y, prev.w, prev.h, minW, minH));
    }
    window.addEventListener('resize', handleWinResize);
    return () => window.removeEventListener('resize', handleWinResize);
    // eslint-disable-next-line
  }, []);

  // --- FINAL PANEL STYLE
  const mainStyle: React.CSSProperties = fullscreen
    ? {
      position: 'fixed',
      left: 0, top: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 99999,
      borderRadius: 0,
      margin: 0,
      boxShadow: '0 0 32px #ffe06688, 0 0 0 #0000',
      background: darkMode ? '#191a1f' : '#fff',
      transition: 'all .22s cubic-bezier(.61,.12,.27,1.06)',
      border: darkMode ? '2.5px solid #343' : '2.5px solid #ececec',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
    : {
      position: 'absolute',
      left: pos.x,
      top: pos.y,
      width: size.w,
      height: size.h,
      zIndex: z,
      borderRadius: 16,
      margin: 0,
      boxShadow: glow
        ? '0 0 26px 0 #ffe066aa, 0 4px 32px #0009'
        : '0 0 0 #0000, 0 2px 18px #0007',
      background: darkMode ? '#23253b' : '#fff',
      border: darkMode ? '2.5px solid #343' : '2.5px solid #ececec',
      transition: 'box-shadow .16s, border .12s, left .16s, top .16s, width .13s, height .13s',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      minWidth: minW,
      minHeight: minH,
      userSelect: drag ? 'none' : undefined,
    };

  return (
    <div
      ref={panelRef}
      style={mainStyle}
      tabIndex={-1}
      onMouseDown={() => setZ(Date.now())}
      className="floating-panel"
    >
      {/* Header bar */}
      <div
        style={{
          width: '100%',
          height: 38,
          padding: '0 12px',
          cursor: lockDrag ? 'default' : 'grab',
          display: 'flex',
          alignItems: 'center',
          background: darkMode
            ? 'linear-gradient(90deg, #292933 85%, #393954 100%)'
            : 'linear-gradient(90deg, #fff 90%, #ffe066 100%)',
          borderBottom: darkMode ? '1.5px solid #36364a' : '1.5px solid #ececec',
          userSelect: 'none',
          fontWeight: 600,
          fontSize: 17,
          letterSpacing: 1,
          color: darkMode ? '#ffe066' : '#202040',
          borderTopLeftRadius: fullscreen ? 0 : 16,
          borderTopRightRadius: fullscreen ? 0 : 16,
          boxShadow: fullscreen ? undefined : (glow ? '0 2px 16px #ffe06644' : undefined),
        }}
        onMouseDown={handleDragStart}
        onDoubleClick={handleDoubleClick}
        title="Double-click to fullscreen"
      >
        <span style={{ flex: 1 }}>{title}</span>
        {/* Fullscreen icon */}
        <span
          onClick={e => { setFullscreen(f => !f); e.stopPropagation(); }}
          style={{
            marginLeft: 11,
            fontSize: 20,
            opacity: 0.92,
            cursor: 'pointer',
            userSelect: 'none'
          }}
          title="Fullscreen"
        >
          {fullscreen
            ? <>&#128469;</> // Exit fullscreen (minimize)
            : <>&#9974;</>    // Maximize icon (square)
          }
        </span>
      </div>
      {/* Panel Content */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          minHeight: 0,
          minWidth: 0,
          background: darkMode ? '#222333' : '#fafafa',
          overflow: 'auto'
        }}
      >
        {children}
      </div>
      {/* Resize handle (bottom-right) */}
      {!lockResize && !fullscreen &&
        <div
          onMouseDown={handleResizeStart}
          style={{
            position: 'absolute',
            right: 1, bottom: 2,
            width: 23, height: 23,
            cursor: 'nwse-resize',
            zIndex: 6,
            userSelect: 'none'
          }}
          title="Resize"
        >
          <svg width="22" height="22">
            <path d="M3 19 L19 3" stroke={darkMode ? "#ffe06688" : "#232"} strokeWidth="2.5" />
            <circle cx="18" cy="4" r="2" fill={darkMode ? "#ffe06699" : "#999"} />
            <circle cx="4" cy="18" r="2" fill={darkMode ? "#ffe06699" : "#999"} />
          </svg>
        </div>
      }
    </div>
  );
}

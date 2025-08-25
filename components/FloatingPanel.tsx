// components/FloatingPanel.tsx
'use client';
import React, { CSSProperties } from 'react';

type panel_props = {
  children: React.ReactNode;
  default: { x: number; y: number; width: number; height: number };
  title?: string;
  id?: string;
};

export default function FloatingPanel(props: panel_props) {
  const { children, default: def, title = '', id = '' } = props;

  const container_style: CSSProperties = {
    position: 'absolute',
    left: def?.x ?? 0,
    top: def?.y ?? 0,
    width: def?.width ?? 320,
    height: def?.height ?? 220,
    background: '#22252f',
    border: '1px solid #2f3240',
    borderRadius: 10,
    overflow: 'hidden',
    boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
  };

  const header_style: CSSProperties = {
    padding: '8px 12px',
    fontSize: 12,
    letterSpacing: 0.5,
    color: '#d6d8e5',
    background: '#1b1d27',
    borderBottom: '1px solid #2f3240',
    userSelect: 'none',
  };

  const body_style: CSSProperties = {
    padding: 12,
    width: '100%',
    height: 'calc(100% - 34px)',
    overflow: 'auto',
    color: '#e7e9f2',
  };

  return (
    <div id={id} style={container_style}>
      <div style={header_style}>{title}</div>
      <div style={body_style}>{children}</div>
    </div>
  );
}

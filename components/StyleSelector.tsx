'use client';
import React, { useState } from 'react';

const STYLES = [
  { id: 'neon', label: 'Neon Glow' },
  { id: 'minimal', label: 'Minimal Light' },
  { id: 'retro', label: 'Retro Terminal' },
  { id: 'bubble', label: 'Bubblegum' },
  { id: 'cyber', label: 'Cyber Grid' },
];

export default function StyleSelector({ darkMode }: { darkMode?: boolean }) {
  const [selected, setSelected] = useState('neon');

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: darkMode ? '#181a24' : '#fff',
        color: darkMode ? '#49fff8' : '#333',
        padding: 18,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        fontFamily: 'inherit',
      }}
    >
      <h4 style={{
        margin: 0,
        color: darkMode ? '#49fff8' : '#225',
        textShadow: darkMode
          ? '0 0 6px #49fff877, 0 0 12px #30f1ff22'
          : 'none'
      }}>STYLES</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {STYLES.map(style => (
          <button
            key={style.id}
            onClick={() => setSelected(style.id)}
            style={{
              padding: '13px 20px',
              margin: 0,
              fontSize: 17,
              background: selected === style.id
                ? 'radial-gradient(ellipse at center, #49fff8 80%, #232b44 100%)'
                : darkMode
                  ? 'linear-gradient(180deg, #232b44 0%, #151b28 100%)'
                  : '#f7f7fc',
              color: selected === style.id
                ? '#181a24'
                : darkMode
                  ? '#49fff8'
                  : '#225',
              border: selected === style.id
                ? '2.5px solid #49fff8'
                : darkMode
                  ? '1.7px solid #49fff8cc'
                  : '1.7px solid #aaa',
              borderRadius: 8,
              fontWeight: selected === style.id ? 800 : 600,
              cursor: 'pointer',
              letterSpacing: 1,
              boxShadow: selected === style.id
                ? '0 0 16px 4px #49fff888, 0 0 2px #49fff844'
                : '0 2px 6px #0ff3',
              transition: 'all 0.14s',
              textShadow: selected === style.id
                ? '0 0 7px #49fff899, 0 0 20px #49fff822'
                : 'none',
            }}
          >
            {style.label}
          </button>
        ))}
      </div>
      <div
        style={{
          marginTop: 10,
          color: darkMode ? '#49fff8b7' : '#555',
          fontSize: 15,
          textAlign: 'center',
          opacity: 0.9,
        }}
      >
        Selected style: <b>{STYLES.find(s => s.id === selected)?.label}</b>
      </div>
    </div>
  );
}

'use client';
import React, { useState } from 'react';

// Swap these out with your real local files or demo images as needed.
const SAMPLE_TEXTURES = [
  { name: 'Stone Pattern', preview: '/textures/sample1.jpg' },
  { name: 'Fabric Dots', preview: '/textures/sample2.jpg' },
  { name: 'Metallic Grid', preview: '/textures/sample3.jpg' },
  { name: 'Woven Straw', preview: '/textures/sample4.jpg' },
];

export default function TextureBrowser({ darkMode }: { darkMode?: boolean }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<typeof SAMPLE_TEXTURES[0] | null>(null);

  const filtered = search.trim()
    ? SAMPLE_TEXTURES.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase())
      )
    : SAMPLE_TEXTURES;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: darkMode ? '#181a24' : '#fff',
        color: darkMode ? '#49fff8' : '#333',
        padding: 16,
        boxSizing: 'border-box',
        fontFamily: 'inherit',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h4 style={{
        margin: 0,
        color: darkMode ? '#49fff8' : '#225',
        textShadow: darkMode
          ? '0 0 6px #49fff877, 0 0 12px #30f1ff22'
          : 'none'
      }}>TEXTURES</h4>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search textures..."
        style={{
          margin: '12px 0',
          width: '100%',
          fontSize: 16,
          padding: '8px 13px',
          borderRadius: 8,
          border: darkMode ? '1.5px solid #49fff8cc' : '1.5px solid #bbb',
          background: darkMode ? '#10141c' : '#f7f7fc',
          color: darkMode ? '#49fff8' : '#225',
          outline: 'none'
        }}
      />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(96px,1fr))',
        gap: 10,
        overflowY: 'auto',
        flex: 1,
      }}>
        {filtered.map(tex => (
          <div
            key={tex.name}
            style={{
              border: selected?.name === tex.name ? '2.5px solid #49fff8' : '2px solid #292933',
              borderRadius: 8,
              padding: 3,
              background: darkMode ? '#161d26' : '#eee',
              boxShadow: selected?.name === tex.name
                ? '0 0 12px #49fff877'
                : '0 1.5px 6px #2222',
              cursor: 'pointer',
              transition: 'border 0.13s, box-shadow 0.12s',
              display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}
            onClick={() => setSelected(tex)}
          >
            <img
              src={tex.preview}
              alt={tex.name}
              style={{
                width: 82,
                height: 82,
                borderRadius: 6,
                objectFit: 'cover',
                boxShadow: '0 2px 8px #49fff833'
              }}
            />
            <div style={{
              fontSize: 13,
              color: darkMode ? '#49fff8bb' : '#333',
              marginTop: 7,
              textAlign: 'center',
              width: '100%',
              textShadow: darkMode ? '0 0 5px #49fff866' : 'none'
            }}>{tex.name}</div>
          </div>
        ))}
      </div>
      {selected && (
        <div style={{
          background: darkMode ? '#10141c' : '#f6f6fc',
          color: darkMode ? '#49fff8' : '#333',
          borderRadius: 8,
          boxShadow: '0 1.5px 6px #49fff855',
          marginTop: 10,
          padding: 12,
          fontSize: 15,
        }}>
          <b>{selected.name}</b>
          <br />
          <span style={{ color: darkMode ? '#49fff8' : '#555' }}>
            (No download – local mode)
          </span>
        </div>
      )}
    </div>
  );
}

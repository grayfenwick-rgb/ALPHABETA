'use client';
import React, { useState } from 'react';

export default function LayerPanel() {
  // Example data, swap with your real scene/layer data
  const [layers, setLayers] = useState([
    { id: 1, name: 'Background', visible: true },
    { id: 2, name: '3D Text', visible: true },
    { id: 3, name: 'Cubes', visible: true },
  ]);

  function toggleVisibility(idx: number) {
    setLayers(layers =>
      layers.map((l, i) => i === idx ? { ...l, visible: !l.visible } : l)
    );
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#202230',
        color: '#7df9aa',
        boxSizing: 'border-box',
        fontFamily: 'inherit',
        padding: 14,
        fontSize: 16,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <h3 style={{ margin: 0, fontWeight: 700, fontSize: 20 }}>Layers</h3>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {layers.map((layer, idx) => (
          <div key={layer.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 8,
              padding: '6px 0',
              borderBottom: '1px solid #282c40',
              cursor: 'pointer'
            }}>
            <span
              onClick={() => toggleVisibility(idx)}
              style={{
                width: 24,
                height: 24,
                display: 'inline-block',
                marginRight: 9,
                borderRadius: 5,
                background: layer.visible ? '#7df9aa' : '#334340',
                border: '2px solid #303a3c',
                textAlign: 'center',
                fontWeight: 900,
                color: layer.visible ? '#101920' : '#8a998e',
                fontSize: 15,
                lineHeight: '24px',
                transition: 'all .13s',
                userSelect: 'none'
              }}
              title={layer.visible ? 'Hide layer' : 'Show layer'}
            >
              {layer.visible ? '👁' : '🚫'}
            </span>
            <span>{layer.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

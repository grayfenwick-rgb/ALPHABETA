// components/FontSelector.tsx
'use client';
import React from 'react';

export default function FontSelector() {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <label htmlFor="font_select">Font</label>
      <select id="font_select" style={{ background: '#11141b', color: '#e7e9f2', border: '1px solid #2f3240', padding: 6 }}>
        <option>Helvetiker</option>
      </select>
    </div>
  );
}

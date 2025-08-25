'use client';
import React, { useState } from 'react';
export default function FontSelector() {
  const [font, setFont] = useState('Roboto');
  return (
    <div style={{
      width: '100%', height: '100%', background: '#232336', color: '#ffe066',
      padding: 20, fontFamily: font
    }}>
      <b>Font Selector Panel</b>
      <select value={font} onChange={e => setFont(e.target.value)} style={{marginLeft:10}}>
        <option>Roboto</option>
        <option>Montserrat</option>
        <option>Oswald</option>
      </select>
    </div>
  );
}
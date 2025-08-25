'use client';
import React from 'react';

export default function ResetLayoutPanel({ darkMode }: { darkMode?: boolean }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: darkMode ? '#292933' : '#fff',
        color: darkMode ? '#ffe066' : '#222',
        padding: 18,
        boxSizing: 'border-box',
        pointerEvents: 'auto',
        transition: 'background 0.2s, color 0.2s',
      }}
    >
      <h4 style={{ marginTop: 0 }}>Reset Layout</h4>
      <p>This is the ResetLayoutPanel component.</p>
    </div>
  );
}

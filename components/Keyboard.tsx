'use client';
import React, { useState } from 'react';

// Define rows as QWERTY standard, including top number row
const ROWS = [
  ['1','2','3','4','5','6','7','8','9','0'],
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Shift','Z','X','C','V','B','N','M','Backspace'],
  ['Space']
];

// Shift mapping for number/symbol row (for future)
const SHIFT_MAP: Record<string, string> = {
  '1': '!', '2': '@', '3': '#', '4': '$', '5': '%',
  '6': '^', '7': '&', '8': '*', '9': '(', '0': ')'
};

export default function Keyboard({ onKey }: { onKey: (k: string) => void }) {
  const [shift, setShift] = useState(false);

  function handleKey(k: string) {
    if (k === 'Shift') {
      setShift(s => !s);
      return;
    }
    if (k === 'Space') {
      onKey(' ');
      return;
    }
    if (k === 'Backspace') {
      onKey('Backspace');
      return;
    }
    let out = k;
    // If shift is active, use shifted char or uppercase
    if (shift) {
      if (SHIFT_MAP[k]) out = SHIFT_MAP[k];
      else out = k.length === 1 ? k.toUpperCase() : k;
      setShift(false);
    } else {
      out = k.length === 1 ? k.toLowerCase() : k;
    }
    onKey(out);
  }

  return (
    <div style={{display:'flex',flexDirection:'column',gap:7,alignItems:'center',marginTop:5}}>
      {ROWS.map((row, i) =>
        <div key={i} style={{display:'flex',gap:5}}>
          {row.map(k =>
            k === 'Space' ? (
              <button
                className="select"
                key={k}
                style={{
                  width:210,
                  height:36,
                  fontSize:18,
                  fontWeight:700,
                  letterSpacing:'.08em'
                }}
                onClick={() => handleKey(k)}
              >Space</button>
            ) : (
              <button
                className="select"
                key={k}
                style={{
                  width: k === 'Backspace' ? 62 : k === 'Shift' ? 62 : 32,
                  height:36,
                  fontSize:19,
                  fontWeight:800,
                  letterSpacing:'.01em',
                  background: k === 'Shift' && shift ? '#262c3c' : undefined
                }}
                onClick={() => handleKey(k)}
              >
                {k === 'Backspace' ? '⌫' : k}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

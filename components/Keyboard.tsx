'use client';
import React, { useState } from 'react';

const KEY_ROWS = [
  [
    { base: '1', shift: '!' }, { base: '2', shift: '@' }, { base: '3', shift: '#' }, { base: '4', shift: '$' },
    { base: '5', shift: '%' }, { base: '6', shift: '^' }, { base: '7', shift: '&' }, { base: '8', shift: '*' },
    { base: '9', shift: '(' }, { base: '0', shift: ')' }
  ],
  [
    { base: 'Q' }, { base: 'W' }, { base: 'E' }, { base: 'R' }, { base: 'T' }, { base: 'Y' }, { base: 'U' }, { base: 'I' }, { base: 'O' }, { base: 'P' }
  ],
  [
    { base: 'A' }, { base: 'S' }, { base: 'D' }, { base: 'F' }, { base: 'G' }, { base: 'H' }, { base: 'J' }, { base: 'K' }, { base: 'L' }
  ],
  [
    { type: 'shift', side: 'left' },
    { base: 'Z' }, { base: 'X' }, { base: 'C' }, { base: 'V' }, { base: 'B' }, { base: 'N' }, { base: 'M' },
    { type: 'shift', side: 'right' }
  ],
  [
    { type: 'space' }
  ]
];

export default function Keyboard({ darkMode }: { darkMode?: boolean }) {
  const [typed, setTyped] = useState('');
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [shift, setShift] = useState(false);

  function handleKey(keyObj: any) {
    setActiveKey(keyObj.base || keyObj.type);

    // Shift keys toggle shift state
    if (keyObj.type === 'shift') {
      setShift(true);
      setTimeout(() => setActiveKey(null), 120);
      return;
    }

    // Space key
    if (keyObj.type === 'space') {
      setTyped(t => t + ' ');
      setActiveKey('space');
      setTimeout(() => setActiveKey(null), 90);
      return;
    }

    // Actual letter/number
    if (keyObj.base) {
      let out = keyObj.base;
      if (shift && keyObj.shift) out = keyObj.shift;
      else if (shift && /^[A-Z]$/.test(keyObj.base)) out = keyObj.base.toUpperCase();
      else if (!shift && /^[A-Z]$/.test(keyObj.base)) out = keyObj.base.toLowerCase();

      setTyped(t => t + out);
      setTimeout(() => setActiveKey(null), 90);
      setShift(false); // Shift resets after keypress
    }
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: darkMode ? '#181a24' : '#161d26',
        color: '#49fff8',
        padding: 18,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        fontFamily: 'inherit'
      }}
    >
      <h4 style={{
        margin: 0,
        color: '#49fff8',
        textShadow: '0 0 6px #49fff877, 0 0 12px #30f1ff22'
      }}>NEON KEYBOARD</h4>
      <div style={{
        minHeight: 36,
        border: '1.5px solid #49fff855',
        borderRadius: 7,
        padding: '7px 11px',
        background: '#10141c',
        marginBottom: 7,
        fontSize: 19,
        color: '#49fff8',
        textShadow: '0 0 8px #49fff855',
        letterSpacing: 1,
        wordBreak: 'break-all',
        fontFamily: 'inherit'
      }}>{typed}</div>
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 9, alignItems: 'center'
      }}>
        {KEY_ROWS.map((row, i) => (
          <div key={i} style={{ display: 'flex', gap: 9 }}>
            {row.map((keyObj, j) => {
              // Shift key styling
              if (keyObj.type === 'shift') {
                const isActive = shift;
                return (
                  <button
                    key={`shift-${keyObj.side}`}
                    onClick={() => handleKey(keyObj)}
                    style={{
                      padding: '12px 22px',
                      fontSize: 16,
                      background: isActive
                        ? 'radial-gradient(ellipse at center, #49fff8 70%, #232b44 100%)'
                        : 'linear-gradient(180deg, #232b44 0%, #151b28 100%)',
                      color: isActive ? '#10141c' : '#49fff8',
                      border: isActive
                        ? '2.5px solid #49fff8'
                        : '1.7px solid #49fff8cc',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontWeight: 700,
                      outline: 'none',
                      letterSpacing: 2,
                      boxShadow: isActive
                        ? '0 0 14px 4px #49fff8bb, 0 0 2px #49fff877'
                        : '0 2px 8px #0ff3',
                      transition: 'background 0.1s, border 0.08s, box-shadow 0.13s',
                      textShadow: isActive
                        ? '0 0 7px #10141c, 0 0 12px #49fff844'
                        : '0 0 7px #49fff899, 0 0 20px #49fff822',
                    }}
                    tabIndex={-1}
                  >
                    ⇧ Shift
                  </button>
                );
              }

              // Spacebar styling
              if (keyObj.type === 'space') {
                return (
                  <button
                    key="space"
                    onClick={() => handleKey(keyObj)}
                    style={{
                      padding: '12px 88px',
                      fontSize: 18,
                      background: activeKey === 'space'
                        ? 'radial-gradient(ellipse at center, #49fff8 60%, #232b44 100%)'
                        : 'linear-gradient(180deg, #232b44 0%, #151b28 100%)',
                      color: '#49fff8',
                      border: '1.7px solid #49fff8cc',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontWeight: 600,
                      outline: 'none',
                      letterSpacing: 2,
                      boxShadow: activeKey === 'space'
                        ? '0 0 12px 4px #49fff8aa, 0 0 2px #49fff877'
                        : '0 2px 8px #0ff3',
                      transition: 'background 0.1s, border 0.08s, box-shadow 0.13s',
                      textShadow: '0 0 7px #49fff899, 0 0 20px #49fff822',
                    }}
                  >␣</button>
                );
              }

              // Normal key styling
              const outKey = shift && keyObj.shift ? keyObj.shift
                : shift && keyObj.base ? keyObj.base.toUpperCase()
                : keyObj.base;
              const keyLabel = outKey;

              return (
                <button
                  key={keyObj.base}
                  onClick={() => handleKey(keyObj)}
                  style={{
                    padding: '12px 18px',
                    fontSize: 18,
                    background: activeKey === keyObj.base
                      ? 'radial-gradient(ellipse at center, #49fff8 60%, #232b44 100%)'
                      : 'linear-gradient(180deg, #232b44 0%, #151b28 100%)',
                    color: '#49fff8',
                    border: activeKey === keyObj.base
                      ? '2.5px solid #49fff8'
                      : '1.7px solid #49fff8cc',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 600,
                    outline: 'none',
                    letterSpacing: 2,
                    boxShadow: activeKey === keyObj.base
                      ? '0 0 16px 4px #49fff8aa, 0 0 2px #49fff877'
                      : '0 2px 8px #0ff3',
                    transition: 'background 0.1s, border 0.08s, box-shadow 0.13s',
                    textShadow: '0 0 7px #49fff899, 0 0 20px #49fff822',
                  }}
                >
                  {keyLabel}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <button
        onClick={() => setTyped('')}
        style={{
          marginTop: 14,
          background: 'linear-gradient(90deg, #23bada 10%, #111 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 7,
          padding: '9px 18px',
          cursor: 'pointer',
          fontWeight: 700,
          alignSelf: 'center',
          boxShadow: '0 0 8px #49fff822'
        }}
      >
        Clear
      </button>
    </div>
  );
}

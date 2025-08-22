<<<<<<< HEAD
'use client';
import React, { useRef } from 'react';

export default function PresetPanel({
  presets,
  onLoad,
  onSave
}: {
  presets: { name?: string; [key: string]: any }[],
  onLoad: (p: any) => void,
  onSave: (name: string) => void
}) {
  const inp = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h3>Presets</h3>
      <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
        <input
          ref={inp}
          placeholder="Preset name"
          className="select"
          style={{ width: 140 }}
        />
        <button
          className="select"
          onClick={() => {
            if (inp.current?.value) {
              onSave(inp.current.value);
              inp.current.value = '';
            }
          }}
        >
          💾 Save Current
        </button>
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {presets.map((p, i) => (
          <button
            className="select"
            key={i}
            onClick={() => onLoad(p)}
            style={{ minWidth: 88 }}
          >
            {p.name || `Preset #${i + 1}`}
          </button>
        ))}
      </div>
    </div>
  );
}
=======
'use client';
import React, { useRef } from 'react';

export default function PresetPanel({
  presets,
  onLoad,
  onSave
}: {
  presets: { name?: string; [key: string]: any }[],
  onLoad: (p: any) => void,
  onSave: (name: string) => void
}) {
  const inp = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h3>Presets</h3>
      <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
        <input
          ref={inp}
          placeholder="Preset name"
          className="select"
          style={{ width: 140 }}
        />
        <button
          className="select"
          onClick={() => {
            if (inp.current?.value) {
              onSave(inp.current.value);
              inp.current.value = '';
            }
          }}
        >
          💾 Save Current
        </button>
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {presets.map((p, i) => (
          <button
            className="select"
            key={i}
            onClick={() => onLoad(p)}
            style={{ minWidth: 88 }}
          >
            {p.name || `Preset #${i + 1}`}
          </button>
        ))}
      </div>
    </div>
  );
}
>>>>>>> ffee54565313e6c582194a584a21b586b60de224

import os

# List of panel filenames and placeholder content.
PANELS = {
    "ToolsPanel.tsx": '''
'use client';
import React from 'react';
export default function ToolsPanel() {
  return (
    <div style={{
      width: '100%', height: '100%', background: '#242436', color: '#ffe066',
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22
    }}>
      <b>Tools Panel</b>
    </div>
  );
}
''',

    "LayerPanel.tsx": '''
'use client';
import React from 'react';
export default function LayerPanel() {
  return (
    <div style={{
      width: '100%', height: '100%', background: '#1a1a2c', color: '#9ecfff',
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22
    }}>
      <b>Layer Panel</b>
    </div>
  );
}
''',

    "FontSelector.tsx": '''
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
'''
}

for filename, code in PANELS.items():
    with open(filename, "w", encoding="utf-8") as f:
        f.write(code.strip())
    print(f"Created/overwritten {filename}")

print("Done. All panel files are now created in this folder.")

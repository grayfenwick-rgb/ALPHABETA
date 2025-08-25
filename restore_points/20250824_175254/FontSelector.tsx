'use client';
import React, { useState, useEffect } from 'react';

// Example list — replace with top 100 for production!
const GOOGLE_FONTS = [
  { family: "Roboto", url: "https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" },
  { family: "Open Sans", url: "https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" },
  { family: "Lato", url: "https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" },
  { family: "Montserrat", url: "https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" },
  { family: "Oswald", url: "https://fonts.googleapis.com/css?family=Oswald:400,700&display=swap" },
  { family: "Poppins", url: "https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap" },
  { family: "Raleway", url: "https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" },
  // ...add 93 more here!
];

export default function FontSelector({
  darkMode,
  selectedFont,
  onSelectFont,
}: {
  darkMode?: boolean,
  selectedFont?: string,
  onSelectFont?: (f: string) => void
}) {
  const [search, setSearch] = useState('');
  const [internalFont, setInternalFont] = useState(selectedFont ?? 'Roboto');
  const fontToUse = selectedFont ?? internalFont;

  // Dynamically load font-face
  useEffect(() => {
    const families = GOOGLE_FONTS.filter(f =>
      f.family.toLowerCase().includes(search.toLowerCase())
    ).map(f => f.family);

    families.forEach(fam => {
      const font = GOOGLE_FONTS.find(f => f.family === fam);
      if (font) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = font.url;
        document.head.appendChild(link);
      }
    });
  }, [search]);

  useEffect(() => {
    const font = GOOGLE_FONTS.find(f => f.family === fontToUse);
    if (font) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = font.url;
      document.head.appendChild(link);
    }
  }, [fontToUse]);

  const filteredFonts = GOOGLE_FONTS.filter(f =>
    f.family.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: darkMode ? '#292933' : '#fff',
        color: darkMode ? '#ffe066' : '#222',
        padding: 12,
        boxSizing: 'border-box',
        transition: 'background 0.18s, color 0.18s',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <h4 style={{ margin: 0 }}>Font Selector</h4>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search fonts..."
        style={{
          margin: '10px 0',
          width: '100%',
          padding: 7,
          borderRadius: 7,
          border: '1.5px solid #aaa',
          fontSize: 15,
          background: darkMode ? '#232335' : '#fafbfc',
          color: darkMode ? '#ffe066' : '#222',
        }}
      />
      <div style={{
        flex: 1,
        overflowY: 'auto',
        minHeight: 0,
        borderRadius: 9,
        border: darkMode ? '1.5px solid #444' : '1.5px solid #e7e7e7',
        background: darkMode ? '#242433' : '#fafafa',
        boxShadow: darkMode ? '0 2px 16px #0001' : '0 2px 16px #0001',
      }}>
        {filteredFonts.map(f => (
          <div
            key={f.family}
            onClick={() => {
              if (onSelectFont) onSelectFont(f.family);
              setInternalFont(f.family);
            }}
            style={{
              cursor: 'pointer',
              fontFamily: f.family,
              padding: '10px 18px',
              borderBottom: darkMode ? '1px solid #343446' : '1px solid #eee',
              background: fontToUse === f.family
                ? (darkMode ? '#393954' : '#ffe06644')
                : 'none',
              color: darkMode ? '#ffe066' : '#222',
              fontSize: 18,
              transition: 'background 0.13s',
            }}
            title={`Preview: ${f.family}`}
          >
            {f.family}
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 15,
        borderRadius: 8,
        padding: 10,
        background: darkMode ? '#191921' : '#ececec',
        fontFamily: fontToUse,
        fontSize: 24,
        textAlign: 'center',
      }}>
        The quick brown fox jumps over the lazy dog.
      </div>
    </div>
  );
}

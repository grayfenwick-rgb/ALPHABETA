'use client';
import React, { useState } from 'react';

export default function ImportPanel() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function doSearch() {
    setLoading(true);
    setResults([]);
    const r = await fetch('/api/objaverse_search?q=' + encodeURIComponent(search));
    const data = await r.json();
    setResults(data.results || []);
    setLoading(false);
  }

  async function placeOnDesk(result) {
    const r = await fetch('/api/desk_place', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ result })
    });
    if (r.ok) alert('Object placed on desk!');
  }

  return (
    <div style={{ background: '#181824', color: '#fff', padding: 24, width: 420, borderRadius: 12 }}>
      <h2>Objaverse Import</h2>
      <div>
        <input
          style={{ width: 240, padding: 8, borderRadius: 4, marginRight: 8 }}
          placeholder="Search models..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && doSearch()}
        />
        <button style={{ padding: 8, borderRadius: 4 }} onClick={doSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      <div style={{ marginTop: 20 }}>
        {results.length === 0 && !loading && <div style={{ opacity: 0.7 }}>No results yet.</div>}
        {results.map(result => (
          <div key={result.uid} style={{ background: '#23284c', margin: '14px 0', padding: 12, borderRadius: 8 }}>
            <div><b>{result.title || result.uid}</b></div>
            <div>{result.description || ''}</div>
            <div>
              <img src={result.thumbnail_url} style={{ width: 72, margin: '10px 0' }} alt="" />
            </div>
            <button style={{ padding: 7, borderRadius: 4 }} onClick={() => placeOnDesk(result)}>
              Place on Desk
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

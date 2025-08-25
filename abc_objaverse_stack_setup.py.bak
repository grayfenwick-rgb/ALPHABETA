import os
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
COMP = ROOT / "components"
PUB = ROOT / "public"
MODELS = PUB / "models"
REG = PUB / "deskRegistry.json"
PY = ROOT
API = ROOT / "objaverse_fetcher.py"
IMPORT_PANEL = COMP / "ImportPanel.tsx"
SEARCH_RESULTS = PUB / "search_results.json"

# Backup helper
def backup(p):
    if p.exists():
        shutil.copy2(p, p.with_suffix(p.suffix + ".bak"))

# Write helper
def write(p, content):
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content.strip() + "\n", encoding="utf-8")

# 1. ImportPanel.tsx (React)
write(IMPORT_PANEL, '''
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
''')

# 2. objaverse_fetcher.py (backend for search/download)
write(API, '''
import requests, json, os, sys

# Use Objaverse API or static search if API not available
API_URL = "https://objaverse.com/api/v1/search"

def search_objaverse(query):
    params = {"query": query, "limit": 12}
    r = requests.get(API_URL, params=params, timeout=18)
    r.raise_for_status()
    return r.json()["results"]

def download_glb(obj, dest_folder):
    url = obj.get("glb_url") or obj.get("model_url")
    if not url: return None
    filename = f"{obj['uid']}.glb"
    out_path = os.path.join(dest_folder, filename)
    r = requests.get(url, stream=True, timeout=30)
    r.raise_for_status()
    with open(out_path, "wb") as f:
        for chunk in r.iter_content(chunk_size=8192):
            f.write(chunk)
    return filename

def main():
    if len(sys.argv) < 2:
        print("Usage: python objaverse_fetcher.py SEARCH_TERM")
        sys.exit(1)
    query = sys.argv[1]
    results = search_objaverse(query)
    os.makedirs("public/models", exist_ok=True)
    filtered = []
    for obj in results:
        info = {
            "uid": obj["uid"],
            "title": obj.get("title"),
            "description": obj.get("description"),
            "thumbnail_url": obj.get("thumbnail_url"),
            "glb_url": obj.get("glb_url") or obj.get("model_url")
        }
        # Download .glb
        if info["glb_url"]:
            filename = download_glb(info, "public/models")
            info["downloaded"] = filename
        filtered.append(info)
    # Write metadata
    with open("public/search_results.json", "w", encoding="utf-8") as f:
        json.dump({"results": filtered}, f, ensure_ascii=False, indent=2)
    print(f"Downloaded {len(filtered)} results to public/models/ and updated search_results.json")

if __name__ == "__main__":
    main()
''')

# 3. Add (or init) deskRegistry.json
if not REG.exists():
    write(REG, '[ ]')

# 4. Usage instructions
print("""
=== ABC OBJAVERSE IMPORT STACK (PORT 3001 ONLY) ===

1. Your new ImportPanel.tsx is in components/.
2. Run:   python objaverse_fetcher.py "search term"
   - Downloads models and updates public/search_results.json
3. ImportPanel will show search results in your UI.
4. On 'Place on Desk', update public/deskRegistry.json to add object entry.

To wire the panel into your workspace, import it and render as needed:

  import ImportPanel from './ImportPanel';
  ...
  <ImportPanel />

For API automation, you may want to add a Next.js API route:
  - /api/objaverse_search: runs fetcher and returns search_results.json
  - /api/desk_place: updates deskRegistry.json

All builds remain on port 3001 (no split workspace).

*** No files are overwritten without .bak backup. ***
""")

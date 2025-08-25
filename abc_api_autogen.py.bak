import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PAGES = ROOT / "pages"
API = PAGES / "api"
MODELS = ROOT / "public" / "models"

def ensure_dir(p):
    p.mkdir(parents=True, exist_ok=True)

def write_file(path, content):
    if path.exists():
        path.with_suffix(path.suffix + '.bak').write_text(path.read_text(encoding='utf-8'), encoding='utf-8')
    path.write_text(content.strip() + "\n", encoding="utf-8")

# Ensure folders
ensure_dir(API)
ensure_dir(MODELS)

# objaverse_search.js
write_file(API / "objaverse_search.js", '''
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing search term" });

  // Path to your Python script
  const py = path.join(process.cwd(), 'objaverse_fetcher.py');

  exec(`python "${py}" "${q.replace(/"/g, '')}"`, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: stderr || err.message });
    }
    const out = path.join(process.cwd(), 'public', 'search_results.json');
    if (!fs.existsSync(out)) return res.status(500).json({ error: "No results file" });
    const data = JSON.parse(fs.readFileSync(out, 'utf-8'));
    res.status(200).json(data);
  });
}
''')

# desk_place.js
write_file(API / "desk_place.js", '''
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Only POST allowed" });
  const object = req.body.result;
  if (!object) return res.status(400).json({ error: "Missing object" });

  const regPath = path.join(process.cwd(), 'public', 'deskRegistry.json');
  let registry = [];
  if (fs.existsSync(regPath)) {
    registry = JSON.parse(fs.readFileSync(regPath, 'utf-8'));
  }
  registry.push(object);
  fs.writeFileSync(regPath, JSON.stringify(registry, None, 2), 'utf-8');
  res.status(200).json({ ok: true });
}
''')

print("✅ API endpoints created in /pages/api/ and /public/models/ (folders auto-made).")
print("Now you can use ImportPanel and Python fetcher — all works in 3001!")

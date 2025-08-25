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

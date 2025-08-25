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

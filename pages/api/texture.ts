import type { NextApiRequest, NextApiResponse } from 'next';

// === DEBUG: Show API route calls and reveal first 12 chars of the key ===
console.log("API route called. OPENAI_API_KEY:", process.env.OPENAI_API_KEY?.slice(0,12));

export default async function handler(req:NextApiRequest, res:NextApiResponse){
  if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const { prompt } = req.body || {};
  const key = process.env.OPENAI_API_KEY;

  // === DEBUG: Show if key is missing or present ===
  if(!key) return res.status(400).json({error:'Missing OPENAI_API_KEY'});
  else console.log("API key detected, proceeding...");

  try{
    const r = await fetch('https://api.openai.com/v1/images/generations', {
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'Authorization':`Bearer ${key}`},
      body: JSON.stringify({ prompt, n:1, size:'1024x1024' })
    });
    const data = await r.json();
    const url = data?.data?.[0]?.url;
    // === DEBUG: Log OpenAI response ===
    console.log("OpenAI response:", data);
    return res.status(200).json({url});
  }catch(e:any){
    // === DEBUG: Log error ===
    console.error("Texture fetch failed:", e?.message);
    return res.status(500).json({error:e?.message||'Texture fetch failed'});
  }
}

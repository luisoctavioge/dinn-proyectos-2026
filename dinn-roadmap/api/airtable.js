/**
 * Vercel Function (Node.js) — Proxy seguro para Airtable
 * El token nunca sale del servidor; el cliente solo llama /api/airtable
 *
 * Acepta POST con body JSON: { method, url, body? }
 *   method → 'GET' | 'POST' | 'PATCH' | 'DELETE'
 *   url    → URL completa de la API de Airtable
 *   body   → objeto a enviar (opcional, para POST/PATCH)
 */
export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return Response.json({ error: 'Method not allowed' }, { status: 405 });
    }

    const key = process.env.AIRTABLE_KEY;
    if (!key) {
      return Response.json({ error: 'AIRTABLE_KEY not configured' }, { status: 500 });
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { method = 'GET', url, body } = payload;

    if (!url || !url.startsWith('https://api.airtable.com/')) {
      return Response.json({ error: 'Invalid url' }, { status: 400 });
    }

    const fetchOpts = {
      method,
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
    };

    if (body && method !== 'GET' && method !== 'DELETE') {
      fetchOpts.body = JSON.stringify(body);
    }

    try {
      const res = await fetch(url, fetchOpts);
      const text = await res.text();
      return new Response(text, {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e) {
      return Response.json({ error: e.message }, { status: 502 });
    }
  },
};

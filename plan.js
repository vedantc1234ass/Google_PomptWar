// Serverless proxy: keeps the Gemini API key on the server, never in the browser.
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }
  let prompt;
  try {
    ({ prompt } = JSON.parse(event.body || '{}'));
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }
  if (typeof prompt !== 'string' || !prompt.trim() || prompt.length > 8000) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid prompt' }) };
  }
  if (!process.env.GEMINI_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Server key not configured' }) };
  }
  try {
    const r = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + process.env.GEMINI_API_KEY,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json', temperature: 0.7 }
        })
      }
    );
    return { statusCode: r.status, headers: { 'Content-Type': 'application/json' }, body: await r.text() };
  } catch (e) {
    return { statusCode: 502, body: JSON.stringify({ error: 'Upstream error' }) };
  }
};

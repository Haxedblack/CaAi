export async function callGeminiAPI(prompt) {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    if (!response.ok) throw new Error('Gemini API error');
    return await response.json();
  } catch (err) {
    return { error: err.message || 'Unknown error' };
  }
}

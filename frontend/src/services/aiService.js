/* src/services/aiService.js */
export async function analyzeCanvas(payload, onProgress) {
  const controller = new AbortController();
  const signal = controller.signal;
  const steps = [
    'Preparing canvas data...',
    'Sending data to AI provider...',
    'Processing AI response...'
  ];
  // Simulate progress via callbacks if provided
  if (onProgress) {
    steps.forEach((msg, idx) => {
      setTimeout(() => onProgress({ step: idx + 1, total: steps.length, message: msg }), idx * 500);
    });
  }
  try {
    const response = await fetch('/ai/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_AI_API_KEY || ''
      },
      body: JSON.stringify(payload),
      signal
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || `AI analysis failed with status ${response.status}`);
    }
    const result = await response.json();
    return { result, controller };
  } catch (e) {
    if (e.name === 'AbortError') {
      throw new Error('Analysis cancelled');
    }
    throw e;
  }
}

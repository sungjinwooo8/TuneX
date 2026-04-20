import { SYSTEM_PROMPT } from '../aiPrompt';

// In production, calls go through the backend. In dev, calls go direct.
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:10000';

let _locked = false;

export async function getAiTuningRecommendation(userGoal) {
  if (_locked) return { _error: 'RATE_LIMIT' };
  _locked = true;

  try {
    const response = await fetch(`${BACKEND_URL}/api/ai-tune`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        goal: userGoal,
        systemPrompt: SYSTEM_PROMPT
      })
    });

    if (response.status === 429) {
      return { _error: 'RATE_LIMIT' };
    }

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('AI recommendation failed:', error);
    return null;
  } finally {
    setTimeout(() => { _locked = false; }, 5000);
  }
}

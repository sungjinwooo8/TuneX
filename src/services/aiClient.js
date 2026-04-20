import { SYSTEM_PROMPT } from '../aiPrompt';

const API_KEY = 'AIzaSyBJxk1OWCKm_1Iov7pViN3I8wH7ByVYmdY';
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent';

let _locked = false;

export async function getAiTuningRecommendation(userGoal) {
  // Prevent concurrent requests — this is the #1 cause of 429s
  if (_locked) return { _error: 'RATE_LIMIT' };
  _locked = true;

  try {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: userGoal }] }
        ],
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        generationConfig: {
          responseMimeType: 'application/json'
        }
      })
    });

    if (response.status === 429) {
      return { _error: 'RATE_LIMIT' };
    }

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!rawText) return null;
    
    return JSON.parse(rawText);
  } catch (error) {
    console.error('AI recommendation failed:', error);
    return null;
  } finally {
    // Cooldown: block new requests for 5 seconds to respect rate limits
    setTimeout(() => { _locked = false; }, 5000);
  }
}

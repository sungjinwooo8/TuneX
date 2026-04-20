const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

// Environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://tune-x-snowy.vercel.app';

// CORS — allow frontend origin
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:5173', 'http://localhost:3000'],
  methods: ['POST', 'GET'],
}));

app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'TuneX Backend Active', version: '1.0.0' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// AI Tuning Endpoint
app.post('/api/ai-tune', async (req, res) => {
  try {
    const { goal, systemPrompt } = req.body;

    if (!goal) {
      return res.status(400).json({ error: 'Goal is required' });
    }

    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: goal }] }
        ],
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        generationConfig: {
          responseMimeType: 'application/json'
        }
      })
    });

    if (response.status === 429) {
      return res.status(429).json({ error: 'RATE_LIMIT', message: 'API quota exceeded. Please wait and try again.' });
    }

    if (!response.ok) {
      const errBody = await response.text();
      console.error('Gemini API error:', response.status, errBody);
      return res.status(response.status).json({ error: `Gemini API returned ${response.status}` });
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return res.status(500).json({ error: 'No response from AI' });
    }

    res.json(JSON.parse(rawText));
  } catch (error) {
    console.error('AI Tune Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`TuneX Backend running on port ${PORT}`);
});

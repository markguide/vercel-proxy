// api/generate.js
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed' });
  }

  const { model, temperature, max_tokens, messages } = req.body;

  if (!model || !messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing or invalid required parameters' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature: temperature ?? 0.7,
      max_tokens: max_tokens ?? 300,
    });

    const result = completion.choices[0]?.message?.content?.trim() || '';
    res.status(200).json({ result });
  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).json({ error: 'Something went wrong with OpenAI API' });
  }
}

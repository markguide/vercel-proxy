// /api/generate.js
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ustaw w środowisku Vercel
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  const { model, temperature, messages, max_tokens } = req.body;

  if (!model || !messages) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: model || 'gpt-3.5-turbo',
      messages,
      temperature: temperature || 0.7,
      max_tokens: max_tokens || 500,
    });

    // Zwracamy dokładnie taki format jak OpenAI
    res.status(200).json({
      choices: [
        {
          message: {
            role: 'assistant',
            content: chatCompletion.choices[0].message.content,
          },
        },
      ],
    });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}

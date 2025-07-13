import axios from 'axios';

export default async function handler(req, res) {
  const { model, messages, temperature, max_tokens } = req.body;

  if (!model || !messages || !temperature) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const openaiRes = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model,
        messages,
        temperature,
        max_tokens: max_tokens || 1500
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json(openaiRes.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
}

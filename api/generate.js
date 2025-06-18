import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { title, theme, style, chapters } = req.body;

  if (!title || !theme || !style || !chapters) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const messages = [
    {
      role: "system",
      content: `You're an assistant who writes interactive stories in various literary styles.`
    },
    {
      role: "user",
      content: `Generate a story titled "${title}" in the style of ${style}, based on the theme: "${theme}". It should have ${chapters} chapters, including an introduction and an ending. Each chapter ends with two options for the reader to choose from. Format the response as JSON with chapters.`
    }
  ];

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: messages
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Error communicating with OpenAI' });
  }
}

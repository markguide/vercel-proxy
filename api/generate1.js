import axios from 'axios';

export default async function handler(req, res) {

  try {
    const openaiRes = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an author writing poems.' },
          { role: 'user', content: req.body.messages }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

     res.status(200).json(openaiRes.data);
   // res.json(openaiRes.data.choices[0].message.content);
    
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'OpenAI API error', details: error.message });
  }
}

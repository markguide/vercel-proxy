import axios from 'axios';

export default async function handler(req, res) {

  const { role , content , model , messages , temperature } = req.body;

  // if (!model || !messages || !temperature ) {
  //   return res.status(400).json({ error: 'Missing required fields' });
  // }
  
  try {
    const openaiRes = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an author writing poems.' },
          { role: 'user', content: "content" }
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

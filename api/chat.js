import fs from 'fs';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { question } = req.body;
  const policy = fs.readFileSync('./public/policy.txt', 'utf8');
  const resp = await fetch(
    'https://api.openai.com/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Answer based *only* on the policy below:' },
          { role: 'system', content: `Policy:\n${policy}` },
          { role: 'user', content: question }
        ]
      })
    }
  );
  const { choices } = await resp.json();
  res.status(200).json({ answer: choices[0].message.content });
}

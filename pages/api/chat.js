// pages/api/chat.js
import fs from 'fs';
import path from 'path';
import { Configuration, OpenAIApi } from 'openai';

const cfg = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(cfg);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { question } = req.body;
  // load your policy text from /public/policy.txt
  const policy = fs.readFileSync(path.join(process.cwd(), 'public', 'policy.txt'), 'utf8');

  const messages = [
    { role: 'system', content: 'You answer questions based solely on the policy below.' },
    { role: 'system', content: `Policy:\n${policy}` },
    { role: 'user', content: question },
  ];

  const chat = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
  });

  const answer = chat.data.choices[0].message.content;
  res.status(200).json({ answer });
}

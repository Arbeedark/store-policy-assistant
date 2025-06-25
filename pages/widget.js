// pages/widget.js
import { useState } from 'react';

export default function Widget() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const ask = async () => {
    setAnswer('…thinking…');
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const { answer: a } = await res.json();
    setAnswer(a);
  };

  return (
    <div className="container py-3">
      <h5>Policy Assistant</h5>
      <div className="mb-2">
        <input
          className="form-control"
          placeholder="Ask a policy question…"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={ask}>Ask</button>
      <div className="mt-3">
        <pre style={{ whiteSpace: 'pre-wrap' }}>{answer}</pre>
      </div>
    </div>
  );
}

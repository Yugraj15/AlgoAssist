import React, { useState } from 'react';
import CodeInput from './components/CodeInput';
import ResponseCard from './components/ResponseCard';
import History from './components/History';

import bgImage from './assests/bg.jpg';

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async (code, mode) => {
  setLoading(true);
  try {
    const res = await fetch('https://algoassist-backend-b9ip.onrender.com/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, mode })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Server error');
    setResult(data);
  } catch (err) {
    alert(err.message || 'Error');
  } finally {
    setLoading(false);
  }
};

  return (
    // min-h-screen ensures it takes full height, no max-w- to fill width
    <div className="min-h-screen bg-transparent p-4 md:p-6 flex flex-col items-center justify-between"
    style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
      <header className="w-full mb-6 rounded-xl p-6 text-white text-center shadow-2xl" 
              style={{ background: 'linear-gradient(90deg, #1f2937, #4b5563)', maxWidth: '1200px' }}>
        <h1 className="text-4xl font-extrabold tracking-tight">AlgoAssist</h1>
        <p className="text-emerald-300 mt-2 font-mono text-lg">Explain, debug & analyze code with AI.</p>
      </header>

      <main className="w-full grid md:grid-cols-2 gap-4 md:gap-6 flex-grow" style={{ maxWidth: '1200px' }}>
        <div className="glass p-6 rounded-2xl shadow-xl flex flex-col">
          <CodeInput onAnalyze={analyze} loading={loading} />
        </div>

        <div className="glass p-6 rounded-2xl shadow-xl flex flex-col">
          <h3 className="text-xl font-semibold mb-4 text-white">AI Result</h3>
          {loading && <div className="text-neutral-500 text-lg">Analyzing...</div>}
          {!loading && result && <ResponseCard data={result} />}
          {!loading && !result && <div className="text-neutral-500 text-lg">Paste code and choose a mode to get started.</div>}
        </div>
      </main>

      <div className="glass w-full p-6 rounded-2xl shadow-xl mt-4 md:mt-6" style={{ maxWidth: '1200px' }}>
        <h3 className="text-xl font-semibold mb-4 text-white">History</h3>
        <History onSelect={(item) => setResult(item)} />
      </div>
    </div>
  );
}
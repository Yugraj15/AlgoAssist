        import React, { useState } from 'react';

        export default function CodeInput({ onAnalyze, loading }){
          const [code, setCode] = useState(`def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

print(bubble_sort([5,2,9,1,5]))`);
          const [mode, setMode] = useState('analyze');

          return (
            <div>
              <label className="block font-medium mb-1">Mode</label>
              <select className="mb-3 p-2 border rounded w-full" value={mode} onChange={e => setMode(e.target.value)}>
                <option value="analyze">Analyze (algorithm)</option>
                <option value="explain">Explain</option>
                <option value="debug">Debug</option>
              </select>

              <label className="block font-medium mb-1">Paste your code</label>
              <textarea className="code-area w-full p-3 border rounded h-56" value={code} onChange={e => setCode(e.target.value)} />

              <div className="flex gap-2 mt-3">
                <button className="px-4 py-2 bg-white text-black rounded shadow" disabled={loading} onClick={() => onAnalyze(code, mode)}>
                  {loading ? 'Analyzing…' : 'Analyze'}
                </button>
                <button className="px-4 py-2 border rounded" onClick={() => setCode('')}>Clear</button>
              </div>
            </div>
          );
        }

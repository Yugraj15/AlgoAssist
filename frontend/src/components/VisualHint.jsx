import React from 'react';

export default function VisualHint({ algorithm = '' }) {
  const alg = (algorithm || '').toLowerCase();

  if (alg.includes('sort')) {
    const arr = [5,3,8,1,6];
    return (
      <div>
        <strong className="block mb-2">Sorting hint</strong>
        <div className="flex items-end gap-2 h-24">
          {arr.map((n,i) => (
            <div key={i} style={{height: `${n*10}px`}} className="w-6 rounded bg-gradient-to-b from-indigo-400 to-indigo-600 transition-all"></div>
          ))}
        </div>
        <p className="text-sm text-slate-500 mt-2">Bars represent array elements — sorting swaps adjacent bars for many algorithms.</p>
      </div>
    );
  }

  if (alg.includes('bfs') || alg.includes('dfs') || alg.includes('graph')) {
    return (
      <div>
        <strong className="block mb-2">Graph hint</strong>
        <svg width="200" height="120" className="border rounded p-2 bg-white">
          <line x1="40" y1="20" x2="120" y2="20" stroke="#94a3b8" strokeWidth="2" />
          <line x1="80" y1="60" x2="160" y2="100" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="40" cy="20" r="12" fill="#7dd3fc"/>
          <circle cx="120" cy="20" r="12" fill="#60a5fa"/>
          <circle cx="80" cy="60" r="12" fill="#7dd3fc"/>
          <circle cx="160" cy="100" r="12" fill="#60a5fa"/>
        </svg>
        <p className="text-sm text-slate-500 mt-2">Nodes connected by edges — traversal visits nodes in a particular order.</p>
      </div>
    );
  }

  if (alg.includes('dynamic') || alg.includes('dp') || alg.includes('knap') || alg.includes('lcs')) {
    return (
      <div>
        <strong className="block mb-2">DP hint</strong>
        <div className="grid grid-cols-5 gap-1">
          {Array.from({length:25}).map((_,i) => (
            <div key={i} className="h-8 flex items-center justify-center text-xs border rounded bg-slate-100">
              {i%6===0 ? '↵' : ''}
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-500 mt-2">DP problems use tables/grids that get filled step-by-step.</p>
      </div>
    );
  }

  return (
    <div>
      <strong className="block mb-2">Quick tip</strong>
      <p className="text-sm text-slate-500">If an algorithm is detected, a small visual hint appears (bars for sorting, tiny graph for traversal, table for DP).</p>
    </div>
  );
}

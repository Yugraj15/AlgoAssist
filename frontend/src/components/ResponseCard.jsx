import React from 'react';
import VisualHint from './VisualHint';

export default function ResponseCard({ data }) {
  const ai = data.aiResponse || data;
  const algorithm = ai.algorithm || ai.algorithm || (ai?.summary ? '—' : 'Unknown');

  return (
    <div>
      <div className="mb-3">
        <strong>Algorithm:</strong> <span className="text-indigo-600">{algorithm}</span>
      </div>

      <div className="mb-3">
        <strong>Explanation:</strong>
        <div className="mt-2 p-3 bg-slate-50 rounded">{ai.explanation || ai.summary || ai.raw || 'No explanation returned.'}</div>
      </div>

      {ai.pseudocode && (
        <div className="mb-3">
          <strong>Pseudocode:</strong>
          <pre className="mt-2 p-3 bg-black text-white rounded whitespace-pre-wrap">{ai.pseudocode}</pre>
        </div>
      )}

      {ai.complexity && (
        <div className="mb-3">
          <strong>Complexity:</strong>
          <div className="mt-1">{ai.complexity}</div>
        </div>
      )}

      {ai.fixedCode && (
        <div className="mb-3">
          <strong>Fixed code suggestion:</strong>
          <pre className="mt-2 p-3 bg-slate-900 text-white rounded">{ai.fixedCode}</pre>
        </div>
      )}

      <div className="mt-4">
        <VisualHint algorithm={algorithm} />
      </div>
    </div>
  );
}

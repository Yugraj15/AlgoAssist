import React, { useEffect, useState } from 'react';

export default function History({ onSelect }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const res = await fetch('http://localhost:5000/api/history');
      const data = await res.json();
      setItems(data || []);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-2 max-h-48 overflow-auto">
      {items.length === 0 && <div className="text-slate-500">No history yet.</div>}
      {items.map(item => (
        <div key={item._id} className="p-2 border rounded hover:bg-slate-50 cursor-pointer" onClick={() => onSelect(item)}>
          <div className="text-sm font-medium">{item.algorithm || item.mode}</div>
          <div className="text-xs text-slate-500 truncate">{(item.code || '').slice(0,120)}</div>
          <div className="text-xs text-slate-400">{new Date(item.createdAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}

import React from 'react';

const TransactionList = ({ type, data = [], year, loading, error }) => (
  <div className="glass-card p-4">
    <h3 className="font-semibold mb-2">{type.charAt(0).toUpperCase() + type.slice(1)} for {year}</h3>
    {error && <div className="text-red-500 mb-2">{error}</div>}
    {loading ? (
      <div className="text-gray-400">Loading...</div>
    ) : data.length === 0 ? (
      <div className="text-gray-400">No {type} recorded.</div>
    ) : (
      <ul className="divide-y divide-white/10">
        {data.map((item, index) => (
          <li key={item.id || index} className="py-1 flex justify-between">
            <span className="capitalize">{item.category}</span>
            <span className="font-mono">₹{item.amount}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default TransactionList;

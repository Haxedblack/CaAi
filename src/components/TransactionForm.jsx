import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { useFirebase } from '../contexts/FirebaseContext';

const TransactionForm = ({ type, year }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { db } = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!amount || !category) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, type), { amount: parseFloat(amount), category, year });
      setAmount('');
      setCategory('');
    } catch (err) {
      setError('Failed to add transaction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-4 space-y-2">
      <h3 className="font-semibold mb-2">Add {type.charAt(0).toUpperCase() + type.slice(1)}</h3>
      {error && <div className="text-red-500">{error}</div>}
      <label className="block">
        <span className="text-sm">Amount</span>
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
          className="mt-1 w-full rounded border border-white/20 bg-transparent px-2 py-1"
        />
      </label>
      <label className="block">
        <span className="text-sm">Category</span>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
          className="mt-1 w-full rounded border border-white/20 bg-transparent px-2 py-1"
        />
      </label>
      <button
        type="submit"
        className="btn-primary w-full mt-2"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
};

export default TransactionForm;

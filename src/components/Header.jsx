import React from 'react';

const Header = ({ selectedYear, setSelectedYear, incomes = [], expenses = [] }) => {
  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <header className="bg-indigo-800 p-4 flex justify-between items-center" aria-label="Main header">
      <h1 className="text-2xl font-bold tracking-tight">AI CA Dashboard</h1>
      <label className="sr-only" htmlFor="year-select">Select Year</label>
      <select
        id="year-select"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        className="p-2 rounded bg-white/10 border border-white/20 text-white"
      >
        <option>2024-2025</option>
        <option>2023-2024</option>
      </select>
      <div className="font-semibold">
        Balance: ₹{balance.toLocaleString('en-IN')}
      </div>
    </header>
  );
};

export default Header;

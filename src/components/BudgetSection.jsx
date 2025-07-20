import React from 'react';

const BudgetSection = ({ budgets = [], expenses = [], year, error }) => {
  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <section className="glass-card p-6 rounded-2xl shadow-xl">
      <h3 className="text-xl font-bold mb-4">Budget for {year}</h3>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {budgets.length === 0 ? (
        <div className="text-gray-400">No budget set for this year.</div>
      ) : (
        <>
          <p>
            Total Budget:{' '}
            <span className="font-mono">₹{totalBudget.toLocaleString('en-IN')}</span>
          </p>
          <p>
            Total Spent:{' '}
            <span className="font-mono">₹{totalSpent.toLocaleString('en-IN')}</span>
          </p>
          <p className={totalSpent > totalBudget ? 'text-red-500' : 'text-green-500'}>
            Status: {totalSpent > totalBudget ? 'Over Budget' : 'Within Budget'}
          </p>
        </>
      )}
    </section>
  );
};

export default BudgetSection;

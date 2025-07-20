import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AnalyticsSection = ({ incomes = [], expenses = [], error }) => {
  const chartData = incomes.map((inc, index) => ({
    name: inc.category || `Item ${index + 1}`,
    income: inc.amount,
    expense: expenses[index]?.amount || 0,
  }));

  return (
    <section className="glass-card p-6 rounded-2xl shadow-xl">
      <h3 className="text-xl font-bold mb-4">Financial Analytics</h3>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {incomes.length === 0 && expenses.length === 0 ? (
        <div className="text-gray-400">No data to display.</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip contentStyle={{ background: '#1e293b', border: 'none' }} />
            <Legend />
            <Bar dataKey="income" fill="#4f46e5" />
            <Bar dataKey="expense" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
};

export default AnalyticsSection;

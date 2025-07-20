import React, { useState, useEffect, useMemo } from 'react';
import Header from './Header';
import AnalyticsSection from './AnalyticsSection';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import BudgetSection from './BudgetSection';
import Chatbot from './Chatbot';
import AuthPrompt from './AuthPrompt';
import { useFirebase } from '../contexts/FirebaseContext';
import { useFirestoreCollection } from '../hooks/useFirestoreCollection';

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  const { data: incomes } = useFirestoreCollection('incomes', selectedYear);
  const { data: expenses } = useFirestoreCollection('expenses', selectedYear);
  const { data: budgets } = useFirestoreCollection('budgets', selectedYear);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useFirebase();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Memoize props to avoid unnecessary renders
  const memoIncomes = useMemo(() => incomes, [incomes]);
  const memoExpenses = useMemo(() => expenses, [expenses]);
  const memoBudgets = useMemo(() => budgets, [budgets]);

  // Error boundary for dashboard
  try {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <Header selectedYear={selectedYear} setSelectedYear={setSelectedYear} incomes={memoIncomes} expenses={memoExpenses} />
        <main className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className={`lg:col-span-2 space-y-8 ${activeTab !== 'dashboard' && 'hidden'}`}>
            <AnalyticsSection incomes={memoIncomes} expenses={memoExpenses} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <TransactionForm type="incomes" year={selectedYear} />
              <TransactionList type="incomes" data={memoIncomes} year={selectedYear} />
              <TransactionForm type="expenses" year={selectedYear} />
              <TransactionList type="expenses" data={memoExpenses} year={selectedYear} />
            </div>
          </div>
          <div className={`lg:col-span-2 space-y-8 ${activeTab !== 'budgets' && 'hidden'}`}>
            <BudgetSection budgets={memoBudgets} expenses={memoExpenses} year={selectedYear} />
          </div>
          <div className="lg:col-span-1 sticky top-24">
            {user?.isAnonymous ? <AuthPrompt /> : <Chatbot />}
          </div>
        </main>
      </div>
    );
  } catch (err) {
    return <div className="text-red-500 p-4">Dashboard failed to load. Please refresh.</div>;
  }
};

export default Dashboard;

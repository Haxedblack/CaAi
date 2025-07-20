import React from 'react';

const EnhancedLandingPage = () => (
  <main className="min-h-screen bg-gradient-to-br from-indigo-900 to-slate-900 flex items-center justify-center" aria-label="Landing page">
    <section className="text-center">
      <h1 className="text-5xl font-bold text-white mb-4">AI CA Assistant</h1>
      <p className="text-xl text-white/80 mb-8">Your smart companion for accounting and tax planning.</p>
      <a href="/dashboard" className="btn-primary inline-block" role="button" aria-label="Enter Dashboard">
        Enter Dashboard
      </a>
    </section>
  </main>
);

export default EnhancedLandingPage;

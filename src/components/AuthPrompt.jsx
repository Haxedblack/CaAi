import React, { useState } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';

const AuthPrompt = () => {
  const { auth } = useFirebase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await auth.signInAnonymously();
    } catch (err) {
      setError('Sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 rounded-2xl shadow-xl text-center">
      <h3 className="text-xl font-bold mb-4">Sign In to Access Full Features</h3>
      <p className="mb-4">Anonymous sign-in for quick access.</p>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <button
        onClick={handleSignIn}
        className="btn-primary"
        aria-label="Sign In Anonymously"
        disabled={loading}
      >
        {loading ? 'Signing In...' : 'Sign In Anonymously'}
      </button>
    </div>
  );
};

export default AuthPrompt;

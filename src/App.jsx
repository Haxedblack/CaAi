import React, { Suspense } from 'react';  // Import Suspense for lazy loading
import { FirebaseProvider } from './contexts/FirebaseContext';  // Adjust path if needed
import AuthGate from './components/AuthGate';  // Import your auth wrapper
import ErrorBoundary from './components/ErrorBoundary';  // Assuming you have this; adjust if needed
import LoadingSpinner from './components/LoadingSpinner';  // For fallback UI

function App() {
  return (
    <React.StrictMode>  {/* Place at root for development checks */}
      <FirebaseProvider>  {/* Global Firebase context */}
        <ErrorBoundary>  {/* Catches runtime errors */}
          <Suspense fallback={<LoadingSpinner text="Initializing AI CA Assistant..." />}>  {/* Handles lazy loading */}
            <AuthGate>  {/* Auth check - wraps protected content */}
              {/* Your main app content goes here */}
              {/* Example: Add Dashboard, Chatbot, or routes */}
              <div className="min-h-screen bg-slate-900 text-white p-4">
                <h1 className="text-3xl font-bold mb-4">AI CA Assistant Dashboard</h1>
                <p>Welcome! Add your components below.</p>
                {/* Replace with actual components like <Dashboard /> or <Chatbot /> */}
              </div>
            </AuthGate>
          </Suspense>
        </ErrorBoundary>
      </FirebaseProvider>
    </React.StrictMode>
  );
}

export default App;

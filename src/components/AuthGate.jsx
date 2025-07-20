import React from 'react';
import { useFirebase } from '../contexts/FirebaseContext'; // Adjust path if needed
import LoadingSpinner from './LoadingSpinner'; // If you have this component

const AuthGate = ({ children }) => {
  const { user, isAuthReady } = useFirebase();

  if (!isAuthReady) {
    return <LoadingSpinner text="Authenticating..." />;
  }

  if (!user) {
    // Redirect to login or show prompt
    return <div>Please log in to access the app.</div>; // Or use a Login component
  }

  return children; // Render protected content if authenticated
};

export default AuthGate;

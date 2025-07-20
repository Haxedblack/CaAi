import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, setLogLevel } from 'firebase/firestore';

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [db, setDb] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      let app;
      if (!getApps().length) {
        app = initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG || '{}'));
      } else {
        app = getApps()[0];
      }
      const authInstance = getAuth(app);
      const dbInstance = getFirestore(app);
      setLogLevel('error'); // Suppress non-critical logs

      setAuth(authInstance);
      setDb(dbInstance);

      const unsubscribe = onAuthStateChanged(authInstance, (currentUser) => {
        setUser(currentUser);
        setIsAuthReady(true);
      });

      return () => unsubscribe();
    } catch (err) {
      setError('Firebase initialization failed. Check configuration.');
      setIsAuthReady(true);
    }
  }, []);

  const contextValue = useMemo(
    () => ({ auth, db, user, isAuthReady }),
    [auth, db, user, isAuthReady]
  );

  if (error) return <div className="error text-red-500 p-4">{error}</div>;
  if (!isAuthReady) return <div className="text-gray-400 p-4">Connecting to Firebase...</div>;

  return <FirebaseContext.Provider value={contextValue}>{children}</FirebaseContext.Provider>;
};

export const useFirebase = () => useContext(FirebaseContext);

import { useEffect, useState, useMemo } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useFirebase } from '../contexts/FirebaseContext';

export const useFirestoreCollection = (col, year) => {
  const { db } = useFirebase();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!db) return;
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const q = query(collection(db, col), where('year', '==', year));
        const snapshot = await getDocs(q);
        setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        setError('Failed to fetch data.');
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [db, col, year]);

  return useMemo(() => ({ data, loading, error }), [data, loading, error]);
};

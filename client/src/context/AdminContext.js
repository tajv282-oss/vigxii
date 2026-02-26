import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { verifyAdmin } from '../services/api';

const AdminContext = createContext(null);

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken();
          setToken(idToken);

          const result = await verifyAdmin(idToken);
          if (result.success) {
            setUser(result.user);
            setIsAdmin(true);
          } else {
            setUser(null);
            setIsAdmin(false);
          }
        } catch (err) {
          console.error('Admin verification failed:', err);
          setUser(null);
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setToken(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Refresh token periodically (Firebase tokens expire after 1hr)
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const newToken = await currentUser.getIdToken(true);
        setToken(newToken);
      }
    }, 45 * 60 * 1000); // Refresh every 45 mins
    return () => clearInterval(interval);
  }, [user]);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setToken(null);
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ user, token, isAdmin, loading, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

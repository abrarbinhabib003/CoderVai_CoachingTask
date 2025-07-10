import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase.init';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { API_ENDPOINTS, API_CONFIG } from '../api/config';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register new user
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login user
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout user
  const logout = () => {
    return signOut(auth);
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('AuthProvider onAuthStateChanged user:', user);
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up on unmount
  }, []);

  const value = {
    currentUser,
    register,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
}

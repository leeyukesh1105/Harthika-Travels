import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('harthika_admin_username');
    const token = localStorage.getItem('harthika_admin_token');
    if (savedUser && token) setUsername(savedUser);
    setLoading(false);
  }, []);

  async function login(user, pass) {
    const data = await api.login(user, pass);
    localStorage.setItem('harthika_admin_token', data.token);
    localStorage.setItem('harthika_admin_username', data.username);
    setUsername(data.username);
    return data;
  }

  function logout() {
    localStorage.removeItem('harthika_admin_token');
    localStorage.removeItem('harthika_admin_username');
    setUsername(null);
  }

  return (
    <AuthContext.Provider value={{ username, isAuthenticated: !!username, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

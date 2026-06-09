import React, { createContext, useContext, useEffect, useState } from 'react';
import apiClient from '../api/client';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      apiClient.setToken(token);
      apiClient.get('/auth/me')
        .then((res) => {
          setUser(res?.data ?? null);
        })
        .catch(() => {
          apiClient.setToken(null);
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const register = async (payload) => {
    const res = await apiClient.post('/auth/register', payload);
    if (res?.token) {
      apiClient.setToken(res.token);
      setUser(res.data ?? null);
    }
    return res;
  };

  const login = async (payload) => {
    const res = await apiClient.post('/auth/login', payload);
    if (res?.token) {
      apiClient.setToken(res.token);
      setUser(res.data ?? null);
    }
    return res;
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (e) {
      // ignore
    }
    apiClient.setToken(null);
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

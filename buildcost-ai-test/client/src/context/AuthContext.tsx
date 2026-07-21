import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authApi } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateUser: (updated: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('buildcost_user');
    return saved ? JSON.parse(saved) : {
      id: 'demo_user_101',
      name: 'Alex Rivera',
      email: 'alex@buildcost.ai',
      phone: '+1 (555) 382-9102',
      role: 'General Contractor',
      subscription: 'Pro Builder',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      currency: 'USD',
      unit: 'sq.ft'
    };
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem('buildcost_token') || 'mock_jwt_token_2026');

  useEffect(() => {
    if (user) localStorage.setItem('buildcost_user', JSON.stringify(user));
  }, [user]);

  const login = async (credentials: any) => {
    const data = await authApi.login(credentials);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('buildcost_token', data.token);
    localStorage.setItem('buildcost_user', JSON.stringify(data.user));
  };

  const register = async (formData: any) => {
    const data = await authApi.register(formData);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('buildcost_token', data.token);
    localStorage.setItem('buildcost_user', JSON.stringify(data.user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('buildcost_token');
    localStorage.removeItem('buildcost_user');
  };

  const updateUser = (updated: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updated };
      setUser(newUser);
      localStorage.setItem('buildcost_user', JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

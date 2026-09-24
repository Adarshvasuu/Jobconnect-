import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, USER_ROLES } from '../utils/constants';
import authApi from '../api/authApi';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    return saved ? JSON.parse(saved) : {
      id: 'demo-user-1',
      name: 'Adarsh Sharma',
      email: 'adarsh@example.com',
      role: USER_ROLES.SEEKER,
    };
  });

  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEYS.TOKEN) || 'mock-token-session');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.ROLE, user.role);
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.ROLE);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } else {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
    }
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await authApi.login(credentials);
      setUser(data.user);
      setToken(data.token);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      const data = await authApi.signup(userData);
      setUser(data.user);
      setToken(data.token);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      setToken(null);
      localStorage.clear();
    }
  };

  // Switch role in development to inspect Seeker, Recruiter, and Admin portals instantly
  const switchRole = (newRole) => {
    setUser((prev) => {
      const updated = {
        ...prev,
        role: newRole,
        name: newRole === USER_ROLES.ADMIN ? 'Admin User' : (newRole === USER_ROLES.RECRUITER ? 'Tech Recruiter' : 'Adarsh Sharma'),
      };
      return updated;
    });
  };

  const value = {
    user,
    token,
    role: user?.role || USER_ROLES.SEEKER,
    isAuthenticated: Boolean(user && token),
    loading,
    login,
    signup,
    logout,
    switchRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

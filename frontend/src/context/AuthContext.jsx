import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        // Set Axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
      }
      setLoading(false);
    };

    checkUserLoggedIn();
  }, []);

  const login = async (userData) => {
    const data = await authService.login(userData);
    setUser(data.data);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    setUser(data.data);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

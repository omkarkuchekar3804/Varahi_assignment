import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();

  const login = (username, password, navigate) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUser = users.find((u) => u.username === username && u.password === password);
    if (loggedInUser) {
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      if (loggedInUser.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    }
  };

  const logout = (navigate) => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const updateUser = (updatedUser) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map((u) => (u.username === updatedUser.username ? updatedUser : u));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const register = (newUser, navigate) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/login');
  };

  const deleteUser = (username) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.filter((u) => u.username !== username);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, register, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
};
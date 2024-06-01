import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import { AuthProvider, useAuth } from './context/AuthContext';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
       <Router>
      <div>
      <AuthProvider>
        <Routes>
        <Route path="/" element={<LoginForm/>} />
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/register" element={<RegistrationForm/>} />
          <Route path="/user-dashboard" element={<UserDashboard/>} />
          <Route path="/admin-dashboard" element={<AdminDashboard/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
        </AuthProvider>
      </div>
    </Router>
    </div>
  );
}

export default App;

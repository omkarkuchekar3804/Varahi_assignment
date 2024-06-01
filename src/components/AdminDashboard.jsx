import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserTable from './UserTable';
import UserForm from './UserForm';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
  
    useEffect(() => {
      if (!user) {
        navigate('/login');
        return;
      }
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      setUsers(storedUsers);
    }, [user, navigate]);
  
    const handleLogout = () => {
    //   logout();
    //   navigate('/login');
    logout(navigate);
    };
  
    const handleDelete = (username) => {
      const updatedUsers = users.filter(u => u.username !== username);
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    };
  
    const handleEdit = (user) => {
      setEditingUser(user);
    };
  
    const handleSave = (updatedUser) => {
      const updatedUsers = users.map(u => (u.username === updatedUser.username ? updatedUser : u));
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setEditingUser(null);
    };
  
    const handleAdd = (newUser) => {
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    };
  
    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        {user && user.username && (
        <p className='text-xl p-4'>Welcome, {user.username}</p>
      )}
        <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-md mb-4">
          Logout
        </button>
  
        
        <UserTable
          users={currentUsers}
          onDelete={handleDelete}
          onEdit={handleEdit}
          usersPerPage={usersPerPage}
          totalUsers={users.length}
          paginate={paginate}
        />
        <div className='mt-4'>
        <UserForm onSave={editingUser ? handleSave : handleAdd} editingUser={editingUser} />
        </div>
      </div>
    );
  };
  
  export default AdminDashboard;
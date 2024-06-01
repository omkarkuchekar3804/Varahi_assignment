import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, login } = useAuth();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [password, setPassword] = useState(user.password);

  const handleUpdate = () => {
    const updatedUser = { ...user, firstName, lastName, password };
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u => u.username === user.username ? updatedUser : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    login(updatedUser);
    alert('Profile updated successfully');
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <div className="mb-4">
        <label className="block mb-2">First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <button onClick={handleUpdate} className="w-full bg-blue-500 text-white py-2 rounded-md">Update</button>
    </div>
  );
};

export default Profile;
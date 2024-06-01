import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserDashboard = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ ...user });
  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'user') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout(navigate);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateUser(profile);
    setIsEditing(false);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="flex-col max-w-4xl mx-auto p-4">
      <h2 className="flex text-2xl items-center font-bold mb-4 justify-center bg-blue-200">User Dashboard</h2>
      <p className='text-xl p-4'>Welcome, {user.username}</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-md mb-4"
      >
        Logout
      </button>
      {showPopup && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          Profile successfully updated!
        </div>
      )}
      {!isEditing ? (
        <div>
          <h3 className="text-xl font-bold mb-4">Profile</h3>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
          >
            Edit
          </button>
        </div>
      ) : (
        <form onSubmit={handleSave} className="max-w-md">
          <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
          <div className="mb-4">
            <label className="block mb-2">First Name</label>
            <input
              type="text"
              value={profile.firstName}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Last Name</label>
            <input
              type="text"
              value={profile.lastName}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default UserDashboard;
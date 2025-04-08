import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>טוען...</div>;
  }

  return user && user.role === 'admin' ? children : <Navigate to="/" />;
};

export default AdminRoute; 
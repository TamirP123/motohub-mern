import React from 'react';
import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  const profile = Auth.getProfile();
  console.log("Profile in ProtectedRoute:", profile); // Debug log

  if (!Auth.loggedIn() || !profile || !profile.isAdmin) {
    console.log("User not logged in or not an admin"); // Debug log
    return <Navigate to="/adminlogin" replace />;
  }

  return children;
};

export default ProtectedRoute;
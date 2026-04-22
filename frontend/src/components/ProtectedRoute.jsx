import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import authService from '../services/authService';

/**
 * ProtectedRoute Component
 * 
 * This component protects routes that require authentication.
 * If the user is not authenticated, they are redirected to the login page.
 * 
 * Features:
 * - Checks authentication status using authService
 * - Preserves intended destination for post-login redirect
 * - Renders children only when authenticated
 * - Handles loading states gracefully
 */
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();

  // If not authenticated, redirect to login with return path
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;

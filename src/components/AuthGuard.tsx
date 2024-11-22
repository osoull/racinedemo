import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../services/auth';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user is accessing the correct route for their role
  const path = location.pathname.split('/')[1]; // Get first part of path
  const allowedPath = 
    (user.role === 'admin' || user.role === 'manager') && path === 'admin' ||
    user.role === 'user' && path === 'investor' ||
    user.role === 'borrower' && path === 'borrower';

  if (!allowedPath) {
    const correctPath = 
      user.role === 'admin' || user.role === 'manager' ? '/admin' :
      user.role === 'user' ? '/investor' :
      '/borrower';
    
    return <Navigate to={correctPath} replace />;
  }

  return <>{children}</>;
}
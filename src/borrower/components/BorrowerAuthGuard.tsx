import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../services/auth';

interface BorrowerAuthGuardProps {
  children: React.ReactNode;
}

export default function BorrowerAuthGuard({ children }: BorrowerAuthGuardProps) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated but not borrower, redirect to home
  if (user?.role !== 'borrower') {
    return <Navigate to="/" replace />;
  }

  // If authenticated and borrower, render children
  return <>{children}</>;
}
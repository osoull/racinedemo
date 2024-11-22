import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../services/auth';

interface InvestorAuthGuardProps {
  children: React.ReactNode;
}

export default function InvestorAuthGuard({ children }: InvestorAuthGuardProps) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated but not investor (user), redirect to home
  if (user?.role !== 'user') {
    return <Navigate to="/" replace />;
  }

  // If authenticated and investor, render children
  return <>{children}</>;
}
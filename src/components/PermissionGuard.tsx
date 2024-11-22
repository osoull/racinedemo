import React from 'react';
import { useAuthStore } from '../services/auth';

interface PermissionGuardProps {
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function PermissionGuard({ permission, children, fallback = null }: PermissionGuardProps) {
  const hasPermission = useAuthStore(state => state.hasPermission(permission));

  if (!hasPermission) {
    return fallback;
  }

  return <>{children}</>;
}
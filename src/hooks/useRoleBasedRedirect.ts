import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../services/auth';

export function useRoleBasedRedirect() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    const redirectPath = 
      user.role === 'admin' || user.role === 'manager' ? '/admin' :
      user.role === 'user' ? '/investor' :
      '/borrower';

    navigate(redirectPath, { replace: true });
  }, [user, navigate]);
}
import { useEffect, useRef } from 'react';
import { useAuthStore } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const TIMEOUT_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export function useAutoLogout() {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (logout) {
        logout();
        navigate('/login');
      }
    }, TIMEOUT_DURATION);
  };

  useEffect(() => {
    // Events to monitor user activity
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click'
    ];

    // Reset timer on any user activity
    const handleUserActivity = () => {
      resetTimer();
    };

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity);
    });

    // Initial timer setup
    resetTimer();

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
    };
  }, [logout, navigate]);
}
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../services/auth';

export default function Header() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className="absolute w-full top-0 left-0 right-0 z-50 bg-transparent py-4"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img 
              src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F8fefc08ff6352b1f82851d81737a6460.cdn.bubble.io%2Ff1729676645537x190880546208797250%2Flogo-horizontal-full.png"
              alt="رسين للاستثمار"
              className="h-40 w-auto brightness-0 invert"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 space-x-reverse">
            {[
              { path: '/', label: 'الرئيسية' },
              { path: '/about', label: 'عن رسين' },
              { path: '/investor-info', label: 'مستثمر' },
              { path: '/social', label: 'المسؤولية الاجتماعية' },
              { path: '/contact', label: 'تواصل معنا' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-sm font-medium transition-all duration-500 ${
                  isActive(item.path)
                    ? 'text-white'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {user ? (
              <div className="flex items-center space-x-4 space-x-reverse">
                <Link 
                  to={user.role === 'admin' || user.role === 'manager' ? '/admin' :
                      user.role === 'user' ? '/investor' :
                      '/borrower'}
                  className="text-sm font-medium text-white hover:text-white/80"
                >
                  {user.name}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-white/90 hover:text-white"
                  aria-label="تسجيل الخروج"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="px-6 py-2 rounded-lg text-sm font-medium bg-white/20 text-white hover:bg-white/30"
              >
                تسجيل الدخول
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
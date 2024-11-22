import React, { useState } from 'react';
import { Bell, Settings, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../services/auth';

export default function AdminHeader() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b" dir="rtl">
      <div className="max-w-[1800px] mx-auto px-4 py-4">
        {/* Mobile View */}
        <div className="flex lg:hidden items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">مرحباً {user?.name}</h1>
            <p className="text-xs text-gray-500">هذا ملخص نشاط المنصة</p>
          </div>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="relative p-2"
          >
            <div className="w-8 h-8 rounded-full bg-[#2B227C]/10 flex items-center justify-center">
              <span className="text-[#2B227C] font-medium">{user?.name?.[0]}</span>
            </div>
          </button>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">مرحباً {user?.name}</h1>
            <p className="text-sm text-gray-500">هذا ملخص نشاط المنصة</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-500">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#2B227C]/10">
                  {user?.photoUrl ? (
                    <img 
                      src={user.photoUrl} 
                      alt={user?.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[#2B227C] font-medium text-lg">{user?.name?.[0]}</span>
                    </div>
                  )}
                </div>
                <div className="text-right hidden lg:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">
                    {user?.role === 'admin' ? 'مدير النظام' : 'مدير العمليات'}
                  </p>
                </div>
              </button>

              {showDropdown && (
                <div className="absolute left-0 mt-2 w-48 rounded-lg bg-white shadow-lg py-1 border">
                  <button
                    onClick={() => navigate('/admin/profile')}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <User className="h-4 w-4" />
                    <span>الملف الشخصي</span>
                  </button>
                  <button
                    onClick={() => navigate('/admin/settings')}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="h-4 w-4" />
                    <span>الإعدادات</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>تسجيل الخروج</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  FileText, 
  Settings,
  LogOut 
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem = ({ icon, label, isActive, onClick }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 space-x-reverse p-3 rounded-lg mb-2 ${
      isActive ? 'bg-primary-50 text-primary-500' : 'text-gray-600 hover:bg-gray-50'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const menuItems = [
    { path: '/admin/dashboard', label: 'نظرة عامة', icon: <BarChart3 className="h-5 w-5" /> },
    { path: '/admin/investors', label: 'المستثمرون', icon: <Users className="h-5 w-5" /> },
    { path: '/admin/projects', label: 'المشاريع', icon: <FileText className="h-5 w-5" /> },
    { path: '/admin/settings', label: 'الإعدادات', icon: <Settings className="h-5 w-5" /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed right-0" dir="rtl">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-primary-500">رسين</h1>
        <p className="text-sm text-gray-500 mt-1">لوحة تحكم المدير</p>
      </div>

      <nav className="p-4">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.path}
            {...item}
            isActive={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-500 font-medium">{user?.name?.[0]}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-gray-500"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  FileText, 
  Settings,
  LogOut,
  Menu,
  X,
  Building2,
  Wallet,
  Shield,
  ArrowUpRight
} from 'lucide-react';
import { useAuthStore } from '../../services/auth';

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/admin', label: 'نظرة عامة', icon: <BarChart3 className="h-5 w-5" /> },
    { path: '/admin/investors', label: 'المستثمرون', icon: <Users className="h-5 w-5" /> },
    { path: '/admin/projects', label: 'المشاريع', icon: <FileText className="h-5 w-5" /> },
    { path: '/admin/borrowers', label: 'المقترضون', icon: <Building2 className="h-5 w-5" /> },
    { path: '/admin/wallets', label: 'المحافظ', icon: <Wallet className="h-5 w-5" /> },
    { path: '/admin/kyc', label: 'التحقق من الهوية', icon: <Shield className="h-5 w-5" /> },
    { path: '/admin/upgrade-requests', label: 'طلبات الترقية', icon: <ArrowUpRight className="h-5 w-5" /> },
    { path: '/admin/settings', label: 'الإعدادات', icon: <Settings className="h-5 w-5" /> },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed right-4 top-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-md"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed right-0 top-0 h-screen bg-white shadow-lg z-40
        transition-transform duration-300 ease-in-out
        w-64
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-6 border-b">
          <img
            src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F8fefc08ff6352b1f82851d81737a6460.cdn.bubble.io%2Ff1729676645537x190880546208797250%2Flogo-horizontal-full.png"
            alt="رسين للاستثمار"
            className="h-40 w-auto"
          />
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto" dir="rtl">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 space-x-reverse p-3 rounded-lg mb-1 transition-colors ${
                  location.pathname === item.path
                    ? 'bg-[#2B227C]/10 text-[#2B227C]'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Certification Badges */}
        <div className="p-4 bg-gray-50">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-end gap-2">
              <div className="flex-1 text-[10px] text-gray-500 text-right">
                معتمدة من اللجنة الشرعية للتمويل الجماعي
              </div>
              <img 
                src="/badges/sharia-certified.svg" 
                alt="معتمدة من اللجنة الشرعية للتمويل الجماعي" 
                className="h-6 w-auto flex-shrink-0"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <div className="flex-1 text-[10px] text-gray-500 text-right">
                مرخصة من البنك المركزي لنشاط التمويل الجماعي بالدين
              </div>
              <img 
                src="/badges/sama-certified.svg" 
                alt="مرخصة من البنك المركزي لنشاط التمويل الجماعي بالدين" 
                className="h-6 w-auto flex-shrink-0"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
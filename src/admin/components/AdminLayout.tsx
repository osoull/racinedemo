import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { useAutoLogout } from '../../hooks/useAutoLogout';

export default function AdminLayout() {
  // Enable auto logout for admin layout
  useAutoLogout();

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="lg:mr-64 transition-all duration-300">
        <AdminHeader />
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
import React from 'react';
import { Outlet } from 'react-router-dom';
import BorrowerSidebar from './BorrowerSidebar';
import BorrowerHeader from './BorrowerHeader';
import { useAutoLogout } from '../../hooks/useAutoLogout';

export default function BorrowerLayout() {
  // Enable auto logout for borrower layout
  useAutoLogout();

  return (
    <div className="min-h-screen bg-gray-50">
      <BorrowerSidebar />
      <div className="lg:mr-64 transition-all duration-300">
        <BorrowerHeader />
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
import React from 'react';
import { Outlet } from 'react-router-dom';
import InvestorSidebar from './InvestorSidebar';
import InvestorHeader from './InvestorHeader';
import { useAutoLogout } from '../../hooks/useAutoLogout';

export default function InvestorLayout() {
  // Enable auto logout for investor layout
  useAutoLogout();

  return (
    <div className="min-h-screen bg-gray-50">
      <InvestorSidebar />
      <div className="lg:mr-64 transition-all duration-300">
        <InvestorHeader />
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
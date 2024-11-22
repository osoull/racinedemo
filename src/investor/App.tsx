import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import InvestorDashboard from './pages/InvestorDashboard';
import InvestorProjects from './pages/InvestorProjects';
import InvestorInvestments from './pages/InvestorInvestments';
import InvestorProfile from './pages/InvestorProfile';
import InvestorWallet from './pages/InvestorWallet';
import InvestorSettings from './pages/InvestorSettings';
import InvestorLayout from './components/InvestorLayout';
import InvestorAuthGuard from './components/InvestorAuthGuard';
import InvestorDetails from '../admin/pages/InvestorDetails';

export default function InvestorApp() {
  return (
    <Routes>
      {/* Protected investor routes */}
      <Route element={<InvestorAuthGuard><InvestorLayout /></InvestorAuthGuard>}>
        <Route index element={<InvestorDashboard />} />
        <Route path="projects" element={<InvestorProjects />} />
        <Route path="investments" element={<InvestorInvestments />} />
        <Route path="wallet" element={<InvestorWallet />} />
        <Route path="profile" element={<InvestorProfile />} />
        <Route path="settings" element={<InvestorSettings />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/investor" replace />} />
    </Routes>
  );
}
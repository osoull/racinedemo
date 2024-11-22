import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BorrowerDashboard from './pages/BorrowerDashboard';
import BorrowerProjects from './pages/BorrowerProjects';
import BorrowerDocuments from './pages/BorrowerDocuments';
import BorrowerPayments from './pages/BorrowerPayments';
import BorrowerSchedule from './pages/BorrowerSchedule';
import BorrowerCompany from './pages/BorrowerCompany';
import BorrowerWallet from './pages/BorrowerWallet';
import BorrowerHistory from './pages/BorrowerHistory';
import BorrowerCompliance from './pages/BorrowerCompliance';
import BorrowerProfile from './pages/BorrowerProfile';
import BorrowerSettings from './pages/BorrowerSettings';
import BorrowerLayout from './components/BorrowerLayout';
import BorrowerAuthGuard from './components/BorrowerAuthGuard';

export default function BorrowerApp() {
  return (
    <Routes>
      {/* Protected borrower routes */}
      <Route element={<BorrowerAuthGuard><BorrowerLayout /></BorrowerAuthGuard>}>
        <Route index element={<BorrowerDashboard />} />
        <Route path="projects" element={<BorrowerProjects />} />
        <Route path="documents" element={<BorrowerDocuments />} />
        <Route path="payments" element={<BorrowerPayments />} />
        <Route path="schedule" element={<BorrowerSchedule />} />
        <Route path="company" element={<BorrowerCompany />} />
        <Route path="wallet" element={<BorrowerWallet />} />
        <Route path="history" element={<BorrowerHistory />} />
        <Route path="compliance" element={<BorrowerCompliance />} />
        <Route path="profile" element={<BorrowerProfile />} />
        <Route path="settings" element={<BorrowerSettings />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/borrower" replace />} />
    </Routes>
  );
}
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import AdminProjects from './pages/AdminProjects';
import AdminInvestors from './pages/AdminInvestors';
import AdminBorrowers from './pages/AdminBorrowers';
import BorrowerDetails from './pages/BorrowerDetails';
import InvestorDetails from './pages/InvestorDetails';
import AdminSettings from './pages/AdminSettings';
import AdminProfile from './pages/AdminProfile';
import AdminWallets from './pages/AdminWallets';
import AdminKYC from './pages/AdminKYC';
import AdminUpgradeRequests from './pages/AdminUpgradeRequests';
import AdminLayout from './components/AdminLayout';
import AdminAuthGuard from './components/AdminAuthGuard';
import { ProjectManagement } from './pages/ProjectManagement';

export default function AdminApp() {
  return (
    <Routes>
      {/* Protected admin routes */}
      <Route element={<AdminAuthGuard><AdminLayout /></AdminAuthGuard>}>
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="projects/:id/details" element={<ProjectManagement />} />
        <Route path="investors" element={<AdminInvestors />} />
        <Route path="investors/:id" element={<InvestorDetails />} />
        <Route path="borrowers" element={<AdminBorrowers />} />
        <Route path="borrowers/:id" element={<BorrowerDetails />} />
        <Route path="wallets" element={<AdminWallets />} />
        <Route path="kyc" element={<AdminKYC />} />
        <Route path="upgrade-requests" element={<AdminUpgradeRequests />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
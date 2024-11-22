import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Social from './pages/Social';
import Investor from './pages/Investor';
import ProjectDetails from './components/ProjectDetails';
import AdminApp from './admin/App';
import InvestorApp from './investor/App';
import BorrowerApp from './borrower/App';
import Layout from './components/Layout';
import UserTypeSelection from './pages/UserTypeSelection';
import BorrowerRegister from './pages/BorrowerRegister';
import { useAuthStore } from './services/auth';
import AuthGuard from './components/AuthGuard';

export function App() {
  const { user } = useAuthStore();

  return (
    <Router>
      <Routes>
        {/* Public routes with layout */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/social" element={<Layout><Social /></Layout>} />
        <Route path="/investor-info" element={<Layout><Investor /></Layout>} />
        
        {/* Project details - shared component */}
        <Route path="/projects/:id" element={<ProjectDetails />} />

        {/* Auth routes */}
        <Route path="/login" element={
          user ? (
            <Navigate 
              to={
                user.role === 'admin' || user.role === 'manager' ? '/admin' : 
                user.role === 'user' ? '/investor' :
                '/borrower'
              } 
              replace 
            />
          ) : (
            <Login />
          )
        } />
        <Route path="/register" element={<UserTypeSelection />} />
        <Route path="/register/investor" element={<Register />} />
        <Route path="/register/borrower" element={<BorrowerRegister />} />

        {/* Protected routes */}
        <Route path="/admin/*" element={<AuthGuard><AdminApp /></AuthGuard>} />
        <Route path="/investor/*" element={<AuthGuard><InvestorApp /></AuthGuard>} />
        <Route path="/borrower/*" element={<AuthGuard><BorrowerApp /></AuthGuard>} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { USER_ROLES } from '../utils/constants';
import { useAuthContext } from '../context/AuthContext';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Auth Pages
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

// Onboarding Pages
import SeekerOnboardingPage from '../pages/SeekerOnboardingPage';
import RecruiterOnboardingPage from '../pages/RecruiterOnboardingPage';

// Dashboard Pages
import SeekerDashboard from '../pages/SeekerDashboard';
import RecruiterDashboard from '../pages/RecruiterDashboard';
import AdminDashboard from '../pages/AdminDashboard';

// Feature Pages
import JobListingsPage from '../pages/JobListingsPage';
import JobDetailsPage from '../pages/JobDetailsPage';
import ApplicationsPage from '../pages/ApplicationsPage';
import ProfilePage from '../pages/ProfilePage';
import MessagesPage from '../pages/MessagesPage';
import JobPostingPage from '../pages/JobPostingPage';

// 404
import NotFoundPage from '../pages/NotFoundPage';

// Smart Dashboard Dispatcher that renders the correct role dashboard without blank screens
const DashboardDispatcher = () => {
  const { role, user } = useAuthContext();
  const activeRole = user?.role || role || USER_ROLES.SEEKER;
  
  if (activeRole === USER_ROLES.RECRUITER) {
    return <RecruiterDashboard />;
  }
  if (activeRole === USER_ROLES.ADMIN) {
    return <AdminDashboard />;
  }
  return <SeekerDashboard />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* ======================== Public & Core Navigation Routes ======================== */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<DashboardDispatcher />} />
      <Route path="/dashboard" element={<DashboardDispatcher />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* ======================== Onboarding (Auth Required) ======================== */}
      <Route
        path="/onboarding/seeker"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.SEEKER]}>
            <SeekerOnboardingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/onboarding/recruiter"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.RECRUITER]}>
            <RecruiterOnboardingPage />
          </ProtectedRoute>
        }
      />

      {/* ======================== Seeker Routes ======================== */}
      <Route path="/seeker/dashboard" element={<SeekerDashboard />} />
      <Route
        path="/seeker/jobs"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.SEEKER]}>
            <JobListingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seeker/jobs/:jobId"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.SEEKER]}>
            <JobDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seeker/applications"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.SEEKER]}>
            <ApplicationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seeker/profile"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.SEEKER]}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seeker/messages"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.SEEKER]}>
            <MessagesPage />
          </ProtectedRoute>
        }
      />

      {/* ======================== Recruiter Routes ======================== */}
      <Route
        path="/recruiter/dashboard"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.RECRUITER]}>
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter/jobs/new"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.RECRUITER]}>
            <JobPostingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter/profile"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.RECRUITER]}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter/messages"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.RECRUITER]}>
            <MessagesPage />
          </ProtectedRoute>
        }
      />

      {/* ======================== Admin Routes ======================== */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/jobs"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/analytics"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* ======================== Fallback / 404 ======================== */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;

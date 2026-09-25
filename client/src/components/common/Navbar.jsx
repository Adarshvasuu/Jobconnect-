import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, User, LogOut, Sparkles, MessageSquare, Compass, FileText, CheckCircle2, Shield } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import { USER_ROLES } from '../../utils/constants';
import NotificationBell from './NotificationBell';

export const Navbar = () => {
  const { user, isAuthenticated, logout, role } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'transparent',
        padding: '14px 24px',
        width: '100%',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 20px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.95)',
          boxShadow: '0 8px 30px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(0,0,0,0.04)',
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: '#0F172A',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(59, 130, 246, 0.35)',
            }}
          >
            <Briefcase size={18} color="#FFFFFF" />
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#0F172A' }}>
            Job<span style={{ color: '#2563EB' }}>Connect</span>
          </span>
        </Link>

        {/* Dynamic Center Navigation Links based strictly on the user's logged-in role */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isAuthenticated ? (
            <>
              {/* Seeker Links */}
              {role === USER_ROLES.SEEKER && (
                <>
                  <Link
                    to="/home"
                    style={{
                      padding: '7px 16px',
                      borderRadius: '9999px',
                      fontSize: '0.88rem',
                      fontWeight: (isActive('/home') || isActive('/seeker/dashboard') || isActive('/dashboard')) ? 700 : 500,
                      color: (isActive('/home') || isActive('/seeker/dashboard') || isActive('/dashboard')) ? '#2563EB' : '#475569',
                      backgroundColor: (isActive('/home') || isActive('/seeker/dashboard') || isActive('/dashboard')) ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    Home
                  </Link>
                  <Link
                    to="/seeker/jobs"
                    style={{
                      padding: '7px 16px',
                      borderRadius: '9999px',
                      fontSize: '0.88rem',
                      fontWeight: isActive('/seeker/jobs') ? 700 : 500,
                      color: isActive('/seeker/jobs') ? '#2563EB' : '#475569',
                      backgroundColor: isActive('/seeker/jobs') ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    Browse Jobs
                  </Link>
                  <Link
                    to="/seeker/applications"
                    style={{
                      padding: '7px 16px',
                      borderRadius: '9999px',
                      fontSize: '0.88rem',
                      fontWeight: isActive('/seeker/applications') ? 700 : 500,
                      color: isActive('/seeker/applications') ? '#2563EB' : '#475569',
                      backgroundColor: isActive('/seeker/applications') ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    Applications & History
                  </Link>
                  <Link
                    to="/seeker/messages"
                    style={{
                      padding: '7px 16px',
                      borderRadius: '9999px',
                      fontSize: '0.88rem',
                      fontWeight: isActive('/seeker/messages') ? 700 : 500,
                      color: isActive('/seeker/messages') ? '#2563EB' : '#475569',
                      backgroundColor: isActive('/seeker/messages') ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    Messages
                  </Link>
                </>
              )}

              {/* Recruiter Links */}
              {role === USER_ROLES.RECRUITER && (
                <>
                  <Link
                    to="/recruiter/dashboard"
                    style={{
                      padding: '7px 16px',
                      borderRadius: '9999px',
                      fontSize: '0.88rem',
                      fontWeight: isActive('/recruiter/dashboard') ? 700 : 500,
                      color: isActive('/recruiter/dashboard') ? '#2563EB' : '#475569',
                      backgroundColor: isActive('/recruiter/dashboard') ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                      textDecoration: 'none',
                    }}
                  >
                    Pipeline Board
                  </Link>
                  <Link
                    to="/recruiter/jobs/new"
                    style={{
                      padding: '7px 16px',
                      borderRadius: '9999px',
                      fontSize: '0.88rem',
                      fontWeight: isActive('/recruiter/jobs/new') ? 700 : 500,
                      color: isActive('/recruiter/jobs/new') ? '#2563EB' : '#475569',
                      backgroundColor: isActive('/recruiter/jobs/new') ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                      textDecoration: 'none',
                    }}
                  >
                    Post Job
                  </Link>
                  <Link
                    to="/recruiter/messages"
                    style={{
                      padding: '7px 16px',
                      borderRadius: '9999px',
                      fontSize: '0.88rem',
                      fontWeight: isActive('/recruiter/messages') ? 700 : 500,
                      color: isActive('/recruiter/messages') ? '#2563EB' : '#475569',
                      backgroundColor: isActive('/recruiter/messages') ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                      textDecoration: 'none',
                    }}
                  >
                    Direct Messages
                  </Link>
                </>
              )}

              {/* Admin Links */}
              {role === USER_ROLES.ADMIN && (
                <>
                  <Link
                    to="/admin/dashboard"
                    style={{
                      padding: '7px 18px',
                      borderRadius: '9999px',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                      boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
                      textDecoration: 'none',
                    }}
                  >
                    Admin Control Hub
                  </Link>
                  <Link
                    to="/jobs"
                    style={{
                      padding: '7px 16px',
                      borderRadius: '9999px',
                      fontSize: '0.88rem',
                      fontWeight: 500,
                      color: '#475569',
                      textDecoration: 'none',
                    }}
                  >
                    Job Directory
                  </Link>
                </>
              )}
            </>
          ) : (
            <>
              <Link
                to="/"
                style={{
                  padding: '7px 16px',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: '#2563EB',
                  backgroundColor: 'rgba(59, 130, 246, 0.08)',
                  textDecoration: 'none',
                }}
              >
                AI Onboarding
              </Link>
              <Link
                to="/jobs"
                style={{
                  padding: '7px 16px',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  color: '#475569',
                  textDecoration: 'none',
                }}
              >
                Browse Jobs
              </Link>
            </>
          )}
        </nav>

        {/* Right Actions: Authenticated Role Badge + Notifications + User Avatar / Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isAuthenticated ? (
            <>
              {/* Official Verified Role Badge (Read-only, security protected) */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  backgroundColor:
                    role === USER_ROLES.ADMIN
                      ? '#FFF1F2'
                      : role === USER_ROLES.RECRUITER
                      ? '#F5F3FF'
                      : '#EFF6FF',
                  color:
                    role === USER_ROLES.ADMIN
                      ? '#E11D48'
                      : role === USER_ROLES.RECRUITER
                      ? '#7C3AED'
                      : '#2563EB',
                  border: `1.5px solid ${
                    role === USER_ROLES.ADMIN
                      ? '#FECDD3'
                      : role === USER_ROLES.RECRUITER
                      ? '#DDD6FE'
                      : '#BFDBFE'
                  }`,
                }}
              >
                {role === USER_ROLES.ADMIN && <Shield size={13} />}
                {role === USER_ROLES.RECRUITER && <Briefcase size={13} />}
                {role === USER_ROLES.SEEKER && <Sparkles size={13} />}
                <span>
                  {role === USER_ROLES.ADMIN
                    ? 'Administrator'
                    : role === USER_ROLES.RECRUITER
                    ? 'Recruiter'
                    : 'Candidate'}
                </span>
              </div>

              {/* Notification Bell */}
              <NotificationBell />

              {/* User Avatar Circle */}
              <Link
                to={role === USER_ROLES.SEEKER ? '/seeker/profile' : (role === USER_ROLES.RECRUITER ? '/recruiter/profile' : '/admin/dashboard')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  color: '#0F172A',
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: '#1E293B',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  }}
                >
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#1E293B' }}>
                  {user?.name?.split(' ')[0] || 'User'}
                </span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                title="Log Out"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#64748B',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#DC2626')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
              >
                <LogOut size={17} />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              style={{
                fontSize: '0.88rem',
                fontWeight: 600,
                color: '#0F172A',
                textDecoration: 'none',
                padding: '7px 18px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease',
              }}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

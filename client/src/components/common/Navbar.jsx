import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, User, LogOut, Shield, Compass, Sparkles, FileText, Layers, Send } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import { USER_ROLES } from '../../utils/constants';
import NotificationBell from './NotificationBell';

export const Navbar = () => {
  const { user, isAuthenticated, logout, switchRole, role } = useAuthContext();
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
        backgroundColor: 'rgba(11, 15, 25, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px',
        }}
      >
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            <Briefcase size={20} />
          </div>
          <span style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff' }}>
            Job<span className="text-gradient">Connect</span>
          </span>
        </Link>

        {/* Dynamic Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Guest / Public Links */}
          {!isAuthenticated ? (
            <>
              <Link
                to="/seeker/jobs"
                style={{
                  color: isActive('/seeker/jobs') ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: 500,
                  fontSize: '0.925rem',
                }}
              >
                Explore Jobs
              </Link>
              <Link
                to="/signup?role=recruiter"
                style={{
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                  fontSize: '0.925rem',
                }}
              >
                For Employers
              </Link>
            </>
          ) : (
            <>
              {/* Seeker Navigation */}
              {role === USER_ROLES.SEEKER && (
                <>
                  <Link
                    to="/seeker/dashboard"
                    style={{
                      color: isActive('/seeker/dashboard') ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontWeight: 600,
                    }}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/seeker/jobs"
                    style={{
                      color: isActive('/seeker/jobs') ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontWeight: 600,
                    }}
                  >
                    Browse Jobs
                  </Link>
                  <Link
                    to="/seeker/applications"
                    style={{
                      color: isActive('/seeker/applications') ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontWeight: 600,
                    }}
                  >
                    Applications
                  </Link>
                  <Link
                    to="/seeker/messages"
                    style={{
                      color: isActive('/seeker/messages') ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontWeight: 600,
                    }}
                  >
                    Messages
                  </Link>
                </>
              )}

              {/* Recruiter Navigation */}
              {role === USER_ROLES.RECRUITER && (
                <>
                  <Link
                    to="/recruiter/dashboard"
                    style={{
                      color: isActive('/recruiter/dashboard') ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontWeight: 600,
                    }}
                  >
                    Pipeline & Board
                  </Link>
                  <Link
                    to="/recruiter/jobs/new"
                    style={{
                      color: isActive('/recruiter/jobs/new') ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontWeight: 600,
                    }}
                  >
                    + Post Job
                  </Link>
                  <Link
                    to="/recruiter/messages"
                    style={{
                      color: isActive('/recruiter/messages') ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontWeight: 600,
                    }}
                  >
                    Messages
                  </Link>
                </>
              )}

              {/* Admin Navigation */}
              {role === USER_ROLES.ADMIN && (
                <>
                  <Link
                    to="/admin/dashboard"
                    style={{
                      color: isActive('/admin/dashboard') ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontWeight: 600,
                    }}
                  >
                    Admin Hub
                  </Link>
                  <Link
                    to="/admin/users"
                    style={{
                      color: isActive('/admin/users') ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontWeight: 600,
                    }}
                  >
                    Users
                  </Link>
                  <Link
                    to="/admin/jobs"
                    style={{
                      color: isActive('/admin/jobs') ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontWeight: 600,
                    }}
                  >
                    Moderation
                  </Link>
                  <Link
                    to="/admin/analytics"
                    style={{
                      color: isActive('/admin/analytics') ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontWeight: 600,
                    }}
                  >
                    Analytics
                  </Link>
                </>
              )}
            </>
          )}
        </nav>

        {/* Right Section: Role Switcher Demo Bar + Profile / Auth Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Quick Role Switcher for Hackathon Testing */}
          {isAuthenticated && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '3px 4px',
              }}
              title="Dev Role Switcher"
            >
              <button
                onClick={() => { switchRole(USER_ROLES.SEEKER); navigate('/seeker/dashboard'); }}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: role === USER_ROLES.SEEKER ? 'var(--accent-primary)' : 'transparent',
                  color: role === USER_ROLES.SEEKER ? '#fff' : 'var(--text-muted)',
                }}
              >
                Seeker
              </button>
              <button
                onClick={() => { switchRole(USER_ROLES.RECRUITER); navigate('/recruiter/dashboard'); }}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: role === USER_ROLES.RECRUITER ? 'var(--accent-secondary)' : 'transparent',
                  color: role === USER_ROLES.RECRUITER ? '#fff' : 'var(--text-muted)',
                }}
              >
                Recruiter
              </button>
              <button
                onClick={() => { switchRole(USER_ROLES.ADMIN); navigate('/admin/dashboard'); }}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: role === USER_ROLES.ADMIN ? 'var(--accent-rose)' : 'transparent',
                  color: role === USER_ROLES.ADMIN ? '#fff' : 'var(--text-muted)',
                }}
              >
                Admin
              </button>
            </div>
          )}

          {isAuthenticated ? (
            <>
              <NotificationBell />

              <Link
                to={role === USER_ROLES.SEEKER ? '/seeker/profile' : role === USER_ROLES.RECRUITER ? '/recruiter/profile' : '/admin/dashboard'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--gradient-card)',
                    border: '1px solid var(--border-hover)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                  }}
                >
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{user?.name}</span>
              </Link>

              <button
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link
                to="/login"
                style={{
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                }}
              >
                Log In
              </Link>
              <Link
                to="/signup"
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-primary)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  boxShadow: 'var(--shadow-glow)',
                }}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

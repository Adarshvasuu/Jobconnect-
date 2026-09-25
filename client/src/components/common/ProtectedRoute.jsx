import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Shield, LogIn } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import { USER_ROLES } from '../../utils/constants';
import Navbar from './Navbar';
import Footer from './Footer';
import Button from './Button';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading, login } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [switching, setSwitching] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#F8FAFC' }}>
        <div style={{ color: '#64748B', fontWeight: 600 }}>Authenticating session...</div>
      </div>
    );
  }

  // Not signed in at all
  if (!isAuthenticated) {
    if (allowedRoles && allowedRoles.includes(USER_ROLES.ADMIN)) {
      const handleQuickAdminLogin = async () => {
        setSwitching(true);
        setErrorMsg('');
        try {
          await login({ email: 'admin@jobconnect.io', password: 'Admin@123' });
          navigate('/admin/dashboard');
        } catch (err) {
          setErrorMsg(err.message || 'Admin login failed');
        } finally {
          setSwitching(false);
        }
      };

      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAFC' }}>
          <Navbar />
          <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
            <div
              style={{
                maxWidth: '500px',
                width: '100%',
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                border: '1.5px solid #E2E8F0',
                padding: '36px 32px',
                boxShadow: '0 20px 45px -12px rgba(15, 23, 42, 0.08)',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '20px',
                  backgroundColor: '#FFF1F2',
                  border: '1.5px solid #FECDD3',
                  color: '#E11D48',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}
              >
                <Shield size={32} />
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                Administrator Access Required
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6, marginBottom: '24px' }}>
                The <strong>Admin Control Hub</strong> is protected and requires verified platform administrator credentials.
              </p>

              {errorMsg && (
                <div style={{ padding: '10px 14px', borderRadius: '10px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontSize: '0.85rem', marginBottom: '16px' }}>
                  {errorMsg}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Button
                  size="lg"
                  icon={Shield}
                  disabled={switching}
                  onClick={handleQuickAdminLogin}
                  style={{ width: '100%', background: 'linear-gradient(135deg, #E11D48 0%, #BE123C 100%)', justifyContent: 'center' }}
                >
                  {switching ? 'Signing In...' : 'Sign In as Administrator'}
                </Button>

                <Button
                  size="md"
                  variant="secondary"
                  icon={LogIn}
                  onClick={() => navigate('/login', { state: { from: location } })}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Sign In with Another Account
                </Button>
              </div>

              <div style={{ marginTop: '20px', fontSize: '0.8rem', color: '#94A3B8' }}>
                Admin: <code style={{ color: '#0F172A', fontWeight: 600 }}>admin@jobconnect.io</code> | Pass: <code style={{ color: '#0F172A', fontWeight: 600 }}>Admin@123</code>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      );
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Signed in, but role is unauthorized (e.g. Seeker or Recruiter trying to access Admin)
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    if (allowedRoles.includes(USER_ROLES.ADMIN)) {
      const handleSwitchToAdmin = async () => {
        setSwitching(true);
        setErrorMsg('');
        try {
          await login({ email: 'admin@jobconnect.io', password: 'Admin@123' });
          navigate('/admin/dashboard');
        } catch (err) {
          setErrorMsg(err.message || 'Admin switch failed');
        } finally {
          setSwitching(false);
        }
      };

      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAFC' }}>
          <Navbar />
          <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
            <div
              style={{
                maxWidth: '500px',
                width: '100%',
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                border: '1.5px solid #E2E8F0',
                padding: '36px 32px',
                boxShadow: '0 20px 45px -12px rgba(15, 23, 42, 0.08)',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '20px',
                  backgroundColor: '#FFF1F2',
                  border: '1.5px solid #FECDD3',
                  color: '#E11D48',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}
              >
                <Shield size={32} />
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                Administrator Access Required
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6, marginBottom: '20px' }}>
                You are currently signed in as <strong>{user?.name || user?.email}</strong> with the <strong>{user?.role?.toUpperCase()}</strong> role.
              </p>

              <div
                style={{
                  backgroundColor: '#F1F5F9',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '0.85rem',
                  color: '#334155',
                  marginBottom: '24px',
                  textAlign: 'left'
                }}
              >
                <div>Current account: <strong>{user?.email}</strong></div>
                <div>Required account: <strong>admin@jobconnect.io</strong></div>
              </div>

              {errorMsg && (
                <div style={{ padding: '10px 14px', borderRadius: '10px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontSize: '0.85rem', marginBottom: '16px' }}>
                  {errorMsg}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Button
                  size="lg"
                  icon={Shield}
                  disabled={switching}
                  onClick={handleSwitchToAdmin}
                  style={{ width: '100%', background: 'linear-gradient(135deg, #E11D48 0%, #BE123C 100%)', justifyContent: 'center' }}
                >
                  {switching ? 'Switching Account...' : 'Switch to Administrator Account'}
                </Button>

                <Button
                  size="md"
                  variant="secondary"
                  onClick={() => navigate(user?.role === USER_ROLES.RECRUITER ? '/recruiter/dashboard' : '/seeker/dashboard')}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Back to My {user?.role === USER_ROLES.RECRUITER ? 'Recruiter' : 'Candidate'} Dashboard
                </Button>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      );
    }

    if (user?.role === USER_ROLES.RECRUITER) {
      return <Navigate to="/recruiter/dashboard" replace />;
    } else if (user?.role === USER_ROLES.ADMIN) {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/seeker/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Mail, Lock, Briefcase, Eye, EyeOff, LogIn, CheckCircle2, ArrowRight } from 'lucide-react';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { useAuthContext } from '../context/AuthContext';
import { validateLoginForm } from '../utils/validators';
import { USER_ROLES } from '../utils/constants';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();
  const { isAuthenticated, user } = useAuthContext();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [successUser, setSuccessUser] = useState(null);

  // -- LOOP FIX: If already authenticated, redirect immediately to their dashboard --
  const getDefaultDash = (role) => {
    if (role === USER_ROLES.ADMIN) return '/admin/dashboard';
    if (role === USER_ROLES.RECRUITER) return '/recruiter/dashboard';
    return '/seeker/dashboard';
  };

  if (isAuthenticated && user && !loginSuccess) {
    const dest = location.state?.from?.pathname || getDefaultDash(user.role);
    return <Navigate to={dest} replace />;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    const { isValid, errors: validationErrors } = validateLoginForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    try {
      const data = await login(formData);
      setSuccessUser(data?.user);
      setLoginSuccess(true);
      // Auto-navigate after 2s so user sees confirmation
      const dest = location.state?.from?.pathname || getDefaultDash(data?.user?.role || 'seeker');
      setTimeout(() => navigate(dest, { replace: true }), 2000);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    }
  };

  // ---- Success / Confirmation Screen ----
  if (loginSuccess && successUser) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          background: 'var(--bg-primary)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
            width: '500px', height: '400px',
            background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
            pointerEvents: 'none', filter: 'blur(60px)',
          }}
        />
        <div style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div
            style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #10B981, #059669)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 12px 36px rgba(16, 185, 129, 0.35)',
              animation: 'none',
            }}
          >
            <CheckCircle2 size={36} color="#fff" />
          </div>

          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.02em' }}>
            Welcome back, {successUser.name?.split(' ')[0] || 'there'}!
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '28px' }}>
            You are signed in as <strong>{successUser.email}</strong>
            <br />
            <span
              style={{
                display: 'inline-block', marginTop: '6px', fontSize: '0.78rem', fontWeight: 700,
                color: successUser.role === 'admin' ? '#F59E0B' : (successUser.role === 'recruiter' ? '#8B5CF6' : '#10B981'),
                textTransform: 'uppercase', letterSpacing: '0.08em',
                background: successUser.role === 'admin' ? 'rgba(245,158,11,0.1)' : (successUser.role === 'recruiter' ? 'rgba(139,92,246,0.1)' : 'rgba(16,185,129,0.1)'),
                padding: '4px 12px', borderRadius: '9999px',
              }}
            >
              {successUser.role} account
            </span>
          </p>

          <div
            className="glass-panel"
            style={{ padding: '20px 24px', border: '1px solid var(--border-hover)', marginBottom: '16px' }}
          >
            <div
              style={{
                width: '100%', height: '6px', backgroundColor: 'rgba(16,185,129,0.15)',
                borderRadius: '9999px', overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%', backgroundColor: '#10B981', borderRadius: '9999px',
                  width: '100%',
                  animation: 'progressFill 2s linear forwards',
                }}
              />
            </div>
            <p style={{ marginTop: '12px', fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Redirecting to your dashboard...
            </p>
          </div>

          <button
            onClick={() => navigate(location.state?.from?.pathname || getDefaultDash(successUser.role), { replace: true })}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 24px', borderRadius: '9999px',
              background: 'linear-gradient(135deg, #10B981, #059669)',
              color: '#fff', fontWeight: 700, fontSize: '0.95rem',
              border: 'none', cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(16,185,129,0.3)',
            }}
          >
            Go to Dashboard
            <ArrowRight size={16} />
          </button>

          <style>{`
            @keyframes progressFill {
              from { width: 0%; }
              to { width: 100%; }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // ---- Standard Login Form ----
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'var(--bg-primary)',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '400px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          pointerEvents: 'none', filter: 'blur(60px)',
        }}
      />

      <div style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '54px', height: '54px', borderRadius: 'var(--radius-md)',
              background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', margin: '0 auto 14px',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            <Briefcase size={26} color="#fff" />
          </div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '6px' }}>Welcome back</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Sign in to access your JobConnect workspace
          </p>
        </div>

        <div
          className="glass-panel"
          style={{ padding: '32px', border: '1px solid var(--border-hover)', boxShadow: 'var(--shadow-lg)' }}
        >
          {apiError && (
            <div
              style={{
                padding: '10px 14px', backgroundColor: 'rgba(244, 63, 94, 0.12)',
                border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: 'var(--radius-md)',
                color: '#fda4af', fontSize: '0.85rem', marginBottom: '20px',
              }}
            >
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Gokul@example.com"
              icon={Mail}
              error={errors.email}
              required
            />

            <div style={{ position: 'relative' }}>
              <InputField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password"
                icon={Lock}
                error={errors.password}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '12px', top: '34px',
                  background: 'transparent', border: 'none',
                  color: 'var(--text-muted)', cursor: 'pointer',
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div style={{ textAlign: 'right', marginTop: '-8px', marginBottom: '20px' }}>
              <Link to="/forgot-password" style={{ fontSize: '0.8rem', color: 'var(--accent-primary)' }}>
                Forgot password?
              </Link>
            </div>

            <Button type="submit" loading={loading} icon={LogIn} style={{ width: '100%' }}>
              Sign In
            </Button>
          </form>

          <div
            style={{
              marginTop: '20px', padding: '10px 12px',
              backgroundColor: 'rgba(99, 102, 241, 0.06)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', color: 'var(--text-muted)',
            }}
          >
            Login credentials - Seeker: <strong>Gokul@example.com</strong> / <strong>User@123</strong>
            &nbsp;|&nbsp;
            Admin: <strong>admin@jobconnect.io</strong> / <strong>Admin@123</strong>
            &nbsp;|&nbsp;
            Recruiter: <strong>recruiter@nexus.com</strong> / <strong>Recruiter@123</strong>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
            Create one for free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

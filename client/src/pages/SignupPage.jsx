import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, Users, Eye, EyeOff, UserPlus } from 'lucide-react';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { validateSignupForm } from '../utils/validators';
import { USER_ROLES } from '../utils/constants';

export const SignupPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedRole = searchParams.get('role') || USER_ROLES.SEEKER;
  const { signup, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: preselectedRole,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    const { isValid, errors: validationErrors } = validateSignupForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    try {
      await signup(formData);
      if (formData.role === USER_ROLES.RECRUITER) {
        navigate('/onboarding/recruiter');
      } else {
        navigate('/onboarding/seeker');
      }
    } catch (err) {
      setApiError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px',
        background: 'var(--bg-primary)',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(60px)',
        }}
      />

      <div style={{ width: '100%', maxWidth: '460px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '6px' }}>Create Your Account</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Join the pure MERN-powered recruitment ecosystem
          </p>
        </div>

        <div
          className="glass-panel"
          style={{
            padding: '32px',
            border: '1px solid var(--border-hover)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {/* Role Selector */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '10px' }}>
              I am a... <span style={{ color: 'var(--accent-rose)' }}>*</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                type="button"
                onClick={() => handleRoleSelect(USER_ROLES.SEEKER)}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${formData.role === USER_ROLES.SEEKER ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                  backgroundColor: formData.role === USER_ROLES.SEEKER ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  color: formData.role === USER_ROLES.SEEKER ? '#a5b4fc' : 'var(--text-secondary)',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <Briefcase size={20} />
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Job Seeker</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect(USER_ROLES.RECRUITER)}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${formData.role === USER_ROLES.RECRUITER ? 'var(--accent-secondary)' : 'var(--border-subtle)'}`,
                  backgroundColor: formData.role === USER_ROLES.RECRUITER ? 'rgba(139, 92, 246, 0.12)' : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  color: formData.role === USER_ROLES.RECRUITER ? '#c4b5fd' : 'var(--text-secondary)',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <Users size={20} />
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Employer</span>
              </button>
            </div>
            {errors.role && (
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-rose)', marginTop: '6px', display: 'block' }}>
                {errors.role}
              </span>
            )}
          </div>

          {apiError && (
            <div
              style={{
                padding: '10px 14px',
                backgroundColor: 'rgba(244, 63, 94, 0.12)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                borderRadius: 'var(--radius-md)',
                color: '#fda4af',
                fontSize: '0.85rem',
                marginBottom: '16px',
              }}
            >
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <InputField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Adarsh Sharma"
              icon={User}
              error={errors.name}
              required
            />

            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
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
                placeholder="Min. 6 characters"
                icon={Lock}
                error={errors.password}
                helperText={!errors.password ? 'Must be at least 6 characters long' : ''}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '34px',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <Button
              type="submit"
              loading={loading}
              icon={UserPlus}
              style={{ width: '100%', marginTop: '8px' }}
            >
              Create Account & Start Setup
            </Button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

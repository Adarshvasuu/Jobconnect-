import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2, X, ArrowRight, MapPin, Briefcase, DollarSign, Star,
  TrendingUp, Sparkles, ChevronRight,
} from 'lucide-react';
import { MOCK_JOBS } from '../../api/jobApi';

/**
 * PostLoginModal
 * 
 * A reusable post-authentication confirmation panel.
 * Shows a welcome message and curated job recommendations.
 *
 * Props:
 *  - userName: string
 *  - userRole: 'seeker' | 'recruiter' | 'admin'
 *  - onClose: () => void   (called when user dismisses or after auto-timeout)
 */
export const PostLoginModal = ({ userName, userRole = 'seeker', onClose }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  // Pick top 3 featured jobs to show as recommendations
  const recommendations = MOCK_JOBS
    .filter((j) => j.status === 'active' || j.available)
    .slice(0, 3);

  useEffect(() => {
    // Animate in
    const t1 = setTimeout(() => setVisible(true), 30);
    // Auto-dismiss after 12s for seeker (they can browse recs); faster for others
    const autoClose = setTimeout(() => handleClose(), userRole === 'seeker' ? 14000 : 6000);
    return () => { clearTimeout(t1); clearTimeout(autoClose); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose?.(), 320);
  };

  const roleColor = {
    admin: '#F59E0B',
    recruiter: '#8B5CF6',
    seeker: '#10B981',
  }[userRole] || '#10B981';

  const roleGlow = {
    admin: 'rgba(245,158,11,0.25)',
    recruiter: 'rgba(139,92,246,0.25)',
    seeker: 'rgba(16,185,129,0.25)',
  }[userRole] || 'rgba(16,185,129,0.25)';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="post-login-title"
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(8px)',
        transition: 'opacity 0.3s ease',
        opacity: visible ? 1 : 0,
      }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        style={{
          width: '100%',
          maxWidth: userRole === 'seeker' ? '640px' : '420px',
          background: 'var(--bg-secondary)',
          borderRadius: '20px',
          border: '1px solid var(--border-hover)',
          boxShadow: `0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px ${roleGlow}`,
          overflow: 'hidden',
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(24px)',
          transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
          opacity: visible ? 1 : 0,
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: '28px 28px 20px',
            borderBottom: '1px solid var(--border-default)',
            display: 'flex', alignItems: 'flex-start', gap: '16px',
            background: `linear-gradient(135deg, rgba(${userRole === 'admin' ? '245,158,11' : userRole === 'recruiter' ? '139,92,246' : '16,185,129'},0.08) 0%, transparent 100%)`,
          }}
        >
          <div
            style={{
              width: '52px', height: '52px', flexShrink: 0, borderRadius: '14px',
              background: `linear-gradient(135deg, ${roleColor}, ${roleColor}cc)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 8px 24px ${roleGlow}`,
            }}
          >
            <CheckCircle2 size={28} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <h2
              id="post-login-title"
              style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em' }}
            >
              Welcome back, {userName?.split(' ')[0] || 'there'}!
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              You are in as a
              {' '}
              <span
                style={{
                  fontWeight: 700, color: roleColor,
                  textTransform: 'capitalize',
                }}
              >
                {userRole}
              </span>
              . Your workspace is ready.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close welcome modal"
            style={{
              width: '32px', height: '32px', borderRadius: '8px', border: 'none',
              background: 'var(--bg-tertiary)', color: 'var(--text-muted)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Recommendations section - only for seekers */}
        {userRole === 'seeker' && (
          <div style={{ padding: '20px 28px' }}>
            <div
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <Sparkles size={15} style={{ color: roleColor }} />
                <span
                  style={{
                    fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em',
                    color: 'var(--text-secondary)', textTransform: 'uppercase',
                  }}
                >
                  Recommended for you
                </span>
              </div>
              <button
                type="button"
                onClick={() => { handleClose(); navigate('/jobs'); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  fontSize: '0.78rem', fontWeight: 700, color: roleColor,
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                }}
              >
                View all <ChevronRight size={13} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recommendations.map((job) => (
                <button
                  type="button"
                  key={job.id}
                  onClick={() => { handleClose(); navigate(`/jobs/${job.id}`); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '14px 16px', borderRadius: '12px', border: '1px solid var(--border-default)',
                    background: 'var(--bg-tertiary)', cursor: 'pointer',
                    textAlign: 'left', transition: 'border-color 0.2s, background 0.2s',
                    width: '100%',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = roleColor;
                    e.currentTarget.style.background = `rgba(${userRole === 'seeker' ? '16,185,129' : userRole === 'recruiter' ? '139,92,246' : '245,158,11'},0.06)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-default)';
                    e.currentTarget.style.background = 'var(--bg-tertiary)';
                  }}
                >
                  {/* Company logo/initial */}
                  <div
                    style={{
                      width: '44px', height: '44px', borderRadius: '10px',
                      background: 'linear-gradient(135deg, #1e1e2e, #2a2a3e)',
                      border: '1px solid var(--border-default)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, fontSize: '1.1rem', fontWeight: 900,
                      color: roleColor,
                    }}
                  >
                    {job.company?.[0] || 'J'}
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        margin: 0, fontWeight: 700, fontSize: '0.9rem',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}
                    >
                      {job.title}
                    </p>
                    <p
                      style={{
                        margin: '2px 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)',
                        display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Briefcase size={11} /> {job.company}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <MapPin size={11} /> {job.location?.split(',')[0]}
                      </span>
                    </p>
                  </div>

                  {/* Match Score */}
                  {job.matchScore && (
                    <div
                      style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        gap: '2px', flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.85rem', fontWeight: 800, color: roleColor,
                          display: 'flex', alignItems: 'center', gap: '3px',
                        }}
                      >
                        <TrendingUp size={13} /> {job.matchScore}%
                      </div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                        MATCH
                      </span>
                    </div>
                  )}

                  <ArrowRight size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div
          style={{
            padding: '16px 28px 24px',
            display: 'flex', gap: '10px', flexWrap: 'wrap',
            borderTop: userRole === 'seeker' ? '1px solid var(--border-default)' : 'none',
            paddingTop: userRole === 'seeker' ? '16px' : '0',
          }}
        >
          <button
            type="button"
            onClick={handleClose}
            style={{
              flex: 1, minWidth: '160px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px',
              padding: '12px 20px', borderRadius: '10px', border: 'none',
              background: `linear-gradient(135deg, ${roleColor}, ${roleColor}cc)`,
              color: '#fff', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
              boxShadow: `0 6px 20px ${roleGlow}`,
            }}
          >
            Go to Dashboard
            <ArrowRight size={16} />
          </button>

          {userRole === 'seeker' && (
            <button
              type="button"
              onClick={() => { handleClose(); navigate('/jobs'); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 20px', borderRadius: '10px',
                border: '1px solid var(--border-hover)',
                background: 'var(--bg-tertiary)', color: 'var(--text-primary)',
                fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
              }}
            >
              Browse Jobs
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostLoginModal;

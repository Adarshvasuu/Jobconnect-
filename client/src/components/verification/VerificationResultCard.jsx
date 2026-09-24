import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

export const VerificationResultCard = ({
  score = 88,
  status = 'verified', // 'verified' | 'flagged'
  flags = [
    'Profile skill "AWS" has low frequency in uploaded resume text',
  ],
  checkedAt = new Date().toISOString(),
  onContinue,
}) => {
  const isVerified = status === 'verified';

  return (
    <div
      className="glass-panel"
      style={{
        maxWidth: '560px',
        margin: '32px auto',
        padding: '32px',
        borderRadius: 'var(--radius-xl)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        border: `1px solid ${isVerified ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: isVerified ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
              color: isVerified ? 'var(--accent-emerald)' : 'var(--accent-amber)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isVerified ? <ShieldCheck size={26} /> : <AlertTriangle size={26} />}
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>
              {isVerified ? 'Resume Integrity Verified' : 'Resume Review Flagged'}
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Checked on {new Date(checkedAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Score Ring */}
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: isVerified ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            fontWeight: 800,
            color: isVerified ? 'var(--accent-emerald)' : 'var(--accent-amber)',
            border: `2px solid ${isVerified ? 'var(--accent-emerald)' : 'var(--accent-amber)'}`,
          }}
        >
          {score}%
        </div>
      </div>

      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          Rule-Based Consistency Insights:
        </span>
        {flags.length > 0 ? (
          <ul style={{ marginTop: '8px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {flags.map((flag, idx) => (
              <li key={idx} style={{ fontSize: '0.825rem', color: isVerified ? 'var(--text-secondary)' : 'var(--accent-amber)' }}>
                {flag}
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ marginTop: '8px', fontSize: '0.825rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle size={15} /> All skills match extracted resume text with zero duplicate hash collisions.
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
        <Button onClick={onContinue} icon={ArrowRight}>
          Continue to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default VerificationResultCard;

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
      style={{
        maxWidth: '580px',
        margin: '32px auto',
        padding: '36px',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '22px',
        backgroundColor: '#FFFFFF',
        border: `1.5px solid ${isVerified ? '#A7F3D0' : '#FDE68A'}`,
        boxShadow: '0 20px 45px -12px rgba(15, 23, 42, 0.12), 0 4px 16px rgba(15, 23, 42, 0.04)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              backgroundColor: isVerified ? '#ECFDF5' : '#FFFBEB',
              color: isVerified ? '#059669' : '#D97706',
              border: `1px solid ${isVerified ? '#A7F3D0' : '#FDE68A'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isVerified ? <ShieldCheck size={28} /> : <AlertTriangle size={28} />}
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#0F172A' }}>
              {isVerified ? 'Resume Integrity Verified' : 'Resume Review Flagged'}
            </h3>
            <span style={{ fontSize: '0.825rem', color: '#64748B' }}>
              Checked on {new Date(checkedAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Score Ring */}
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: isVerified ? '#ECFDF5' : '#FFFBEB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem',
            fontWeight: 800,
            color: isVerified ? '#059669' : '#D97706',
            border: `2.5px solid ${isVerified ? '#059669' : '#D97706'}`,
          }}
        >
          {score}%
        </div>
      </div>

      <div
        style={{
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          padding: '18px',
          borderRadius: '14px',
        }}
      >
        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>
          Rule-Based Consistency Insights:
        </span>
        {flags.length > 0 ? (
          <ul style={{ marginTop: '10px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {flags.map((flag, idx) => (
              <li key={idx} style={{ fontSize: '0.85rem', color: isVerified ? '#475569' : '#B45309', fontWeight: 500 }}>
                {flag}
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ marginTop: '8px', fontSize: '0.85rem', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={16} /> All skills match extracted resume text with zero duplicate hash collisions.
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
        <Button onClick={onContinue} icon={ArrowRight}>
          Continue to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default VerificationResultCard;

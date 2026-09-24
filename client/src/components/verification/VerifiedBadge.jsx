import React from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export const VerifiedBadge = ({ score = 90, status = 'verified' }) => {
  const isVerified = status === 'verified';

  return (
    <div
      title={`Resume verification: ${score}% match & hash checked`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '3px 8px',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.75rem',
        fontWeight: 700,
        backgroundColor: isVerified ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
        color: isVerified ? '#6ee7b7' : '#fcd34d',
        border: `1px solid ${isVerified ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
      }}
    >
      {isVerified ? <ShieldCheck size={13} /> : <AlertCircle size={13} />}
      <span>{score}% Verified</span>
    </div>
  );
};

export default VerifiedBadge;

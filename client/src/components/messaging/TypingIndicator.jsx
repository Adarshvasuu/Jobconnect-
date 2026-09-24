import React from 'react';

export const TypingIndicator = ({ name = 'Recruiter' }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        fontSize: '0.785rem',
        color: 'var(--text-muted)',
      }}
    >
      <span>{name} is typing...</span>
      <div style={{ display: 'flex', gap: '3px' }}>
        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-primary)', animation: 'pulseSlow 1s infinite' }} />
        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-primary)', animation: 'pulseSlow 1s infinite 0.2s' }} />
        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-primary)', animation: 'pulseSlow 1s infinite 0.4s' }} />
      </div>
    </div>
  );
};

export default TypingIndicator;

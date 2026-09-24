import React from 'react';

export const ChatProgressBar = ({ currentStep, totalSteps }) => {
  const percentage = Math.min(100, Math.round(((currentStep + 1) / totalSteps) * 100));

  return (
    <div style={{ width: '100%', marginBottom: '20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          marginBottom: '6px',
        }}
      >
        <span>Profile Setup Progress</span>
        <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>
          Step {Math.min(currentStep + 1, totalSteps)} of {totalSteps} ({percentage}%)
        </span>
      </div>

      <div
        style={{
          width: '100%',
          height: '6px',
          background: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            background: 'var(--gradient-brand)',
            borderRadius: 'var(--radius-full)',
            transition: 'width 0.35s ease',
          }}
        />
      </div>
    </div>
  );
};

export default ChatProgressBar;

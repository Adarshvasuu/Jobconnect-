import React from 'react';

export const Loader = ({ size = 'md', text = 'Loading...' }) => {
  const dimension = size === 'sm' ? '20px' : size === 'lg' ? '48px' : '32px';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        gap: '14px',
      }}
    >
      <div
        style={{
          width: dimension,
          height: dimension,
          border: '3px solid rgba(99, 102, 241, 0.2)',
          borderTopColor: 'var(--accent-primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s cubic-bezier(0.5, 0.1, 0.5, 0.9) infinite',
        }}
      />
      {text && (
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
          {text}
        </span>
      )}
    </div>
  );
};

export default Loader;

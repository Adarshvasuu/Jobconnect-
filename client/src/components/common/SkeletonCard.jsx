import React from 'react';

export const SkeletonCard = ({ height = '140px', count = 1 }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="glass-panel"
          style={{
            height,
            padding: '20px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.06)',
              }}
            />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div
                style={{
                  width: '60%',
                  height: '18px',
                  borderRadius: '4px',
                  background: 'rgba(255, 255, 255, 0.08)',
                }}
              />
              <div
                style={{
                  width: '35%',
                  height: '14px',
                  borderRadius: '4px',
                  background: 'rgba(255, 255, 255, 0.05)',
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ width: '80px', height: '20px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.06)' }} />
            <div style={{ width: '90px', height: '20px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.06)' }} />
            <div style={{ width: '70px', height: '20px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.06)' }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCard;

import React from 'react';
import { ShieldCheck, Zap, Award } from 'lucide-react';

export const BadgesPanel = () => {
  const badges = [
    { title: 'Verified Talent', icon: ShieldCheck, color: '#2563EB', bg: 'rgba(37, 99, 235, 0.1)' },
    { title: 'Fast Responder', icon: Zap, color: '#D97706', bg: 'rgba(245, 158, 11, 0.1)' },
    { title: 'MERN Specialist', icon: Award, color: '#059669', bg: 'rgba(16, 185, 129, 0.1)' },
  ];

  return (
    <div
      style={{
        padding: '24px',
        borderRadius: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.95)',
        boxShadow: '0 8px 30px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
        Candidate Badges
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {badges.map((b, i) => {
          const Icon = b.icon;
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '16px 8px',
                borderRadius: '14px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: b.bg,
                  color: b.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={20} />
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1E293B' }}>{b.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BadgesPanel;

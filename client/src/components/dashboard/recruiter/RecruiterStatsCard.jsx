import React from 'react';
import { Briefcase, Users, Calendar, Award } from 'lucide-react';

export const RecruiterStatsCard = ({ stats = { jobs: 6, applicants: 89, interviews: 14, hires: 5 } }) => {
  const items = [
    { label: 'Active Jobs', value: stats.jobs, icon: Briefcase, color: 'var(--accent-primary)' },
    { label: 'Total Applicants', value: stats.applicants, icon: Users, color: 'var(--accent-secondary)' },
    { label: 'Interviews Held', value: stats.interviews, icon: Calendar, color: 'var(--accent-amber)' },
    { label: 'Successful Hires', value: stats.hires, icon: Award, color: 'var(--accent-emerald)' },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      }}
    >
      {items.map((it, idx) => {
        const Icon = it.icon;
        return (
          <div
            key={idx}
            className="glass-panel"
            style={{
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${it.color}40`,
                color: it.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {it.value}
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{it.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecruiterStatsCard;

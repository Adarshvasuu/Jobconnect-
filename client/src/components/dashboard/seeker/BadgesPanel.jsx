import React from 'react';
import { Award, Zap, ShieldCheck, CheckCircle } from 'lucide-react';

const BADGES = [
  { name: 'Verified Talent', desc: 'Resume passed rule consistency check', icon: ShieldCheck, earned: true },
  { name: 'Fast Responder', desc: 'Replies to recruiters in < 2 hrs', icon: Zap, earned: true },
  { name: 'MERN Specialist', desc: 'Demonstrated skills across all 4 MERN layers', icon: Award, earned: true },
  { name: 'Top 5% Match', desc: 'Achieved > 90% match on 5+ listings', icon: CheckCircle, earned: false },
];

export const BadgesPanel = () => {
  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <h3 style={{ fontSize: '1.05rem', marginBottom: '14px' }}>Candidate Badges</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
        {BADGES.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '12px 8px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: b.earned ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${b.earned ? 'rgba(99, 102, 241, 0.3)' : 'var(--border-subtle)'}`,
                opacity: b.earned ? 1 : 0.45,
              }}
            >
              <div style={{ color: b.earned ? 'var(--accent-primary)' : 'var(--text-muted)', marginBottom: '6px' }}>
                <Icon size={22} />
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: b.earned ? '#fff' : 'var(--text-muted)' }}>
                {b.name}
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {b.desc}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BadgesPanel;

import React from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProfileCompletionMeter = ({ percentage = 85, missingFields = ['Add portfolio project links'] }) => {
  return (
    <div
      className="glass-panel"
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.05rem', margin: 0 }}>Profile Completeness</h3>
        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
          {percentage}%
        </span>
      </div>

      <div
        style={{
          width: '100%',
          height: '8px',
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
            transition: 'width 0.5s ease',
          }}
        />
      </div>

      {missingFields && missingFields.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Quick to-dos to reach 100%:</span>
          {missingFields.map((item, idx) => (
            <Link
              key={idx}
              to="/seeker/profile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.825rem',
                color: 'var(--text-secondary)',
              }}
            >
              <Circle size={13} color="var(--accent-amber)" />
              <span>{item}</span>
              <ArrowRight size={12} style={{ marginLeft: 'auto', opacity: 0.7 }} />
            </Link>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-emerald)', fontSize: '0.85rem' }}>
          <CheckCircle2 size={16} /> All profile sections are 100% complete!
        </div>
      )}
    </div>
  );
};

export default ProfileCompletionMeter;

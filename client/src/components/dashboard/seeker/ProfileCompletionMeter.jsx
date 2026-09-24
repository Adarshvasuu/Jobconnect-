import React from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProfileCompletionMeter = ({ percentage = 85, missingFields = ['Add portfolio project links', 'Write a personal bio statement'] }) => {
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
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
          Profile Completeness
        </h3>
        <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2563EB' }}>
          {percentage}%
        </span>
      </div>

      <div
        style={{
          width: '100%',
          height: '8px',
          background: 'rgba(226, 232, 240, 0.8)',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #3B82F6 0%, #2563EB 100%)',
            borderRadius: '9999px',
            transition: 'width 0.6s ease',
          }}
        />
      </div>

      {missingFields && missingFields.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Quick to-dos to reach 100%:</span>
          {missingFields.map((item, idx) => (
            <Link
              key={idx}
              to="/seeker/profile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                fontWeight: 500,
                color: '#334155',
                textDecoration: 'none',
                padding: '6px 8px',
                borderRadius: '8px',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Circle size={13} color="#F59E0B" />
              <span>{item}</span>
              <ArrowRight size={13} color="#94A3B8" style={{ marginLeft: 'auto' }} />
            </Link>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '0.88rem', fontWeight: 600 }}>
          <CheckCircle2 size={16} /> All profile sections are 100% complete!
        </div>
      )}
    </div>
  );
};

export default ProfileCompletionMeter;

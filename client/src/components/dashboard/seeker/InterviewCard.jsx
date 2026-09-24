import React from 'react';
import { Calendar, Video, Clock, ExternalLink } from 'lucide-react';
import MetallicButton from '../../landing/MetallicButton';

export const InterviewCard = () => {
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#059669',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            padding: '3px 8px',
            borderRadius: '6px',
          }}
        >
          Upcoming Interview
        </span>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: '0 0 12px' }}>
        Senior Full Stack Engineer
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px', fontSize: '0.88rem', color: '#475569' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={16} color="#2563EB" />
          <span>Thursday, Sep 28, 2026 at 4:00 PM - 5:00 PM IST</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Video size={16} color="#2563EB" />
          <span>Online (Google Meet)</span>
        </div>
      </div>

      <MetallicButton
        icon={<ExternalLink size={16} />}
        onClick={() => window.open('https://meet.google.com', '_blank')}
        variant="primary"
        style={{ width: '100%', padding: '12px 20px', fontSize: '0.9rem' }}
      >
        Join Meeting Room
      </MetallicButton>
    </div>
  );
};

export default InterviewCard;

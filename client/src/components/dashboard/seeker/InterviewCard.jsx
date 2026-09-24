import React from 'react';
import { Calendar, Video, Clock, ExternalLink } from 'lucide-react';
import Button from '../../common/Button';

export const InterviewCard = ({
  interview = {
    jobTitle: 'Senior Full Stack Engineer',
    company: 'Nexus Cloud Technologies',
    date: 'Thursday, Sep 28, 2026',
    time: '4:00 PM - 5:00 PM IST',
    mode: 'Online (Google Meet)',
    link: 'https://meet.example.com/jobconnect-demo',
  },
}) => {
  return (
    <div
      className="glass-panel"
      style={{
        padding: '24px',
        border: '1px solid var(--border-hover)',
        boxShadow: 'var(--shadow-glow)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            color: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Calendar size={18} />
        </div>
        <div>
          <span style={{ fontSize: '0.785rem', color: 'var(--accent-emerald)', fontWeight: 700, textTransform: 'uppercase' }}>
            Upcoming Interview
          </span>
          <h4 style={{ margin: 0, fontSize: '1.05rem' }}>{interview.jobTitle}</h4>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={15} color="var(--text-muted)" /> {interview.date} at {interview.time}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Video size={15} color="var(--text-muted)" /> {interview.mode}
        </div>
      </div>

      <Button
        size="sm"
        icon={ExternalLink}
        onClick={() => window.open(interview.link, '_blank')}
      >
        Join Meeting Room
      </Button>
    </div>
  );
};

export default InterviewCard;

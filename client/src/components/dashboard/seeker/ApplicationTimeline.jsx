import React from 'react';
import { CheckCircle2, Clock, Calendar, ArrowRight, MessageSquare } from 'lucide-react';
import { APPLICATION_STATUS_LABELS } from '../../../utils/constants';
import { formatDate } from '../../../utils/formatDate';
import { Link } from 'react-router-dom';

const PIPELINE_STEPS = ['applied', 'reviewing', 'shortlisted', 'interview', 'offered'];

export const ApplicationTimeline = ({ application }) => {
  if (!application) return null;

  const currentStepIndex = PIPELINE_STEPS.indexOf(application.status);

  return (
    <div
      className="glass-panel"
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', margin: 0 }}>{application.jobTitle}</h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {application.company} • Applied {formatDate(application.appliedAt)}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Link
            to="/seeker/messages"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              color: 'var(--accent-primary)',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}
          >
            <MessageSquare size={14} /> Message Recruiter
          </Link>
        </div>
      </div>

      {/* Horizontal / Responsive Stepper */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          padding: '10px 0',
        }}
      >
        {PIPELINE_STEPS.map((stepKey, idx) => {
          const isPassed = idx <= currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={stepKey}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                position: 'relative',
              }}
            >
              {/* Node Circle */}
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: isPassed ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                  border: `2px solid ${isCurrent ? '#ffffff' : isPassed ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  zIndex: 2,
                  boxShadow: isCurrent ? 'var(--shadow-glow)' : 'none',
                }}
              >
                {isPassed ? '✓' : idx + 1}
              </div>

              <span
                style={{
                  fontSize: '0.75rem',
                  color: isPassed ? 'var(--text-primary)' : 'var(--text-muted)',
                  marginTop: '6px',
                  fontWeight: isCurrent ? 700 : 500,
                  textTransform: 'capitalize',
                  textAlign: 'center',
                }}
              >
                {APPLICATION_STATUS_LABELS[stepKey] || stepKey}
              </span>
            </div>
          );
        })}
      </div>

      {/* Status History Logs */}
      {application.statusHistory && application.statusHistory.length > 0 && (
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Activity Log:</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
            {application.statusHistory.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{formatDate(item.date)}</span>
                <span style={{ color: 'var(--text-secondary)' }}>—</span>
                <span style={{ color: 'var(--text-primary)' }}>{item.note}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationTimeline;

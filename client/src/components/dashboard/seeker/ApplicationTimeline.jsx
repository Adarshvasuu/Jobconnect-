import React from 'react';
import { CheckCircle2, MessageSquare } from 'lucide-react';
import { APPLICATION_STATUS_LABELS } from '../../../utils/constants';
import { formatDate } from '../../../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import MetallicButton from '../../landing/MetallicButton';

const PIPELINE_STEPS = ['applied', 'reviewing', 'shortlisted', 'interview', 'offered'];

export const ApplicationTimeline = ({ application }) => {
  const navigate = useNavigate();
  if (!application) return null;

  const currentStepIndex = PIPELINE_STEPS.indexOf(application.status);

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
        gap: '18px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            {application.jobTitle || 'Senior Full Stack Engineer (MERN)'}
          </h3>
          <span style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '3px', display: 'block' }}>
            {application.company || 'Nexus Cloud Technologies'} • Applied {formatDate(application.appliedAt || Date.now())}
          </span>
        </div>

        <MetallicButton
          icon={<MessageSquare size={14} />}
          onClick={() => navigate('/seeker/messages')}
          variant="metallic"
          style={{ padding: '8px 16px', fontSize: '0.82rem' }}
        >
          Message Recruiter
        </MetallicButton>
      </div>

      {/* Horizontal Stepper */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          padding: '12px 0 6px',
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
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: isPassed ? '#2563EB' : '#F1F5F9',
                  border: `2px solid ${isCurrent ? '#1D4ED8' : isPassed ? '#2563EB' : '#CBD5E1'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isPassed ? '#FFFFFF' : '#64748B',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  zIndex: 2,
                  boxShadow: isCurrent ? '0 0 12px rgba(37, 99, 235, 0.4)' : 'none',
                }}
              >
                {isPassed ? '✓' : idx + 1}
              </div>

              <span
                style={{
                  fontSize: '0.78rem',
                  color: isPassed ? '#0F172A' : '#94A3B8',
                  marginTop: '8px',
                  fontWeight: isCurrent ? 800 : isPassed ? 600 : 500,
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

      {/* Activity Log */}
      <div style={{ backgroundColor: '#F8FAFC', padding: '14px 16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Activity Log:</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}>
            <span style={{ color: '#64748B' }}>Sep 18, 2026</span>
            <span style={{ color: '#CBD5E1' }}>—</span>
            <span style={{ color: '#0F172A', fontWeight: 500 }}>Application submitted</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}>
            <span style={{ color: '#64748B' }}>Sep 19, 2026</span>
            <span style={{ color: '#CBD5E1' }}>—</span>
            <span style={{ color: '#0F172A', fontWeight: 500 }}>Profile reviewed by hiring manager</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}>
            <span style={{ color: '#64748B' }}>Sep 20, 2026</span>
            <span style={{ color: '#CBD5E1' }}>—</span>
            <span style={{ color: '#059669', fontWeight: 600 }}>Passed resume integrity screening</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationTimeline;

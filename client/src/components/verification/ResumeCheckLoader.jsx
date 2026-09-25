import React, { useState, useEffect } from 'react';
import { ShieldCheck, FileSearch, Hash, Layers } from 'lucide-react';

const STEPS = [
  { label: 'Computing SHA-256 resume hash for uniqueness check...', icon: Hash },
  { label: 'Extracting text and scanning profile skills overlap...', icon: FileSearch },
  { label: 'Validating employment timeline & contact consistency...', icon: Layers },
  { label: 'Finalizing rule-based verification score...', icon: ShieldCheck },
];

export const ResumeCheckLoader = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          if (onComplete) {
            setTimeout(onComplete, 600);
          }
          return prev;
        }
      });
    }, 900);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      style={{
        maxWidth: '540px',
        margin: '40px auto',
        padding: '36px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: '1.5px solid #CBD5E1',
        boxShadow: '0 20px 45px -12px rgba(15, 23, 42, 0.12), 0 4px 16px rgba(15, 23, 42, 0.04)',
      }}
    >
      <div
        style={{
          width: '68px',
          height: '68px',
          borderRadius: '50%',
          background: '#EFF6FF',
          color: '#2563EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(37, 99, 235, 0.2)',
          animation: 'pulseSlow 1.5s infinite',
        }}
      >
        <ShieldCheck size={38} />
      </div>

      <div>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
          Verifying Resume Integrity
        </h3>
        <p style={{ fontSize: '0.875rem', color: '#64748B', maxWidth: '400px', margin: '0 auto' }}>
          Rule-based verification scanning text consistency and cryptographic checksum
        </p>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
        {STEPS.map((step, idx) => {
          const StepIcon = step.icon;
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                backgroundColor: isCurrent ? '#EFF6FF' : isDone ? '#F8FAFC' : '#FFFFFF',
                border: `1.5px solid ${isCurrent ? '#93C5FD' : isDone ? '#E2E8F0' : '#F1F5F9'}`,
                opacity: isDone || isCurrent ? 1 : 0.6,
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ color: isDone ? '#059669' : isCurrent ? '#2563EB' : '#94A3B8' }}>
                <StepIcon size={18} />
              </div>
              <span
                style={{
                  fontSize: '0.85rem',
                  textAlign: 'left',
                  flex: 1,
                  fontWeight: isCurrent ? 600 : 500,
                  color: isCurrent ? '#1E40AF' : isDone ? '#0F172A' : '#64748B',
                }}
              >
                {step.label}
              </span>
              {isDone && <span style={{ color: '#059669', fontSize: '0.78rem', fontWeight: 700 }}>✓ Done</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResumeCheckLoader;

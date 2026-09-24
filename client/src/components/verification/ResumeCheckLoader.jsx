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
      className="glass-panel"
      style={{
        maxWidth: '520px',
        margin: '40px auto',
        padding: '36px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(99, 102, 241, 0.15)',
          color: 'var(--accent-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-glow)',
          animation: 'pulseSlow 1.5s infinite',
        }}
      >
        <ShieldCheck size={36} />
      </div>

      <div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Verifying Resume Integrity</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Strict local rule-based verification running on MongoDB & Node.js
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
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isCurrent ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${isCurrent ? 'var(--border-hover)' : 'var(--border-subtle)'}`,
                opacity: isDone || isCurrent ? 1 : 0.4,
                transition: 'all var(--transition-fast)',
              }}
            >
              <div style={{ color: isDone ? 'var(--accent-emerald)' : isCurrent ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
                <StepIcon size={18} />
              </div>
              <span style={{ fontSize: '0.825rem', textAlign: 'left', flex: 1, color: isCurrent ? '#fff' : 'var(--text-secondary)' }}>
                {step.label}
              </span>
              {isDone && <span style={{ color: 'var(--accent-emerald)', fontSize: '0.75rem', fontWeight: 700 }}>✓ Done</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResumeCheckLoader;

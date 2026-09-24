import React from 'react';
import { Flame, Sparkles } from 'lucide-react';

export const MatchBadge = ({ score = 85 }) => {
  const isHot = score >= 90;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 10px',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.785rem',
        fontWeight: 700,
        background: isHot
          ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(249, 115, 22, 0.2) 100%)'
          : 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
        color: isHot ? '#fca5a5' : '#c7d2fe',
        border: `1px solid ${isHot ? 'rgba(239, 68, 68, 0.4)' : 'rgba(99, 102, 241, 0.4)'}`,
      }}
    >
      {isHot ? <Flame size={13} color="#f87171" /> : <Sparkles size={13} color="#a5b4fc" />}
      <span>{score}% Match</span>
    </div>
  );
};

export default MatchBadge;

import React from 'react';
import { Mail, Briefcase, FileText, ChevronRight, MessageSquare } from 'lucide-react';
import MatchBadge from '../../jobs/MatchBadge';
import VerifiedBadge from '../../verification/VerifiedBadge';
import { Link } from 'react-router-dom';

export const CandidateCard = ({ application, onMoveStatus, onSelectCandidate }) => {
  const { candidate, status, id } = application;

  return (
    <div
      className="glass-panel"
      style={{
        padding: '16px',
        backgroundColor: 'var(--bg-card-solid)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        cursor: 'grab',
        transition: 'border-color var(--transition-fast), transform var(--transition-fast)',
      }}
      onClick={() => onSelectCandidate && onSelectCandidate(application)}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src={candidate?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80'}
            alt={candidate?.name}
            style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
              {candidate?.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {candidate?.experience || '4 yrs'} exp
            </div>
          </div>
        </div>

        {candidate?.matchScore && <MatchBadge score={candidate.matchScore} />}
      </div>

      {/* Trust & Verification */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <VerifiedBadge score={92} status="verified" />
      </div>

      {/* Skills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        {candidate?.skills?.slice(0, 3).map((s, idx) => (
          <span
            key={idx}
            style={{
              fontSize: '0.7rem',
              padding: '2px 6px',
              borderRadius: 'var(--radius-xs)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-secondary)',
            }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Card Actions */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '8px',
          marginTop: '4px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Link
          to="/recruiter/messages"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.785rem',
            color: 'var(--accent-primary)',
            fontWeight: 600,
          }}
        >
          <MessageSquare size={13} /> Chat
        </Link>

        {/* Move dropdown / status update */}
        <select
          value={status}
          onChange={(e) => onMoveStatus && onMoveStatus(id, e.target.value)}
          style={{
            fontSize: '0.75rem',
            padding: '4px 8px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="applied">Applied</option>
          <option value="reviewing">Review</option>
          <option value="shortlisted">Shortlist</option>
          <option value="interview">Interview</option>
          <option value="offered">Offer</option>
          <option value="rejected">Reject</option>
        </select>
      </div>
    </div>
  );
};

export default CandidateCard;

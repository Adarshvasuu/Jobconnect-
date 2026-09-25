import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ShortlistFolder = ({ candidates = [] }) => {
  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <Star size={18} color="var(--accent-amber)" fill="var(--accent-amber)" />
        <h3 style={{ fontSize: '1.05rem', margin: 0 }}>Starred Candidates ({candidates.length || 2})</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Elena Rostova</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Frontend React • 88% Match</div>
          </div>
          <Link to="/recruiter/messages" style={{ color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
            <MessageSquare size={13} /> Chat
          </Link>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Gokul Sharma</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>MERN Stack • 94% Match</div>
          </div>
          <Link to="/recruiter/messages" style={{ color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
            <MessageSquare size={13} /> Chat
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShortlistFolder;

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import MatchBadge from './MatchBadge';

export const SimilarJobs = ({ jobs = [] }) => {
  if (!jobs.length) return null;

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Similar Opportunities</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {jobs.slice(0, 3).map((job) => (
          <Link
            key={job.id}
            to={`/seeker/jobs/${job.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              transition: 'background var(--transition-fast)',
            }}
          >
            <div>
              <h4 style={{ fontSize: '0.95rem', margin: 0, color: 'var(--text-primary)' }}>
                {job.title}
              </h4>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {job.company} • {job.location}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {job.matchScore && <MatchBadge score={job.matchScore} />}
              <ChevronRight size={16} color="var(--text-muted)" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarJobs;

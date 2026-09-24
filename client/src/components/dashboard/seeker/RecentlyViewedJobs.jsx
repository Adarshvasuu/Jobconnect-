import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
import { MOCK_JOBS } from '../../../api/jobApi';

export const RecentlyViewedJobs = () => {
  const recentJobs = MOCK_JOBS.slice(1, 3);

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <Clock size={18} color="var(--accent-cyan)" />
        <h3 style={{ fontSize: '1.05rem', margin: 0 }}>Recently Viewed</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {recentJobs.map((job) => (
          <Link
            key={job.id}
            to={`/seeker/jobs/${job.id}`}
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
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {job.title}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {job.company}
              </div>
            </div>
            <ChevronRight size={15} color="var(--text-muted)" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedJobs;

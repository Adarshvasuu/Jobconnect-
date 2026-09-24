import React from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';
import Button from '../../common/Button';

export const JobModerationTable = ({ pendingJobs = [], onModerate }) => {
  return (
    <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.15rem', margin: 0 }}>Job Moderation Queue</h3>
        <span style={{ fontSize: '0.8rem', color: 'var(--accent-amber)', fontWeight: 600 }}>
          {pendingJobs.length} Pending Review
        </span>
      </div>

      {pendingJobs.length === 0 ? (
        <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
          All job postings have been reviewed and approved!
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 10px' }}>Listing Title</th>
              <th style={{ padding: '12px 10px' }}>Company</th>
              <th style={{ padding: '12px 10px' }}>Submitted</th>
              <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingJobs.map((job) => (
              <tr key={job.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 10px', fontWeight: 600 }}>{job.title}</td>
                <td style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>{job.company}</td>
                <td style={{ padding: '12px 10px', color: 'var(--text-muted)' }}>{job.postedAt}</td>
                <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '8px' }}>
                    <Button
                      size="sm"
                      icon={Check}
                      onClick={() => onModerate && onModerate(job.id, 'approved')}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      icon={X}
                      onClick={() => onModerate && onModerate(job.id, 'rejected')}
                    >
                      Reject
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JobModerationTable;

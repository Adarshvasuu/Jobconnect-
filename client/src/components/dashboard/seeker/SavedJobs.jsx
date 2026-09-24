import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ChevronRight, Trash2 } from 'lucide-react';
import { MOCK_JOBS } from '../../../api/jobApi';

export const SavedJobs = ({ savedJobIds = ['job-101'], onUnsave }) => {
  const savedJobs = MOCK_JOBS.filter((j) => savedJobIds.includes(j.id));

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <Bookmark size={18} color="var(--accent-primary)" />
        <h3 style={{ fontSize: '1.05rem', margin: 0 }}>Saved Jobs ({savedJobs.length})</h3>
      </div>

      {savedJobs.length === 0 ? (
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', padding: '16px' }}>
          No bookmarked jobs yet. Tap the heart icon on any job card to save.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {savedJobs.map((job) => (
            <div
              key={job.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div>
                <Link
                  to={`/seeker/jobs/${job.id}`}
                  style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}
                >
                  {job.title}
                </Link>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {job.company} • {job.location}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {onUnsave && (
                  <button
                    onClick={() => onUnsave(job.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '4px',
                    }}
                    title="Remove"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
                <Link to={`/seeker/jobs/${job.id}`}>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;

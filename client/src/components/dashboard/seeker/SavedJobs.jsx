import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ChevronRight, Trash2, ArrowRight } from 'lucide-react';
import { MOCK_JOBS } from '../../../api/jobApi';

export const SavedJobs = ({ savedJobIds = ['job-101', 'job-102'], onUnsave }) => {
  const savedJobs = MOCK_JOBS.filter((j) => savedJobIds.includes(j.id) || savedJobIds.includes(j._id));
  const displayJobs = savedJobs.length > 0 ? savedJobs : MOCK_JOBS.slice(0, 2);

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
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bookmark size={18} color="#2563EB" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            Saved Jobs ({displayJobs.length})
          </h3>
        </div>
        <Link to="/seeker/jobs" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2563EB', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>View All</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {displayJobs.map((job) => (
          <div
            key={job._id || job.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              borderRadius: '14px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              transition: 'all 0.2s',
            }}
          >
            <div>
              <Link
                to={`/seeker/jobs/${job._id || job.id}`}
                style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0F172A', textDecoration: 'none' }}
              >
                {job.title}
              </Link>
              <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px' }}>
                {job.company} • {job.location} • <span style={{ color: '#2563EB', fontWeight: 600 }}>{job.salary || '$120k - $150k'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link
                to={`/seeker/jobs/${job._id || job.id}`}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2563EB',
                }}
              >
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedJobs;

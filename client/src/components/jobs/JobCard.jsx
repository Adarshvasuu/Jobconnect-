import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Heart, Briefcase, ChevronRight } from 'lucide-react';
import MatchBadge from './MatchBadge';
import { formatSalary, timeAgo } from '../../utils/formatDate';

export const JobCard = ({ job, isSaved = false, onToggleSave, onApply }) => {
  return (
    <div
      className="glass-panel glass-panel-hover"
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '16px',
        position: 'relative',
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px' }}>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <img
            src={job.logo || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&auto=format&fit=crop&q=80'}
            alt={job.company}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: 'var(--radius-md)',
              objectFit: 'cover',
              border: '1px solid var(--border-subtle)',
            }}
          />
          <div>
            <h3 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>
              <Link to={`/seeker/jobs/${job.id}`} style={{ color: 'var(--text-primary)' }}>
                {job.title}
              </Link>
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{job.company}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {job.matchScore && <MatchBadge score={job.matchScore} />}
          <button
            onClick={() => onToggleSave && onToggleSave(job.id)}
            style={{
              background: isSaved ? 'rgba(244, 63, 94, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${isSaved ? 'rgba(244, 63, 94, 0.4)' : 'var(--border-subtle)'}`,
              borderRadius: 'var(--radius-full)',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isSaved ? 'var(--accent-rose)' : 'var(--text-muted)',
              transition: 'all var(--transition-fast)',
            }}
            title={isSaved ? 'Remove from saved' : 'Bookmark job'}
          >
            <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* Meta Specs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MapPin size={14} /> {job.location}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <DollarSign size={14} /> {formatSalary(job.salary?.min, job.salary?.max, job.salary?.currency)}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={14} /> {timeAgo(job.postedAt)}
        </span>
        <span
          style={{
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255, 255, 255, 0.06)',
            color: 'var(--text-secondary)',
          }}
        >
          {job.type}
        </span>
      </div>

      {/* Skills Badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {job.skillsRequired?.slice(0, 4).map((skill, i) => (
          <span
            key={i}
            style={{
              fontSize: '0.75rem',
              padding: '3px 8px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {skill}
          </span>
        ))}
        {job.skillsRequired?.length > 4 && (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
            +{job.skillsRequired.length - 4} more
          </span>
        )}
      </div>

      {/* Card Action footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '12px',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        <span style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>
          {job.applicantsCount || 0} applicants
        </span>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Link
            to={`/seeker/jobs/${job.id}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--accent-primary)',
            }}
          >
            Details <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;

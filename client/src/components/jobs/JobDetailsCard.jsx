import React from 'react';
import { MapPin, DollarSign, Clock, Users, Building, ShieldCheck, Share2, Bookmark } from 'lucide-react';
import MatchBadge from './MatchBadge';
import Button from '../common/Button';
import { formatSalary, formatDate } from '../../utils/formatDate';

export const JobDetailsCard = ({
  job,
  onApply,
  isApplied = false,
  isSaved = false,
  onToggleSave,
}) => {
  if (!job) return null;

  return (
    <div
      className="glass-panel"
      style={{
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
      }}
    >
      {/* Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <img
            src={job.logo || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80'}
            alt={job.company}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: 'var(--radius-lg)',
              objectFit: 'cover',
              border: '1px solid var(--border-hover)',
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '1.75rem', margin: 0 }}>{job.title}</h1>
              {job.matchScore && <MatchBadge score={job.matchScore} />}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{job.company}</span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={15} /> {job.location}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button
            variant="secondary"
            size="md"
            icon={Bookmark}
            onClick={() => onToggleSave && onToggleSave(job.id)}
          >
            {isSaved ? 'Saved' : 'Save'}
          </Button>

          <Button
            size="md"
            disabled={isApplied}
            onClick={() => onApply && onApply(job.id)}
          >
            {isApplied ? 'Application Submitted ✓' : 'Apply Now'}
          </Button>
        </div>
      </div>

      {/* Highlights Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div>
          <span style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>Salary Range</span>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
            {formatSalary(job.salary?.min, job.salary?.max, job.salary?.currency)}
          </div>
        </div>
        <div>
          <span style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>Job Type</span>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
            {job.type}
          </div>
        </div>
        <div>
          <span style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>Experience</span>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
            {job.experience || '3-5 years'}
          </div>
        </div>
        <div>
          <span style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>Date Posted</span>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
            {formatDate(job.postedAt)}
          </div>
        </div>
      </div>

      {/* Required Skills */}
      <div>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>Required Technical Skills</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {job.skillsRequired?.map((skill, idx) => (
            <span
              key={idx}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                color: '#c7d2fe',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>Role Description & Responsibilities</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
          {job.description}
        </p>
      </div>
    </div>
  );
};

export default JobDetailsCard;

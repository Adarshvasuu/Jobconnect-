import React from 'react';
import JobCard from './JobCard';
import SkeletonCard from '../common/SkeletonCard';
import EmptyState from '../common/EmptyState';

export const JobList = ({
  jobs = [],
  loading = false,
  savedJobIds = [],
  onToggleSave,
  onApply,
}) => {
  if (loading) {
    return <SkeletonCard height="180px" count={3} />;
  }

  if (!jobs || jobs.length === 0) {
    return (
      <EmptyState
        title="No jobs found"
        description="Try adjusting your keywords, job type filter, or clearing search criteria to see more opportunities."
      />
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '20px',
      }}
    >
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          isSaved={savedJobIds.includes(job.id)}
          onToggleSave={onToggleSave}
          onApply={onApply}
        />
      ))}
    </div>
  );
};

export default JobList;

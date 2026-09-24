import React, { useState, useEffect } from 'react';
import SeekerLayout from '../components/layout/SeekerLayout';
import JobList from '../components/jobs/JobList';
import JobFilters from '../components/jobs/JobFilters';
import { jobApi, MOCK_JOBS } from '../api/jobApi';
import { profileApi, MOCK_PROFILE } from '../api/profileApi';
import { useDebounce } from '../hooks/useDebounce';
import { useNotifications } from '../context/NotificationContext';

export const JobListingsPage = () => {
  const { addToast } = useNotifications();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedJobIds, setSavedJobIds] = useState(MOCK_PROFILE.savedJobs || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('match');

  const debouncedSearch = useDebounce(searchQuery, 350);

  useEffect(() => {
    setLoading(true);
    jobApi
      .getJobs({ search: debouncedSearch, type: selectedType === 'All' ? '' : selectedType })
      .then((d) => {
        let result = d.jobs || MOCK_JOBS;
        // Client-side sort
        if (sortBy === 'match') {
          result = [...result].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
        } else if (sortBy === 'newest') {
          result = [...result].sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
        } else if (sortBy === 'salary') {
          result = [...result].sort((a, b) => (b.salary?.max || 0) - (a.salary?.max || 0));
        }
        setJobs(result);
      })
      .finally(() => setLoading(false));
  }, [debouncedSearch, selectedType, sortBy]);

  const handleToggleSave = async (jobId) => {
    const isSaved = savedJobIds.includes(jobId);
    if (isSaved) {
      await profileApi.unsaveJob(jobId);
      setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
      addToast('Job removed from saved list', 'info');
    } else {
      await profileApi.saveJob(jobId);
      setSavedJobIds((prev) => [...prev, jobId]);
      addToast('Job saved to your list!', 'success');
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedType('All');
    setSortBy('match');
  };

  return (
    <SeekerLayout>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '6px' }}>
          Browse <span className="text-gradient">Job Opportunities</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {loading ? 'Fetching...' : `${jobs.length} jobs available — ranked by skill overlap match`}
        </p>
      </div>

      <JobFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onReset={handleReset}
      />

      <JobList
        jobs={jobs}
        loading={loading}
        savedJobIds={savedJobIds}
        onToggleSave={handleToggleSave}
      />
    </SeekerLayout>
  );
};

export default JobListingsPage;

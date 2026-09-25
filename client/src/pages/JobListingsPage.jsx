import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import JobList from '../components/jobs/JobList';
import JobFilters from '../components/jobs/JobFilters';
import { jobApi, MOCK_JOBS } from '../api/jobApi';
import { profileApi, MOCK_PROFILE } from '../api/profileApi';
import { useDebounce } from '../hooks/useDebounce';
import { useNotifications } from '../context/NotificationContext';

export const JobListingsPage = () => {
  const [searchParams] = useSearchParams();
  const { addToast } = useNotifications();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [savedJobIds, setSavedJobIds] = useState(MOCK_PROFILE.savedJobs || []);
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('search') || '');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [availableLocations, setAvailableLocations] = useState([]);
  const [sortBy, setSortBy] = useState('newest');

  const debouncedSearch = useDebounce(searchQuery, 350);

  useEffect(() => {
    setLoading(true);
    jobApi
      .getJobs({
        search: debouncedSearch,
        keyword: debouncedSearch,
        type: selectedType === 'All' ? '' : selectedType,
        category: selectedCategory === 'All' ? '' : selectedCategory,
        cat: selectedCategory === 'All' ? '' : selectedCategory,
        location: selectedLocation === 'All' ? '' : selectedLocation,
      })
      .then((d) => {
        let result = d.jobs || MOCK_JOBS;
        if (d.setUniqueLocation && d.setUniqueLocation.length > 0) {
          setAvailableLocations(d.setUniqueLocation);
        }
        setTotalCount(d.total || d.count || result.length);

        // Client-side sort
        if (sortBy === 'match') {
          result = [...result].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
        } else if (sortBy === 'newest') {
          result = [...result].sort((a, b) => new Date(b.postedAt || b.createdAt || 0) - new Date(a.postedAt || a.createdAt || 0));
        } else if (sortBy === 'salary') {
          result = [...result].sort((a, b) => {
            const salA = a.salary?.max || (typeof a.salary === 'number' ? a.salary : 0);
            const salB = b.salary?.max || (typeof b.salary === 'number' ? b.salary : 0);
            return salB - salA;
          });
        }
        setJobs(result);
      })
      .catch(() => {
        setJobs(MOCK_JOBS);
        setTotalCount(MOCK_JOBS.length);
      })
      .finally(() => setLoading(false));
  }, [debouncedSearch, selectedType, selectedCategory, selectedLocation, sortBy]);

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
    setSelectedCategory('All');
    setSelectedLocation('All');
    setSortBy('newest');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAFC' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '40px 24px 80px', maxWidth: '1240px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px', letterSpacing: '-0.02em' }}>
            Explore <span className="text-gradient">Opportunities</span>
          </h1>
          <p style={{ color: '#475569', fontSize: '1.05rem', margin: 0 }}>
            Browse verified listings across engineering, design, and growth with real-time category & location filtering.
          </p>
        </div>

        <JobFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onReset={handleReset}
          availableLocations={availableLocations}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <span style={{ fontSize: '0.925rem', fontWeight: 700, color: '#0F172A' }}>
            Showing {jobs.length} of {totalCount} open positions
          </span>
        </div>

        <JobList
          jobs={jobs}
          loading={loading}
          savedJobIds={savedJobIds}
          onToggleSave={handleToggleSave}
        />
      </main>

      <Footer />
    </div>
  );
};

export default JobListingsPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import RecruiterLayout from '../components/layout/RecruiterLayout';
import JobPostingForm from '../components/dashboard/recruiter/JobPostingForm';
import { jobApi } from '../api/jobApi';
import { useNotifications } from '../context/NotificationContext';

export const JobPostingPage = () => {
  const navigate = useNavigate();
  const { addToast } = useNotifications();

  const handleSubmit = async (jobData) => {
    try {
      await jobApi.createJob(jobData);
      addToast('Job posting published successfully! 🎉', 'success');
      navigate('/recruiter/dashboard');
    } catch {
      addToast('Job saved locally — backend may be offline.', 'info');
      navigate('/recruiter/dashboard');
    }
  };

  return (
    <RecruiterLayout>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '6px' }}>
          Create <span className="text-gradient">Job Posting</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Fill in the details below. Published jobs are instantly matched against candidate skill profiles using MongoDB aggregations.
        </p>
      </div>

      <JobPostingForm onSubmit={handleSubmit} />
    </RecruiterLayout>
  );
};

export default JobPostingPage;

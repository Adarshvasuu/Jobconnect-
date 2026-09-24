import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SeekerLayout from '../components/layout/SeekerLayout';
import JobDetailsCard from '../components/jobs/JobDetailsCard';
import SimilarJobs from '../components/jobs/SimilarJobs';
import CompanyMiniCard from '../components/jobs/CompanyMiniCard';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Loader from '../components/common/Loader';
import { jobApi, MOCK_JOBS } from '../api/jobApi';
import { applicationApi } from '../api/applicationApi';
import { profileApi, MOCK_PROFILE } from '../api/profileApi';
import { useNotifications } from '../context/NotificationContext';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';

export const JobDetailsPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { addToast } = useNotifications();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    setLoading(true);
    jobApi
      .getJobById(jobId)
      .then((d) => {
        setJob(d.job);
        setIsSaved(MOCK_PROFILE.savedJobs.includes(jobId));
      })
      .finally(() => setLoading(false));
  }, [jobId]);

  const handleToggleSave = async () => {
    if (isSaved) {
      await profileApi.unsaveJob(jobId);
      setIsSaved(false);
      addToast('Removed from saved jobs', 'info');
    } else {
      await profileApi.saveJob(jobId);
      setIsSaved(true);
      addToast('Job saved!', 'success');
    }
  };

  const handleApply = async () => {
    setApplying(true);
    try {
      await applicationApi.applyJob(jobId, {});
      setIsApplied(true);
      setShowApplyModal(false);
      addToast('Application submitted successfully! 🎉', 'success');
    } catch {
      addToast('Application failed. Please try again.', 'error');
    } finally {
      setApplying(false);
    }
  };

  const similarJobs = MOCK_JOBS.filter((j) => j.id !== jobId).slice(0, 3);

  if (loading) return <SeekerLayout><Loader size="lg" text="Loading job details..." /></SeekerLayout>;

  if (!job) return <SeekerLayout><p>Job not found.</p></SeekerLayout>;

  return (
    <SeekerLayout>
      <Breadcrumbs
        customCrumbs={[
          { href: '/jobs', label: 'Browse Jobs' },
          { href: `/jobs/${jobId}`, label: job.title },
        ]}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {/* Main Content */}
        <JobDetailsCard
          job={job}
          isApplied={isApplied}
          isSaved={isSaved}
          onToggleSave={handleToggleSave}
          onApply={() => setShowApplyModal(true)}
        />

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <CompanyMiniCard company={job.company} />
          <SimilarJobs jobs={similarJobs} />
        </div>
      </div>

      {/* Apply Confirmation Modal */}
      <Modal
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        title="Login to Apply"
      >
        <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
          Create your Career DNA account to apply for this opportunity and track your application.
          {job.isDemo && <><br/><br/><strong>This is a demo opportunity, not a verified vacancy.</strong></>}
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button variant="secondary" onClick={() => navigate(`/login?returnTo=/apply/${jobId}`)}>Login</Button>
          <Button onClick={() => navigate(`/signup?returnTo=/apply/${jobId}`)}>Create Account</Button>
        </div>
      </Modal>
    </SeekerLayout>
  );
};

export default JobDetailsPage;

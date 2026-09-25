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
import { useAuthContext } from '../context/AuthContext';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';

export const JobDetailsPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { addToast } = useNotifications();
  const { isAuthenticated, user } = useAuthContext();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
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
    if (!isAuthenticated) { setShowLoginPrompt(true); return; }
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
    if (!isAuthenticated) { setShowLoginPrompt(true); return; }
    setApplying(true);
    try {
      await applicationApi.applyJob(jobId, { userId: user?.id });
      setIsApplied(true);
      addToast('Application submitted successfully! \u{1F389}', 'success');
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
          { href: "/jobs", label: "Browse Jobs" },
          { href: "/jobs/" + jobId, label: job.title },
        ]}
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px", alignItems: "start" }}>
        <JobDetailsCard
          job={job}
          isApplied={isApplied}
          isSaved={isSaved}
          onToggleSave={handleToggleSave}
          onApply={handleApply}
          applying={applying}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <CompanyMiniCard company={job.company} />
          <SimilarJobs jobs={similarJobs} />
        </div>
      </div>
      <Modal isOpen={showLoginPrompt} onClose={() => setShowLoginPrompt(false)} title="Sign in to Apply">
        <div style={{ padding: "4px 0 8px" }}>
          <p style={{ marginBottom: "8px", color: "var(--text-secondary)", lineHeight: 1.65 }}>
            You need to be signed in to apply for <strong>{job.title}</strong> at <strong>{job.company}</strong>.
          </p>
          <p style={{ marginBottom: "20px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Already have an account? Sign in below. New here? Create a free account in 30 seconds.
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Button onClick={() => { setShowLoginPrompt(false); navigate("/login", { state: { from: { pathname: "/jobs/" + jobId } } }); }}>
              Sign In
            </Button>
            <Button variant="secondary" onClick={() => { setShowLoginPrompt(false); navigate("/signup", { state: { from: { pathname: "/jobs/" + jobId } } }); }}>
              Create Account
            </Button>
          </div>
        </div>
      </Modal>
    </SeekerLayout>
  );
};

export default JobDetailsPage;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Plus } from 'lucide-react';
import SeekerLayout from '../components/layout/SeekerLayout';
import ProfileCompletionMeter from '../components/dashboard/seeker/ProfileCompletionMeter';
import ResumeUploader from '../components/dashboard/seeker/ResumeUploader';
import SkillsManager from '../components/dashboard/seeker/SkillsManager';
import SavedJobs from '../components/dashboard/seeker/SavedJobs';
import ApplicationTimeline from '../components/dashboard/seeker/ApplicationTimeline';
import RecentlyViewedJobs from '../components/dashboard/seeker/RecentlyViewedJobs';
import InterviewCard from '../components/dashboard/seeker/InterviewCard';
import BadgesPanel from '../components/dashboard/seeker/BadgesPanel';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import profileApi, { MOCK_PROFILE } from '../api/profileApi';
import { applicationApi, MOCK_APPLICATIONS } from '../api/applicationApi';

export const SeekerDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(MOCK_PROFILE);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    profileApi.getProfile().then((d) => setProfile(d.profile || MOCK_PROFILE));
    applicationApi.getMyApplications().then((d) => setApplications(d.applications || []));
  }, []);

  const latestApp = applications[0] || MOCK_APPLICATIONS[0];
  const hasInterview = applications.some((a) => a.status === 'interview');

  return (
    <SeekerLayout>
      {/* Dashboard Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '6px' }}>
            Good morning, <span className="text-gradient">{user?.name?.split(' ')[0] || 'Developer'}</span> 👋
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Your personalized job recommendation engine is active and running.
          </p>
        </div>
        <Link to="/seeker/jobs">
          <Button icon={Sparkles}>Browse Matched Jobs</Button>
        </Link>
      </div>

      {/* Main 2-Column Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <ProfileCompletionMeter
            percentage={profile.completionPercentage}
            missingFields={['Add portfolio project links', 'Write a personal bio statement']}
          />
          <ResumeUploader
            resume={profile.resume}
            onUploadSuccess={(newResume) => setProfile((p) => ({ ...p, resume: newResume }))}
          />
          <SkillsManager
            initialSkills={profile.skills}
            onSkillsChange={(updated) => setProfile((p) => ({ ...p, skills: updated }))}
          />
          <BadgesPanel />
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {hasInterview && <InterviewCard />}
          {latestApp && <ApplicationTimeline application={latestApp} />}
          <SavedJobs savedJobIds={profile.savedJobs} />
          <RecentlyViewedJobs />
        </div>
      </div>
    </SeekerLayout>
  );
};

export default SeekerDashboard;

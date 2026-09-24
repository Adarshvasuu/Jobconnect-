import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, LayoutDashboard } from 'lucide-react';
import RecruiterLayout from '../components/layout/RecruiterLayout';
import RecruiterStatsCard from '../components/dashboard/recruiter/RecruiterStatsCard';
import KanbanBoard from '../components/dashboard/recruiter/KanbanBoard';
import ShortlistFolder from '../components/dashboard/recruiter/ShortlistFolder';
import JobAnalyticsCard from '../components/dashboard/recruiter/JobAnalyticsCard';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { applicationApi, MOCK_APPLICATIONS } from '../api/applicationApi';
import { useNotifications } from '../context/NotificationContext';

export const RecruiterDashboard = () => {
  const { user } = useAuth();
  const { addToast } = useNotifications();
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applicationApi
      .getJobApplications('job-101')
      .then((d) => {
        setApplications(d.applications || MOCK_APPLICATIONS);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUpdateStatus = async (appId, newStatus) => {
    try {
      await applicationApi.updateApplicationStatus(appId, newStatus);
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
      );
      addToast(`Candidate moved to ${newStatus}`, 'success');
    } catch {
      addToast('Status update failed', 'error');
    }
  };

  return (
    <RecruiterLayout>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '6px' }}>
            Recruitment <span className="text-gradient">Pipeline Board</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Manage candidates across all 5 hiring stages in your visual Kanban workspace.
          </p>
        </div>
        <Link to="/recruiter/jobs/new">
          <Button icon={Plus}>Post New Job</Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <RecruiterStatsCard
        stats={{ jobs: 6, applicants: applications.length, interviews: 14, hires: 5 }}
      />

      {/* Side-by-side: Kanban + Quick Panels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 280px', gap: '24px', alignItems: 'start' }}>
        <div>
          <KanbanBoard applications={applications} onUpdateStatus={handleUpdateStatus} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <ShortlistFolder />
          <JobAnalyticsCard />
        </div>
      </div>
    </RecruiterLayout>
  );
};

export default RecruiterDashboard;

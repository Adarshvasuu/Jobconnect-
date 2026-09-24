import React, { useState, useEffect } from 'react';
import SeekerLayout from '../components/layout/SeekerLayout';
import ApplicationTimeline from '../components/dashboard/seeker/ApplicationTimeline';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import { applicationApi, MOCK_APPLICATIONS } from '../api/applicationApi';
import { Briefcase } from 'lucide-react';
import { APPLICATION_STATUS_LABELS } from '../utils/constants';

const STATUS_COLORS = {
  applied: 'var(--text-muted)',
  reviewing: '#60a5fa',
  shortlisted: '#a78bfa',
  interview: 'var(--accent-amber)',
  offered: 'var(--accent-emerald)',
  rejected: 'var(--accent-rose)',
};

export const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    applicationApi
      .getMyApplications()
      .then((d) => {
        const apps = d.applications || MOCK_APPLICATIONS;
        setApplications(apps);
        setSelectedApp(apps[0] || null);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = filterStatus === 'all'
    ? applications
    : applications.filter((a) => a.status === filterStatus);

  if (loading) return <SeekerLayout><Loader size="lg" text="Loading applications..." /></SeekerLayout>;

  return (
    <SeekerLayout>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '6px' }}>
          My <span className="text-gradient">Applications</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Track your {applications.length} active job applications in real-time.
        </p>
      </div>

      {/* Status Filter Pills */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {['all', 'applied', 'reviewing', 'shortlisted', 'interview', 'offered', 'rejected'].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            style={{
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 600,
              border: filterStatus === s ? `1px solid ${STATUS_COLORS[s] || 'var(--accent-primary)'}` : '1px solid var(--border-subtle)',
              backgroundColor: filterStatus === s ? `${STATUS_COLORS[s] || 'rgba(99,102,241'}20` : 'transparent',
              color: filterStatus === s ? '#ffffff' : 'var(--text-muted)',
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {s === 'all' ? `All (${applications.length})` : (APPLICATION_STATUS_LABELS[s] || s)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No applications found"
          description="You haven't applied to any jobs yet. Start browsing and apply to high-match positions!"
          actionLabel="Browse Jobs"
          onAction={() => window.location.href = '/seeker/jobs'}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filtered.map((app) => (
            <ApplicationTimeline key={app.id} application={app} />
          ))}
        </div>
      )}
    </SeekerLayout>
  );
};

export default ApplicationsPage;

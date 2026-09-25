import React, { useState, useEffect } from 'react';
import SeekerLayout from '../components/layout/SeekerLayout';
import ApplicationTimeline from '../components/dashboard/seeker/ApplicationTimeline';
import UserJobsHistory from '../components/dashboard/seeker/UserJobsHistory';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import { applicationApi, MOCK_APPLICATIONS } from '../api/applicationApi';
import { userApi } from '../api/userApi';
import { Briefcase, History, Layers } from 'lucide-react';
import { APPLICATION_STATUS_LABELS } from '../utils/constants';

const STATUS_COLORS = {
  applied: '#64748B',
  reviewing: '#2563EB',
  shortlisted: '#7C3AED',
  interview: '#D97706',
  offered: '#059669',
  rejected: '#E11D48',
};

export const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [jobsHistory, setJobsHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('history'); // 'history' | 'timeline'

  useEffect(() => {
    Promise.all([
      applicationApi.getMyApplications().catch(() => ({ applications: MOCK_APPLICATIONS })),
      userApi.getJobsHistory().catch(() => ({ jobsHistory: [] }))
    ])
      .then(([appRes, histRes]) => {
        const apps = appRes.applications || MOCK_APPLICATIONS;
        const hist = histRes.jobsHistory || [];

        // If hist has items, use them; if empty, map from apps
        if (hist.length > 0) {
          setJobsHistory(hist);
        } else {
          setJobsHistory(
            apps.map(a => ({
              _id: a.id || a._id,
              title: a.jobTitle,
              company: a.company,
              description: a.notes || `Applied to ${a.company}`,
              salary: a.salary || '$95,000 - $140,000',
              location: a.location || 'Remote',
              applicationStatus: a.status === 'offered' ? 'accepted' : (a.status || 'pending'),
              appliedAt: a.appliedAt,
              jobId: a.jobId
            }))
          );
        }

        setApplications(apps);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredApps = filterStatus === 'all'
    ? applications
    : applications.filter((a) => a.status === filterStatus);

  if (loading) return <SeekerLayout><Loader size="lg" text="Loading your applications..." /></SeekerLayout>;

  return (
    <SeekerLayout>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
          Jobs <span className="text-gradient">History & Applications</span>
        </h1>
        <p style={{ color: '#475569', fontSize: '1rem' }}>
          Monitor your applied positions, interview statuses, and progression through recruiter review.
        </p>
      </div>

      {/* View Switcher: Jobs History vs Timeline */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTab('history')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '12px',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer',
            backgroundColor: activeTab === 'history' ? '#2563EB' : '#FFFFFF',
            color: activeTab === 'history' ? '#FFFFFF' : '#475569',
            border: activeTab === 'history' ? '1.5px solid #2563EB' : '1.5px solid #CBD5E1',
            boxShadow: activeTab === 'history' ? '0 4px 14px rgba(37, 99, 235, 0.25)' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          <History size={16} /> Jobs History Table ({jobsHistory.length})
        </button>

        <button
          onClick={() => setActiveTab('timeline')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '12px',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer',
            backgroundColor: activeTab === 'timeline' ? '#2563EB' : '#FFFFFF',
            color: activeTab === 'timeline' ? '#FFFFFF' : '#475569',
            border: activeTab === 'timeline' ? '1.5px solid #2563EB' : '1.5px solid #CBD5E1',
            boxShadow: activeTab === 'timeline' ? '0 4px 14px rgba(37, 99, 235, 0.25)' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          <Layers size={16} /> Timeline Breakdown ({applications.length})
        </button>
      </div>

      {activeTab === 'history' ? (
        <UserJobsHistory jobsHistory={jobsHistory} />
      ) : (
        <>
          {/* Status Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {['all', 'applied', 'reviewing', 'shortlisted', 'interview', 'offered', 'rejected'].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  border: filterStatus === s ? `1.5px solid ${STATUS_COLORS[s] || '#2563EB'}` : '1.5px solid #CBD5E1',
                  backgroundColor: filterStatus === s ? '#EFF6FF' : '#FFFFFF',
                  color: filterStatus === s ? (STATUS_COLORS[s] || '#2563EB') : '#475569',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.15s ease'
                }}
              >
                {s === 'all' ? `All (${applications.length})` : (APPLICATION_STATUS_LABELS[s] || s)}
              </button>
            ))}
          </div>

          {filteredApps.length === 0 ? (
            <EmptyState
              icon={Briefcase}
              title="No applications found"
              description="You haven't applied to any jobs matching this filter yet."
              actionLabel="Browse Jobs"
              onAction={() => window.location.href = '/jobs'}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {filteredApps.map((app) => (
                <ApplicationTimeline key={app.id || app._id} application={app} />
              ))}
            </div>
          )}
        </>
      )}
    </SeekerLayout>
  );
};

export default ApplicationsPage;

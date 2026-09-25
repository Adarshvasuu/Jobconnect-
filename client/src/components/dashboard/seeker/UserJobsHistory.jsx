import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, DollarSign, CheckCircle2, Clock, XCircle, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../common/Button';

export const UserJobsHistory = ({ jobsHistory = [] }) => {
  const [filter, setFilter] = useState('all');

  const pendingCount = jobsHistory.filter(j => (j.applicationStatus || 'pending') === 'pending').length;
  const acceptedCount = jobsHistory.filter(j => ['accepted', 'interview', 'selected'].includes(j.applicationStatus)).length;
  const rejectedCount = jobsHistory.filter(j => j.applicationStatus === 'rejected').length;

  const filteredList = filter === 'all'
    ? jobsHistory
    : filter === 'pending'
    ? jobsHistory.filter(j => (j.applicationStatus || 'pending') === 'pending')
    : filter === 'accepted'
    ? jobsHistory.filter(j => ['accepted', 'interview', 'selected'].includes(j.applicationStatus))
    : jobsHistory.filter(j => j.applicationStatus === 'rejected');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
      case 'selected':
        return {
          bg: '#ECFDF5',
          border: '#A7F3D0',
          text: '#059669',
          icon: CheckCircle2,
          label: 'Accepted / Offer'
        };
      case 'interview':
        return {
          bg: '#EFF6FF',
          border: '#BFDBFE',
          text: '#2563EB',
          icon: Calendar,
          label: 'Interview Scheduled'
        };
      case 'rejected':
        return {
          bg: '#FFF1F2',
          border: '#FECDD3',
          text: '#E11D48',
          icon: XCircle,
          label: 'Declined'
        };
      default:
        return {
          bg: '#FFFBEB',
          border: '#FDE68A',
          text: '#D97706',
          icon: Clock,
          label: 'Under Review'
        };
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: '1.5px solid #E2E8F0',
        padding: '28px',
        boxShadow: '0 20px 45px -12px rgba(15, 23, 42, 0.08), 0 4px 16px rgba(15, 23, 42, 0.03)',
        marginBottom: '32px'
      }}
    >
      {/* Header and Statistics */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}
            >
              <Briefcase size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                My Jobs History & Applications
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '2px 0 0' }}>
                Track every position you applied to and review active statuses
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Applications', count: jobsHistory.length },
            { id: 'pending', label: 'Under Review', count: pendingCount },
            { id: 'accepted', label: 'Accepted / Interview', count: acceptedCount },
            { id: 'rejected', label: 'Declined', count: rejectedCount },
          ].map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: isActive ? '1.5px solid #2563EB' : '1.5px solid #E2E8F0',
                  backgroundColor: isActive ? '#EFF6FF' : '#FFFFFF',
                  color: isActive ? '#1D4ED8' : '#475569',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label} ({tab.count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Applications List */}
      {filteredList.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '48px 24px',
            backgroundColor: '#F8FAFC',
            borderRadius: '16px',
            border: '1px dashed #CBD5E1'
          }}
        >
          <Briefcase size={36} color="#94A3B8" style={{ marginBottom: '12px' }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
            No applied jobs in this section
          </h4>
          <p style={{ fontSize: '0.875rem', color: '#64748B', maxWidth: '400px', margin: '0 auto 18px' }}>
            Discover and apply to vetted engineering, product, and leadership roles across top companies.
          </p>
          <Link to="/jobs">
            <Button size="sm" icon={ArrowUpRight}>
              Browse Open Positions
            </Button>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredList.map((item, idx) => {
            const statusConfig = getStatusBadge(item.applicationStatus);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={item._id || idx}
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  border: '1.5px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                  transition: 'transform 0.15s ease, border-color 0.15s ease'
                }}
              >
                <div style={{ flex: 1, minWidth: '260px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                      {item.title}
                    </h4>
                    {item.company && (
                      <span
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: '#2563EB',
                          backgroundColor: '#EFF6FF',
                          padding: '2px 8px',
                          borderRadius: '6px'
                        }}
                      >
                        {item.company}
                      </span>
                    )}
                  </div>

                  {item.description && (
                    <p
                      style={{
                        fontSize: '0.85rem',
                        color: '#475569',
                        margin: '0 0 10px',
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {item.description}
                    </p>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', fontSize: '0.8rem', color: '#64748B' }}>
                    {item.location && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={14} color="#64748B" />
                        {item.location}
                      </span>
                    )}
                    {item.salary && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: '#059669' }}>
                        <DollarSign size={14} />
                        {item.salary}
                      </span>
                    )}
                    {item.interviewDate && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: '#2563EB' }}>
                        <Calendar size={14} />
                        Interview: {new Date(item.interviewDate).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                    <span style={{ color: '#94A3B8' }}>
                      Applied {new Date(item.appliedAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Right Status Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      fontSize: '0.825rem',
                      fontWeight: 700,
                      backgroundColor: statusConfig.bg,
                      color: statusConfig.text,
                      border: `1.5px solid ${statusConfig.border}`,
                    }}
                  >
                    <StatusIcon size={14} />
                    {statusConfig.label}
                  </span>

                  {item.jobId && (
                    <Link to={`/jobs/${item.jobId}`}>
                      <Button size="sm" variant="ghost" icon={ArrowUpRight}>
                        View Job
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserJobsHistory;

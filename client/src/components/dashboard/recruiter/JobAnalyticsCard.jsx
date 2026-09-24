import React from 'react';
import { Eye, Users, CheckCircle2, TrendingUp } from 'lucide-react';

export const JobAnalyticsCard = ({ jobTitle = 'Senior Full Stack Engineer', views = 240, applications = 28, hires = 2 }) => {
  const conversionRate = ((applications / views) * 100).toFixed(1);

  return (
    <div className="glass-panel" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{jobTitle}</h4>
        <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>Active Listing</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center' }}>
        <div style={{ padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <Eye size={12} /> Views
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '4px' }}>{views}</div>
        </div>

        <div style={{ padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <Users size={12} /> Applicants
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '4px' }}>{applications}</div>
        </div>

        <div style={{ padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <TrendingUp size={12} /> Conversion
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '4px', color: 'var(--accent-primary)' }}>
            {conversionRate}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAnalyticsCard;

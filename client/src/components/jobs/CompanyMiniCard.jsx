import React from 'react';
import { Building, Globe, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CompanyMiniCard = ({ company = 'Nexus Cloud Technologies' }) => {
  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>About the Company</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)',
            }}
          >
            <Building size={22} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '1rem' }}>{company}</h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cloud & Data Systems</span>
          </div>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Building enterprise microservices and real-time distributed aggregation backends with modern cloud infrastructure.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Globe size={14} />
            <a href="https://example.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)' }}>
              https://nexus-cloud.example.com
            </a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={14} /> Global Hubs: Bangalore • Singapore • San Francisco
          </div>
        </div>

        <Link
          to={`/company/nexus-cloud`}
          style={{
            marginTop: '8px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--accent-primary)',
          }}
        >
          View Full Company Profile →
        </Link>
      </div>
    </div>
  );
};

export default CompanyMiniCard;

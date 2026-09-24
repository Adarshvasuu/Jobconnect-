import React from 'react';
import { Briefcase, Heart, Code2, Database } from 'lucide-react';

export const Footer = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'rgba(11, 15, 25, 0.95)',
        padding: '48px 0 32px',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '36px',
            marginBottom: '40px',
          }}
        >
          {/* Brand info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--gradient-brand)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <Briefcase size={16} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
                Job<span className="text-gradient">Connect</span>
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Smart recruitment intelligence and conversational onboarding. 100% compliant pure MERN-stack architecture.
            </p>
          </div>

          {/* Job Seekers */}
          <div>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '16px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              For Job Seekers
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <a href="/seeker/jobs">Browse High-Match Jobs</a>
              <a href="/onboarding/seeker">Chat-Driven Onboarding</a>
              <a href="/seeker/applications">Application Timelines</a>
              <a href="/seeker/profile">Resume Consistency Check</a>
            </div>
          </div>

          {/* Recruiters */}
          <div>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '16px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              For Employers
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <a href="/recruiter/dashboard">Kanban Pipeline Board</a>
              <a href="/recruiter/jobs/new">Post New Vacancy</a>
              <a href="/recruiter/messages">Direct Candidate Chat</a>
              <a href="/onboarding/recruiter">Recruiter Setup Wizard</a>
            </div>
          </div>

          {/* Pure MERN Stack Compliance Badge */}
          <div>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '16px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Compliance & Stack
            </h4>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                color: 'var(--accent-emerald)',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: '10px',
              }}
            >
              <Database size={16} /> 100% Pure MERN Compliant
            </div>
            <p style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>
              MongoDB Aggregations • Express.js • React 18 • Node.js (Zero external AI APIs)
            </p>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>© {new Date().getFullYear()} JobConnect Platform. Built for MongoDB Hackathon.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Powered by <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>MongoDB Atlas Aggregations</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState } from 'react';
import LandingChat from '../components/landing/LandingChat';
import { Sparkles, MessageSquareCode, Layers } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import JobCard from '../components/jobs/JobCard';
import { MOCK_JOBS } from '../api/jobApi';

export const LandingPage = () => {
  const [viewMode, setViewMode] = useState('conversational'); // 'conversational' | 'showcase'

  if (viewMode === 'conversational') {
    return <LandingChat />;
  }

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          padding: '80px 0 60px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div className="container" style={{ maxWidth: '860px' }}>
          <button
            onClick={() => setViewMode('conversational')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(99, 102, 241, 0.12)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              color: '#a5b4fc',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '24px',
              cursor: 'pointer',
            }}
          >
            <Sparkles size={15} /> Switch to AI Conversational Onboarding Mode
          </button>

          <h1
            style={{
              fontSize: '3.2rem',
              lineHeight: 1.15,
              fontWeight: 800,
              marginBottom: '20px',
              letterSpacing: '-0.03em',
            }}
          >
            The Next-Generation <span className="text-gradient">Recruitment Ecosystem</span>
          </h1>

          <p
            style={{
              fontSize: '1.2rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '36px',
            }}
          >
            Say goodbye to clunky static forms. JobConnect introduces conversational chat-driven onboarding, visual drag-and-drop recruiter Kanban pipelines, and rule-based candidate verification.
          </p>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section style={{ padding: '40px 0 80px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div>
              <span className="badge badge-primary" style={{ marginBottom: '8px', display: 'inline-block' }}>Explore Opportunities</span>
              <h2>Featured Job Openings</h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {MOCK_JOBS.slice(0, 4).map((job) => (
              <JobCard key={job._id || job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;

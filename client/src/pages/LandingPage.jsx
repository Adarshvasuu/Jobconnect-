import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Users, Sparkles, ArrowRight, ShieldCheck, Database, CheckCircle2, Search, Cpu } from 'lucide-react';
import Button from '../components/common/Button';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import JobCard from '../components/jobs/JobCard';
import { MOCK_JOBS } from '../api/jobApi';

export const LandingPage = () => {
  const navigate = useNavigate();

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
          {/* MERN Badge */}
          <div
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
            }}
          >
            <Database size={15} /> 100% Pure MERN Stack Architecture
          </div>

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

          {/* Dual Role Selector Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              textAlign: 'left',
              marginTop: '40px',
            }}
          >
            {/* Card 1: Job Seeker */}
            <div
              className="glass-panel glass-panel-hover"
              onClick={() => navigate('/signup?role=seeker')}
              style={{
                padding: '32px',
                cursor: 'pointer',
                border: '1px solid var(--border-hover)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(99, 102, 241, 0.15)',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px',
                }}
              >
                <Briefcase size={26} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>I'm Looking for a Job</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Onboard via friendly chat wizard, verify resume integrity locally, and unlock rule-based 90%+ match scoring.
              </p>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--accent-primary)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                }}
              >
                Start Candidate Setup <ArrowRight size={16} />
              </span>
            </div>

            {/* Card 2: Recruiter */}
            <div
              className="glass-panel glass-panel-hover"
              onClick={() => navigate('/signup?role=recruiter')}
              style={{
                padding: '32px',
                cursor: 'pointer',
                border: '1px solid var(--border-subtle)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(139, 92, 246, 0.15)',
                  color: 'var(--accent-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px',
                }}
              >
                <Users size={26} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>I'm Hiring Talent</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Post openings in seconds, manage applicants in a dynamic visual Kanban board, and chat with candidates.
              </p>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--accent-secondary)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                }}
              >
                Setup Employer Workspace <ArrowRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Bar */}
      <section
        style={{
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'rgba(17, 24, 39, 0.4)',
          padding: '32px 0',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '24px',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-primary)' }}>1,400+</div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Verified Developers</span>
            </div>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>180+</div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Live Openings</span>
            </div>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>94.2%</div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Match Accuracy</span>
            </div>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-amber)' }}>14 Days</div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Avg Time-to-Hire</span>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Job Preview Section */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '32px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Featured High-Match Positions</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Explore openings with rule-based skill overlap scoring. Sign up to quick apply.
              </p>
            </div>
            <Link to="/seeker/jobs">
              <Button variant="secondary">View All Openings ({MOCK_JOBS.length})</Button>
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '24px',
            }}
          >
            {MOCK_JOBS.slice(0, 3).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;

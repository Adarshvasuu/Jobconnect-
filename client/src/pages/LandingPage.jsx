import React, { useState } from 'react';
import LandingChat from '../components/landing/LandingChat';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/landing/HeroSection';
import ScrollSplitCards from '../components/landing/ScrollSplitCards';
import JobCard from '../components/jobs/JobCard';
import { MOCK_JOBS } from '../api/jobApi';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Briefcase,
  Users,
  TrendingUp,
  FileCheck,
  Lock,
  Code,
  Layers,
  Cpu,
  Smartphone,
  Palette
} from 'lucide-react';
import '../components/landing/landing.css';

export const LandingPage = () => {
  const [viewMode, setViewMode] = useState('chat'); // 'chat' | 'showcase'
  const [activeCategory, setActiveCategory] = useState('All');

  if (viewMode === 'chat') {
    return (
      <div>
        <LandingChat onNavigateToShowcase={() => setViewMode('showcase')} />
      </div>
    );
  }

  const techCategories = [
    { title: 'Frontend Engineering', icon: <Code size={20} color="#2563EB" />, stack: 'React, TypeScript, Next.js', salary: '$115,000 - $180,000', roles: '840 open roles' },
    { title: 'Backend Systems', icon: <Layers size={20} color="#2563EB" />, stack: 'Node.js, Go, Microservices', salary: '$130,000 - $215,000', roles: '1,120 open roles' },
    { title: 'Cloud & Infrastructure', icon: <Cpu size={20} color="#2563EB" />, stack: 'AWS, Kubernetes, Terraform', salary: '$135,000 - $205,000', roles: '670 open roles' },
    { title: 'Machine Learning & MLOps', icon: <TrendingUp size={20} color="#2563EB" />, stack: 'Python, PyTorch, LLM Systems', salary: '$145,000 - $240,000', roles: '520 open roles' },
    { title: 'Product & System Design', icon: <Palette size={20} color="#2563EB" />, stack: 'Figma, Design Systems, UX', salary: '$110,000 - $165,000', roles: '380 open roles' },
    { title: 'Mobile Applications', icon: <Smartphone size={20} color="#2563EB" />, stack: 'React Native, Swift, Kotlin', salary: '$120,000 - $175,000', roles: '430 open roles' },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Verified Profile Ingestion',
      desc: 'Connect GitHub, upload resume, and pass automated formatting integrity audits with instant feedback.',
    },
    {
      step: '02',
      title: 'Salary & Stack Alignment',
      desc: 'Candidate compensation preferences and tech stack requirements are matched before any contact happens.',
    },
    {
      step: '03',
      title: 'Direct Kanban Review',
      desc: 'Applications skip generic screening agencies and arrive directly on technical hiring managers pipelines.',
    },
    {
      step: '04',
      title: 'Synchronous Hiring',
      desc: 'Communicate via direct chat threads, schedule technical evaluations, and receive transparent offer terms.',
    },
  ];

  const comparisonRows = [
    { feature: 'Salary Transparency', jobconnect: 'Mandatory upfront compensation bands on every listing', legacy: 'Hidden, undisclosed, or labeled "Competitive"' },
    { feature: 'Recruiter Response Time', jobconnect: 'Guaranteed status updates within 72 hours of review', legacy: 'Silent rejections and indefinite application limbo' },
    { feature: 'Resume ATS Diagnostics', jobconnect: 'Instant automated parsing audit with keyword and layout analysis', legacy: 'Black-box parsers that discard resumes without explanation' },
    { feature: 'Direct Hiring Access', jobconnect: 'Communicate directly with engineering and product leads', legacy: 'Filtered through multiple external third-party agencies' },
    { feature: 'Listing Freshness', jobconnect: 'Active company domain verification and zero duplicate postings', legacy: 'Outdated ghost jobs and repetitive multi-agency spam' },
  ];

  const filteredJobs = activeCategory === 'All'
    ? MOCK_JOBS.slice(0, 6)
    : MOCK_JOBS.filter(j => j.title.toLowerCase().includes(activeCategory.toLowerCase())).slice(0, 6);

  return (
    <div className="page-wrapper" style={{ backgroundColor: 'transparent' }}>
      <Navbar />

      {/* Floating button to switch back to Chat Onboarding */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 99 }}>
        <button
          onClick={() => setViewMode('chat')}
          className="metallic-btn metallic-btn-primary"
          style={{ boxShadow: '0 8px 30px rgba(37, 99, 235, 0.45)' }}
        >
          <Sparkles size={16} />
          <span>Launch AI Chat Onboarding</span>
        </button>
      </div>

      {/* 1. HeroSection: WebGL Background + Signature + Metallic Buttons + Scroll-Shrink */}
      <HeroSection onExploreClick={() => setViewMode('chat')} />

      {/* 2. ScrollSplitCards: 3D Split & Flip Interaction */}
      <ScrollSplitCards />

      {/* 3. Hiring Pipeline Workflow Architecture */}
      <section style={{ padding: '90px 0 60px', backgroundColor: 'transparent' }}>
        <div className="container" style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="badge badge-indigo" style={{ marginBottom: '10px', display: 'inline-block' }}>
              HOW IT WORKS
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
              Recruitment Engineered for Transparency
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#475569', maxWidth: '600px', margin: '0 auto' }}>
              Four structured phases that eliminate hiring friction for both engineering candidates and technical recruiters.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {workflowSteps.map((st) => (
              <div
                key={st.step}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  padding: '28px 24px',
                  border: '1px solid rgba(226, 232, 240, 0.95)',
                  boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 900,
                    color: '#2563EB',
                    fontFamily: 'monospace',
                  }}
                >
                  {st.step}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  {st.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Live Technical Market Benchmarks */}
      <section style={{ padding: '60px 0', backgroundColor: 'transparent' }}>
        <div className="container" style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="badge badge-indigo" style={{ marginBottom: '8px', display: 'inline-block' }}>
                MARKET BENCHMARKS
              </span>
              <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Compensation and Technical Disciplines
              </h2>
            </div>
            <a
              href="/jobs"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#2563EB',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
              }}
            >
              <span>View all openings</span>
              <ArrowRight size={16} />
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {techCategories.map((cat, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid rgba(226, 232, 240, 0.95)',
                  boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(37, 99, 235, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {cat.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#059669',
                      backgroundColor: 'rgba(16, 185, 129, 0.1)',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                    }}
                  >
                    {cat.roles}
                  </span>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', margin: '0 0 4px' }}>
                    {cat.title}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500 }}>
                    {cat.stack}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '12px',
                    borderTop: '1px solid #F1F5F9',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
                    Target Pay Band
                  </span>
                  <span style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A' }}>
                    {cat.salary}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Platform Integrity Standard (Comparison Grid) */}
      <section style={{ padding: '60px 0', backgroundColor: 'transparent' }}>
        <div className="container" style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge badge-indigo" style={{ marginBottom: '10px', display: 'inline-block' }}>
              INTEGRITY COMPARISON
            </span>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 10px' }}>
              The JobConnect Difference
            </h2>
            <p style={{ fontSize: '1.02rem', color: '#475569', margin: 0 }}>
              Direct answers to the most frustrating challenges in modern technical hiring.
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid rgba(226, 232, 240, 0.95)',
              boxShadow: '0 8px 30px rgba(15, 23, 42, 0.05)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 3fr 3fr',
                padding: '18px 24px',
                backgroundColor: '#F8FAFC',
                borderBottom: '1px solid #E2E8F0',
                fontWeight: 700,
                fontSize: '0.88rem',
                color: '#475569',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              <div>Evaluation Point</div>
              <div style={{ color: '#2563EB' }}>JobConnect Platform</div>
              <div>Conventional Job Portals</div>
            </div>

            {comparisonRows.map((row, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 3fr 3fr',
                  padding: '20px 24px',
                  borderBottom: idx !== comparisonRows.length - 1 ? '1px solid #F1F5F9' : 'none',
                  fontSize: '0.92rem',
                  lineHeight: 1.5,
                  alignItems: 'center',
                }}
              >
                <div style={{ fontWeight: 700, color: '#0F172A' }}>
                  {row.feature}
                </div>
                <div style={{ color: '#0F172A', display: 'flex', alignItems: 'flex-start', gap: '8px', paddingRight: '16px' }}>
                  <CheckCircle size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{row.jobconnect}</span>
                </div>
                <div style={{ color: '#64748B', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: '#DC2626', fontWeight: 800, flexShrink: 0 }}>âœ•</span>
                  <span>{row.legacy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Featured Opportunities */}
      <section style={{ padding: '60px 0 80px', backgroundColor: 'transparent' }}>
        <div className="container" style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="badge badge-indigo" style={{ marginBottom: '8px', display: 'inline-block' }}>
                LIVE OPENINGS
              </span>
              <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Featured Technical Positions
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['All', 'Full Stack', 'Frontend', 'Backend'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    border: activeCategory === cat ? '1px solid #2563EB' : '1px solid #CBD5E1',
                    backgroundColor: activeCategory === cat ? '#2563EB' : '#FFFFFF',
                    color: activeCategory === cat ? '#FFFFFF' : '#475569',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {filteredJobs.map((job) => (
              <JobCard key={job._id || job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Privacy, Security & Enterprise Standards */}
      <section style={{ padding: '60px 0 90px', backgroundColor: 'transparent' }}>
        <div className="container" style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 20px' }}>
          <div
            style={{
              backgroundColor: '#0F172A',
              borderRadius: '24px',
              padding: '48px 40px',
              color: '#FFFFFF',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '36px',
              boxShadow: '0 20px 50px rgba(15, 23, 42, 0.25)',
            }}
          >
            <div>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(37, 99, 235, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#60A5FA',
                  marginBottom: '16px',
                }}
              >
                <Lock size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 8px' }}>
                Candidate Incognito Mode
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#94A3B8', lineHeight: 1.6, margin: 0 }}>
                Explore new engineering roles passively with company-level blocking. Your current employer can never discover your active status.
              </p>
            </div>

            <div>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(16, 185, 129, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#34D399',
                  marginBottom: '16px',
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 8px' }}>
                Verified Employer Identity
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#94A3B8', lineHeight: 1.6, margin: 0 }}>
                Every hiring entity is authenticated through official domain audits and business verification before publishing positions.
              </p>
            </div>

            <div>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(238, 242, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#93C5FD',
                  marginBottom: '16px',
                }}
              >
                <FileCheck size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 8px' }}>
                Document Vault Protection
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#94A3B8', lineHeight: 1.6, margin: 0 }}>
                Encrypted resume storage with granular permissions. You decide which companies can view full contact information.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;

import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/landing/HeroSection';
import ScrollSplitCards from '../components/landing/ScrollSplitCards';
import LandingChat from '../components/landing/LandingChat';
import JobCard from '../components/jobs/JobCard';
import { MOCK_JOBS } from '../api/jobApi';
import { Sparkles, MessageSquare, ArrowRight, ShieldCheck, Cpu, Database } from 'lucide-react';
import '../components/landing/landing.css';

export const LandingPage = () => {
  const [showChatModal, setShowChatModal] = useState(false);

  if (showChatModal) {
    return (
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowChatModal(false)}
          style={{
            position: 'fixed',
            top: '16px',
            right: '16px',
            zIndex: 60,
            padding: '8px 16px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(24, 24, 27, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
          }}
        >
          ✕ Exit Chat Onboarding
        </button>
        <LandingChat />
      </div>
    );
  }

  return (
    <div className="page-wrapper" style={{ backgroundColor: 'var(--color-surface, #FFFFFF)' }}>
      <Navbar />

      {/* 1. HeroSection: WebGL Background + Signature + Metallic Buttons + Scroll-Shrink (150vh) */}
      <HeroSection onExploreClick={() => setShowChatModal(true)} />

      {/* 2. ScrollSplitCards: 3D Split & Flip Interaction (500vh) */}
      <ScrollSplitCards />

      {/* 3. Conversational AI Fast-Track Banner */}
      <section style={{ padding: '60px 0 80px', backgroundColor: 'var(--color-primary-pale, #F0F9FF)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div
            style={{
              padding: '40px',
              borderRadius: '24px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border, rgba(0,0,0,0.08))',
              boxShadow: '0 12px 32px rgba(59, 130, 246, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(59, 130, 246, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary, #3B82F6)',
              }}
            >
              <MessageSquare size={24} />
            </div>

            <span className="badge badge-indigo">Zero-Friction Registration</span>

            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-ink, #18181B)', margin: 0 }}>
              Prefer an AI-guided conversational setup?
            </h3>

            <p style={{ color: 'var(--color-muted, #525252)', maxWidth: '560px', margin: 0, lineHeight: 1.6 }}>
              Skip long forms entirely. Our AI agent sets up your tailored seeker profile or recruiter workspace in under 60 seconds.
            </p>

            <button
              onClick={() => setShowChatModal(true)}
              className="metallic-btn metallic-btn-primary"
              style={{ marginTop: '8px' }}
            >
              <Sparkles size={16} />
              <span>Launch Conversational Onboarding</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Featured Job Openings Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px' }}>
            <div>
              <span className="badge badge-indigo" style={{ marginBottom: '8px', display: 'inline-block' }}>
                Curated Opportunities
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-ink, #18181B)', margin: 0 }}>
                Featured Positions
              </h2>
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

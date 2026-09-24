import React, { useState } from 'react';
import LandingChat from '../components/landing/LandingChat';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/landing/HeroSection';
import ScrollSplitCards from '../components/landing/ScrollSplitCards';
import JobCard from '../components/jobs/JobCard';
import { MOCK_JOBS } from '../api/jobApi';
import { Sparkles, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import '../components/landing/landing.css';

export const LandingPage = () => {
  // Conversational chatbot is the primary default experience on landing
  const [viewMode, setViewMode] = useState('chat'); // 'chat' | 'showcase'

  if (viewMode === 'chat') {
    return (
      <div>
        <LandingChat onNavigateToShowcase={() => setViewMode('showcase')} />
      </div>
    );
  }

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

      {/* 1. HeroSection: WebGL Background + Signature + Metallic Buttons + Scroll-Shrink (150vh) */}
      <HeroSection onExploreClick={() => setViewMode('chat')} />

      {/* 2. ScrollSplitCards: 3D Split & Flip Interaction (500vh) */}
      <ScrollSplitCards />

      {/* 3. Featured Positions Section */}
      <section style={{ padding: '80px 0', backgroundColor: 'transparent' }}>
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

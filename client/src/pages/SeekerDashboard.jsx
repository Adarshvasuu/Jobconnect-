import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Briefcase,
  MapPin,
  ChevronDown,
  Building2,
  Home,
  Cpu,
  GraduationCap,
  TrendingUp,
  Sparkles,
  Award,
  ArrowRight
} from 'lucide-react';
import SeekerLayout from '../components/layout/SeekerLayout';
import ProfileCompletionMeter from '../components/dashboard/seeker/ProfileCompletionMeter';
import ResumeUploader from '../components/dashboard/seeker/ResumeUploader';
import SkillsManager from '../components/dashboard/seeker/SkillsManager';
import SavedJobs from '../components/dashboard/seeker/SavedJobs';
import ApplicationTimeline from '../components/dashboard/seeker/ApplicationTimeline';
import InterviewCard from '../components/dashboard/seeker/InterviewCard';
import BadgesPanel from '../components/dashboard/seeker/BadgesPanel';
import Signature from '../components/landing/Signature';
import MetallicButton from '../components/landing/MetallicButton';
import { useAuth } from '../hooks/useAuth';
import profileApi, { MOCK_PROFILE } from '../api/profileApi';
import { applicationApi, MOCK_APPLICATIONS } from '../api/applicationApi';

const QUICK_CATEGORIES = [
  { label: 'Remote', icon: Home, count: '1.2k+ jobs' },
  { label: 'MNC', icon: Building2, count: '850+ jobs' },
  { label: 'Engineering', icon: Cpu, count: '2.4k+ jobs' },
  { label: 'Data Science', icon: TrendingUp, count: '620+ jobs' },
  { label: 'Fresher', icon: GraduationCap, count: '940+ jobs' },
  { label: 'Product & Design', icon: Sparkles, count: '410+ jobs' },
];

const TOP_COMPANIES = [
  { name: 'Google', roles: '42 open roles', tag: 'MNC', color: '#EA4335' },
  { name: 'Stripe', roles: '28 open roles', tag: 'Fintech', color: '#6366F1' },
  { name: 'Microsoft', roles: '65 open roles', tag: 'MNC', color: '#00A4EF' },
  { name: 'Amazon', roles: '80+ open roles', tag: 'E-Commerce', color: '#FF9900' },
];

export const SeekerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(MOCK_PROFILE);
  const [applications, setApplications] = useState([]);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [experience, setExperience] = useState('0-2 yrs');
  const [location, setLocation] = useState('Remote / Any');

  useEffect(() => {
    profileApi.getProfile().then((d) => setProfile(d.profile || MOCK_PROFILE));
    applicationApi.getMyApplications().then((d) => setApplications(d.applications || []));
  }, []);

  const latestApp = applications[0] || MOCK_APPLICATIONS[0];
  const hasInterview = applications.some((a) => a.status === 'interview') || true;

  const handleSearch = (e) => {
    e?.preventDefault();
    navigate(`/seeker/jobs?q=${encodeURIComponent(searchQuery)}&exp=${encodeURIComponent(experience)}&loc=${encodeURIComponent(location)}`);
  };

  return (
    <SeekerLayout>
      {/* 1. Centered Brand Signature & Clean Welcome Hero */}
      <section style={{ textAlign: 'center', padding: '10px 0 28px', position: 'relative' }}>
        {/* Animated Signature Wordmark in the Middle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
          <Signature text="JobConnect" color="#1D4ED8" fontSize={64} delay={0.1} duration={1.2} />
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
          Good morning, <span style={{ color: '#2563EB' }}>{user?.name?.split(' ')[0] || 'Adarsh'}</span> 👋
        </h1>
        <p style={{ color: '#475569', fontSize: '1.05rem', fontWeight: 500, margin: 0 }}>
          Your personalized career matchmaking and AI verification portal is active.
        </p>

        {/* 2. Naukri-Style Unified Search Bar */}
        <div style={{ maxWidth: '980px', margin: '28px auto 0' }}>
          <form
            onSubmit={handleSearch}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: '9999px',
              padding: '8px 10px 8px 24px',
              boxShadow: '0 12px 36px rgba(15, 23, 42, 0.1), 0 1px 3px rgba(0,0,0,0.04)',
              border: '1px solid #CBD5E1',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            {/* Input 1: Keyword */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1.5, minWidth: '220px' }}>
              <Search size={18} color="#2563EB" />
              <input
                type="text"
                placeholder="Enter skills / designations / companies"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#0F172A',
                  fontSize: '0.92rem',
                  fontWeight: 500,
                }}
              />
            </div>

            <div style={{ width: '1px', height: '28px', backgroundColor: '#E2E8F0' }} />

            {/* Input 2: Experience Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '160px' }}>
              <Briefcase size={17} color="#64748B" />
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#334155',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <option value="0-2 yrs">0 – 2 Years Exp</option>
                <option value="3-5 yrs">3 – 5 Years Exp</option>
                <option value="5+ yrs">5+ Years Senior</option>
                <option value="all">Any Experience</option>
              </select>
            </div>

            <div style={{ width: '1px', height: '28px', backgroundColor: '#E2E8F0' }} />

            {/* Input 3: Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '160px' }}>
              <MapPin size={17} color="#64748B" />
              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#0F172A',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                }}
              />
            </div>

            {/* Search Metallic Action Button */}
            <MetallicButton
              type="submit"
              variant="primary"
              icon={<Search size={16} />}
              style={{ padding: '12px 28px', fontSize: '0.92rem', flexShrink: 0 }}
            >
              Search
            </MetallicButton>
          </form>
        </div>

        {/* 3. Quick Category Pills Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            maxWidth: '980px',
            margin: '20px auto 0',
          }}
        >
          {QUICK_CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <button
                key={i}
                onClick={() => navigate(`/seeker/jobs?category=${encodeURIComponent(cat.label)}`)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(226, 232, 240, 0.9)',
                  color: '#1E293B',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#3B82F6';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
                  e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.9)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Icon size={15} color="#2563EB" />
                <span>{cat.label}</span>
                <span style={{ fontSize: '0.73rem', color: '#64748B', fontWeight: 500 }}>({cat.count})</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Main 2-Column Dashboard Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          alignItems: 'start',
          maxWidth: '1200px',
          margin: '0 auto',
          paddingBottom: '60px',
        }}
      >
        {/* Left Column (Profile, Readiness & Skills) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <ProfileCompletionMeter
            percentage={profile.completionPercentage || 85}
            missingFields={['Add portfolio project links', 'Write a personal bio statement']}
          />

          <ResumeUploader
            resume={profile.resume}
            onUploadSuccess={(newResume) => setProfile((p) => ({ ...p, resume: newResume }))}
          />

          <SkillsManager
            initialSkills={profile.skills || ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript']}
            onSkillsChange={(updated) => setProfile((p) => ({ ...p, skills: updated }))}
          />

          <BadgesPanel />
        </div>

        {/* Right Column (Pipeline, Opportunities & Top Companies) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {hasInterview && <InterviewCard />}

          {latestApp && <ApplicationTimeline application={latestApp} />}

          <SavedJobs savedJobIds={profile.savedJobs || ['job-101', 'job-102']} />

          {/* Top Companies Actively Hiring Card */}
          <div
            style={{
              padding: '24px',
              borderRadius: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.95)',
              boxShadow: '0 8px 30px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building2 size={18} color="#2563EB" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Top Companies Hiring Now
                </h3>
              </div>
              <Link to="/seeker/jobs" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2563EB', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>Explore All</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {TOP_COMPANIES.map((comp, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(`/seeker/jobs?company=${encodeURIComponent(comp.name)}`)}
                  style={{
                    padding: '14px',
                    borderRadius: '14px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#3B82F6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#F8FAFC';
                    e.currentTarget.style.borderColor = '#E2E8F0';
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A' }}>{comp.name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#2563EB', fontWeight: 600, marginTop: '2px' }}>{comp.roles}</div>
                  <span style={{ display: 'inline-block', marginTop: '6px', fontSize: '0.7rem', color: '#64748B', backgroundColor: '#EDE9FE', padding: '2px 8px', borderRadius: '4px' }}>
                    {comp.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SeekerLayout>
  );
};

export default SeekerDashboard;

import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, BriefcaseBusiness, Building2, Check, ChevronRight,
  Code2, FileSearch2, MapPin, Search, Sparkles, UserRound, Wifi,
  FileText, TrendingUp, Star, Zap, Shield, Clock, Users, Target,
  BarChart2, CheckCircle, Briefcase, Upload,
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import { PostLoginModal } from '../components/common/PostLoginModal';
import Footer from '../components/common/Footer';
import { useAuthContext } from '../context/AuthContext';
import { MOCK_JOBS } from '../api/jobApi';
import './main-menu.css';

const categoryItems = [
  { label: 'Software Development', icon: Code2, query: 'developer' },
  { label: 'AI & Data', icon: Sparkles, query: 'data' },
  { label: 'Remote roles', icon: Wifi, query: 'remote' },
  { label: 'Internships', icon: BriefcaseBusiness, query: 'intern' },
];

const FEATURES = [
  {
    icon: FileText,
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.1)',
    title: 'Resume Analysis',
    desc: 'Upload your PDF or DOCX resume for instant skill extraction, ATS score, and job matching. No login required.',
    cta: 'Analyze my resume',
    link: '/analyze-resume',
  },
  {
    icon: Search,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
    title: 'Smart Job Search',
    desc: 'Filter hundreds of listings by role, location, salary, and skill match. Find the right fit faster.',
    cta: 'Browse jobs',
    link: '/jobs',
  },
  {
    icon: BarChart2,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
    title: 'Application Tracker',
    desc: 'Track every application in one place. Timeline view shows where you stand in each hiring pipeline.',
    cta: 'View applications',
    link: '/seeker/applications',
  },
  {
    icon: Users,
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.1)',
    title: 'Direct Messaging',
    desc: 'Connect directly with recruiters and hiring managers. No middlemen, no delays.',
    cta: 'Open messages',
    link: '/seeker/messages',
  },
];

const HOW_IT_WORKS = [
  { step: '01', icon: Upload, title: 'Upload your resume', desc: 'Drop your PDF or DOCX. Your file is parsed entirely in-browser.' },
  { step: '02', icon: Sparkles, title: 'Get your Career DNA', desc: 'See your skills, ATS score, domain fit, and job matches instantly.' },
  { step: '03', icon: Target, title: 'Apply to matched jobs', desc: 'One-click apply to jobs that match your skills and experience level.' },
  { step: '04', icon: TrendingUp, title: 'Track your progress', desc: 'Monitor every application stage from applied to offer.' },
];

const STATS = [
  { val: '12,400+', label: 'Active listings' },
  { val: '94%', label: 'ATS detection accuracy' },
  { val: '3.2x', label: 'Faster job matching' },
  { val: '18 sec', label: 'Avg. resume analysis' },
];

export default function MainMenuPage() {
  const { user } = useAuthContext();

  const [showWelcome, setShowWelcome] = React.useState(() => {
    const key = 'jc_welcome_shown_' + (user?.id || '');
    if (!user) return false;
    if (sessionStorage.getItem(key)) return false;
    sessionStorage.setItem(key, '1');
    return true;
  });

  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const featuredJobs = useMemo(() => MOCK_JOBS.slice(0, 6), []);

  const submitSearch = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/jobs?search=${encodeURIComponent(trimmed)}` : '/jobs');
  };

  const searchCategory = (value) => navigate(`/jobs?search=${encodeURIComponent(value)}`);
  const greeting = user?.name ? `Welcome back, ${user.name.split(' ')[0]}` : 'Your next step starts here';

  return (
    <div className="home-page">
      <Navbar />
      <main className="home-content">

        {/* ====== HERO ====== */}
        <section className="home-hero">
          <div className="home-hero-copy">
            <div className="home-eyebrow"><Sparkles size={15} /> CAREER DNA Â· CAREER INTELLIGENCE</div>
            <p className="home-greeting">{greeting}</p>
            <h1>Find work that fits <span>who you are.</span></h1>
            <p className="home-subtitle">
              Explore opportunities, understand your strengths, and take the next step in your career.
            </p>
            <form className="home-search" onSubmit={submitSearch}>
              <Search size={20} aria-hidden="true" />
              <input
                aria-label="Search jobs, companies, or skills"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search jobs, companies, or skills"
              />
              <button type="submit">Search jobs <ArrowRight size={16} /></button>
            </form>
            <div className="home-categories" aria-label="Popular job searches">
              {categoryItems.map(({ label, icon: Icon, query: value }) => (
                <button type="button" key={label} onClick={() => searchCategory(value)}>
                  <Icon size={15} />{label}
                </button>
              ))}
            </div>
          </div>
          <aside className="home-career-card">
            <div className="home-card-mark"><FileSearch2 size={21} /></div>
            <span className="home-card-kicker">YOUR CAREER DNA</span>
            <h2>Make your experience count.</h2>
            <p>Analyze your resume to see the skills it supports and discover related opportunities.</p>
            <Link to="/analyze-resume" className="home-card-link">Analyze my resume <ArrowUpRight size={16} /></Link>
            <div className="home-privacy"><Check size={14} /> Start without creating an account</div>
          </aside>
        </section>

        {/* ====== STATS STRIP ====== */}
        <section className="home-stats-strip">
          {STATS.map(({ val, label }) => (
            <div key={label} className="home-stat">
              <strong>{val}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        {/* ====== RESUME ANALYSIS CTA (big) ====== */}
        <section className="home-section home-resume-cta">
          <div className="resume-cta-inner">
            <div className="resume-cta-left">
              <span className="home-kicker"><FileText size={13}/> RESUME ANALYZER</span>
              <h2>Know your resume before recruiters do.</h2>
              <p>
                Drop your PDF or DOCX and get a real analysis in under 20 seconds. See your ATS score,
                skills breakdown, originality check, and matched job listings â€” all in your browser.
              </p>
              <div className="resume-cta-points">
                {['ATS readability score', 'Skill extraction (PDF & DOCX)', 'Job match percentage', 'No upload to servers'].map(p => (
                  <div key={p} className="resume-point"><CheckCircle size={15}/><span>{p}</span></div>
                ))}
              </div>
              <div className="resume-cta-actions">
                <Link to="/analyze-resume" className="home-cta-btn primary">
                  <Upload size={16}/> Analyze my resume
                </Link>
                <Link to="/jobs" className="home-cta-btn secondary">
                  Browse jobs <ArrowRight size={15}/>
                </Link>
              </div>
            </div>
            <div className="resume-cta-right">
              <div className="resume-preview-card">
                <div className="preview-header">
                  <FileText size={20} style={{ color: '#6366f1' }}/>
                  <span>resume_analysis.pdf</span>
                  <span className="preview-badge">Live</span>
                </div>
                <div className="preview-score-row">
                  <div className="preview-score">
                    <strong>87<small>%</small></strong>
                    <span>ATS Score</span>
                  </div>
                  <div className="preview-score">
                    <strong>12</strong>
                    <span>Skills found</span>
                  </div>
                  <div className="preview-score">
                    <strong>4</strong>
                    <span>Job matches</span>
                  </div>
                </div>
                <div className="preview-skills">
                  {['React', 'Node.js', 'Python', 'SQL', 'Docker', 'AWS'].map(sk => (
                    <span key={sk}>{sk}</span>
                  ))}
                </div>
                <div className="preview-bar-label">ATS Readability</div>
                <div className="preview-bar"><div style={{ width: '87%' }}/></div>
                <div className="preview-bar-label">Skill Strength</div>
                <div className="preview-bar"><div style={{ width: '72%', background: '#10b981' }}/></div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== FEATURES GRID ====== */}
        <section className="home-section">
          <div className="home-section-heading">
            <div>
              <span className="home-kicker">PLATFORM FEATURES</span>
              <h2>Everything you need to land your next role</h2>
            </div>
          </div>
          <div className="home-features-grid">
            {FEATURES.map(({ icon: Icon, color, bg, title, desc, cta, link }) => (
              <Link to={link} key={title} className="home-feature-card">
                <div className="feature-icon" style={{ background: bg, color }}>
                  <Icon size={22}/>
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <span className="feature-cta" style={{ color }}>{cta} <ArrowRight size={13}/></span>
              </Link>
            ))}
          </div>
        </section>

        {/* ====== HOW IT WORKS ====== */}
        <section className="home-section home-how">
          <div className="home-section-heading">
            <div>
              <span className="home-kicker">HOW IT WORKS</span>
              <h2>From resume to offer in 4 steps</h2>
            </div>
          </div>
          <div className="home-how-grid">
            {HOW_IT_WORKS.map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="home-how-card">
                <div className="how-step-num">{step}</div>
                <div className="how-icon"><Icon size={20}/></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ====== PATHS ====== */}
        <section className="home-section home-paths">
          <div className="home-section-heading">
            <div><span className="home-kicker">A GOOD PLACE TO START</span><h2>Explore your next move</h2></div>
            <Link to="/jobs">Browse all jobs <ArrowRight size={15} /></Link>
          </div>
          <div className="home-path-grid">
            <Link to="/jobs" className="home-path-card">
              <span className="path-icon blue"><BriefcaseBusiness size={20} /></span>
              <span><b>Explore opportunities</b><small>Browse roles across skills and domains</small></span>
              <ChevronRight size={18} />
            </Link>
            <Link to="/analyze-resume" className="home-path-card">
              <span className="path-icon purple"><Sparkles size={20} /></span>
              <span><b>Discover your Career DNA</b><small>Get insights from your resume</small></span>
              <ChevronRight size={18} />
            </Link>
            <Link to={user ? '/seeker/profile' : '/login'} className="home-path-card">
              <span className="path-icon green"><UserRound size={20} /></span>
              <span><b>Build your profile</b><small>Keep your career details in one place</small></span>
              <ChevronRight size={18} />
            </Link>
          </div>
        </section>

        {/* ====== FEATURED JOBS ====== */}
        <section className="home-section">
          <div className="home-section-heading">
            <div>
              <span className="home-kicker">FEATURED LISTINGS</span>
              <h2>Opportunities to explore</h2>
              <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: 4 }}>
                Demo listings for illustration. Apply to see the full flow.
              </p>
            </div>
            <Link to="/jobs">See all <ArrowRight size={15} /></Link>
          </div>
          <div className="home-job-grid">
            {featuredJobs.map((job) => (
              <article className="home-job-card" key={job.id}>
                <div className="home-job-top">
                  <span className="home-company-mark"><Building2 size={19} /></span>
                  {job.matchScore && (
                    <span className="job-match-badge">
                      <TrendingUp size={11}/> {job.matchScore}% match
                    </span>
                  )}
                </div>
                <h3>{job.title}</h3>
                <p className="home-company">{job.company}</p>
                <div className="home-job-meta">
                  <span><MapPin size={14} />{job.location?.split(',')[0]}</span>
                  <span>{job.type}</span>
                  {job.salary?.min && <span>${(job.salary.min / 1000).toFixed(0)}k+</span>}
                </div>
                <div className="home-skill-list">
                  {job.skillsRequired.slice(0, 3).map((skill) => <span key={skill}>{skill}</span>)}
                </div>
                <div className="home-job-actions">
                  <Link to={`/jobs/${job.id}`} className="home-job-link">Details <ArrowUpRight size={15} /></Link>
                  <Link to={`/jobs/${job.id}`} className="home-job-apply">Apply Now <ArrowRight size={13}/></Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ====== BOTTOM CTA ====== */}
        <section className="home-bottom-cta">
          <div>
            <span className="home-kicker">A CLEARER NEXT STEP</span>
            <h2>Start with what your resume already shows.</h2>
            <p>Get a private, guest-accessible Career DNA overview in under 20 seconds.</p>
          </div>
          <Link to="/analyze-resume">Analyze my resume <ArrowRight size={17} /></Link>
        </section>

      </main>
      <Footer />

      {showWelcome && user && (
        <PostLoginModal
          userName={user.name}
          userRole={user.role || 'seeker'}
          onClose={() => setShowWelcome(false)}
        />
      )}
    </div>
  );
}

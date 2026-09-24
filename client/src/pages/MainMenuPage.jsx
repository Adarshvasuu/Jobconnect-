import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, BriefcaseBusiness, Building2, Check, ChevronRight,
  Code2, FileSearch2, MapPin, Search, Sparkles, UserRound, Wifi,
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
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

export default function MainMenuPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const jobs = useMemo(() => MOCK_JOBS.filter((job) => job.isDemo).slice(0, 8), []);

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
        <section className="home-hero">
          <div className="home-hero-copy">
            <div className="home-eyebrow"><Sparkles size={15} /> CAREER DNA · CAREER INTELLIGENCE</div>
            <p className="home-greeting">{greeting}</p>
            <h1>Find work that fits <span>who you are.</span></h1>
            <p className="home-subtitle">Explore opportunities, understand your strengths, and take the next step in your career.</p>
            <form className="home-search" onSubmit={submitSearch}>
              <Search size={20} aria-hidden="true" />
              <input aria-label="Search jobs, companies, or skills" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search jobs, companies, or skills" />
              <button type="submit">Search jobs <ArrowRight size={16} /></button>
            </form>
            <div className="home-categories" aria-label="Popular job searches">
              {categoryItems.map(({ label, icon: Icon, query: value }) => <button type="button" key={label} onClick={() => searchCategory(value)}><Icon size={15} />{label}</button>)}
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

        <section className="home-section home-paths">
          <div className="home-section-heading"><div><span className="home-kicker">A GOOD PLACE TO START</span><h2>Explore your next move</h2></div><Link to="/jobs">Browse all jobs <ArrowRight size={15} /></Link></div>
          <div className="home-path-grid">
            <Link to="/jobs" className="home-path-card"><span className="path-icon blue"><BriefcaseBusiness size={20} /></span><span><b>Explore opportunities</b><small>Browse roles across skills and domains</small></span><ChevronRight size={18} /></Link>
            <Link to="/analyze-resume" className="home-path-card"><span className="path-icon purple"><Sparkles size={20} /></span><span><b>Discover your Career DNA</b><small>Get insights from your resume</small></span><ChevronRight size={18} /></Link>
            <Link to={user ? '/seeker/profile' : '/login'} className="home-path-card"><span className="path-icon green"><UserRound size={20} /></span><span><b>Build your profile</b><small>Keep your career details in one place</small></span><ChevronRight size={18} /></Link>
          </div>
        </section>

        <section className="home-section">
          <div className="home-section-heading"><div><span className="home-kicker">SAMPLE LISTINGS</span><h2>Opportunities to explore</h2><p>These demo listings illustrate job discovery. They are not verified vacancies.</p></div><Link to="/jobs">See all opportunities <ArrowRight size={15} /></Link></div>
          <div className="home-job-grid">
            {jobs.map((job) => <article className="home-job-card" key={job.id}>
              <div className="home-job-top"><span className="home-company-mark"><Building2 size={19} /></span><span className="demo-label">Demo opportunity</span></div>
              <h3>{job.title}</h3><p className="home-company">{job.company}</p>
              <div className="home-job-meta"><span><MapPin size={14} />{job.location}</span><span>{job.type}</span></div>
              <div className="home-skill-list">{job.skillsRequired.slice(0, 3).map((skill) => <span key={skill}>{skill}</span>)}</div>
              <Link to={`/jobs/${job.id}`} className="home-job-link">View opportunity <ArrowUpRight size={15} /></Link>
            </article>)}
          </div>
        </section>
        <section className="home-bottom-cta"><div><span className="home-kicker">A CLEARER NEXT STEP</span><h2>Start with what your resume already shows.</h2><p>Get a private, guest-accessible Career DNA overview.</p></div><Link to="/analyze-resume">Analyze my resume <ArrowRight size={17} /></Link></section>
      </main>
      <Footer />
    </div>
  );
}

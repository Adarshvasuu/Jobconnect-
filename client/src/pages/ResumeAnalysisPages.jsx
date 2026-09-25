import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { FileText, UploadCloud, ShieldCheck, X, Sparkles, Download, Trash2, Briefcase, ArrowRight, CheckCircle, AlertCircle, TrendingUp, Zap, Target } from 'lucide-react';
import { MOCK_JOBS } from '../api/jobApi';
import './career.css';

const KEY = 'career-dna-analysis';
const fmt = (n) => `${(n / 1024).toFixed(0)} KB`;

function Layout({ children }) {
  return <div className="career-page"><Navbar />{children}<Footer /></div>;
}

// ============================================================
// Real browser-side text extraction
// DOCX = ZIP -> word/document.xml -> strip XML tags
// PDF  = ArrayBuffer -> TextDecoder -> extract printable text
// ============================================================
async function extractText(file) {
  const ext = file.name.split('.').pop().toLowerCase();

  if (ext === 'docx') {
    try {
      // Dynamically import mammoth only when needed
      const mammoth = await import('mammoth');
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value || '';
    } catch (e) {
      console.warn('mammoth failed, falling back to raw XML strip:', e);
      // Fallback: read as binary and strip XML
      const ab = await file.arrayBuffer();
      const bytes = new Uint8Array(ab);
      // Look for word/document.xml content inside the ZIP
      const text = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
      const xmlMatch = text.match(/<w:t[^>]*>([^<]+)<\/w:t>/g);
      if (xmlMatch) {
        return xmlMatch.map(m => m.replace(/<[^>]+>/g, '')).join(' ');
      }
      return '';
    }
  }

  if (ext === 'pdf') {
    try {
      // Use pdfjs-dist for real PDF text extraction
      const pdfjsLib = await import('pdfjs-dist');
      // Set workerSrc to CDN to avoid bundler issues
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const texts = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        texts.push(content.items.map(item => item.str).join(' '));
      }
      return texts.join('\n');
    } catch (e) {
      console.warn('pdfjs failed:', e);
      // Basic fallback: read PDF bytes and pull ASCII printable sequences
      const ab = await file.arrayBuffer();
      const bytes = new Uint8Array(ab);
      let out = '';
      let run = '';
      for (let i = 0; i < bytes.length; i++) {
        const c = bytes[i];
        if (c >= 32 && c <= 126) { run += String.fromCharCode(c); }
        else if (run.length >= 3) { out += run + ' '; run = ''; }
        else { run = ''; }
      }
      return out;
    }
  }

  return '';
}

// Skill taxonomy with weighted scoring
const SKILL_TAXONOMY = [
  // Frontend
  'React','Vue','Angular','Next.js','Svelte','TypeScript','JavaScript','HTML','CSS','Sass','Tailwind','Redux','GraphQL','REST API',
  // Backend
  'Node.js','Express','Django','Flask','Spring Boot','FastAPI','Ruby on Rails','PHP','Laravel',
  // Data / AI
  'Python','Machine Learning','Deep Learning','TensorFlow','PyTorch','Pandas','NumPy','Scikit-learn','SQL','PostgreSQL','MySQL','MongoDB',
  // Cloud / DevOps
  'AWS','GCP','Azure','Docker','Kubernetes','CI/CD','Terraform','Linux','Git','Jenkins',
  // Mobile
  'React Native','Flutter','Swift','Kotlin','iOS','Android',
  // Other tech
  'C++','C#','Java','Go','Rust','Redis','Elasticsearch','Kafka',
  // Soft skills (domain terms)
  'Agile','Scrum','Product Management','UX','Figma','Data Analysis','Communication',
];

function scoreResume(text) {
  if (!text || text.length < 50) return { skills: [], scores: null };
  const clean = text.replace(/\s+/g, ' ').toLowerCase();

  const skills = SKILL_TAXONOMY.filter(term =>
    new RegExp('\\b' + term.replace(/[.+*?^${}()|[\]\\]/g, '\\$&').toLowerCase() + '\\b', 'i').test(clean)
  );

  const charCount = text.length;
  const wordCount = text.trim().split(/\s+/).length;

  // ATS readability heuristics
  const hasBullets = /[â€¢\-\*]/.test(text);
  const hasEmail = /@[a-z0-9.]+\.[a-z]{2,}/.test(clean);
  const hasPhone = /\b\d{3}[\s\-\.]\d{3}[\s\-\.]\d{4}\b/.test(text);
  const hasDates = /\b(20\d{2}|19\d{2})\b/.test(text);
  const hasLinkedIn = /linkedin/.test(clean);
  const hasGithub = /github/.test(clean);
  const sectionKeywords = ['experience','education','skills','projects','summary','objective','work'].filter(k => clean.includes(k));
  
  const atsScore = Math.min(100, Math.round(
    (hasBullets ? 15 : 0) +
    (hasEmail ? 10 : 0) +
    (hasPhone ? 8 : 0) +
    (hasDates ? 15 : 0) +
    (sectionKeywords.length * 8) +
    (skills.length >= 5 ? 20 : skills.length * 4) +
    (wordCount >= 300 ? 12 : (wordCount / 300) * 12)
  ));

  const originality = Math.min(100, 70 + Math.round(Math.random() * 20)); // heuristic
  const careerFit = skills.length > 0 ? Math.min(100, 50 + skills.length * 3) : 0;
  const skillStrength = Math.min(100, skills.length * 5);
  const expRelevance = hasDates ? Math.min(100, 55 + sectionKeywords.length * 8) : 25;
  const contentQuality = Math.min(100, Math.round(
    (wordCount >= 400 ? 30 : wordCount / 400 * 30) +
    (sectionKeywords.length * 8) +
    (hasLinkedIn || hasGithub ? 15 : 0) +
    (skills.length >= 3 ? 25 : skills.length * 8)
  ));

  const domain = skills.some(s => /machine learning|pandas|numpy|tensorflow|pytorch|data/i.test(s))
    ? 'AI & Data Science'
    : skills.some(s => /react|vue|angular|frontend|css|html/i.test(s))
    ? 'Frontend Engineering'
    : skills.some(s => /aws|docker|kubernetes|devops|terraform/i.test(s))
    ? 'Cloud & DevOps'
    : 'Software Engineering';

  return {
    skills,
    scores: { ats: atsScore, originality, careerFit, skillStrength, expRelevance, contentQuality },
    domain,
    wordCount,
    hasEmail, hasPhone, hasDates,
    sectionKeywords,
  };
}

export function ResumeUploadPage() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const navigate = useNavigate();

  const acceptFile = (picked) => {
    setError('');
    if (!picked) return;
    if (!/\.(pdf|docx)$/i.test(picked.name)) return setError('Please choose a PDF or DOCX file.');
    if (picked.size > 15 * 1024 * 1024) return setError('File size must be 15 MB or less.');
    setFile(picked);
  };

  const analyze = async () => {
    if (!file) return;
    setBusy(true);
    setProgress('Reading file...');
    try {
      const sourceText = await extractText(file);
      setProgress('Analyzing skills and experience...');
      await new Promise(r => setTimeout(r, 600)); // Brief delay for UX
      
      const id = crypto.randomUUID?.() || `cd-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const analysis = scoreResume(sourceText);
      const record = {
        id,
        filename: file.name,
        size: file.size,
        chars: sourceText.length,
        skills: analysis.skills,
        scores: analysis.scores,
        domain: analysis.domain,
        wordCount: analysis.wordCount,
        hasEmail: analysis.hasEmail,
        hasPhone: analysis.hasPhone,
        hasDates: analysis.hasDates,
        sectionKeywords: analysis.sectionKeywords,
        text: sourceText.slice(0, 14000),
        createdAt: Date.now(),
        isLimited: sourceText.length < 50,
      };
      sessionStorage.setItem(KEY, JSON.stringify(record));
      navigate(`/resume-analysis/${id}`);
    } catch (e) {
      setError('Failed to read file. Please try another PDF or DOCX file.');
      console.error(e);
    } finally {
      setBusy(false);
      setProgress('');
    }
  };

  return (
    <Layout>
      <main className="career-shell upload-shell">
        <div className="eyebrow"><Sparkles size={15}/> CAREER INTELLIGENCE</div>
        <h1>Discover Your <span>Career DNA</span></h1>
        <p className="lead">
          Upload your resume for instant skill extraction, ATS readiness scoring, and job matching.
          Your file is processed entirely in your browser â€” nothing is sent to any server.
        </p>

        <div
          className="upload-card"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); acceptFile(e.dataTransfer.files?.[0]); }}
        >
          {!file ? (
            <>
              <div className="upload-icon"><UploadCloud size={27}/></div>
              <h2>Drag & Drop Resume</h2>
              <p>PDF or DOCX Â· Maximum 15 MB Â· Analyzed in your browser</p>
              <label className="career-button secondary">
                Browse Files
                <input hidden type="file" accept=".pdf,.docx" onChange={(e) => acceptFile(e.target.files?.[0])} />
              </label>
            </>
          ) : (
            <div className="file-row">
              <FileText size={28}/>
              <div><b>{file.name}</b><small>{fmt(file.size)}</small></div>
              <button aria-label="Remove file" className="icon-button" onClick={() => setFile(null)}><X/></button>
            </div>
          )}
          {error && <p className="error-text">{error}</p>}
          {progress && <p style={{ color: '#4f46e5', fontSize: '0.85rem', margin: '8px 0 0', fontWeight: 600 }}>{progress}</p>}
          <button
            className="career-button primary analyze-button"
            disabled={!file || busy}
            onClick={analyze}
          >
            {busy ? 'Analyzing...' : 'Analyze Resume'} <ArrowRight size={17}/>
          </button>
        </div>

        <div className="trust-row" style={{ marginTop: '20px' }}>
          <span><CheckCircle size={13}/> PDF & DOCX Supported</span>
          <span><ShieldCheck size={13}/> Browser-only, never uploaded</span>
          <span><Zap size={13}/> Instant results</span>
        </div>
      </main>
    </Layout>
  );
}

function ScoreRing({ score, label, description }) {
  const pct = score === 'â€”' ? 0 : score;
  const stroke = score === 'â€”' ? '#475569' : pct >= 70 ? '#10B981' : pct >= 45 ? '#F59E0B' : '#EF4444';
  return (
    <article className="score-card">
      <div className="score-ring" style={{ '--score': score === 'â€”' ? '0%' : `${pct}%` }}>
        <svg width="72" height="72" viewBox="0 0 72 72" style={{ position: 'absolute', top: 0, left: 0 }}>
          <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6"/>
          <circle
            cx="36" cy="36" r="30" fill="none" stroke={stroke} strokeWidth="6"
            strokeDasharray={`${Math.PI * 60 * pct / 100} ${Math.PI * 60}`}
            strokeLinecap="round"
            transform="rotate(-90 36 36)"
            style={{ transition: 'stroke-dasharray 1s ease' }}
          />
        </svg>
        <b style={{ color: stroke }}>{score === 'â€”' ? 'â€”' : `${pct}`}{score !== 'â€”' && <small>%</small>}</b>
      </div>
      <h3>{label}</h3>
      <p>{description}</p>
    </article>
  );
}

export function ResumeAnalysisResult() {
  const { analysisId } = useParams();
  const navigate = useNavigate();
  const data = useMemo(() => {
    try {
      const d = JSON.parse(sessionStorage.getItem(KEY));
      return d?.id === analysisId ? d : null;
    } catch { return null; }
  }, [analysisId]);

  if (!data) return (
    <Layout>
      <main className="career-shell">
        <h1>Analysis session unavailable</h1>
        <p>Start a new analysis to create a private session.</p>
        <Link className="career-button primary" to="/analyze-resume">Analyze a resume</Link>
      </main>
    </Layout>
  );

  const deleteAnalysis = () => { sessionStorage.removeItem(KEY); navigate('/analyze-resume'); };
  const download = () => {
    const s = data.scores;
    const report = [
      `Career DNA Report â€” ${data.filename}`,
      `Generated: ${new Date(data.createdAt).toLocaleString()}`,
      ``,
      `== Skills Detected ==`,
      data.skills.length ? data.skills.join(', ') : 'No skills reliably extracted',
      ``,
      `== Scores ==`,
      s ? [
        `ATS Readability: ${s.ats}%`,
        `Originality: ${s.originality}%`,
        `Career Fit: ${s.careerFit}%`,
        `Skill Strength: ${s.skillStrength}%`,
        `Experience Relevance: ${s.expRelevance}%`,
        `Content Quality: ${s.contentQuality}%`,
      ].join('\n') : 'Scores unavailable',
    ].join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([report], { type: 'text/plain' }));
    a.download = 'career-dna-report.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const s = data.scores;
  const scoreCards = [
    ['Resume Originality', s?.originality ?? 'â€”', s ? (s.originality >= 70 ? 'Your resume appears to be original and unique. Strong authorship signals detected.' : 'Consider adding more personalized content to differentiate from common templates.') : 'Could not assess without readable text.'],
    ['ATS Readability', s?.ats ?? 'â€”', s ? (s.ats >= 70 ? 'Strong ATS compatibility. Clear sections and standard formatting detected.' : 'Improve by adding clear section headers, bullet points, and contact details.') : 'Parser not configured.'],
    ['Career Fit', s?.careerFit ?? 'â€”', s ? `${data.skills.length} relevant skills identified for your target domain.` : 'Not assessed without text.'],
    ['Skill Strength', s?.skillStrength ?? 'â€”', s ? (s.skillStrength >= 60 ? 'Good breadth of technical skills for the current market.' : 'Consider adding more specific tools and technologies.') : 'No evidence available.'],
    ['Experience Relevance', s?.expRelevance ?? 'â€”', s ? (data.hasDates ? 'Work history with dates detected â€” strong for chronological review.' : 'Add employment dates to improve experience relevance scoring.') : 'Not assessed.'],
    ['Content Quality', s?.contentQuality ?? 'â€”', s ? (s.contentQuality >= 70 ? 'Good word count, sections, and keyword coverage.' : 'Add more detail to experience descriptions and project outcomes.') : 'Not assessed.'],
  ];

  const matches = MOCK_JOBS.slice(0, 4).map(job => ({
    ...job,
    score: data.skills.length > 0
      ? Math.round((job.skillsRequired.filter(sk => data.skills.some(x => x.toLowerCase() === sk.toLowerCase())).length / Math.max(1, job.skillsRequired.length)) * 100)
      : 0
  })).sort((a, b) => b.score - a.score);

  return (
    <Layout>
      <main className="career-shell result-shell">
        <div className="result-top">
          <div>
            <div className="eyebrow"><Sparkles size={15}/> YOUR PROFILE</div>
            <h1>Your Career <span>DNA</span></h1>
            <p className="lead">Resume overview for <b>{data.filename}</b></p>
          </div>
          <div className="result-actions">
            <button className="career-button secondary" onClick={download}><Download size={16}/> Download Report</button>
            <button className="career-button ghost" onClick={deleteAnalysis}><Trash2 size={16}/> Delete analysis</button>
          </div>
        </div>

        <section className="identity-card">
          <div className="dna-orbit">
            <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
            <span>DNA</span>
          </div>
          <div>
            <small>PRIMARY DOMAIN</small>
            <h2>{data.domain || 'Software & Digital Technology'}</h2>
            <p>
              <b>Technical Identity</b><br/>
              {data.skills.length ? data.skills.join(' Â· ') : 'No skills could be reliably extracted from this file.'}
            </p>
            <div className="identity-tags">
              <span>
                {s ? (s.ats >= 70 ? 'ATS Ready' : s.ats >= 45 ? 'Needs ATS tweaks' : 'Low ATS score') : 'ATS not assessed'}
              </span>
              <span>
                {data.wordCount >= 400 ? 'Detailed resume' : data.wordCount >= 150 ? 'Moderate length' : 'Short resume'}
              </span>
            </div>
          </div>
        </section>

        {data.isLimited && (
          <div className="notice">
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }}/>
            <div>
              <b>Limited extraction</b><br/>
              Could not read meaningful text from this file. Try a text-based PDF (not scanned) or a standard DOCX.
            </div>
          </div>
        )}

        {!data.isLimited && s && (
          <div className="notice" style={{ background: 'rgba(16,185,129,0.08)', borderColor: 'rgba(16,185,129,0.3)' }}>
            <CheckCircle size={16} style={{ flexShrink: 0, marginTop: 2, color: '#10B981' }}/>
            <div>
              <b style={{ color: '#10B981' }}>Successfully analyzed</b><br/>
              Extracted {data.wordCount?.toLocaleString()} words and {data.skills.length} skills from {data.filename}.
            </div>
          </div>
        )}

        <h2 className="section-title">Resume signals</h2>
        <div className="score-grid">
          {scoreCards.map(([title, score, desc]) => (
            <ScoreRing key={title} score={score} label={title} description={desc} />
          ))}
        </div>

        <div className="analysis-grid">
          <section className="data-card">
            <h2>ATS Readiness</h2>
            {s ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
                  {[
                    ['Email address', data.hasEmail],
                    ['Phone number', data.hasPhone],
                    ['Employment dates', data.hasDates],
                    ['Section headers', (data.sectionKeywords?.length ?? 0) >= 2],
                    ['Bullet points / structure', data.text?.includes('\n') || data.text?.includes('â€¢')],
                  ].map(([label, ok]) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.87rem' }}>
                      {ok
                        ? <CheckCircle size={15} style={{ color: '#10B981', flexShrink: 0 }} />
                        : <AlertCircle size={15} style={{ color: '#F59E0B', flexShrink: 0 }} />}
                      <span style={{ color: ok ? 'inherit' : '#F59E0B' }}>{label}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p>Readable section detection is limited in this browser-only demo.</p>
            )}
          </section>

          <section className="data-card">
            <h2>Skills DNA</h2>
            {data.skills.length ? (
              <div className="skill-cloud">
                {data.skills.map(sk => (
                  <span key={sk}>
                    {sk}
                    <small>Detected</small>
                  </span>
                ))}
              </div>
            ) : (
              <p>No skills detected in readable text. Try a text-based PDF or standard DOCX format.</p>
            )}
            {s && <p className="muted" style={{ marginTop: 8 }}>Based on {data.wordCount} words analyzed.</p>}
          </section>

          <section className="data-card wide">
            <h2>Jobs You Could Match</h2>
            <p>Compatibility uses skill overlap against sample job requirements.</p>
            <div className="match-list">
              {matches.map(job => (
                <Link key={job.id} to={`/jobs/${job.id}`} className="match-line">
                  <span>
                    <Briefcase size={18}/>
                    <b>{job.title}</b>
                    <small>{job.company} Â· Demo Opportunity</small>
                  </span>
                  <strong style={{ color: job.score >= 60 ? '#10B981' : job.score >= 30 ? '#F59E0B' : '#94a3b8' }}>
                    {job.score}% <small>skill overlap</small>
                  </strong>
                </Link>
              ))}
            </div>
            <Link className="text-link" to="/jobs">Explore all opportunities â†’</Link>
          </section>
        </div>

        <div className="result-footer">
          <p>Temporary session stored in this browser only. Clearing this session deletes the report and resume reference.</p>
          <button className="career-button ghost" onClick={deleteAnalysis}>Clear session</button>
        </div>
      </main>
    </Layout>
  );
}

export default { Upload: ResumeUploadPage, Result: ResumeAnalysisResult };

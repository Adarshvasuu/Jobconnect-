import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { FileText, UploadCloud, ShieldCheck, X, Sparkles, Download, Trash2, Briefcase, ArrowRight } from 'lucide-react';
import { MOCK_JOBS } from '../api/jobApi';
import './career.css';

const KEY = 'career-dna-analysis';
const fmt = (n) => `${(n / 1024).toFixed(0)} KB`;

function Layout({ children }) { return <div className="career-page"><Navbar />{children}<Footer /></div>; }

export function ResumeUploadPage() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const acceptFile = (picked) => {
    setError('');
    if (!picked) return;
    if (!/\.(pdf|docx)$/i.test(picked.name)) return setError('Choose a PDF or DOCX resume.');
    if (picked.size > 10 * 1024 * 1024) return setError('File size must be 10 MB or less.');
    setFile(picked);
  };
  const analyze = async () => {
    if (!file) return;
    setBusy(true);
    // Keep the original resume in memory only; the browser analysis is intentionally heuristic.
    let sourceText = '';
    // PDF/DOCX are accepted for the upload experience, but no document parser is
    // configured in this frontend-only repository. Never treat raw binary bytes as evidence.
    const id = crypto.randomUUID?.() || `cd-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const clean = sourceText.replace(/\s+/g, ' ').trim();
    const terms = ['Python','JavaScript','React','Machine Learning','SQL','Pandas','NumPy','AWS','Java','C++','Node.js','HTML','CSS','TensorFlow','Docker'];
    const skills = terms.filter((term) => new RegExp(term.replace(/[+]/g, '\\+'), 'i').test(clean));
    const analysis = { id, filename: file.name, size: file.size, chars: clean.length, skills, text: clean.slice(0, 14000), createdAt: Date.now(), isLimited: !clean };
    sessionStorage.setItem(KEY, JSON.stringify(analysis));
    setBusy(false);
    navigate(`/resume-analysis/${id}`);
  };
  return <Layout><main className="career-shell upload-shell">
    <div className="eyebrow"><Sparkles size={15}/> CAREER INTELLIGENCE</div>
    <h1>Discover Your <span>Career DNA</span></h1>
    <p className="lead">Upload your resume and discover your career identity, job compatibility, ATS readiness, and resume originality. No login required.</p>
    <div className="upload-card" onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>{e.preventDefault(); acceptFile(e.dataTransfer.files?.[0]);}}>
      {!file ? <><div className="upload-icon"><UploadCloud size={27}/></div><h2>Drag &amp; Drop Resume</h2><p>PDF or DOCX · Maximum 10 MB</p><label className="career-button secondary">Browse Files<input hidden type="file" accept=".pdf,.docx" onChange={(e)=>acceptFile(e.target.files?.[0])}/></label></> : <div className="file-row"><FileText size={28}/><div><b>{file.name}</b><small>{fmt(file.size)}</small></div><button aria-label="Remove file" className="icon-button" onClick={()=>setFile(null)}><X/></button></div>}
      {error && <p className="error-text">{error}</p>}
      <button className="career-button primary analyze-button" disabled={!file || busy} onClick={analyze}>{busy?'Analyzing…':'Analyze Resume'} <ArrowRight size={17}/></button>
    </div>
    <p className="privacy-note"><ShieldCheck size={17}/> Your resume is analyzed securely. We never use your resume to create fictional experience or qualifications.</p>
    <div className="trust-row"><span>Private session</span><span>Delete anytime</span><span>No account needed</span></div>
  </main></Layout>;
}

const scoreCards = [
  ['Resume Originality / Similarity Risk', '—', 'Not assessed: readable resume text is unavailable. This signal cannot prove authorship.'],
  ['ATS Readability', '—', 'Not assessed: a PDF/DOCX parser is not configured. ATS behavior varies between systems.'],
  ['Career Fit', '—', 'Not assessed until resume text is readable.'],
  ['Skill Strength', '—', 'No proficiency estimate is made without evidence.'],
  ['Experience Relevance', '—', 'Not assessed: no work history has been extracted.'],
  ['Content Quality', '—', 'Not assessed: no resume structure has been extracted.'],
];
export function ResumeAnalysisResult() {
  const { analysisId } = useParams();
  const navigate = useNavigate();
  const data = useMemo(() => { try { const d=JSON.parse(sessionStorage.getItem(KEY)); return d?.id===analysisId?d:null; } catch { return null; } }, [analysisId]);
  if (!data) return <Layout><main className="career-shell"><h1>Analysis session unavailable</h1><p>Start a new analysis to create a private session.</p><Link className="career-button primary" to="/analyze-resume">Analyze a resume</Link></main></Layout>;
  const deleteAnalysis=()=>{ sessionStorage.removeItem(KEY); navigate('/analyze-resume'); };
  const download=()=>{ const report=`Career DNA — ${data.filename}\n\nSkills detected: ${data.skills.join(', ')||'No skills reliably extracted'}\n\nThis is a preliminary browser-side analysis. PDF/DOCX text extraction requires a configured document parser.`; const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([report],{type:'text/plain'}));a.download='career-dna-report.txt';a.click();URL.revokeObjectURL(a.href); };
  const matches=MOCK_JOBS.slice(0,4).map(job=>({...job,score:Math.round((job.skillsRequired.filter(s=>data.skills.some(x=>x.toLowerCase()===s.toLowerCase())).length/Math.max(1,job.skillsRequired.length))*100)})).sort((a,b)=>b.score-a.score);
  return <Layout><main className="career-shell result-shell"><div className="result-top"><div><div className="eyebrow"><Sparkles size={15}/> YOUR PROFILE</div><h1>Your Career <span>DNA</span></h1><p className="lead">Resume overview for <b>{data.filename}</b></p></div><div className="result-actions"><button className="career-button secondary" onClick={download}><Download size={16}/> Download Report</button><button className="career-button ghost" onClick={deleteAnalysis}><Trash2 size={16}/> Delete analysis</button></div></div>
    <section className="identity-card"><div className="dna-orbit"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><span>DNA</span></div><div><small>PRIMARY DOMAIN</small><h2>{data.skills.some(s=>/machine learning|pandas|numpy/i.test(s))?'AI & Data Science':'Software & Digital Technology'}</h2><p><b>Technical Identity</b><br/>{data.skills.length?data.skills.join(' · '):'No skills could be reliably extracted from this file.'}</p><div className="identity-tags"><span>Experience level · Not determined</span><span>Career direction · Explore roles</span></div></div></section>
    {data.isLimited && <div className="notice"><b>Document parser not configured</b><br/>PDF and DOCX files are accepted, but this frontend currently has no document text extraction service. No resume content or skills are inferred. Scores stay unavailable until a parser is connected. Your file was not uploaded to a server.</div>}
    <h2 className="section-title">Resume signals</h2><div className="score-grid">{scoreCards.map(([title,score,desc])=><article className="score-card" key={title}><div className="score-ring" style={{'--score':score==='—'?'0%':`${score}%`}}><b>{score}{score!=='—'&&<small>%</small>}</b></div><h3>{title}</h3><p>{desc}</p></article>)}</div>
    <div className="analysis-grid"><section className="data-card"><h2>ATS Readiness</h2><p>Readable section detection is limited in this browser-only demo.</p><h3>What may be difficult to parse</h3><ul><li>Multi-column layouts, tables, text boxes, or images</li><li>Unusual section headings or missing dates</li><li>DOCX/PDF text extraction needs a document parser</li></ul></section><section className="data-card"><h2>Skills DNA</h2>{data.skills.length?<div className="skill-cloud">{data.skills.map(s=><span key={s}>{s}<small>Detected · resume text</small></span>)}</div>:<p>No skills detected in readable text. This does not mean your resume lacks skills.</p>}<p className="muted">No proficiency estimates are made.</p></section><section className="data-card wide"><h2>Jobs You Could Match</h2><p>Compatibility uses exact skill overlap against sample job requirements; listings are demo opportunities.</p><div className="match-list">{matches.map(job=><Link key={job.id} to={`/jobs/${job.id}`} className="match-line"><span><Briefcase size={18}/><b>{job.title}</b><small>{job.company} · Demo Opportunity</small></span><strong>{job.score}% <small>skill overlap</small></strong></Link>)}</div><Link className="text-link" to="/jobs">Explore all opportunities →</Link></section></div>
    <div className="result-footer"><p>Temporary session stored in this browser only. Clearing this session deletes the report and resume reference.</p><button className="career-button ghost" onClick={deleteAnalysis}>Clear session</button></div>
  </main></Layout>;
}
export default { Upload: ResumeUploadPage, Result: ResumeAnalysisResult };

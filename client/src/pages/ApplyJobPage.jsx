import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { MOCK_JOBS } from '../api/jobApi';
import { useAuthContext } from '../context/AuthContext';
import './career.css';

export default function ApplyJobPage() {
  const { jobId } = useParams(); const { user } = useAuthContext(); const job = MOCK_JOBS.find((item) => item.id === jobId);
  const [submitted, setSubmitted] = useState(false); const [resume, setResume] = useState('Choose a resume');
  const analysis = (() => { try { return JSON.parse(sessionStorage.getItem('career-dna-analysis')); } catch { return null; } })();
  if (!job) return <div className="career-page"><Navbar/><main className="career-shell"><h1>Opportunity not found</h1><Link to="/jobs">Browse opportunities</Link></main><Footer/></div>;
  if (submitted) return <div className="career-page"><Navbar/><main className="career-shell"><section className="data-card"><div className="eyebrow">APPLICATION RECEIVED</div><h1>Application Submitted 🎉</h1><p>Your application for {job.title} has been saved in this demo experience.</p><p><b>Application ID:</b> CD-2026-{Date.now().toString().slice(-4)}</p><p>{job.company} · Applied today · Status: Applied</p><Link className="career-button primary" to="/jobs">Browse More Jobs</Link></section></main><Footer/></div>;
  const fields = [['Full Name',user?.name||''],['Email',user?.email||''],['Phone',''],['Location',''],['Education',''],['Experience',''],['Skills',analysis?.skills?.join(', ')||''],['Portfolio URL',''],['GitHub URL',''],['LinkedIn URL','']];
  return <div className="career-page"><Navbar/><main className="career-shell"><div className="eyebrow">APPLICATION FORM</div><h1>Apply for <span>{job.title}</span></h1><p className="lead" style={{margin:'0 0 22px'}}>{job.company} · Demo Opportunity</p><form className="data-card" onSubmit={e=>{e.preventDefault();setSubmitted(true);}}><div className="form-grid">{fields.map(([label,value])=><label key={label}>{label}<input required={['Full Name','Email'].includes(label)} defaultValue={value} placeholder={label}/></label>)}</div><label className="resume-choice">Select Resume<select value={resume} onChange={e=>setResume(e.target.value)}><option>Choose a resume</option>{analysis?.filename&&<option>{analysis.filename}</option>}<option>Upload New Resume</option></select></label>{resume==='Upload New Resume'&&<input type="file" accept=".pdf,.docx" onChange={e=>setResume(e.target.files?.[0]?.name||'Upload New Resume')}/>}<label className="resume-choice">Cover Letter<textarea rows="5" placeholder="Tell the team why this opportunity interests you"/></label><button className="career-button primary" type="submit">Submit Application</button></form></main><Footer/></div>;
}

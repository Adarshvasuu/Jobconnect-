import React from 'react';
import { Link } from 'react-router-dom';

export default class HomeRouteBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Home page render failed:', error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: '#f1f5f9', color: '#0f172a', fontFamily: 'system-ui, sans-serif' }}>
        <section style={{ width: 'min(680px, 100%)', padding: 32, borderRadius: 20, background: '#fff', boxShadow: '0 20px 60px rgba(15,23,42,.12)' }}>
          <p style={{ color: '#2563eb', fontWeight: 800, letterSpacing: '.12em', fontSize: 12 }}>CAREER DNA</p>
          <h1 style={{ fontSize: 32, margin: '8px 0' }}>Home is having trouble loading</h1>
          <p style={{ color: '#475569', lineHeight: 1.6 }}>A dashboard panel failed to render. You can still continue to jobs, resume analysis, or reload this page.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 22 }}>
            <Link to="/jobs" style={buttonStyle}>Browse jobs</Link>
            <Link to="/analyze-resume" style={buttonStyle}>Analyze resume</Link>
            <button type="button" onClick={() => window.location.reload()} style={{ ...buttonStyle, cursor: 'pointer' }}>Reload home</button>
          </div>
          {import.meta.env.DEV && <pre style={{ whiteSpace: 'pre-wrap', color: '#b91c1c', marginTop: 20 }}>{this.state.error.message}</pre>}
        </section>
      </main>
    );
  }
}

const buttonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '11px 16px',
  border: '1px solid #dbe3ef',
  borderRadius: 10,
  background: '#f8fafc',
  color: '#1d4ed8',
  font: '600 14px system-ui, sans-serif',
  textDecoration: 'none',
};

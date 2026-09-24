import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '40px 24px',
        textAlign: 'center',
        background: 'var(--bg-primary)',
        position: 'relative',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(244,63,94,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(80px)',
        }}
      />

      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: 'rgba(244, 63, 94, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-rose)',
          marginBottom: '24px',
        }}
      >
        <AlertTriangle size={40} />
      </div>

      <h1
        style={{
          fontSize: '7rem',
          fontWeight: 900,
          margin: 0,
          lineHeight: 1,
          background: 'var(--gradient-brand)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.04em',
        }}
      >
        404
      </h1>

      <h2 style={{ fontSize: '1.8rem', marginTop: '12px', marginBottom: '10px' }}>
        Page Not Found
      </h2>

      <p
        style={{
          color: 'var(--text-secondary)',
          fontSize: '1rem',
          maxWidth: '420px',
          lineHeight: 1.6,
          marginBottom: '32px',
        }}
      >
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>

      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => window.history.back()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: 'var(--radius-md)',
            background: 'transparent',
            border: '1px solid var(--border-hover)',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={16} /> Go Back
        </button>

        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--accent-primary)',
            color: '#ffffff',
            fontSize: '0.9rem',
            fontWeight: 600,
            boxShadow: 'var(--shadow-glow)',
          }}
        >
          <Home size={16} /> Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

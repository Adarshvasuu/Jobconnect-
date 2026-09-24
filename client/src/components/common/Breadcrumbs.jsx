import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ customCrumbs }) => {
  const location = useLocation();

  const crumbs = customCrumbs || location.pathname
    .split('/')
    .filter(Boolean)
    .map((part, index, arr) => {
      const href = `/${arr.slice(0, index + 1).join('/')}`;
      const label = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
      return { href, label };
    });

  if (crumbs.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.825rem',
        color: 'var(--text-muted)',
        marginBottom: '20px',
      }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)' }}>
        <Home size={14} />
      </Link>
      {crumbs.map((crumb, idx) => (
        <React.Fragment key={crumb.href || idx}>
          <ChevronRight size={13} style={{ opacity: 0.6 }} />
          {idx === crumbs.length - 1 ? (
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{crumb.label}</span>
          ) : (
            <Link to={crumb.href} style={{ color: 'var(--text-secondary)' }}>
              {crumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;

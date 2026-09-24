import React from 'react';
import { FolderOpen } from 'lucide-react';
import Button from './Button';

export const EmptyState = ({
  icon: Icon = FolderOpen,
  title = 'No items found',
  description = 'There are no records matching your current filter criteria.',
  actionLabel,
  onAction,
}) => {
  return (
    <div
      className="glass-panel"
      style={{
        padding: '48px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        margin: '20px 0',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(99, 102, 241, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-primary)',
          marginBottom: '8px',
        }}
      >
        <Icon size={32} />
      </div>
      <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{title}</h3>
      <p style={{ maxWidth: '420px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <div style={{ marginTop: '12px' }}>
          <Button variant="secondary" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;

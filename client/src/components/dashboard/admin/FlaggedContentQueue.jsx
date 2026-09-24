import React from 'react';
import { AlertTriangle, ShieldAlert, Check, Ban } from 'lucide-react';
import Button from '../../common/Button';

export const FlaggedContentQueue = ({ flaggedItems = [], onResolve }) => {
  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <ShieldAlert size={20} color="var(--accent-rose)" />
        <h3 style={{ fontSize: '1.15rem', margin: 0 }}>Rule-Based Flagged Queue</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {flaggedItems.map((item) => (
          <div
            key={item.id}
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(244, 63, 94, 0.05)',
              border: '1px solid rgba(244, 63, 94, 0.25)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  {item.userName}
                </span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(244, 63, 94, 0.2)',
                    color: '#fda4af',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  {item.severity} severity
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                {item.details}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <Button size="sm" variant="secondary" icon={Check} onClick={() => onResolve && onResolve(item.id, 'dismiss')}>
                Dismiss
              </Button>
              <Button size="sm" variant="danger" icon={Ban} onClick={() => onResolve && onResolve(item.id, 'ban')}>
                Suspend
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlaggedContentQueue;

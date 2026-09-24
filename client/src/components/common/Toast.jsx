import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toasts, removeToast } = useNotifications();

  if (!toasts.length) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px',
      }}
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const Icon = isSuccess ? CheckCircle2 : isError ? AlertTriangle : Info;
        const color = isSuccess ? 'var(--accent-emerald)' : isError ? 'var(--accent-rose)' : 'var(--accent-primary)';

        return (
          <div
            key={toast.id}
            className="glass-panel"
            style={{
              padding: '12px 16px',
              backgroundColor: 'var(--bg-card-solid)',
              borderLeft: `4px solid ${color}`,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: 'var(--shadow-lg)',
              animation: 'fadeIn 0.25s ease-out',
            }}
          >
            <div style={{ color }}>
              <Icon size={18} />
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-primary)', flex: 1 }}>
              {toast.message}
            </p>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '2px',
              }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;

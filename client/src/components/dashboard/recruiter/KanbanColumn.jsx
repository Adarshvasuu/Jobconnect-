import React from 'react';
import CandidateCard from './CandidateCard';

export const KanbanColumn = ({
  statusKey,
  title,
  color = 'var(--accent-primary)',
  applications = [],
  onMoveStatus,
  onSelectCandidate,
}) => {
  return (
    <div
      style={{
        flex: '1 0 280px',
        maxWidth: '320px',
        backgroundColor: 'rgba(17, 24, 39, 0.6)',
        backdropFilter: 'blur(12px)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 240px)',
        minHeight: '520px',
      }}
    >
      {/* Column Header */}
      <div
        style={{
          padding: '16px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: color,
            }}
          />
          <h3 style={{ fontSize: '0.95rem', margin: 0, fontWeight: 700 }}>{title}</h3>
        </div>

        <span
          style={{
            fontSize: '0.75rem',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            fontWeight: 700,
            color: 'var(--text-secondary)',
          }}
        >
          {applications.length}
        </span>
      </div>

      {/* Cards Scroll Container */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {applications.length === 0 ? (
          <div
            style={{
              border: '2px dashed var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '24px 12px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
            }}
          >
            No candidates in {title}
          </div>
        ) : (
          applications.map((app) => (
            <CandidateCard
              key={app.id}
              application={app}
              onMoveStatus={onMoveStatus}
              onSelectCandidate={onSelectCandidate}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;

import React, { useState } from 'react';
import KanbanColumn from './KanbanColumn';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import MatchBadge from '../../jobs/MatchBadge';
import VerifiedBadge from '../../verification/VerifiedBadge';

const COLUMNS = [
  { key: 'applied', title: 'Applied', color: '#94a3b8' },
  { key: 'reviewing', title: 'Reviewing', color: '#60a5fa' },
  { key: 'shortlisted', title: 'Shortlisted', color: '#a78bfa' },
  { key: 'interview', title: 'Interview', color: '#f59e0b' },
  { key: 'offered', title: 'Selected / Offer', color: '#10b981' },
];

export const KanbanBoard = ({ applications = [], onUpdateStatus }) => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const getAppsForColumn = (statusKey) => {
    return applications.filter((app) => app.status === statusKey);
  };

  return (
    <div>
      {/* Swimlane Container */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          overflowX: 'auto',
          paddingBottom: '20px',
        }}
      >
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.key}
            statusKey={col.key}
            title={col.title}
            color={col.color}
            applications={getAppsForColumn(col.key)}
            onMoveStatus={onUpdateStatus}
            onSelectCandidate={(app) => setSelectedCandidate(app)}
          />
        ))}
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <Modal
          isOpen={Boolean(selectedCandidate)}
          onClose={() => setSelectedCandidate(null)}
          title="Candidate Profile Review"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img
                src={selectedCandidate.candidate?.avatar}
                alt={selectedCandidate.candidate?.name}
                style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{selectedCandidate.candidate?.name}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {selectedCandidate.candidate?.email} • {selectedCandidate.candidate?.experience}
                </span>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  {selectedCandidate.candidate?.matchScore && (
                    <MatchBadge score={selectedCandidate.candidate?.matchScore} />
                  )}
                  <VerifiedBadge score={92} status="verified" />
                </div>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Target Skills:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                {selectedCandidate.candidate?.skills?.map((s, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(99, 102, 241, 0.15)',
                      color: '#c7d2fe',
                      fontSize: '0.8rem',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <Button variant="secondary" onClick={() => setSelectedCandidate(null)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  onUpdateStatus(selectedCandidate.id, 'shortlisted');
                  setSelectedCandidate(null);
                }}
              >
                Shortlist Candidate
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default KanbanBoard;

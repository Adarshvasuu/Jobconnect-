import React from 'react';
import { timeAgo } from '../../utils/formatDate';

export const ConversationList = ({
  conversations = [],
  activeConversationId,
  onSelectConversation,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid var(--border-subtle)',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <div style={{ padding: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
        <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Conversations</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {conversations.map((conv) => {
          const isActive = conv.id === activeConversationId;
          return (
            <div
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              style={{
                display: 'flex',
                gap: '12px',
                padding: '14px 16px',
                cursor: 'pointer',
                backgroundColor: isActive ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
                borderBottom: '1px solid var(--border-subtle)',
                transition: 'background var(--transition-fast)',
              }}
            >
              <img
                src={conv.participant?.avatar}
                alt={conv.participant?.name}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                    {conv.participant?.name}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {timeAgo(conv.lastMessageAt)}
                  </span>
                </div>
                <div style={{ fontSize: '0.785rem', color: 'var(--accent-primary)', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {conv.jobTitle}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {conv.lastMessage}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConversationList;

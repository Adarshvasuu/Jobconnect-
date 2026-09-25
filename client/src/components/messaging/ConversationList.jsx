import React from 'react';
import { timeAgo } from '../../utils/formatDate';
import { MessagesSquare } from 'lucide-react';

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
        borderRight: '1.5px solid #E2E8F0',
        height: '100%',
        backgroundColor: '#FFFFFF',
        overflowY: 'auto',
      }}
    >
      <div style={{ padding: '18px 20px', borderBottom: '1.5px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <MessagesSquare size={18} color="#2563EB" />
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
          Conversations
        </h3>
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
                padding: '16px 18px',
                cursor: 'pointer',
                backgroundColor: isActive ? '#EFF6FF' : '#FFFFFF',
                borderLeft: isActive ? '3.5px solid #2563EB' : '3.5px solid transparent',
                borderBottom: '1px solid #F1F5F9',
                transition: 'background 0.15s ease',
              }}
            >
              <img
                src={conv.participant?.avatar}
                alt={conv.participant?.name}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1.5px solid #E2E8F0',
                  flexShrink: 0
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A' }}>
                    {conv.participant?.name}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                    {timeAgo(conv.lastMessageAt)}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2563EB', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {conv.jobTitle}
                </div>
                <div style={{ fontSize: '0.825rem', color: '#64748B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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

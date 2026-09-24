import React from 'react';
import { timeAgo } from '../../utils/formatDate';

export const MessageBubble = ({ message, isMe }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isMe ? 'flex-end' : 'flex-start',
        margin: '8px 0',
      }}
    >
      <div
        style={{
          maxWidth: '70%',
          padding: '10px 16px',
          borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
          backgroundColor: isMe ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
          color: '#ffffff',
          fontSize: '0.9rem',
          lineHeight: 1.5,
          border: isMe ? 'none' : '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {message.text}
      </div>
      <span
        style={{
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          marginTop: '3px',
          padding: '0 4px',
        }}
      >
        {timeAgo(message.createdAt)}
      </span>
    </div>
  );
};

export default MessageBubble;

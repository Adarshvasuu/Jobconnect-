import React from 'react';
import { timeAgo } from '../../utils/formatDate';

export const MessageBubble = ({ message, isMe }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isMe ? 'flex-end' : 'flex-start',
        margin: '10px 0',
      }}
    >
      <div
        style={{
          maxWidth: '75%',
          padding: '12px 18px',
          borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          backgroundColor: isMe ? '#2563EB' : '#FFFFFF',
          backgroundImage: isMe ? 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' : 'none',
          color: isMe ? '#FFFFFF' : '#0F172A',
          fontSize: '0.925rem',
          fontWeight: 500,
          lineHeight: 1.5,
          border: isMe ? '1px solid #1D4ED8' : '1.5px solid #CBD5E1',
          boxShadow: isMe ? '0 4px 12px rgba(37, 99, 235, 0.25)' : '0 2px 8px rgba(15, 23, 42, 0.06)',
          wordBreak: 'break-word',
        }}
      >
        {message.text}
      </div>
      <span
        style={{
          fontSize: '0.725rem',
          fontWeight: 500,
          color: '#64748B',
          marginTop: '4px',
          padding: '0 6px',
        }}
      >
        {timeAgo(message.createdAt)}
      </span>
    </div>
  );
};

export default MessageBubble;

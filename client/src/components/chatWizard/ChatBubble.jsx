import React from 'react';
import { Bot, User, Sparkles } from 'lucide-react';

export const ChatBubble = ({ sender = 'bot', message, timestamp }) => {
  const isBot = sender === 'bot';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        justifyContent: isBot ? 'flex-start' : 'flex-end',
        margin: '14px 0',
        animation: 'fadeIn 0.25s ease-out',
      }}
    >
      {isBot && (
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
          }}
        >
          <Bot size={20} />
        </div>
      )}

      <div
        style={{
          maxWidth: '78%',
          padding: '14px 18px',
          borderRadius: isBot ? '4px 20px 20px 20px' : '20px 4px 20px 20px',
          backgroundColor: isBot ? '#FFFFFF' : '#2563EB',
          backgroundImage: isBot ? 'none' : 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
          color: isBot ? '#0F172A' : '#FFFFFF',
          fontSize: '0.95rem',
          fontWeight: 500,
          lineHeight: 1.55,
          border: isBot ? '1.5px solid #CBD5E1' : '1px solid #1D4ED8',
          boxShadow: isBot
            ? '0 3px 10px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.04)'
            : '0 4px 14px rgba(37, 99, 235, 0.3)',
        }}
      >
        {isBot && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.725rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#2563EB',
              marginBottom: '6px',
            }}
          >
            <Sparkles size={13} />
            JobConnect AI
          </div>
        )}

        <div style={{ wordBreak: 'break-word' }}>{message}</div>

        {timestamp && (
          <div
            style={{
              fontSize: '0.72rem',
              fontWeight: 500,
              color: isBot ? '#64748B' : 'rgba(255, 255, 255, 0.85)',
              marginTop: '6px',
              textAlign: isBot ? 'left' : 'right',
            }}
          >
            {timestamp}
          </div>
        )}
      </div>

      {!isBot && (
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            background: '#334155',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            flexShrink: 0,
            boxShadow: '0 4px 10px rgba(15, 23, 42, 0.15)',
          }}
        >
          <User size={20} />
        </div>
      )}
    </div>
  );
};

export default ChatBubble;

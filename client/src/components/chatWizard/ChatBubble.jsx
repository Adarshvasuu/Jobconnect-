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
        margin: '12px 0',
        animation: 'fadeIn 0.25s ease-out',
      }}
    >
      {isBot && (
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--gradient-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            flexShrink: 0,
            boxShadow: 'var(--shadow-glow)',
          }}
        >
          <Bot size={18} />
        </div>
      )}

      <div
        style={{
          maxWidth: '75%',
          padding: '12px 18px',
          borderRadius: isBot ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
          backgroundColor: isBot ? 'var(--bg-tertiary)' : 'var(--accent-primary)',
          color: '#ffffff',
          fontSize: '0.925rem',
          lineHeight: 1.5,
          border: isBot ? '1px solid var(--border-subtle)' : 'none',
          boxShadow: isBot ? 'var(--shadow-sm)' : '0 4px 14px rgba(99, 102, 241, 0.3)',
        }}
      >
        <div>{message}</div>
        {timestamp && (
          <div
            style={{
              fontSize: '0.7rem',
              color: isBot ? 'var(--text-muted)' : 'rgba(255, 255, 255, 0.7)',
              marginTop: '4px',
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
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-hover)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            flexShrink: 0,
          }}
        >
          <User size={18} />
        </div>
      )}
    </div>
  );
};

export default ChatBubble;

import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';

export const MessageThread = ({
  conversation,
  messages = [],
  currentUserId = 'mock-user-1',
  onSendMessage,
  isTyping = false,
}) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!conversation) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: '#64748B',
          fontSize: '0.95rem',
          backgroundColor: '#F8FAFC',
        }}
      >
        Select a conversation from the left to start messaging.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#FFFFFF' }}>
      {/* Header */}
      <div
        style={{
          padding: '16px 24px',
          borderBottom: '1.5px solid #E2E8F0',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
        }}
      >
        <img
          src={conversation.participant?.avatar}
          alt={conversation.participant?.name}
          style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #E2E8F0' }}
        />
        <div>
          <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0F172A' }}>
            {conversation.participant?.name}
          </h4>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2563EB' }}>
            Re: {conversation.jobTitle}
          </span>
        </div>
      </div>

      {/* Messages Scroll Area with soft slate canvas */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          backgroundColor: '#F1F5F9',
          boxShadow: 'inset 0 2px 4px rgba(15, 23, 42, 0.03)',
        }}
      >
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id || msg._id}
            message={msg}
            isMe={msg.senderId === currentUserId}
          />
        ))}

        {isTyping && <TypingIndicator name={conversation.participant?.name} />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <MessageInput onSend={onSendMessage} />
    </div>
  );
};

export default MessageThread;

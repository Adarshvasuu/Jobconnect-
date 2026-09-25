import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';

export const MessageInput = ({ onSend, disabled = false }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 20px',
        borderTop: '1.5px solid #E2E8F0',
        backgroundColor: '#FFFFFF',
      }}
    >
      <button
        type="button"
        style={{
          background: '#F1F5F9',
          border: '1px solid #CBD5E1',
          borderRadius: '10px',
          color: '#64748B',
          cursor: 'pointer',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title="Attach file"
      >
        <Paperclip size={18} />
      </button>

      <input
        type="text"
        placeholder="Write a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        style={{
          flex: 1,
          backgroundColor: '#F8FAFC',
          border: '1.5px solid #CBD5E1',
          borderRadius: '12px',
          padding: '11px 16px',
          color: '#0F172A',
          fontSize: '0.925rem',
          fontWeight: 500,
          outline: 'none',
        }}
      />

      <button
        type="submit"
        disabled={!text.trim() || disabled}
        style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: text.trim() ? 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' : '#E2E8F0',
          color: text.trim() ? '#FFFFFF' : '#94A3B8',
          border: 'none',
          cursor: text.trim() ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: text.trim() ? '0 4px 12px rgba(37, 99, 235, 0.25)' : 'none',
          transition: 'all 0.15s ease',
        }}
      >
        <Send size={18} />
      </button>
    </form>
  );
};

export default MessageInput;

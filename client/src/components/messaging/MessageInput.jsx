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
        gap: '10px',
        padding: '12px 16px',
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-card-solid)',
      }}
    >
      <button
        type="button"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
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
          backgroundColor: 'var(--bg-tertiary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 14px',
          color: 'var(--text-primary)',
          fontSize: '0.9rem',
          outline: 'none',
        }}
      />

      <button
        type="submit"
        disabled={!text.trim() || disabled}
        style={{
          width: '38px',
          height: '38px',
          borderRadius: 'var(--radius-md)',
          background: text.trim() ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.05)',
          color: text.trim() ? '#ffffff' : 'var(--text-muted)',
          border: 'none',
          cursor: text.trim() ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Send size={16} />
      </button>
    </form>
  );
};

export default MessageInput;

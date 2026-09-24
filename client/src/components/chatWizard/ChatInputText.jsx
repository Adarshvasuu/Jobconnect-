import React, { useState } from 'react';
import { Send } from 'lucide-react';

export const ChatInputText = ({ onSubmit, placeholder = 'Type your answer...', type = 'text', disabled = false }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSubmit(value.trim());
    setValue('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        width: '100%',
        backgroundColor: 'var(--bg-tertiary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '6px 8px 6px 16px',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          color: 'var(--text-primary)',
          fontSize: '0.95rem',
          outline: 'none',
          fontFamily: 'var(--font-main)',
        }}
      />
      <button
        type="submit"
        disabled={!value.trim() || disabled}
        style={{
          width: '38px',
          height: '38px',
          borderRadius: 'var(--radius-md)',
          background: value.trim() ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.05)',
          color: value.trim() ? '#ffffff' : 'var(--text-muted)',
          border: 'none',
          cursor: value.trim() ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all var(--transition-fast)',
        }}
      >
        <Send size={16} />
      </button>
    </form>
  );
};

export default ChatInputText;

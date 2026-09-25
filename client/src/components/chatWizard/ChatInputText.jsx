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
        backgroundColor: '#FFFFFF',
        border: '1.5px solid #CBD5E1',
        borderRadius: '16px',
        padding: '8px 10px 8px 18px',
        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.06)',
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
          color: '#0F172A',
          fontSize: '0.975rem',
          fontWeight: 500,
          outline: 'none',
          fontFamily: 'var(--font-main)',
        }}
      />
      <button
        type="submit"
        disabled={!value.trim() || disabled}
        style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: value.trim() ? 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' : '#E2E8F0',
          color: value.trim() ? '#FFFFFF' : '#94A3B8',
          border: 'none',
          cursor: value.trim() ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: value.trim() ? '0 4px 12px rgba(37, 99, 235, 0.25)' : 'none',
          transition: 'all 0.15s ease',
        }}
      >
        <Send size={18} />
      </button>
    </form>
  );
};

export default ChatInputText;

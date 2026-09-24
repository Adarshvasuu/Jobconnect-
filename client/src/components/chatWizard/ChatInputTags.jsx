import React, { useState } from 'react';
import { Plus, X, Check } from 'lucide-react';
import Button from '../common/Button';

export const ChatInputTags = ({ onSubmit, defaultTags = [], placeholder = 'Add a skill...' }) => {
  const [tags, setTags] = useState(defaultTags);
  const [currentInput, setCurrentInput] = useState('');

  const handleAddTag = () => {
    const trimmed = currentInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setCurrentInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleConfirm = () => {
    if (tags.length > 0) {
      onSubmit(tags.join(', '));
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-tertiary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
      }}
    >
      {/* Tag Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', minHeight: '32px' }}>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              backgroundColor: 'rgba(99, 102, 241, 0.2)',
              color: '#c7d2fe',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 600,
              border: '1px solid rgba(99, 102, 241, 0.4)',
            }}
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#c7d2fe',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: 0,
              }}
            >
              <X size={13} />
            </button>
          </span>
        ))}
      </div>

      {/* Input box to add more tags */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          style={{
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '8px 12px',
            color: 'var(--text-primary)',
            fontSize: '0.9rem',
            outline: 'none',
          }}
        />
        <button
          type="button"
          onClick={handleAddTag}
          style={{
            padding: '8px 14px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Plus size={16} /> Add
        </button>
      </div>

      {/* Confirm & Submit */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
        <Button size="sm" onClick={handleConfirm} disabled={tags.length === 0} icon={Check}>
          Confirm Skills ({tags.length})
        </Button>
      </div>
    </div>
  );
};

export default ChatInputTags;

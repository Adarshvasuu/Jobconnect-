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
        backgroundColor: '#FFFFFF',
        border: '1.5px solid #CBD5E1',
        borderRadius: '16px',
        padding: '18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        width: '100%',
        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.05)',
      }}
    >
      <div style={{ fontSize: '0.825rem', fontWeight: 600, color: '#475569' }}>
        Select or add your top technical skills:
      </div>

      {/* Tag Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', minHeight: '32px' }}>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              backgroundColor: '#EEF2FF',
              color: '#3730A3',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              border: '1.5px solid #C7D2FE',
              boxShadow: '0 1px 3px rgba(55, 48, 163, 0.08)',
            }}
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              style={{
                background: 'rgba(55, 48, 163, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                color: '#3730A3',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
              }}
            >
              <X size={12} />
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
            backgroundColor: '#F8FAFC',
            border: '1.5px solid #CBD5E1',
            borderRadius: '10px',
            padding: '10px 14px',
            color: '#0F172A',
            fontSize: '0.925rem',
            outline: 'none',
          }}
        />
        <button
          type="button"
          onClick={handleAddTag}
          style={{
            padding: '10px 18px',
            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
            border: 'none',
            borderRadius: '10px',
            color: '#ffffff',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)',
          }}
        >
          <Plus size={16} /> Add
        </button>
      </div>

      {/* Confirm & Submit */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
        <Button size="sm" onClick={handleConfirm} disabled={tags.length === 0} icon={Check}>
          Confirm Skills ({tags.length})
        </Button>
      </div>
    </div>
  );
};

export default ChatInputTags;

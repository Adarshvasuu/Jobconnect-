import React from 'react';

export const InputField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  helperText,
  icon: Icon,
  required = false,
  disabled = false,
  ...props
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
      {label && (
        <label
          htmlFor={name}
          style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          {label} {required && <span style={{ color: 'var(--accent-rose)' }}>*</span>}
        </label>
      )}

      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {Icon && (
          <div
            style={{
              position: 'absolute',
              left: '14px',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <Icon size={18} />
          </div>
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            width: '100%',
            padding: Icon ? '10px 14px 10px 42px' : '10px 14px',
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            border: `1px solid ${error ? 'var(--accent-rose)' : 'var(--border-subtle)'}`,
            borderRadius: 'var(--radius-md)',
            fontSize: '0.925rem',
            fontFamily: 'var(--font-main)',
            outline: 'none',
            transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
          }}
          {...props}
        />
      </div>

      {error ? (
        <span style={{ fontSize: '0.785rem', color: 'var(--accent-rose)', fontWeight: 500 }}>
          {error}
        </span>
      ) : helperText ? (
        <span style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>{helperText}</span>
      ) : null}
    </div>
  );
};

export default InputField;

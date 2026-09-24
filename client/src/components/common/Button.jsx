import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  loading = false,
  disabled = false,
  icon: Icon,
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: 600,
    borderRadius: 'var(--radius-md)',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all var(--transition-fast)',
    border: '1px solid transparent',
    outline: 'none',
    fontFamily: 'var(--font-main)',
    opacity: disabled || loading ? 0.6 : 1,
    textDecoration: 'none',
  };

  const sizeStyles = {
    sm: { padding: '6px 12px', fontSize: '0.825rem' },
    md: { padding: '9px 18px', fontSize: '0.925rem' },
    lg: { padding: '12px 24px', fontSize: '1.05rem' },
  }[size];

  const variantStyles = {
    primary: {
      background: 'var(--accent-primary)',
      color: '#ffffff',
      boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
    },
    secondary: {
      background: 'var(--bg-tertiary)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-subtle)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--accent-primary)',
      border: '1px solid var(--accent-primary)',
    },
    danger: {
      background: 'var(--accent-rose)',
      color: '#ffffff',
      boxShadow: '0 4px 14px rgba(244, 63, 94, 0.3)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
    },
  }[variant];

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      style={{ ...baseStyles, ...sizeStyles, ...variantStyles }}
      className={`btn-custom ${className}`}
      {...props}
    >
      {loading ? (
        <span style={{
          width: '16px',
          height: '16px',
          border: '2px solid rgba(255,255,255,0.3)',
          borderTopColor: '#ffffff',
          borderRadius: '50%',
          display: 'inline-block',
          animation: 'spin 0.7s linear infinite'
        }} />
      ) : (
        <>
          {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 17} />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;

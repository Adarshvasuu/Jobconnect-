import React from 'react';
import { UserCheck, UserX, Shield } from 'lucide-react';
import Button from '../../common/Button';

export const UserTable = ({ users = [], onToggleStatus }) => {
  return (
    <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.15rem', margin: 0 }}>Registered Users & Accounts</h3>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total: {users.length}</span>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
            <th style={{ padding: '12px 10px' }}>User</th>
            <th style={{ padding: '12px 10px' }}>Role</th>
            <th style={{ padding: '12px 10px' }}>Status</th>
            <th style={{ padding: '12px 10px' }}>Registered</th>
            <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <td style={{ padding: '12px 10px' }}>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</div>
              </td>
              <td style={{ padding: '12px 10px' }}>
                <span
                  style={{
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    backgroundColor:
                      user.role === 'admin'
                        ? 'rgba(244, 63, 94, 0.15)'
                        : user.role === 'recruiter'
                        ? 'rgba(139, 92, 246, 0.15)'
                        : 'rgba(99, 102, 241, 0.15)',
                    color:
                      user.role === 'admin'
                        ? '#fda4af'
                        : user.role === 'recruiter'
                        ? '#c4b5fd'
                        : '#a5b4fc',
                  }}
                >
                  {user.role}
                </span>
              </td>
              <td style={{ padding: '12px 10px' }}>
                <span style={{ color: user.isActive ? 'var(--accent-emerald)' : 'var(--accent-rose)', fontWeight: 600 }}>
                  {user.isActive ? 'Active' : 'Suspended'}
                </span>
              </td>
              <td style={{ padding: '12px 10px', color: 'var(--text-muted)' }}>{user.createdAt}</td>
              <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                <Button
                  size="sm"
                  variant={user.isActive ? 'danger' : 'secondary'}
                  onClick={() => onToggleStatus && onToggleStatus(user.id, !user.isActive)}
                >
                  {user.isActive ? 'Deactivate' : 'Activate'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

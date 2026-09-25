import React, { useState } from 'react';
import { UserCheck, UserX, Shield, Download, Trash2, Users } from 'lucide-react';
import Button from '../../common/Button';

export const UserTable = ({ users = [], onToggleStatus, onDeleteUser, onExportCSV }) => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = users.filter((u) => {
    const nameMatch = (u.name || `${u.firstName || ''} ${u.lastName || ''}`).toLowerCase().includes(search.toLowerCase());
    const emailMatch = (u.email || '').toLowerCase().includes(search.toLowerCase());
    const roleMatch = roleFilter === 'all' || u.role === roleFilter;
    return (nameMatch || emailMatch) && roleMatch;
  });

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: '1.5px solid #E2E8F0',
        padding: '28px',
        boxShadow: '0 20px 45px -12px rgba(15, 23, 42, 0.08), 0 4px 16px rgba(15, 23, 42, 0.03)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}
          >
            <Users size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Registered Users & Accounts
            </h3>
            <span style={{ fontSize: '0.825rem', color: '#64748B' }}>
              Total: {users.length} registered accounts
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              border: '1.5px solid #CBD5E1',
              backgroundColor: '#F8FAFC',
              fontSize: '0.85rem',
              color: '#0F172A',
              outline: 'none',
              width: '180px'
            }}
          />

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '10px',
              border: '1.5px solid #CBD5E1',
              backgroundColor: '#F8FAFC',
              fontSize: '0.85rem',
              color: '#0F172A',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Roles</option>
            <option value="seeker">Seeker (Applicant)</option>
            <option value="recruiter">Recruiter</option>
            <option value="admin">Administrator</option>
          </select>

          <Button
            size="sm"
            variant="secondary"
            icon={Download}
            onClick={() => onExportCSV && onExportCSV(filteredUsers)}
          >
            Download CSV
          </Button>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E2E8F0', color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <th style={{ padding: '12px 10px' }}>User Details</th>
              <th style={{ padding: '12px 10px' }}>Role</th>
              <th style={{ padding: '12px 10px' }}>Status</th>
              <th style={{ padding: '12px 10px' }}>Registered</th>
              <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '36px', textAlign: 'center', color: '#64748B' }}>
                  No users found matching your search.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => {
                const userId = user._id || user.id;
                const displayName = user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'JobConnect User';
                const formattedDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Active';

                return (
                  <tr key={userId} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '14px 10px' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>{displayName}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{user.email}</div>
                    </td>
                    <td style={{ padding: '14px 10px' }}>
                      <span
                        style={{
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          textTransform: 'capitalize',
                          backgroundColor:
                            user.role === 'admin'
                              ? '#FFF1F2'
                              : user.role === 'recruiter'
                              ? '#F5F3FF'
                              : '#EFF6FF',
                          color:
                            user.role === 'admin'
                              ? '#E11D48'
                              : user.role === 'recruiter'
                              ? '#7C3AED'
                              : '#2563EB',
                          border: `1px solid ${
                            user.role === 'admin'
                              ? '#FECDD3'
                              : user.role === 'recruiter'
                              ? '#DDD6FE'
                              : '#BFDBFE'
                          }`,
                        }}
                      >
                        {user.role === 'admin' ? 'Administrator' : user.role === 'recruiter' ? 'Recruiter' : 'Applicant'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 10px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontWeight: 700,
                          fontSize: '0.825rem',
                          color: user.isActive !== false ? '#059669' : '#E11D48',
                        }}
                      >
                        {user.isActive !== false ? '● Active' : '○ Suspended'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 10px', color: '#64748B', fontSize: '0.825rem' }}>
                      {formattedDate}
                    </td>
                    <td style={{ padding: '14px 10px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <Button
                          size="sm"
                          variant={user.isActive !== false ? 'secondary' : 'primary'}
                          onClick={() => onToggleStatus && onToggleStatus(userId, user.isActive === false)}
                        >
                          {user.isActive !== false ? 'Suspend' : 'Activate'}
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          icon={Trash2}
                          onClick={() => {
                            if (window.confirm(`Delete user "${displayName}" (${user.email})?`)) {
                              onDeleteUser && onDeleteUser(userId);
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;

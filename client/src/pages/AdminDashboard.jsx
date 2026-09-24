import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import PlatformHealthWidgets from '../components/dashboard/admin/PlatformHealthWidgets';
import AnalyticsCharts from '../components/dashboard/admin/AnalyticsCharts';
import UserTable from '../components/dashboard/admin/UserTable';
import JobModerationTable from '../components/dashboard/admin/JobModerationTable';
import CategoryManager from '../components/dashboard/admin/CategoryManager';
import FlaggedContentQueue from '../components/dashboard/admin/FlaggedContentQueue';
import { adminApi, MOCK_ADMIN_USERS, MOCK_ANALYTICS, MOCK_FLAGGED } from '../api/adminApi';
import { useNotifications } from '../context/NotificationContext';

export const AdminDashboard = () => {
  const { addToast } = useNotifications();
  const [users, setUsers] = useState(MOCK_ADMIN_USERS);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [flagged, setFlagged] = useState(MOCK_FLAGGED);
  const [analytics] = useState(MOCK_ANALYTICS);

  useEffect(() => {
    adminApi.getUsers().then((d) => setUsers(d.users || MOCK_ADMIN_USERS));
    adminApi.getPendingJobs().then((d) => setPendingJobs(d.jobs || []));
    adminApi.getCategories().then((d) => setCategories(d.categories || []));
    adminApi.getFlaggedContent().then((d) => setFlagged(d.flagged || MOCK_FLAGGED));
  }, []);

  const handleToggleUser = async (userId, isActive) => {
    await adminApi.toggleUserStatus(userId, isActive);
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, isActive } : u)));
    addToast(`User ${isActive ? 'activated' : 'suspended'}`, 'success');
  };

  const handleModerateJob = async (jobId, status) => {
    await adminApi.moderateJob(jobId, status);
    setPendingJobs((prev) => prev.filter((j) => j.id !== jobId));
    addToast(`Job ${status}`, 'success');
  };

  const handleAddCategory = async (category) => {
    const { category: newCat } = await adminApi.createCategory(category);
    setCategories((prev) => [...prev, newCat]);
    addToast('Category created', 'success');
  };

  const handleDeleteCategory = async (id) => {
    await adminApi.deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
    addToast('Category deleted', 'info');
  };

  const handleResolveFlag = (id, action) => {
    setFlagged((prev) => prev.filter((f) => f.id !== id));
    addToast(`Flag ${action === 'ban' ? 'acted on and user suspended' : 'dismissed'}`, action === 'ban' ? 'error' : 'success');
  };

  return (
    <AdminLayout>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '6px' }}>
          Admin <span className="text-gradient">Control Hub</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Platform management, MongoDB aggregation analytics, and moderation tools.
        </p>
      </div>

      <PlatformHealthWidgets />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <AnalyticsCharts analytics={analytics} />
        <FlaggedContentQueue flaggedItems={flagged} onResolve={handleResolveFlag} />
        <JobModerationTable pendingJobs={pendingJobs} onModerate={handleModerateJob} />
        <UserTable users={users} onToggleStatus={handleToggleUser} />
        <CategoryManager
          categories={categories}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

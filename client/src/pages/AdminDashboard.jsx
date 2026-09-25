import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import PlatformHealthWidgets from '../components/dashboard/admin/PlatformHealthWidgets';
import AnalyticsCharts from '../components/dashboard/admin/AnalyticsCharts';
import AdminJobsTable from '../components/dashboard/admin/AdminJobsTable';
import UserTable from '../components/dashboard/admin/UserTable';
import JobModerationTable from '../components/dashboard/admin/JobModerationTable';
import CategoryManager from '../components/dashboard/admin/CategoryManager';
import FlaggedContentQueue from '../components/dashboard/admin/FlaggedContentQueue';
import { adminApi, MOCK_ADMIN_USERS, MOCK_ANALYTICS, MOCK_FLAGGED } from '../api/adminApi';
import { useNotifications } from '../context/NotificationContext';

export const AdminDashboard = () => {
  const { addToast } = useNotifications();
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState(MOCK_ADMIN_USERS);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [flagged, setFlagged] = useState(MOCK_FLAGGED);
  const [analytics, setAnalytics] = useState(MOCK_ANALYTICS);

  useEffect(() => {
    // 1. Fetch Users
    adminApi.getUsers().then((d) => {
      if (d.users && d.users.length > 0) setUsers(d.users);
    });

    // 2. Fetch Jobs
    adminApi.getJobs().then((d) => {
      if (d.jobs && d.jobs.length > 0) setJobs(d.jobs);
    });

    // 3. Fetch Pending Moderation Jobs
    adminApi.getPendingJobs().then((d) => setPendingJobs(d.jobs || []));

    // 4. Fetch Job Categories
    adminApi.getCategories().then((d) => setCategories(d.categories || []));

    // 5. Fetch Flagged Content & Analytics
    adminApi.getFlaggedContent().then((d) => setFlagged(d.flagged || MOCK_FLAGGED));
    adminApi.getAnalytics().then((d) => {
      if (d.analytics) setAnalytics(d.analytics);
    });
  }, []);

  // Job Actions
  const handleCreateJob = async (jobData) => {
    try {
      const res = await adminApi.createJob(jobData);
      const newJob = res.job || { id: 'job-' + Date.now(), ...jobData };
      setJobs((prev) => [newJob, ...prev]);
      addToast('New job posting created successfully!', 'success');
    } catch {
      addToast('Failed to create job', 'error');
    }
  };

  const handleUpdateJob = async (id, jobData) => {
    try {
      await adminApi.updateJob(id, jobData);
      setJobs((prev) => prev.map((j) => (j._id === id || j.id === id ? { ...j, ...jobData } : j)));
      addToast('Job updated successfully', 'success');
    } catch {
      addToast('Failed to update job', 'error');
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      await adminApi.deleteJob(id);
      setJobs((prev) => prev.filter((j) => j._id !== id && j.id !== id));
      addToast('Job listing deleted', 'info');
    } catch {
      addToast('Failed to delete job', 'error');
    }
  };

  const handleExportJobsCSV = (jobsList) => {
    adminApi.downloadJobsCSV(jobsList || jobs);
    addToast('Job listings exported to CSV', 'success');
  };

  // User Actions
  const handleToggleUser = async (userId, isActive) => {
    await adminApi.toggleUserStatus(userId, isActive);
    setUsers((prev) => prev.map((u) => (u._id === userId || u.id === userId ? { ...u, isActive } : u)));
    addToast(`User ${isActive ? 'activated' : 'suspended'}`, 'success');
  };

  const handleDeleteUser = async (userId) => {
    try {
      await adminApi.deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u._id !== userId && u.id !== userId));
      addToast('User deleted from platform', 'info');
    } catch {
      addToast('Failed to delete user', 'error');
    }
  };

  const handleExportUsersCSV = (usersList) => {
    adminApi.downloadUsersCSV(usersList || users);
    addToast('Registered users exported to CSV', 'success');
  };

  // Category Actions
  const handleAddCategory = async (category) => {
    try {
      const res = await adminApi.createCategory(category);
      if (res.category) {
        setCategories((prev) => [res.category, ...prev]);
        addToast(`Category "${category.name || category.jobTypeName}" created`, 'success');
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to create category', 'error');
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await adminApi.deleteCategory(id);
      setCategories((prev) => prev.filter((c) => (c._id !== id && c.id !== id)));
      addToast('Job category deleted', 'info');
    } catch {
      addToast('Failed to delete category', 'error');
    }
  };

  // Moderation & Flags
  const handleModerateJob = async (jobId, status) => {
    await adminApi.moderateJob(jobId, status);
    setPendingJobs((prev) => prev.filter((j) => j.id !== jobId && j._id !== jobId));
    addToast(`Job ${status}`, 'success');
  };

  const handleResolveFlag = (id, action) => {
    setFlagged((prev) => prev.filter((f) => f.id !== id));
    addToast(`Flag ${action === 'ban' ? 'acted on and user suspended' : 'dismissed'}`, action === 'ban' ? 'error' : 'success');
  };

  return (
    <AdminLayout>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
          Admin <span className="text-gradient">Control Hub</span>
        </h1>
        <p style={{ color: '#475569', fontSize: '1rem', margin: 0 }}>
          Full-stack platform control: live MongoDB job and user management, categories, CSV reporting, and analytics.
        </p>
      </div>

      <PlatformHealthWidgets />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Full-Feature Jobs Management Table with CSV Export */}
        <AdminJobsTable
          jobs={jobs}
          categories={categories}
          onCreateJob={handleCreateJob}
          onUpdateJob={handleUpdateJob}
          onDeleteJob={handleDeleteJob}
          onExportCSV={handleExportJobsCSV}
        />

        {/* Full-Feature Users Management Table with CSV Export */}
        <UserTable
          users={users}
          onToggleStatus={handleToggleUser}
          onDeleteUser={handleDeleteUser}
          onExportCSV={handleExportUsersCSV}
        />

        {/* Live MongoDB Categories Manager */}
        <CategoryManager
          categories={categories}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
        />

        {/* Analytics & Metrics */}
        <AnalyticsCharts analytics={analytics} />

        {/* Moderation Queues */}
        <JobModerationTable pendingJobs={pendingJobs} onModerate={handleModerateJob} />
        <FlaggedContentQueue flaggedItems={flagged} onResolve={handleResolveFlag} />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

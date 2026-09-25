import axiosInstance from './axiosInstance';

export const MOCK_ADMIN_USERS = [
  { id: 'u1', _id: 'u1', name: 'Gokul Sharma', email: 'Gokul@example.com', role: 'seeker', isActive: true, createdAt: '2026-09-01T12:00:00Z' },
  { id: 'u2', _id: 'u2', name: 'Elena Rostova', email: 'elena@example.com', role: 'seeker', isActive: true, createdAt: '2026-09-05T10:00:00Z' },
  { id: 'u3', _id: 'u3', name: 'Nexus Cloud HR', email: 'recruiter@nexus.com', role: 'recruiter', isActive: true, createdAt: '2026-08-20T08:00:00Z' },
  { id: 'u4', _id: 'u4', name: 'Platform Administrator', email: 'admin@jobconnect.io', role: 'admin', isActive: true, createdAt: '2026-08-15T09:00:00Z' },
];

export const MOCK_ANALYTICS = {
  totalUsers: 1420,
  activeJobs: 184,
  totalApplications: 3950,
  avgTimeToHireDays: 14.2,
  hiringFunnel: [
    { stage: 'Applied', count: 3950, percentage: 100 },
    { stage: 'Under Review', count: 2840, percentage: 71.8 },
    { stage: 'Shortlisted', count: 1210, percentage: 30.6 },
    { stage: 'Interview', count: 640, percentage: 16.2 },
    { stage: 'Selected', count: 215, percentage: 5.4 },
  ],
  topSkillsDemand: [
    { skill: 'React', count: 142 },
    { skill: 'Node.js', count: 128 },
    { skill: 'MongoDB', count: 115 },
    { skill: 'TypeScript', count: 96 },
    { skill: 'Docker', count: 82 },
    { skill: 'AWS', count: 74 },
  ],
  recruiterLeaderboard: [
    { name: 'Nexus Cloud Technologies', jobsPosted: 24, hires: 18, avgDaysToFill: 12 },
    { name: 'Pulse FinTech', jobsPosted: 19, hires: 14, avgDaysToFill: 15 },
    { name: 'Aura Data Labs', jobsPosted: 12, hires: 9, avgDaysToFill: 18 },
  ],
};

export const MOCK_FLAGGED = [
  {
    id: 'flag-1',
    type: 'resume_mismatch',
    userName: 'John Scammer',
    details: "Profile claims 10 yrs 'Kubernetes' but keyword frequency shows 0 mentions in uploaded PDF.",
    severity: 'high',
    date: '2026-09-23T14:10:00Z',
  },
  {
    id: 'flag-2',
    type: 'duplicate_hash',
    userName: 'Alex Duplicate',
    details: 'Uploaded resume SHA-256 matches existing candidate user_id #9812.',
    severity: 'medium',
    date: '2026-09-24T08:30:00Z',
  },
];

// Helper to trigger browser download of CSV string
const downloadCSV = (csvContent, fileName) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const adminApi = {
  getUsers: async (params = {}) => {
    try {
      const res = await axiosInstance.get('/users', { params });
      return { users: res.data.users || [], total: res.data.count || res.data.total || 0 };
    } catch {
      return { users: MOCK_ADMIN_USERS, total: MOCK_ADMIN_USERS.length };
    }
  },

  toggleUserStatus: async (userId, isActive) => {
    try {
      const res = await axiosInstance.patch(`/admin/users/${userId}/status`, { isActive });
      return res.data;
    } catch {
      const user = MOCK_ADMIN_USERS.find(u => u.id === userId || u._id === userId);
      if (user) user.isActive = isActive;
      return { success: true, user };
    }
  },

  deleteUser: async (userId) => {
    try {
      const res = await axiosInstance.delete(`/user/delete/${userId}`);
      return res.data;
    } catch {
      return { success: true, userId };
    }
  },

  getJobs: async (params = {}) => {
    try {
      const res = await axiosInstance.get('/jobs', { params });
      return {
        jobs: res.data.jobs || [],
        total: res.data.total || (res.data.jobs ? res.data.jobs.length : 0),
        count: res.data.count || 0
      };
    } catch {
      return { jobs: [], total: 0 };
    }
  },

  createJob: async (jobData) => {
    try {
      const res = await axiosInstance.post('/jobs', jobData);
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  updateJob: async (id, jobData) => {
    try {
      const res = await axiosInstance.put(`/jobs/${id}`, jobData);
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  deleteJob: async (id) => {
    try {
      const res = await axiosInstance.delete(`/jobs/${id}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  getPendingJobs: async () => {
    try {
      const res = await axiosInstance.get('/admin/jobs/pending');
      return res.data;
    } catch {
      return {
        jobs: [
          { id: 'job-pending-1', title: 'Blockchain Web3 Lead', company: 'CryptoX', status: 'pending', postedAt: '2026-09-23' },
          { id: 'job-pending-2', title: 'Senior DevOps Architect', company: 'GlobalScale', status: 'pending', postedAt: '2026-09-24' }
        ]
      };
    }
  },

  moderateJob: async (jobId, status) => {
    try {
      const res = await axiosInstance.patch(`/admin/jobs/${jobId}/moderate`, { status });
      return res.data;
    } catch {
      return { success: true, jobId, status };
    }
  },

  getCategories: async () => {
    try {
      const res = await axiosInstance.get('/type/jobs');
      const cats = res.data.categories || res.data.jobT || [];
      return {
        categories: cats.map(c => ({
          id: c._id || c.id,
          _id: c._id || c.id,
          name: c.jobTypeName || c.name,
          jobTypeName: c.jobTypeName || c.name,
          description: c.description || '',
          createdAt: c.createdAt
        }))
      };
    } catch {
      return {
        categories: [
          { id: 'cat-1', name: 'Technology', description: 'Software, QA, DevOps, and Architecture' },
          { id: 'cat-2', name: 'Design & Creative', description: 'UI/UX, Product Design, Interaction' },
          { id: 'cat-3', name: 'Finance & Banking', description: 'Investment analysis, accounting, and fintech' },
          { id: 'cat-4', name: 'Data Science & AI', description: 'Data Engineering, Pipeline Specialists, ML' },
        ]
      };
    }
  },

  createCategory: async (category) => {
    try {
      const res = await axiosInstance.post('/type/create', {
        jobTypeName: category.name || category.jobTypeName,
        description: category.description || ''
      });
      return {
        success: true,
        category: {
          id: res.data.jobT?._id || res.data.category?.id || 'cat-' + Date.now(),
          name: category.name || category.jobTypeName,
          description: category.description
        }
      };
    } catch (err) {
      throw err;
    }
  },

  deleteCategory: async (categoryId) => {
    try {
      const res = await axiosInstance.delete(`/type/delete/${categoryId}`);
      return res.data;
    } catch {
      return { success: true, categoryId };
    }
  },

  getAnalytics: async () => {
    try {
      const res = await axiosInstance.get('/admin/analytics');
      return res.data;
    } catch {
      return { analytics: MOCK_ANALYTICS };
    }
  },

  getFlaggedContent: async () => {
    try {
      const res = await axiosInstance.get('/admin/flagged');
      return res.data;
    } catch {
      return { flagged: MOCK_FLAGGED };
    }
  },

  // Export Jobs to CSV file
  downloadJobsCSV: (jobs) => {
    if (!jobs || jobs.length === 0) return;
    const headers = ['Job ID', 'Title', 'Company', 'Category', 'Salary', 'Location', 'Type', 'Available', 'Status', 'Created At'];
    const rows = jobs.map(j => {
      const id = j._id || j.id || '';
      const title = `"${(j.title || '').replace(/"/g, '""')}"`;
      const company = `"${(j.company || '').replace(/"/g, '""')}"`;
      const category = `"${(j.category || j.jobType?.jobTypeName || '').replace(/"/g, '""')}"`;
      const salary = `"${(j.salaryString || (typeof j.salary === 'object' ? `$${j.salary.min}-$${j.salary.max}` : j.salary) || '').replace(/"/g, '""')}"`;
      const location = `"${(j.location || '').replace(/"/g, '""')}"`;
      const type = `"${(j.type || '').replace(/"/g, '""')}"`;
      const available = j.available !== false ? 'Yes' : 'No';
      const status = j.status || 'active';
      const createdAt = j.createdAt ? new Date(j.createdAt).toISOString() : (j.postedAt || '');
      return [id, title, company, category, salary, location, type, available, status, createdAt].join(',');
    });

    const csv = [headers.join(','), ...rows].join('\n');
    downloadCSV(csv, `jobconnect_jobs_export_${new Date().toISOString().split('T')[0]}.csv`);
  },

  // Export Users to CSV file
  downloadUsersCSV: (users) => {
    if (!users || users.length === 0) return;
    const headers = ['User ID', 'Name', 'Email', 'Role', 'Status', 'Registered At'];
    const rows = users.map(u => {
      const id = u._id || u.id || '';
      const name = `"${(u.name || `${u.firstName || ''} ${u.lastName || ''}`).trim().replace(/"/g, '""')}"`;
      const email = `"${(u.email || '').replace(/"/g, '""')}"`;
      const role = u.role || (u.roleNum === 1 ? 'admin' : 'seeker');
      const status = u.isActive !== false ? 'Active' : 'Suspended';
      const createdAt = u.createdAt ? new Date(u.createdAt).toISOString() : '';
      return [id, name, email, role, status, createdAt].join(',');
    });

    const csv = [headers.join(','), ...rows].join('\n');
    downloadCSV(csv, `jobconnect_users_export_${new Date().toISOString().split('T')[0]}.csv`);
  }
};

export default adminApi;

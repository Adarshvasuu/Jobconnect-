import axiosInstance from './axiosInstance';

export const MOCK_ADMIN_USERS = [
  { id: 'u1', name: 'Adarsh Sharma', email: 'adarsh@example.com', role: 'seeker', isActive: true, createdAt: '2026-09-01' },
  { id: 'u2', name: 'Elena Rostova', email: 'elena@example.com', role: 'seeker', isActive: true, createdAt: '2026-09-05' },
  { id: 'u3', name: 'Nexus Cloud HR', email: 'recruiter@nexus.com', role: 'recruiter', isActive: true, createdAt: '2026-08-20' },
  { id: 'u4', name: 'Spam Bot 900', email: 'spammer@fake.io', role: 'seeker', isActive: false, createdAt: '2026-09-22' },
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

export const adminApi = {
  getUsers: async () => {
    try {
      const res = await axiosInstance.get('/admin/users');
      return res.data;
    } catch {
      return { users: MOCK_ADMIN_USERS };
    }
  },

  toggleUserStatus: async (userId, isActive) => {
    try {
      const res = await axiosInstance.patch(`/admin/users/${userId}/status`, { isActive });
      return res.data;
    } catch {
      const user = MOCK_ADMIN_USERS.find(u => u.id === userId);
      if (user) user.isActive = isActive;
      return { success: true, user };
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
      const res = await axiosInstance.get('/categories');
      return res.data;
    } catch {
      return {
        categories: [
          { id: 'cat-1', name: 'Engineering', description: 'Software, QA, DevOps, and Architecture' },
          { id: 'cat-2', name: 'Design & Dev', description: 'UI/UX, Product Design, Interaction' },
          { id: 'cat-3', name: 'Product Management', description: 'Technical PM, Scrum Masters' },
          { id: 'cat-4', name: 'Data & AI/ML', description: 'Data Engineering, Pipeline Specialists' },
        ]
      };
    }
  },

  createCategory: async (category) => {
    try {
      const res = await axiosInstance.post('/categories', category);
      return res.data;
    } catch {
      return { success: true, category: { id: 'cat-' + Date.now(), ...category } };
    }
  },

  deleteCategory: async (categoryId) => {
    try {
      const res = await axiosInstance.delete(`/categories/${categoryId}`);
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
};

export default adminApi;

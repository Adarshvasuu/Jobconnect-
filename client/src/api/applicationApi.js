import axiosInstance from './axiosInstance';

export const MOCK_APPLICATIONS = [
  {
    id: 'app-501',
    jobId: 'job-101',
    jobTitle: 'Senior Full Stack Engineer (MERN)',
    company: 'Nexus Cloud Technologies',
    candidate: {
      id: 'cand-1',
      name: 'Adarsh Sharma',
      email: 'adarsh@example.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      skills: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'],
      experience: '5.5 yrs',
      matchScore: 94,
      resumeUrl: '#',
    },
    status: 'interview',
    appliedAt: '2026-09-18T10:30:00Z',
    statusHistory: [
      { status: 'applied', date: '2026-09-18T10:30:00Z', note: 'Application submitted' },
      { status: 'reviewing', date: '2026-09-19T14:20:00Z', note: 'Profile reviewed by hiring manager' },
      { status: 'shortlisted', date: '2026-09-20T09:15:00Z', note: 'Passed resume screening' },
      { status: 'interview', date: '2026-09-22T16:00:00Z', note: 'Technical Round 1 scheduled' },
    ],
  },
  {
    id: 'app-502',
    jobId: 'job-102',
    jobTitle: 'Frontend React Developer',
    company: 'Pulse FinTech',
    candidate: {
      id: 'cand-2',
      name: 'Elena Rostova',
      email: 'elena@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      skills: ['React', 'CSS3', 'Next.js', 'TypeScript'],
      experience: '3 yrs',
      matchScore: 88,
      resumeUrl: '#',
    },
    status: 'shortlisted',
    appliedAt: '2026-09-20T11:45:00Z',
    statusHistory: [
      { status: 'applied', date: '2026-09-20T11:45:00Z', note: 'Application submitted' },
      { status: 'shortlisted', date: '2026-09-21T15:10:00Z', note: 'Candidate shortlisted for portfolio strength' },
    ],
  },
  {
    id: 'app-503',
    jobId: 'job-101',
    jobTitle: 'Senior Full Stack Engineer (MERN)',
    company: 'Nexus Cloud Technologies',
    candidate: {
      id: 'cand-3',
      name: 'Marcus Vance',
      email: 'marcus@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      skills: ['Node.js', 'MongoDB', 'Docker', 'AWS'],
      experience: '6 yrs',
      matchScore: 82,
      resumeUrl: '#',
    },
    status: 'reviewing',
    appliedAt: '2026-09-22T08:10:00Z',
    statusHistory: [
      { status: 'applied', date: '2026-09-22T08:10:00Z', note: 'Application submitted' },
      { status: 'reviewing', date: '2026-09-23T11:00:00Z', note: 'Assigned to tech recruiter' },
    ],
  },
];

export const applicationApi = {
  applyJob: async (jobId, data) => {
    try {
      const response = await axiosInstance.post(`/applications/apply/${jobId}`, data);
      return response.data;
    } catch {
      return { success: true, message: 'Application submitted successfully (mock)!' };
    }
  },

  getMyApplications: async () => {
    try {
      const response = await axiosInstance.get('/applications/my-applications');
      return response.data;
    } catch {
      return { applications: MOCK_APPLICATIONS };
    }
  },

  getJobApplications: async (jobId) => {
    try {
      const response = await axiosInstance.get(`/applications/job/${jobId}`);
      return response.data;
    } catch {
      return { applications: MOCK_APPLICATIONS };
    }
  },

  updateApplicationStatus: async (applicationId, status, notes = '') => {
    try {
      const response = await axiosInstance.patch(`/applications/${applicationId}/status`, {
        status,
        notes,
      });
      return response.data;
    } catch {
      const target = MOCK_APPLICATIONS.find((a) => a.id === applicationId);
      if (target) {
        target.status = status;
        target.statusHistory.push({
          status,
          date: new Date().toISOString(),
          note: notes || `Moved to ${status}`,
        });
      }
      return { success: true, status };
    }
  },
};

export default applicationApi;

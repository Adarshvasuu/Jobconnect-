import axiosInstance from './axiosInstance';

// Sample mock jobs for smooth development and prototyping
export const MOCK_JOBS = [
  {
    id: 'job-101',
    title: 'Senior Full Stack Engineer (MERN)',
    company: 'Nexus Cloud Technologies',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
    location: 'Bangalore, India (Hybrid)',
    type: 'Full-time',
    category: 'Engineering',
    experience: 'Senior (5-8 yrs)',
    salary: { min: 1800000, max: 2800000, currency: '₹' },
    skillsRequired: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Docker'],
    matchScore: 94,
    description: 'We are seeking an experienced Senior Full Stack Engineer to lead our core microservices platform and high-throughput real-time aggregation feeds in MongoDB.',
    postedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    applicantsCount: 28,
    status: 'active',
  },
  {
    id: 'job-102',
    title: 'Frontend React Developer',
    company: 'Pulse FinTech',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80',
    location: 'Remote (Global)',
    type: 'Remote',
    category: 'Design & Dev',
    experience: 'Mid-Level (3-5 yrs)',
    salary: { min: 95000, max: 130000, currency: '$' },
    skillsRequired: ['React', 'JavaScript', 'TailwindCSS', 'Redux', 'REST API'],
    matchScore: 88,
    description: 'Join our customer experience team building lightning-fast reactive dashboards, financial visualizers, and conversational wizards.',
    postedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    applicantsCount: 42,
    status: 'active',
  },
  {
    id: 'job-103',
    title: 'Backend Node.js & Database Architect',
    company: 'Aura Data Labs',
    logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100&auto=format&fit=crop&q=80',
    location: 'Mumbai, India (On-site)',
    type: 'Full-time',
    category: 'Backend',
    experience: 'Senior (5-8 yrs)',
    salary: { min: 2200000, max: 3200000, currency: '₹' },
    skillsRequired: ['Node.js', 'MongoDB', 'Redis', 'Aggregation Pipelines', 'GraphQL'],
    matchScore: 81,
    description: 'Architect scalable backend systems capable of processing millions of recruiter analytics queries and candidate matching pipelines.',
    postedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    applicantsCount: 15,
    status: 'active',
  },
  {
    id: 'job-104',
    title: 'Product Designer (UI/UX)',
    company: 'Vanguard Design Studio',
    logo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=100&auto=format&fit=crop&q=80',
    location: 'Remote',
    type: 'Contract',
    category: 'Design',
    experience: 'Mid-Level (3-5 yrs)',
    salary: { min: 80000, max: 110000, currency: '$' },
    skillsRequired: ['Figma', 'Design Systems', 'Prototyping', 'User Research'],
    matchScore: 72,
    description: 'Craft intuitive recruitment workflows, Kanban boards, and onboarding flows that wow recruiters and candidates alike.',
    postedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    applicantsCount: 19,
    status: 'active',
  },
];

export const jobApi = {
  // Fetch jobs with filters
  getJobs: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/jobs', { params });
      return response.data;
    } catch {
      console.info('Backend unreachable, using mock jobs for development');
      let filtered = [...MOCK_JOBS];
      if (params.search) {
        const query = params.search.toLowerCase();
        filtered = filtered.filter(
          (j) =>
            j.title.toLowerCase().includes(query) ||
            j.company.toLowerCase().includes(query) ||
            j.skillsRequired.some((s) => s.toLowerCase().includes(query))
        );
      }
      if (params.type && params.type !== 'All') {
        filtered = filtered.filter((j) => j.type.toLowerCase() === params.type.toLowerCase());
      }
      return { jobs: filtered, total: filtered.length };
    }
  },

  // Get single job details
  getJobById: async (id) => {
    try {
      const response = await axiosInstance.get(`/jobs/${id}`);
      return response.data;
    } catch {
      const found = MOCK_JOBS.find((j) => j.id === id) || MOCK_JOBS[0];
      return { job: found };
    }
  },

  // Create job (Recruiter)
  createJob: async (jobData) => {
    try {
      const response = await axiosInstance.post('/jobs', jobData);
      return response.data;
    } catch {
      const newJob = {
        id: 'job-' + Date.now(),
        ...jobData,
        postedAt: new Date().toISOString(),
        applicantsCount: 0,
      };
      MOCK_JOBS.unshift(newJob);
      return { success: true, job: newJob };
    }
  },

  // Update job
  updateJob: async (id, jobData) => {
    try {
      const response = await axiosInstance.put(`/jobs/${id}`, jobData);
      return response.data;
    } catch {
      return { success: true, updated: { id, ...jobData } };
    }
  },

  // Delete job
  deleteJob: async (id) => {
    try {
      const response = await axiosInstance.delete(`/jobs/${id}`);
      return response.data;
    } catch {
      return { success: true, id };
    }
  },

  // Get jobs created by current recruiter
  getRecruiterJobs: async () => {
    try {
      const response = await axiosInstance.get('/jobs/recruiter/my-listings');
      return response.data;
    } catch {
      return { jobs: MOCK_JOBS };
    }
  },
};

export default jobApi;

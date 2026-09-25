import axiosInstance from './axiosInstance';

export const MOCK_JOBS = [
  {
    id: 'job-1',
    _id: 'job-1',
    title: 'Senior Full Stack Engineer',
    company: 'Stripe',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=faces',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Full-time',
    category: 'Technology',
    experience: '3-5 years',
    salary: { min: 140000, max: 190000, currency: '$' },
    salaryString: '$140,000 - $190,000',
    skillsRequired: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    matchScore: 94,
    description: 'Build global payment infrastructure used by millions of businesses. You will work on real-time transaction processing, high-scale APIs, and intuitive user experiences.',
    postedAt: '2026-09-20T10:00:00Z',
    applicantsCount: 42,
    status: 'active',
    available: true
  },
  {
    id: 'job-2',
    _id: 'job-2',
    title: 'Machine Learning Engineer (LLMs)',
    company: 'OpenAI Labs',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop&crop=faces',
    location: 'Remote',
    type: 'Remote',
    category: 'Data Science & AI',
    experience: '2-4 years',
    salary: { min: 160000, max: 220000, currency: '$' },
    salaryString: '$160,000 - $220,000',
    skillsRequired: ['Python', 'PyTorch', 'Transformers', 'Distributed Systems', 'CUDA'],
    matchScore: 89,
    description: 'Join our frontier research team to train, fine-tune, and deploy large-scale reasoning models. Experience with distributed training pipelines is highly valued.',
    postedAt: '2026-09-21T14:30:00Z',
    applicantsCount: 78,
    status: 'active',
    available: true
  },
  {
    id: 'job-3',
    _id: 'job-3',
    title: 'Product Designer (Design Systems)',
    company: 'Figma',
    logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop&crop=faces',
    location: 'New York, NY',
    type: 'Full-time',
    category: 'Design & Creative',
    experience: '2-5 years',
    salary: { min: 120000, max: 165000, currency: '$' },
    salaryString: '$120,000 - $165,000',
    skillsRequired: ['Figma', 'UI/UX Design', 'Design Systems', 'Prototyping', 'HTML/CSS'],
    matchScore: 82,
    description: 'Craft world-class design systems that empower millions of creative professionals. Collaborate directly with engineers to ship accessible, delightful components.',
    postedAt: '2026-09-22T09:15:00Z',
    applicantsCount: 31,
    status: 'active',
    available: true
  },
  {
    id: 'job-4',
    _id: 'job-4',
    title: 'Cloud Infrastructure Architect',
    company: 'Datadog',
    logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop&crop=faces',
    location: 'Seattle, WA',
    type: 'Full-time',
    category: 'Technology',
    experience: '4-7 years',
    salary: { min: 150000, max: 200000, currency: '$' },
    salaryString: '$150,000 - $200,000',
    skillsRequired: ['Kubernetes', 'AWS', 'Terraform', 'Go', 'Observability'],
    matchScore: 91,
    description: 'Architect and scale multi-region Kubernetes clusters handling trillions of telemetry events daily.',
    postedAt: '2026-09-23T11:45:00Z',
    applicantsCount: 19,
    status: 'active',
    available: true
  }
];

export const jobApi = {
  // Fetch jobs with search, category, location, and pagination
  getJobs: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/jobs', { params });
      return {
        jobs: response.data.jobs || [],
        total: response.data.total || response.data.count || (response.data.jobs ? response.data.jobs.length : 0),
        count: response.data.count || response.data.total || 0,
        page: response.data.page || 1,
        pages: response.data.pages || 1,
        setUniqueLocation: response.data.setUniqueLocation || []
      };
    } catch {
      let filtered = [...MOCK_JOBS];
      const query = (params.search || params.keyword || '').toLowerCase();
      if (query) {
        filtered = filtered.filter(
          (j) =>
            j.title.toLowerCase().includes(query) ||
            j.company.toLowerCase().includes(query) ||
            j.location?.toLowerCase().includes(query) ||
            j.skillsRequired?.some((s) => s.toLowerCase().includes(query))
        );
      }
      if (params.type && params.type !== 'All') {
        filtered = filtered.filter((j) => j.type.toLowerCase() === params.type.toLowerCase());
      }
      if (params.category && params.category !== 'All') {
        filtered = filtered.filter((j) => (j.category || '').toLowerCase() === params.category.toLowerCase());
      }
      return {
        jobs: filtered,
        total: filtered.length,
        count: filtered.length,
        page: 1,
        pages: 1,
        setUniqueLocation: ['San Francisco, CA (Hybrid)', 'Remote', 'New York, NY', 'Seattle, WA', 'Chicago, IL']
      };
    }
  },

  // Get single job details
  getJobById: async (id) => {
    try {
      const response = await axiosInstance.get(`/jobs/${id}`);
      return response.data;
    } catch {
      const found = MOCK_JOBS.find((j) => (j.id === id || j._id === id)) || MOCK_JOBS[0];
      return { job: found };
    }
  },

  // Create job (Recruiter / Admin)
  createJob: async (jobData) => {
    try {
      const response = await axiosInstance.post('/jobs', jobData);
      return response.data;
    } catch {
      const newJob = {
        id: 'job-' + Date.now(),
        _id: 'job-' + Date.now(),
        ...jobData,
        postedAt: new Date().toISOString(),
        applicantsCount: 0,
        available: true,
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

  // Get all job categories
  getCategories: async () => {
    try {
      const response = await axiosInstance.get('/type/jobs');
      return {
        categories: response.data.categories || response.data.jobT || []
      };
    } catch {
      return {
        categories: [
          { id: 'cat-1', name: 'Technology', jobTypeName: 'Technology' },
          { id: 'cat-2', name: 'Healthcare & Medicine', jobTypeName: 'Healthcare & Medicine' },
          { id: 'cat-3', name: 'Finance & Banking', jobTypeName: 'Finance & Banking' },
          { id: 'cat-4', name: 'Design & Creative', jobTypeName: 'Design & Creative' },
          { id: 'cat-5', name: 'Marketing & Growth', jobTypeName: 'Marketing & Growth' },
          { id: 'cat-6', name: 'Human Resources', jobTypeName: 'Human Resources' }
        ]
      };
    }
  },

  // Get unique locations
  getLocations: async () => {
    try {
      const response = await axiosInstance.get('/jobs/locations');
      return response.data.locations || [];
    } catch {
      return ['Remote', 'San Francisco, CA (Hybrid)', 'New York, NY', 'Seattle, WA', 'Chicago, IL', 'Bangalore, India (Hybrid)'];
    }
  }
};

export default jobApi;

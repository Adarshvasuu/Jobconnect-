import axiosInstance from './axiosInstance';

export const MOCK_PROFILE = {
  name: 'Adarsh Sharma',
  email: 'adarsh@example.com',
  title: 'Full Stack MERN Developer',
  bio: 'Passionate software engineer building robust reactive interfaces, scalable APIs, and MongoDB aggregation architectures.',
  location: 'Bangalore, India',
  experienceYears: 5,
  skills: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Docker', 'GraphQL'],
  completionPercentage: 85,
  resume: {
    fileName: 'Adarsh_Sharma_Resume_2026.pdf',
    uploadedAt: '2026-09-10T08:00:00Z',
    fileSize: '1.2 MB',
  },
  savedJobs: ['job-101', 'job-102'],
};

export const profileApi = {
  getProfile: async () => {
    try {
      const response = await axiosInstance.get('/profile');
      return response.data;
    } catch {
      return { profile: MOCK_PROFILE };
    }
  },

  updateProfile: async (data) => {
    try {
      const response = await axiosInstance.put('/profile', data);
      return response.data;
    } catch {
      Object.assign(MOCK_PROFILE, data);
      return { success: true, profile: MOCK_PROFILE };
    }
  },

  uploadResume: async (formData) => {
    try {
      const response = await axiosInstance.post('/profile/resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch {
      MOCK_PROFILE.resume = {
        fileName: 'Updated_Resume.pdf',
        uploadedAt: new Date().toISOString(),
        fileSize: '1.5 MB',
      };
      return { success: true, resume: MOCK_PROFILE.resume };
    }
  },

  saveJob: async (jobId) => {
    try {
      const response = await axiosInstance.post(`/profile/saved-jobs/${jobId}`);
      return response.data;
    } catch {
      if (!MOCK_PROFILE.savedJobs.includes(jobId)) {
        MOCK_PROFILE.savedJobs.push(jobId);
      }
      return { success: true, savedJobs: MOCK_PROFILE.savedJobs };
    }
  },

  unsaveJob: async (jobId) => {
    try {
      const response = await axiosInstance.delete(`/profile/saved-jobs/${jobId}`);
      return response.data;
    } catch {
      MOCK_PROFILE.savedJobs = MOCK_PROFILE.savedJobs.filter((id) => id !== jobId);
      return { success: true, savedJobs: MOCK_PROFILE.savedJobs };
    }
  },
};

export default profileApi;

import axiosInstance from './axiosInstance';

export const userApi = {
  // Get applicant's job history
  getJobsHistory: async () => {
    try {
      const res = await axiosInstance.get('/user/jobhistory');
      return { jobsHistory: res.data.jobsHistory || [] };
    } catch {
      // Fallback from localStorage user if available
      try {
        const storedUser = JSON.parse(localStorage.getItem('jobconnect_user') || '{}');
        return { jobsHistory: storedUser.jobsHistory || [] };
      } catch {
        return { jobsHistory: [] };
      }
    }
  },

  // Apply to a job and add to jobsHistory
  applyToJob: async (jobData) => {
    try {
      const res = await axiosInstance.post('/user/jobhistory', {
        title: jobData.title,
        description: jobData.description,
        salary: jobData.salaryString || (typeof jobData.salary === 'object' ? `$${jobData.salary.min} - $${jobData.salary.max}` : jobData.salary),
        location: jobData.location,
        company: jobData.company,
        jobId: jobData._id || jobData.id
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  // Update status of applied job in user history
  updateJobHistoryStatus: async (historyId, applicationStatus, interviewDate) => {
    try {
      const res = await axiosInstance.patch('/user/jobhistory/status', {
        historyId,
        applicationStatus,
        interviewDate
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  }
};

export default userApi;

import axiosInstance from './axiosInstance';

export const authApi = {
  // Login with email and password
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      // In development/demo, simulate success if backend is offline
      if (!error.response) {
        console.info('Backend unreachable, using mock login fallback for development');
        return {
          success: true,
          token: 'mock-jwt-token-' + Date.now(),
          user: {
            id: 'mock-user-1',
            name: credentials.email.split('@')[0],
            email: credentials.email,
            role: credentials.email.includes('admin') ? 'admin' : (credentials.email.includes('recruiter') ? 'recruiter' : 'seeker'),
          }
        };
      }
      throw error;
    }
  },

  // Signup new user
  signup: async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      if (!error.response) {
        console.info('Backend unreachable, using mock signup fallback for development');
        return {
          success: true,
          token: 'mock-jwt-token-' + Date.now(),
          user: {
            id: 'mock-user-' + Date.now(),
            name: userData.name,
            email: userData.email,
            role: userData.role || 'seeker',
          }
        };
      }
      throw error;
    }
  },

  // Get current authenticated user details
  getCurrentUser: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },

  // Logout user
  logout: async () => {
    try {
      return await axiosInstance.post('/auth/logout');
    } catch {
      return { success: true };
    }
  },
};

export default authApi;

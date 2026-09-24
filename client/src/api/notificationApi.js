import axiosInstance from './axiosInstance';

export const MOCK_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'status_change',
    text: 'Your application for Senior Full Stack Engineer (Nexus Cloud) moved to Interview!',
    isRead: false,
    createdAt: '2026-09-24T08:00:00Z',
  },
  {
    id: 'notif-2',
    type: 'match',
    text: 'New 94% job match found: Frontend React Developer at Pulse FinTech.',
    isRead: false,
    createdAt: '2026-09-23T14:30:00Z',
  },
  {
    id: 'notif-3',
    type: 'message',
    text: 'New message received from Sarah Jenkins (Nexus Cloud HR).',
    isRead: true,
    createdAt: '2026-09-22T11:00:00Z',
  },
];

export const notificationApi = {
  getNotifications: async () => {
    try {
      const res = await axiosInstance.get('/notifications');
      return res.data;
    } catch {
      return { notifications: MOCK_NOTIFICATIONS };
    }
  },

  markAsRead: async (id) => {
    try {
      const res = await axiosInstance.patch(`/notifications/${id}/read`);
      return res.data;
    } catch {
      const target = MOCK_NOTIFICATIONS.find((n) => n.id === id);
      if (target) target.isRead = true;
      return { success: true, id };
    }
  },

  markAllAsRead: async () => {
    try {
      const res = await axiosInstance.patch('/notifications/read-all');
      return res.data;
    } catch {
      MOCK_NOTIFICATIONS.forEach((n) => (n.isRead = true));
      return { success: true };
    }
  },
};

export default notificationApi;

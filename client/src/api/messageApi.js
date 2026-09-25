import axiosInstance from './axiosInstance';

export const MOCK_CONVERSATIONS = [
  {
    id: 'conv-1',
    participant: {
      id: 'recruiter-1',
      name: 'Sarah Jenkins (Nexus Cloud)',
      role: 'recruiter',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    },
    jobTitle: 'Senior Full Stack Engineer (MERN)',
    lastMessage: 'We would love to invite you for an interview this Thursday at 4 PM IST.',
    lastMessageAt: '2026-09-24T09:30:00Z',
    unreadCount: 1,
  },
  {
    id: 'conv-2',
    participant: {
      id: 'recruiter-2',
      name: 'David Miller (Pulse FinTech)',
      role: 'recruiter',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
    jobTitle: 'Frontend React Developer',
    lastMessage: 'Thanks for sharing your updated portfolio repository!',
    lastMessageAt: '2026-09-23T15:20:00Z',
    unreadCount: 0,
  },
];

export const MOCK_MESSAGES = {
  'conv-1': [
    {
      id: 'msg-1',
      senderId: 'recruiter-1',
      text: 'Hi Gokul, your experience with MongoDB Aggregations and React looks very strong.',
      createdAt: '2026-09-24T09:10:00Z',
    },
    {
      id: 'msg-2',
      senderId: 'mock-user-1',
      text: 'Thank you Sarah! I have built several high-throughput data pipelines and custom dashboards.',
      createdAt: '2026-09-24T09:20:00Z',
    },
    {
      id: 'msg-3',
      senderId: 'recruiter-1',
      text: 'We would love to invite you for an interview this Thursday at 4 PM IST.',
      createdAt: '2026-09-24T09:30:00Z',
    },
  ],
  'conv-2': [
    {
      id: 'msg-201',
      senderId: 'recruiter-2',
      text: 'Thanks for sharing your updated portfolio repository!',
      createdAt: '2026-09-23T15:20:00Z',
    },
  ],
};

export const messageApi = {
  getConversations: async () => {
    try {
      const res = await axiosInstance.get('/messages/conversations');
      return res.data;
    } catch {
      return { conversations: MOCK_CONVERSATIONS };
    }
  },

  getMessages: async (conversationId) => {
    try {
      const res = await axiosInstance.get(`/messages/${conversationId}`);
      return res.data;
    } catch {
      return { messages: MOCK_MESSAGES[conversationId] || [] };
    }
  },

  sendMessage: async (conversationId, text, attachmentUrl = null) => {
    try {
      const res = await axiosInstance.post(`/messages/${conversationId}`, { text, attachmentUrl });
      return res.data;
    } catch {
      const newMsg = {
        id: 'msg-' + Date.now(),
        senderId: 'mock-user-1',
        text,
        attachmentUrl,
        createdAt: new Date().toISOString(),
      };
      if (!MOCK_MESSAGES[conversationId]) MOCK_MESSAGES[conversationId] = [];
      MOCK_MESSAGES[conversationId].push(newMsg);
      return { success: true, message: newMsg };
    }
  },
};

export default messageApi;

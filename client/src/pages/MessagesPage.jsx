import React, { useState, useEffect } from 'react';
import SeekerLayout from '../components/layout/SeekerLayout';
import ConversationList from '../components/messaging/ConversationList';
import MessageThread from '../components/messaging/MessageThread';
import { messageApi, MOCK_CONVERSATIONS, MOCK_MESSAGES } from '../api/messageApi';
import { useAuthContext } from '../context/AuthContext';
import RecruiterLayout from '../components/layout/RecruiterLayout';

export const MessagesPage = () => {
  const { user } = useAuthContext();
  const isRecruiter = user?.role === 'recruiter';
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState(MOCK_CONVERSATIONS[0]?.id || null);
  const [messages, setMessages] = useState(MOCK_MESSAGES[MOCK_CONVERSATIONS[0]?.id] || []);

  useEffect(() => {
    messageApi.getConversations().then((d) => {
      const convs = d.conversations || MOCK_CONVERSATIONS;
      setConversations(convs);
      if (convs[0]) {
        setActiveConvId(convs[0].id);
        loadMessages(convs[0].id);
      }
    });
  }, []);

  const loadMessages = async (convId) => {
    const d = await messageApi.getMessages(convId);
    setMessages(d.messages || []);
  };

  const handleSelectConversation = (convId) => {
    setActiveConvId(convId);
    loadMessages(convId);
  };

  const handleSendMessage = async (text) => {
    const d = await messageApi.sendMessage(activeConvId, text);
    if (d.message) {
      setMessages((prev) => [...prev, d.message]);
    }
  };

  const activeConversation = conversations.find((c) => c.id === activeConvId) || null;
  const Layout = isRecruiter ? RecruiterLayout : SeekerLayout;

  return (
    <Layout>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
          Direct <span className="text-gradient">Messages</span>
        </h1>
        <p style={{ color: '#475569', fontSize: '1rem', margin: 0 }}>
          Real-time conversations with {isRecruiter ? 'candidates and applicants' : 'employers and hiring managers'}.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '340px 1fr',
          height: '660px',
          overflow: 'hidden',
          borderRadius: '24px',
          border: '1.5px solid #E2E8F0',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 20px 45px -12px rgba(15, 23, 42, 0.08), 0 4px 16px rgba(15, 23, 42, 0.03)',
        }}
      >
        <ConversationList
          conversations={conversations}
          activeConversationId={activeConvId}
          onSelectConversation={handleSelectConversation}
        />
        <MessageThread
          conversation={activeConversation}
          messages={messages}
          currentUserId={user?.id || user?._id || 'mock-user-1'}
          onSendMessage={handleSendMessage}
        />
      </div>
    </Layout>
  );
};

export default MessagesPage;

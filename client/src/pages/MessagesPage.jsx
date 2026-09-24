import React, { useState, useEffect } from 'react';
import SeekerLayout from '../components/layout/SeekerLayout';
import ConversationList from '../components/messaging/ConversationList';
import MessageThread from '../components/messaging/MessageThread';
import { messageApi, MOCK_CONVERSATIONS, MOCK_MESSAGES } from '../api/messageApi';
import { useAuth } from '../hooks/useAuth';
import { useRole } from '../context/RoleContext';
import RecruiterLayout from '../components/layout/RecruiterLayout';

export const MessagesPage = () => {
  const { user } = useAuth();
  const { isRecruiter } = useRole();
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
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '4px' }}>
          Direct <span className="text-gradient">Messages</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Chat directly with {isRecruiter ? 'candidates' : 'hiring teams'} about opportunities.
        </p>
      </div>

      <div
        className="glass-panel"
        style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          height: '620px',
          overflow: 'hidden',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-hover)',
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
          currentUserId={user?.id || 'mock-user-1'}
          onSendMessage={handleSendMessage}
        />
      </div>
    </Layout>
  );
};

export default MessagesPage;

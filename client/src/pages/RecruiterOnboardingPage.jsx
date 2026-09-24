import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChatWizard from '../components/chatWizard/ChatWizard';
import recruiterConfig from '../components/chatWizard/wizardConfigs/recruiterOnboarding.json';
import profileApi from '../api/profileApi';
import { useNotifications } from '../context/NotificationContext';
import Navbar from '../components/common/Navbar';

export const RecruiterOnboardingPage = () => {
  const navigate = useNavigate();
  const { addToast } = useNotifications();

  const handleWizardComplete = async (answers) => {
    try {
      await profileApi.updateProfile({
        name: answers.name,
        companyName: answers.companyName,
        designation: answers.designation,
        website: answers.website || '',
        hiringRoles: answers.hiringRoles ? answers.hiringRoles.split(', ') : [],
      });
      addToast('Recruiter workspace ready!', 'success');
    } catch {
      addToast('Profile saved locally.', 'info');
    } finally {
      navigate('/recruiter/dashboard');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>
            Set Up Your <span className="text-gradient">Recruiting Workspace</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            A quick 5-step conversational wizard to activate your employer dashboard.
          </p>
        </div>

        <ChatWizard
          config={recruiterConfig}
          title="Recruiter Setup Wizard"
          onComplete={handleWizardComplete}
        />
      </div>
    </div>
  );
};

export default RecruiterOnboardingPage;

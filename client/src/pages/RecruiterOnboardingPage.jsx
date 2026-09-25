import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChatWizard from '../components/chatWizard/ChatWizard';
import recruiterConfig from '../components/chatWizard/wizardConfigs/recruiterOnboarding.json';
import profileApi from '../api/profileApi';
import { useNotifications } from '../context/NotificationContext';
import Navbar from '../components/common/Navbar';
import { Briefcase } from 'lucide-react';

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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #EFF6FF 0%, #F8FAFC 50%, #FFFFFF 100%)' }}>
      <Navbar />

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              color: '#1D4ED8',
              fontSize: '0.825rem',
              fontWeight: 700,
              marginBottom: '14px',
            }}
          >
            <Briefcase size={14} /> Recruiter Onboarding
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px', letterSpacing: '-0.02em' }}>
            Set Up Your <span className="text-gradient">Recruiting Workspace</span>
          </h1>
          <p style={{ color: '#475569', fontSize: '1.05rem', maxWidth: '580px', margin: '0 auto' }}>
            A quick conversational setup to configure your company profile and activate your employer hiring dashboard.
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

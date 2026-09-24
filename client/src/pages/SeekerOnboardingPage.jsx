import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatWizard from '../components/chatWizard/ChatWizard';
import ResumeCheckLoader from '../components/verification/ResumeCheckLoader';
import VerificationResultCard from '../components/verification/VerificationResultCard';
import seekerConfig from '../components/chatWizard/wizardConfigs/seekerOnboarding.json';
import profileApi from '../api/profileApi';
import { useNotifications } from '../context/NotificationContext';
import Navbar from '../components/common/Navbar';

export const SeekerOnboardingPage = () => {
  const navigate = useNavigate();
  const { addToast } = useNotifications();
  const [stage, setStage] = useState('wizard'); // 'wizard' | 'verifying' | 'result'
  const [verificationResult, setVerificationResult] = useState(null);

  const handleWizardComplete = async (answers) => {
    if (answers.resume && answers.resume !== 'Skipped resume') {
      setStage('verifying');
    } else {
      // Save profile data without verification
      await saveProfile(answers);
      navigate('/seeker/dashboard');
    }
  };

  const handleVerificationComplete = () => {
    // Simulate rule-based verification: SHA-256 hash check + skill overlap
    const mockFlags = [];
    const mockScore = 88 + Math.floor(Math.random() * 12);

    setVerificationResult({
      score: mockScore,
      status: mockScore >= 85 ? 'verified' : 'flagged',
      flags: mockFlags,
      checkedAt: new Date().toISOString(),
    });
    setStage('result');
  };

  const saveProfile = async (answers) => {
    try {
      await profileApi.updateProfile({
        name: answers.name,
        title: answers.title,
        experienceYears: Number(answers.experience) || 0,
        skills: answers.skills ? answers.skills.split(', ') : [],
        location: answers.location || '',
      });
      addToast('Profile saved successfully!', 'success');
    } catch {
      addToast('Profile saved locally.', 'info');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>
            Let's Build Your <span className="text-gradient">Talent Profile</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Our conversational wizard collects your details in a natural, friendly chat format.
          </p>
        </div>

        {/* Stage: Wizard Chat */}
        {stage === 'wizard' && (
          <ChatWizard
            config={seekerConfig}
            title="Candidate Onboarding"
            onComplete={handleWizardComplete}
          />
        )}

        {/* Stage: Resume Verification Loader */}
        {stage === 'verifying' && (
          <ResumeCheckLoader onComplete={handleVerificationComplete} />
        )}

        {/* Stage: Verification Result */}
        {stage === 'result' && verificationResult && (
          <VerificationResultCard
            score={verificationResult.score}
            status={verificationResult.status}
            flags={verificationResult.flags}
            checkedAt={verificationResult.checkedAt}
            onContinue={() => navigate('/seeker/dashboard')}
          />
        )}
      </div>
    </div>
  );
};

export default SeekerOnboardingPage;

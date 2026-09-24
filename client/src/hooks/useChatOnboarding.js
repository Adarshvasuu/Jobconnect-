import { useState, useCallback, useRef } from 'react';
import { useAuth } from './useAuth';
import { useRole } from '../context/RoleContext';
import { authApi } from '../api/authApi';
import { USER_ROLES } from '../utils/constants';

/**
 * Custom hook to manage the conversational onboarding state machine.
 */
export const useChatOnboarding = (onCompleteRedirect) => {
  const { login } = useAuth();
  const { switchRole } = useRole();

  const [userType, setUserType] = useState(null); // 'seeker' | 'recruiter' | null
  const [step, setStep] = useState(0); // 0: landing, 1: name, 2: role/company, 3: exp/roles, 4: credentials, 5: completed
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [formData, setFormData] = useState({
    userType: '',
    name: '',
    targetRole: '',
    experience: '',
    company: '',
    hiringRoles: '',
    email: '',
    password: '',
  });

  const initialBotMessage = {
    id: 'msg-init',
    sender: 'bot',
    text: "Welcome to JobConnect. To get you to the right place, tell us what brings you here today:",
    type: 'branch_select',
    pills: [
      { id: 'seeker', label: "I'm looking for a job", icon: 'Search', role: USER_ROLES.SEEKER },
      { id: 'recruiter', label: "I'm looking to hire", icon: 'Building2', role: USER_ROLES.RECRUITER }
    ],
    timestamp: new Date()
  };

  const [messages, setMessages] = useState([initialBotMessage]);

  // Helper to add bot message with typing indicator delay
  const pushBotMessage = useCallback((msgObj, delayMs = 600) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}-${Math.random()}`,
          sender: 'bot',
          timestamp: new Date(),
          ...msgObj,
        },
      ]);
      setIsTyping(false);
    }, delayMs);
  }, []);

  // Helper to add user message
  const pushUserMessage = useCallback((text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}-${Math.random()}`,
        sender: 'user',
        text,
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Step 1: Select Branch
  const selectBranch = useCallback((type) => {
    setUserType(type);
    setFormData((prev) => ({ ...prev, userType: type }));
    const label = type === USER_ROLES.SEEKER ? "I'm looking for a job" : "I'm looking to hire";
    pushUserMessage(label);

    setStep(1);
    if (type === USER_ROLES.SEEKER) {
      pushBotMessage({
        text: "Great to meet you! Let's get your profile set up. What is your full name?",
        type: 'text_input',
        inputField: 'name',
        placeholder: 'e.g. Alex Morgan',
      });
    } else {
      pushBotMessage({
        text: "Welcome! We're excited to help you find top talent. What is your full name?",
        type: 'text_input',
        inputField: 'name',
        placeholder: 'e.g. Sarah Jenkins',
      });
    }
  }, [pushUserMessage, pushBotMessage]);

  // Handle Text Submission from bottom input bar or inline input
  const handleSendText = useCallback((text) => {
    if (!text || !text.trim() || isTyping || isSubmitting) return;
    const cleanText = text.trim();
    pushUserMessage(cleanText);

    if (userType === USER_ROLES.SEEKER) {
      if (step === 1) {
        // Saving Name -> Asking for target role
        setFormData((prev) => ({ ...prev, name: cleanText }));
        setStep(2);
        pushBotMessage({
          text: `Nice to meet you, ${cleanText.split(' ')[0]}! What type of role or domain are you targeting?`,
          type: 'text_input',
          inputField: 'targetRole',
          placeholder: 'e.g., Full Stack Engineer, Product Designer',
        });
      } else if (step === 2) {
        // Saving Target Role -> Asking for experience
        setFormData((prev) => ({ ...prev, targetRole: cleanText }));
        setStep(3);
        pushBotMessage({
          text: "How many years of professional experience do you have in this field?",
          type: 'pills_input',
          inputField: 'experience',
          pills: [
            { id: '0-2', label: '0 – 2 years (Junior / Entry)' },
            { id: '3-5', label: '3 – 5 years (Mid-Level)' },
            { id: '5+', label: '5+ years (Senior / Lead)' }
          ],
        });
      } else if (step === 3) {
        // Saving Experience -> Asking for credentials
        setFormData((prev) => ({ ...prev, experience: cleanText }));
        setStep(4);
        pushBotMessage({
          text: "Almost there! Create your secure credentials to finalize your verified profile.",
          type: 'credentials_card',
        });
      }
    } else if (userType === USER_ROLES.RECRUITER) {
      if (step === 1) {
        // Saving Name -> Asking for company
        setFormData((prev) => ({ ...prev, name: cleanText }));
        setStep(2);
        pushBotMessage({
          text: `Great, ${cleanText.split(' ')[0]}! Which company or organization are you hiring for?`,
          type: 'text_input',
          inputField: 'company',
          placeholder: 'e.g., Stripe, Figma, Acme Corp',
        });
      } else if (step === 2) {
        // Saving Company -> Asking for hiring needs
        setFormData((prev) => ({ ...prev, company: cleanText }));
        setStep(3);
        pushBotMessage({
          text: `What key roles or skillsets are you actively looking to fill at ${cleanText}?`,
          type: 'text_input',
          inputField: 'hiringRoles',
          placeholder: 'e.g., React Engineers, Backend Architects, PMs',
        });
      } else if (step === 3) {
        // Saving Hiring Roles -> Asking for credentials
        setFormData((prev) => ({ ...prev, hiringRoles: cleanText }));
        setStep(4);
        pushBotMessage({
          text: "Perfect! Create your recruiter workspace credentials to begin posting and reviewing candidates.",
          type: 'credentials_card',
        });
      }
    }
  }, [userType, step, isTyping, isSubmitting, pushUserMessage, pushBotMessage]);

  // Handle Pill Selection for Experience or Choices
  const selectPill = useCallback((pill) => {
    if (step === 3 && userType === USER_ROLES.SEEKER) {
      setFormData((prev) => ({ ...prev, experience: pill.label }));
      pushUserMessage(pill.label);
      setStep(4);
      pushBotMessage({
        text: "Awesome! Create your credentials below to generate your personalized job recommendations and profile.",
        type: 'credentials_card',
      });
    }
  }, [step, userType, pushUserMessage, pushBotMessage]);

  // Submit Credentials and Complete Registration
  const submitCredentials = useCallback(async ({ email, password }) => {
    setIsSubmitting(true);
    const updatedPayload = {
      ...formData,
      email,
      password,
      role: userType || USER_ROLES.SEEKER,
    };

    setFormData(updatedPayload);

    try {
      // Call authentication / registration API
      const res = await authApi.register({
        name: updatedPayload.name,
        email: updatedPayload.email,
        password: updatedPayload.password,
        role: updatedPayload.role,
        targetRole: updatedPayload.targetRole,
        experience: updatedPayload.experience,
        company: updatedPayload.company,
        hiringRoles: updatedPayload.hiringRoles,
      });

      // Login to context
      if (res?.user) {
        login(res.user, res.token);
        switchRole(res.user.role);
      }
    } catch (err) {
      console.warn('API registration fallback mode triggered:', err);
      // Fallback mock login for offline / demo mode
      login({
        id: `usr-${Date.now()}`,
        name: updatedPayload.name || 'Demo User',
        email: updatedPayload.email,
        role: updatedPayload.role,
      }, 'mock-jwt-token-xyz');
      switchRole(updatedPayload.role);
    } finally {
      setIsSubmitting(false);
      setStep(5);
      setIsComplete(true);
      pushBotMessage({
        text: `Your ${userType === USER_ROLES.RECRUITER ? 'recruiter workspace' : 'job seeker profile'} has been initialized!`,
        type: 'completion_state',
        payload: updatedPayload,
      }, 400);
    }
  }, [formData, userType, login, switchRole, pushBotMessage]);

  // Reset conversation to start over
  const resetChat = useCallback(() => {
    setUserType(null);
    setStep(0);
    setIsComplete(false);
    setFormData({
      userType: '',
      name: '',
      targetRole: '',
      experience: '',
      company: '',
      hiringRoles: '',
      email: '',
      password: '',
    });
    setMessages([initialBotMessage]);
  }, []);

  return {
    userType,
    step,
    messages,
    formData,
    isTyping,
    isSubmitting,
    isComplete,
    selectBranch,
    handleSendText,
    selectPill,
    submitCredentials,
    resetChat,
  };
};

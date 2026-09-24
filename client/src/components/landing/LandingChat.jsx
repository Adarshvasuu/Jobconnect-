import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Send,
  Briefcase,
  Building2,
  Lock,
  Mail,
  User,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Eye,
  EyeOff,
  ShieldCheck,
  ChevronRight,
  Bot,
  FileText
} from 'lucide-react';
import { useChatOnboarding } from '../../hooks/useChatOnboarding';
import { USER_ROLES } from '../../utils/constants';
import HeroBackground from './HeroBackground';

export const LandingChat = ({ onNavigateToShowcase }) => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [inputVal, setInputVal] = useState('');
  const [credEmail, setCredEmail] = useState('');
  const [credPassword, setCredPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [credError, setCredError] = useState('');

  const {
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
  } = useChatOnboarding();

  // Scroll to bottom smoothly on message change or typing state change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus bottom input when text input step activates
  useEffect(() => {
    if (step > 0 && step < 4) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [step]);

  const onSend = (e) => {
    e?.preventDefault();
    if (!inputVal.trim() || isTyping || step === 0 || step >= 4) return;
    handleSendText(inputVal);
    setInputVal('');
  };

  const handleCredentialsSubmit = (e) => {
    e?.preventDefault();
    setCredError('');

    if (!credEmail || !credEmail.includes('@')) {
      setCredError('Please provide a valid email address.');
      return;
    }
    if (!credPassword || credPassword.length < 6) {
      setCredError('Password must be at least 6 characters.');
      return;
    }

    submitCredentials({ email: credEmail, password: credPassword });
  };

  const navigateToDashboard = () => {
    if (userType === USER_ROLES.RECRUITER) {
      navigate('/recruiter/dashboard');
    } else {
      navigate('/seeker/dashboard');
    }
  };

  // Dynamic input placeholder
  const getInputPlaceholder = () => {
    if (step === 0) return 'Select an option above to begin...';
    if (step === 1) return 'Type your full name and press Enter...';
    if (step === 2 && userType === USER_ROLES.SEEKER) return 'e.g. Full Stack Engineer, Product Designer...';
    if (step === 2 && userType === USER_ROLES.RECRUITER) return 'e.g. Stripe, OpenAI, Acme Corp...';
    if (step === 3 && userType === USER_ROLES.RECRUITER) return 'e.g. Senior Frontend Dev, Tech Lead...';
    if (step >= 4) return 'Complete the prompt above...';
    return 'Type your response & press Enter...';
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: 'transparent',
        color: '#0F172A',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        overflowX: 'hidden',
      }}
    >
      {/* 2. Top Floating Header Bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backgroundColor: 'transparent',
          padding: '18px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '840px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 16px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
          }}
        >
          {/* Brand Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: '#0F172A',
            }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.35)',
              }}
            >
              <Briefcase size={18} color="#FFFFFF" />
            </div>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#0F172A' }}>
              Job<span style={{ color: '#2563EB' }}>Connect</span>
            </span>
          </Link>

          {/* Assistant Active Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#1E40AF',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.06)',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                boxShadow: '0 0 8px #10B981',
              }}
            />
            <span>AI Onboarding Flow</span>
          </div>

          {/* Action Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => navigate('/analyze-resume')}
              style={{ background: 'linear-gradient(110deg,#4679ec,#765de8)', border: 0, color: '#fff', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 15px', borderRadius: '9999px', boxShadow: '0 5px 16px rgba(50,90,190,.2)' }}
            ><FileText size={14}/><span>Analyze My Resume</span></button>
            {onNavigateToShowcase && (
              <button
                onClick={onNavigateToShowcase}
                style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.25)',
                  color: '#2563EB',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  transition: 'all 0.2s',
                }}
              >
                <Sparkles size={14} />
                <span>3D Showcase</span>
              </button>
            )}

            <button
              onClick={resetChat}
              title="Restart Conversation"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748B',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.82rem',
                fontWeight: 600,
                padding: '6px 10px',
                borderRadius: '8px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#0F172A')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
            >
              <RefreshCw size={13} />
              <span>Reset</span>
            </button>

            <Link
              to="/login"
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#0F172A',
                textDecoration: 'none',
                padding: '6px 16px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease',
              }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* 3. Main Conversational Canvas */}
      <main
        style={{
          position: 'relative',
          flex: 1,
          maxWidth: '740px',
          width: '100%',
          margin: '0 auto',
          padding: '36px 20px 140px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10,
        }}
      >
        {/* Subtle Greeting Heading */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              color: '#1E40AF',
              fontSize: '0.82rem',
              fontWeight: 700,
              marginBottom: '12px',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.08)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Sparkles size={14} color="#2563EB" /> Conversational Matchmaker
          </div>

          <h1
            style={{
              fontSize: '2.4rem',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: '#0F172A',
              margin: '0 0 8px',
            }}
          >
            Connect without friction.
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#475569', margin: 0, fontWeight: 500 }}>
            Experience an AI-driven, streamlined onboarding tailored directly to your goals.
          </p>
        </div>

        {/* Message Stream */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  width: '100%',
                }}
              >
                {/* Bot / User Message Row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    maxWidth: msg.sender === 'user' ? '80%' : '92%',
                  }}
                >
                  {/* Bot Avatar */}
                  {msg.sender === 'bot' && (
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '10px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#2563EB',
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      <Bot size={18} />
                    </div>
                  )}

                  {/* Message Bubble Card */}
                  <div
                    style={{
                      padding: msg.type === 'credentials_card' || msg.type === 'completion_state' ? '22px' : '15px 20px',
                      borderRadius: msg.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                      backgroundColor:
                        msg.sender === 'user'
                          ? '#2563EB'
                          : 'rgba(255, 255, 255, 0.92)',
                      backdropFilter: msg.sender === 'user' ? 'none' : 'blur(20px)',
                      WebkitBackdropFilter: msg.sender === 'user' ? 'none' : 'blur(20px)',
                      border: msg.sender === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.9)',
                      boxShadow:
                        msg.sender === 'user'
                          ? '0 6px 20px rgba(37, 99, 235, 0.35)'
                          : '0 10px 30px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(0,0,0,0.04)',
                      color: msg.sender === 'user' ? '#FFFFFF' : '#0F172A',
                      fontSize: '0.98rem',
                      fontWeight: 500,
                      lineHeight: 1.6,
                      width: msg.type === 'credentials_card' || msg.type === 'completion_state' ? '100%' : 'auto',
                    }}
                  >
                    <div>{msg.text}</div>

                    {/* Step 1: Branch Selection Cards */}
                    {msg.type === 'branch_select' && step === 0 && (
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                          gap: '12px',
                          marginTop: '16px',
                        }}
                      >
                        <motion.button
                          whileHover={{ scale: 1.02, backgroundColor: '#FFFFFF', borderColor: '#3B82F6' }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => selectBranch(USER_ROLES.SEEKER)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '16px',
                            borderRadius: '14px',
                            backgroundColor: 'rgba(255, 255, 255, 0.85)',
                            border: '1px solid rgba(226, 232, 240, 0.9)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                            color: '#0F172A',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <div
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '10px',
                              backgroundColor: 'rgba(59, 130, 246, 0.12)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#2563EB',
                              flexShrink: 0,
                            }}
                          >
                            <Briefcase size={20} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>I'm looking for a job</div>
                            <div style={{ fontSize: '0.78rem', color: '#64748B' }}>Explore verified roles & apply</div>
                          </div>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02, backgroundColor: '#FFFFFF', borderColor: '#2563EB' }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => selectBranch(USER_ROLES.RECRUITER)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '16px',
                            borderRadius: '14px',
                            backgroundColor: 'rgba(255, 255, 255, 0.85)',
                            border: '1px solid rgba(226, 232, 240, 0.9)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                            color: '#0F172A',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <div
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '10px',
                              backgroundColor: 'rgba(37, 99, 235, 0.12)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#1D4ED8',
                              flexShrink: 0,
                            }}
                          >
                            <Building2 size={20} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>I'm looking to hire</div>
                            <div style={{ fontSize: '0.78rem', color: '#64748B' }}>Post jobs & discover talent</div>
                          </div>
                        </motion.button>
                      </div>
                    )}

                    {/* Step 3 (Seeker): Experience Pills */}
                    {msg.type === 'pills_input' && step === 3 && (
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '10px',
                          marginTop: '14px',
                        }}
                      >
                        {msg.pills?.map((pill) => (
                          <motion.button
                            key={pill.id}
                            whileHover={{ scale: 1.03, borderColor: '#2563EB', backgroundColor: '#EFF6FF' }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => selectPill(pill)}
                            style={{
                              padding: '10px 18px',
                              borderRadius: '9999px',
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #CBD5E1',
                              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                              color: '#0F172A',
                              fontSize: '0.88rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            <span>{pill.label}</span>
                            <ChevronRight size={14} color="#2563EB" />
                          </motion.button>
                        ))}
                      </div>
                    )}

                    {/* Step 4: Inline Credentials Card */}
                    {msg.type === 'credentials_card' && !isComplete && (
                      <form
                        onSubmit={handleCredentialsSubmit}
                        style={{
                          marginTop: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '14px',
                        }}
                      >
                        {credError && (
                          <div
                            style={{
                              padding: '10px 14px',
                              borderRadius: '10px',
                              backgroundColor: 'rgba(239, 68, 68, 0.1)',
                              border: '1px solid rgba(239, 68, 68, 0.3)',
                              color: '#DC2626',
                              fontSize: '0.85rem',
                              fontWeight: 600,
                            }}
                          >
                            {credError}
                          </div>
                        )}

                        {/* Email Field */}
                        <div>
                          <label
                            style={{
                              display: 'block',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              color: '#475569',
                              marginBottom: '6px',
                              textTransform: 'uppercase',
                              letterSpacing: '0.04em',
                            }}
                          >
                            {userType === USER_ROLES.RECRUITER ? 'Work Email' : 'Email Address'}
                          </label>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #CBD5E1',
                              borderRadius: '12px',
                              padding: '0 14px',
                              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
                            }}
                          >
                            <Mail size={16} color="#64748B" />
                            <input
                              type="email"
                              value={credEmail}
                              onChange={(e) => setCredEmail(e.target.value)}
                              placeholder={userType === USER_ROLES.RECRUITER ? 'sarah@company.com' : 'alex@domain.com'}
                              required
                              style={{
                                width: '100%',
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                color: '#0F172A',
                                padding: '12px 10px',
                                fontSize: '0.92rem',
                                fontWeight: 500,
                              }}
                            />
                          </div>
                        </div>

                        {/* Password Field */}
                        <div>
                          <label
                            style={{
                              display: 'block',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              color: '#475569',
                              marginBottom: '6px',
                              textTransform: 'uppercase',
                              letterSpacing: '0.04em',
                            }}
                          >
                            Create Password
                          </label>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #CBD5E1',
                              borderRadius: '12px',
                              padding: '0 14px',
                              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
                            }}
                          >
                            <Lock size={16} color="#64748B" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={credPassword}
                              onChange={(e) => setCredPassword(e.target.value)}
                              placeholder="Minimum 6 characters"
                              required
                              style={{
                                width: '100%',
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                color: '#0F172A',
                                padding: '12px 10px',
                                fontSize: '0.92rem',
                                fontWeight: 500,
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#64748B',
                                cursor: 'pointer',
                                padding: 0,
                              }}
                            >
                              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="metallic-btn metallic-btn-primary"
                          style={{
                            width: '100%',
                            padding: '13px 20px',
                            marginTop: '6px',
                            fontSize: '0.95rem',
                          }}
                        >
                          {isSubmitting ? (
                            <>
                              <RefreshCw size={16} className="spin" />
                              <span>Initializing Profile...</span>
                            </>
                          ) : (
                            <>
                              <span>Complete Registration</span>
                              <ArrowRight size={16} />
                            </>
                          )}
                        </motion.button>
                      </form>
                    )}

                    {/* Step 5: Completion State Card */}
                    {msg.type === 'completion_state' && (
                      <div style={{ marginTop: '16px' }}>
                        {/* Animated Checklist */}
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            backgroundColor: 'rgba(239, 246, 255, 0.7)',
                            padding: '18px',
                            borderRadius: '14px',
                            border: '1px solid rgba(59, 130, 246, 0.25)',
                            marginBottom: '16px',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#059669', fontSize: '0.9rem', fontWeight: 600 }}>
                            <CheckCircle2 size={18} />
                            <span style={{ color: '#0F172A' }}>Verified account created for <strong>{formData.name}</strong></span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#059669', fontSize: '0.9rem', fontWeight: 600 }}>
                            <CheckCircle2 size={18} />
                            <span style={{ color: '#0F172A' }}>
                              {userType === USER_ROLES.RECRUITER
                                ? `Recruiter workspace configured for ${formData.company || 'your organization'}`
                                : `Target role set to ${formData.targetRole || 'Full Stack'}`}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#059669', fontSize: '0.9rem', fontWeight: 600 }}>
                            <CheckCircle2 size={18} />
                            <span style={{ color: '#0F172A' }}>Personalized dashboard workspace initialized</span>
                          </div>
                        </div>

                        {/* Direct Dashboard Launch CTA */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={navigateToDashboard}
                          className="metallic-btn metallic-btn-primary"
                          style={{
                            width: '100%',
                            padding: '15px 24px',
                            fontSize: '1rem',
                            fontWeight: 800,
                          }}
                        >
                          <span>Enter Your Dashboard</span>
                          <ArrowRight size={18} />
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2563EB',
                }}
              >
                <Bot size={18} />
              </div>
              <div
                style={{
                  padding: '12px 18px',
                  borderRadius: '20px 20px 20px 4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  border: '1px solid rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span className="dot-pulse" style={{ animationDelay: '0ms' }} />
                <span className="dot-pulse" style={{ animationDelay: '200ms' }} />
                <span className="dot-pulse" style={{ animationDelay: '400ms' }} />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* 4. Floating Bottom Input Bar */}
      <footer
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: 'transparent',
          padding: '0 20px 20px',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            maxWidth: '740px',
            margin: '0 auto',
            width: '100%',
            pointerEvents: 'auto',
          }}
        >
          <form
            onSubmit={onSend}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              borderRadius: '20px',
              padding: '8px 10px 8px 20px',
              boxShadow: '0 12px 36px rgba(15, 23, 42, 0.12), 0 2px 6px rgba(0,0,0,0.04)',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={getInputPlaceholder()}
              disabled={step === 0 || step >= 4 || isTyping || isSubmitting}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#0F172A',
                fontSize: '0.95rem',
                fontWeight: 500,
                padding: '8px 0',
                cursor: step === 0 || step >= 4 ? 'not-allowed' : 'text',
              }}
            />

            <button
              type="submit"
              disabled={!inputVal.trim() || step === 0 || step >= 4 || isTyping || isSubmitting}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: inputVal.trim() && step > 0 && step < 4 ? '#2563EB' : 'rgba(226, 232, 240, 0.8)',
                border: 'none',
                color: inputVal.trim() && step > 0 && step < 4 ? '#FFFFFF' : '#94A3B8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: inputVal.trim() && step > 0 && step < 4 ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
            >
              <Send size={16} />
            </button>
          </form>

          {/* Micro Footer Note */}
          <div
            style={{
              textAlign: 'center',
              marginTop: '8px',
              fontSize: '0.75rem',
              color: '#64748B',
              fontWeight: 500,
            }}
          >
            Press <strong>Enter ↵</strong> to submit • Real-time AI recruitment matchmaker
          </div>
        </div>
      </footer>

      {/* Global CSS for dot pulse animation */}
      <style>{`
        .dot-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #2563EB;
          display: inline-block;
          animation: pulse 1.2s infinite ease-in-out;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(0.6); opacity: 0.4; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LandingChat;

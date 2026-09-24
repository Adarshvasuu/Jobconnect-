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
  Bot
} from 'lucide-react';
import { useChatOnboarding } from '../../hooks/useChatOnboarding';
import { USER_ROLES } from '../../utils/constants';

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
        background: 'radial-gradient(circle at 50% 0%, #1e1b4b 0%, #09090b 60%, #050507 100%)',
        color: '#f4f4f5',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        overflowX: 'hidden',
      }}
    >
      {/* Background Ambient Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 75%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Top Header Bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(9, 9, 11, 0.75)',
          borderBottom: '1px solid rgba(39, 39, 42, 0.8)',
          padding: '14px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
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
              color: '#ffffff',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(99, 102, 241, 0.4)',
              }}
            >
              <Briefcase size={17} color="#ffffff" />
            </div>
            <span style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Job<span style={{ color: '#818cf8' }}>Connect</span>
            </span>
          </Link>

          {/* Assistant Active Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 12px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(24, 24, 27, 0.8)',
              border: '1px solid rgba(63, 63, 70, 0.5)',
              fontSize: '0.8rem',
              color: '#a1a1aa',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 8px #10b981',
              }}
            />
            <span>AI Onboarding Flow</span>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {onNavigateToShowcase && (
              <button
                onClick={onNavigateToShowcase}
                style={{
                  background: 'rgba(59, 130, 246, 0.15)',
                  border: '1px solid rgba(59, 130, 246, 0.35)',
                  color: '#93c5fd',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  transition: 'all 0.2s',
                }}
              >
                <Sparkles size={13} />
                <span>WebGL Showcase</span>
              </button>
            )}

            <button
              onClick={resetChat}
              title="Restart Conversation"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#71717a',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.8rem',
                padding: '4px 8px',
                borderRadius: '6px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#e4e4e7')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#71717a')}
            >
              <RefreshCw size={13} />
              <span>Reset</span>
            </button>
            <Link
              to="/login"
              style={{
                fontSize: '0.85rem',
                fontWeight: 500,
                color: '#d4d4d8',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(39, 39, 42, 0.6)',
                border: '1px solid rgba(63, 63, 70, 0.5)',
                transition: 'all 0.2s ease',
              }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Conversational Canvas */}
      <main
        style={{
          flex: 1,
          maxWidth: '720px',
          width: '100%',
          margin: '0 auto',
          padding: '40px 20px 140px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10,
        }}
      >
        {/* Subtle Greeting Heading */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(99, 102, 241, 0.12)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              color: '#c7d2fe',
              fontSize: '0.8rem',
              fontWeight: 600,
              marginBottom: '12px',
            }}
          >
            <Sparkles size={13} /> Intelligent Conversational Matchmaker
          </div>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: '0 0 8px',
            }}
          >
            Connect without friction.
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#a1a1aa', margin: 0 }}>
            Experience an AI-driven, streamlined onboarding tailored directly to your goals.
          </p>
        </div>

        {/* Message Stream */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                {/* Bot / User Row */}
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
                        width: '32px',
                        height: '32px',
                        borderRadius: '10px',
                        backgroundColor: '#18181b',
                        border: '1px solid #27272a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#818cf8',
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      <Bot size={17} />
                    </div>
                  )}

                  {/* Message Bubble Card */}
                  <div
                    style={{
                      padding: msg.type === 'credentials_card' || msg.type === 'completion_state' ? '20px' : '14px 18px',
                      borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      backgroundColor:
                        msg.sender === 'user'
                          ? '#4f46e5'
                          : msg.type === 'credentials_card' || msg.type === 'completion_state'
                          ? '#121215'
                          : '#18181b',
                      border: msg.sender === 'user' ? 'none' : '1px solid #27272a',
                      boxShadow: msg.sender === 'user' ? '0 4px 14px rgba(79, 70, 229, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.3)',
                      color: msg.sender === 'user' ? '#ffffff' : '#f4f4f5',
                      fontSize: '0.95rem',
                      lineHeight: 1.55,
                      width: msg.type === 'credentials_card' || msg.type === 'completion_state' ? '100%' : 'auto',
                    }}
                  >
                    <div>{msg.text}</div>

                    {/* Step 1: Branch Selection Pills */}
                    {msg.type === 'branch_select' && step === 0 && (
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                          gap: '12px',
                          marginTop: '16px',
                        }}
                      >
                        <motion.button
                          whileHover={{ scale: 1.02, backgroundColor: 'rgba(99, 102, 241, 0.15)', borderColor: '#6366f1' }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => selectBranch(USER_ROLES.SEEKER)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '14px 16px',
                            borderRadius: '12px',
                            backgroundColor: 'rgba(39, 39, 42, 0.7)',
                            border: '1px solid #3f3f46',
                            color: '#ffffff',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <div
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '8px',
                              backgroundColor: 'rgba(99, 102, 241, 0.2)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#a5b4fc',
                              flexShrink: 0,
                            }}
                          >
                            <Briefcase size={18} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>I'm looking for a job</div>
                            <div style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>Explore verified roles & apply</div>
                          </div>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02, backgroundColor: 'rgba(59, 130, 246, 0.15)', borderColor: '#3b82f6' }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => selectBranch(USER_ROLES.RECRUITER)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '14px 16px',
                            borderRadius: '12px',
                            backgroundColor: 'rgba(39, 39, 42, 0.7)',
                            border: '1px solid #3f3f46',
                            color: '#ffffff',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <div
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '8px',
                              backgroundColor: 'rgba(59, 130, 246, 0.2)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#93c5fd',
                              flexShrink: 0,
                            }}
                          >
                            <Building2 size={18} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>I'm looking to hire</div>
                            <div style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>Post jobs & discover candidates</div>
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
                            whileHover={{ scale: 1.03, borderColor: '#818cf8', backgroundColor: 'rgba(99, 102, 241, 0.2)' }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => selectPill(pill)}
                            style={{
                              padding: '8px 16px',
                              borderRadius: '9999px',
                              backgroundColor: 'rgba(39, 39, 42, 0.8)',
                              border: '1px solid #3f3f46',
                              color: '#e4e4e7',
                              fontSize: '0.85rem',
                              fontWeight: 500,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            <span>{pill.label}</span>
                            <ChevronRight size={13} color="#818cf8" />
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
                              padding: '8px 12px',
                              borderRadius: '8px',
                              backgroundColor: 'rgba(239, 68, 68, 0.15)',
                              border: '1px solid rgba(239, 68, 68, 0.3)',
                              color: '#fca5a5',
                              fontSize: '0.82rem',
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
                              fontWeight: 600,
                              color: '#a1a1aa',
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
                              backgroundColor: '#09090b',
                              border: '1px solid #27272a',
                              borderRadius: '10px',
                              padding: '0 12px',
                            }}
                          >
                            <Mail size={16} color="#71717a" />
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
                                color: '#ffffff',
                                padding: '12px 10px',
                                fontSize: '0.9rem',
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
                              fontWeight: 600,
                              color: '#a1a1aa',
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
                              backgroundColor: '#09090b',
                              border: '1px solid #27272a',
                              borderRadius: '10px',
                              padding: '0 12px',
                            }}
                          >
                            <Lock size={16} color="#71717a" />
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
                                color: '#ffffff',
                                padding: '12px 10px',
                                fontSize: '0.9rem',
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#71717a',
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
                          style={{
                            marginTop: '6px',
                            padding: '12px 20px',
                            borderRadius: '10px',
                            backgroundColor: '#4f46e5',
                            border: 'none',
                            color: '#ffffff',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)',
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
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            padding: '16px',
                            borderRadius: '12px',
                            border: '1px solid #27272a',
                            marginBottom: '16px',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', fontSize: '0.88rem' }}>
                            <CheckCircle2 size={16} />
                            <span style={{ color: '#e4e4e7' }}>Verified account created for <strong>{formData.name}</strong></span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', fontSize: '0.88rem' }}>
                            <CheckCircle2 size={16} />
                            <span style={{ color: '#e4e4e7' }}>
                              {userType === USER_ROLES.RECRUITER
                                ? `Recruiter workspace configured for ${formData.company || 'your organization'}`
                                : `Target role set to ${formData.targetRole || 'Full Stack'}`}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', fontSize: '0.88rem' }}>
                            <CheckCircle2 size={16} />
                            <span style={{ color: '#e4e4e7' }}>Personalized dashboard workspace initialized</span>
                          </div>
                        </div>

                        {/* Direct CTA */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={navigateToDashboard}
                          style={{
                            width: '100%',
                            padding: '14px 24px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)',
                            border: 'none',
                            color: '#ffffff',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: '0 8px 24px rgba(79, 70, 229, 0.45)',
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
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  backgroundColor: '#18181b',
                  border: '1px solid #27272a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#818cf8',
                }}
              >
                <Bot size={17} />
              </div>
              <div
                style={{
                  padding: '12px 18px',
                  borderRadius: '18px 18px 18px 4px',
                  backgroundColor: '#18181b',
                  border: '1px solid #27272a',
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

      {/* Anchored Bottom Input Bar */}
      <footer
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(9, 9, 11, 0.85)',
          borderTop: '1px solid rgba(39, 39, 42, 0.8)',
          padding: '16px 20px',
        }}
      >
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <form
            onSubmit={onSend}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#18181b',
              border: '1px solid #27272a',
              borderRadius: '16px',
              padding: '6px 8px 6px 16px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
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
                color: '#ffffff',
                fontSize: '0.95rem',
                padding: '6px 0',
                cursor: step === 0 || step >= 4 ? 'not-allowed' : 'text',
              }}
            />

            <button
              type="submit"
              disabled={!inputVal.trim() || step === 0 || step >= 4 || isTyping || isSubmitting}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: inputVal.trim() && step > 0 && step < 4 ? '#4f46e5' : 'rgba(39, 39, 42, 0.6)',
                border: 'none',
                color: inputVal.trim() && step > 0 && step < 4 ? '#ffffff' : '#71717a',
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
              fontSize: '0.73rem',
              color: '#71717a',
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
          background-color: #818cf8;
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

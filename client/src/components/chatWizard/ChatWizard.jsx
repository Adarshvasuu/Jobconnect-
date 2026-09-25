import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import ChatInputText from './ChatInputText';
import ChatInputTags from './ChatInputTags';
import ChatInputFile from './ChatInputFile';
import ChatProgressBar from './ChatProgressBar';
import { RotateCcw, CheckCircle2, Bot, Sparkles } from 'lucide-react';
import Button from '../common/Button';

export const ChatWizard = ({ config = [], onComplete, title = 'Conversational Setup' }) => {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const chatBottomRef = useRef(null);

  // Initialize bot with first question
  useEffect(() => {
    if (config.length > 0 && messages.length === 0) {
      setIsBotTyping(true);
      const timer = setTimeout(() => {
        setMessages([
          {
            sender: 'bot',
            message: config[0].bot,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setIsBotTyping(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [config, messages.length]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]);

  const handleUserAnswer = (userResponse) => {
    const activeQuestion = config[currentStep];
    const newAnswers = { ...answers, [activeQuestion.id]: userResponse };
    setAnswers(newAnswers);

    // Add user bubble
    const userBubble = {
      sender: 'user',
      message: typeof userResponse === 'string' ? userResponse : JSON.stringify(userResponse),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userBubble]);

    const nextStep = currentStep + 1;
    if (nextStep < config.length) {
      setCurrentStep(nextStep);
      setIsBotTyping(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            message: config[nextStep].bot,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setIsBotTyping(false);
      }, 500);
    } else {
      // Wizard Complete
      setIsBotTyping(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            message: "You're all set! Your profile configuration is complete and saved.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setIsBotTyping(false);
        setIsCompleted(true);
        if (onComplete) {
          onComplete(newAnswers);
        }
      }, 500);
    }
  };

  const handleUndo = () => {
    if (currentStep > 0 && !isCompleted) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      // Remove last user and last bot message
      setMessages((prev) => prev.slice(0, prev.length - 2));
    }
  };

  const activeQuestion = config[currentStep];

  return (
    <div
      style={{
        maxWidth: '740px',
        margin: '0 auto',
        padding: '30px',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '580px',
        backgroundColor: '#FFFFFF',
        border: '1.5px solid #E2E8F0',
        boxShadow: '0 20px 45px -12px rgba(15, 23, 42, 0.12), 0 4px 16px rgba(15, 23, 42, 0.04)',
      }}
    >
      {/* Header and Progress */}
      <div style={{ marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
            }}
          >
            <Sparkles size={18} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0, color: '#0F172A' }}>{title}</h2>
            <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 500 }}>
              AI Guided Experience
            </span>
          </div>
        </div>

        {currentStep > 0 && !isCompleted && (
          <Button variant="ghost" size="sm" onClick={handleUndo} icon={RotateCcw}>
            Undo
          </Button>
        )}
      </div>

      <ChatProgressBar currentStep={currentStep} totalSteps={config.length} />

      {/* Message Stream with dedicated soft slate contrast background */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '18px 16px',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '340px',
          maxHeight: '460px',
          backgroundColor: '#F1F5F9',
          borderRadius: '18px',
          border: '1px solid #E2E8F0',
          boxShadow: 'inset 0 2px 4px rgba(15, 23, 42, 0.03)',
        }}
      >
        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            sender={msg.sender}
            message={msg.message}
            timestamp={msg.timestamp}
          />
        ))}

        {isBotTyping && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              backgroundColor: '#FFFFFF',
              borderRadius: '18px',
              border: '1px solid #CBD5E1',
              boxShadow: '0 2px 6px rgba(15, 23, 42, 0.06)',
              width: 'fit-content',
              margin: '8px 0',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#2563EB',
                animation: 'pulseSlow 1s infinite',
              }}
            />
            <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>
              Assistant is typing...
            </span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Interactive Input Section */}
      <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
        {!isCompleted && activeQuestion && !isBotTyping && (
          <>
            {activeQuestion.type === 'text' && (
              <ChatInputText
                type="text"
                placeholder={activeQuestion.placeholder}
                onSubmit={handleUserAnswer}
              />
            )}
            {activeQuestion.type === 'number' && (
              <ChatInputText
                type="number"
                placeholder={activeQuestion.placeholder}
                onSubmit={handleUserAnswer}
              />
            )}
            {activeQuestion.type === 'tags' && (
              <ChatInputTags
                defaultTags={activeQuestion.defaultTags}
                placeholder={activeQuestion.placeholder}
                onSubmit={handleUserAnswer}
              />
            )}
            {activeQuestion.type === 'file' && (
              <ChatInputFile
                onSubmit={handleUserAnswer}
                onSkip={() => handleUserAnswer('Skipped resume')}
              />
            )}
          </>
        )}

        {isCompleted && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              size="lg"
              icon={CheckCircle2}
              onClick={() => onComplete && onComplete(answers)}
            >
              Go to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWizard;

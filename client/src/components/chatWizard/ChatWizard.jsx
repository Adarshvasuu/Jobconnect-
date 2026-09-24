import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import ChatInputText from './ChatInputText';
import ChatInputTags from './ChatInputTags';
import ChatInputFile from './ChatInputFile';
import ChatProgressBar from './ChatProgressBar';
import { RotateCcw, CheckCircle2 } from 'lucide-react';
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
            message: "🎉 You're all set! Your profile has been configured and saved.",
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
      className="glass-panel"
      style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: '28px',
        borderRadius: 'var(--radius-xl)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '560px',
        border: '1px solid var(--border-hover)',
        boxShadow: 'var(--shadow-lg), var(--shadow-glow)',
      }}
    >
      {/* Header and Progress */}
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.4rem', margin: 0 }}>{title}</h2>
        {currentStep > 0 && !isCompleted && (
          <Button variant="ghost" size="sm" onClick={handleUndo} icon={RotateCcw}>
            Undo
          </Button>
        )}
      </div>

      <ChatProgressBar currentStep={currentStep} totalSteps={config.length} />

      {/* Message Stream */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px 4px',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '320px',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Assistant is typing...</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Interactive Input Section */}
      <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
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

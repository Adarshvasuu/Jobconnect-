import React, { useState } from 'react';
import { Plus, X, Sparkles } from 'lucide-react';

export const SkillsManager = ({ initialSkills = ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'], onSkillsChange }) => {
  const [skills, setSkills] = useState(initialSkills);
  const [inputVal, setInputVal] = useState('');

  const suggestedSkills = ['Docker', 'AWS', 'Redis', 'GraphQL', 'TailwindCSS'].filter(
    (s) => !skills.includes(s)
  );

  const addSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      const updated = [...skills, skill];
      setSkills(updated);
      if (onSkillsChange) onSkillsChange(updated);
    }
  };

  const removeSkill = (skill) => {
    const updated = skills.filter((s) => s !== skill);
    setSkills(updated);
    if (onSkillsChange) onSkillsChange(updated);
  };

  return (
    <div
      style={{
        padding: '24px',
        borderRadius: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.95)',
        boxShadow: '0 8px 30px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
        Skills & Competencies
      </h3>

      {/* Active Skills Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        {skills.map((skill) => (
          <span
            key={skill}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: '#EFF6FF',
              color: '#1D4ED8',
              fontSize: '0.82rem',
              fontWeight: 700,
              border: '1px solid rgba(59, 130, 246, 0.25)',
              boxShadow: '0 1px 3px rgba(37, 99, 235, 0.08)',
            }}
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              style={{ background: 'transparent', border: 'none', color: '#60A5FA', cursor: 'pointer', padding: 0, display: 'flex' }}
            >
              <X size={13} />
            </button>
          </span>
        ))}
      </div>

      {/* Quick Add Input */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Add custom skill..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addSkill(inputVal.trim());
              setInputVal('');
            }
          }}
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            border: '1px solid #CBD5E1',
            borderRadius: '12px',
            padding: '10px 14px',
            color: '#0F172A',
            fontSize: '0.88rem',
            outline: 'none',
          }}
        />
        <button
          onClick={() => {
            addSkill(inputVal.trim());
            setInputVal('');
          }}
          style={{
            padding: '10px 16px',
            backgroundColor: '#2563EB',
            border: 'none',
            borderRadius: '12px',
            color: '#FFFFFF',
            cursor: 'pointer',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
          }}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Skill Suggestions */}
      {suggestedSkills.length > 0 && (
        <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 700, color: '#D97706', marginBottom: '8px' }}>
            <Sparkles size={14} /> In-demand in your target category:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {suggestedSkills.slice(0, 4).map((s) => (
              <button
                key={s}
                onClick={() => addSkill(s)}
                style={{
                  background: 'rgba(245, 158, 11, 0.08)',
                  border: '1px dashed rgba(245, 158, 11, 0.4)',
                  borderRadius: '9999px',
                  padding: '4px 12px',
                  color: '#B45309',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                + {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsManager;

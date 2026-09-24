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
    <div className="glass-panel" style={{ padding: '24px' }}>
      <h3 style={{ fontSize: '1.05rem', marginBottom: '14px' }}>Skills & Competencies</h3>

      {/* Active Skills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        {skills.map((skill) => (
          <span
            key={skill}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(99, 102, 241, 0.15)',
              color: '#c7d2fe',
              fontSize: '0.825rem',
              fontWeight: 600,
              border: '1px solid rgba(99, 102, 241, 0.3)',
            }}
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              style={{ background: 'transparent', border: 'none', color: '#c7d2fe', cursor: 'pointer', padding: 0 }}
            >
              <X size={12} />
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
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '8px 12px',
            color: 'var(--text-primary)',
            fontSize: '0.85rem',
            outline: 'none',
          }}
        />
        <button
          onClick={() => {
            addSkill(inputVal.trim());
            setInputVal('');
          }}
          style={{
            padding: '8px 14px',
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            fontSize: '0.85rem',
          }}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Skill Gap Suggestions based on market demand */}
      {suggestedSkills.length > 0 && (
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.785rem', color: 'var(--accent-amber)', marginBottom: '8px' }}>
            <Sparkles size={14} /> In-demand in your target category:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {suggestedSkills.slice(0, 4).map((s) => (
              <button
                key={s}
                onClick={() => addSkill(s)}
                style={{
                  background: 'transparent',
                  border: '1px dashed var(--border-hover)',
                  borderRadius: 'var(--radius-full)',
                  padding: '3px 10px',
                  color: 'var(--text-secondary)',
                  fontSize: '0.75rem',
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

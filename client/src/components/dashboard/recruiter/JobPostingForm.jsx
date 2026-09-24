import React, { useState } from 'react';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import { JOB_TYPES, EXPERIENCE_LEVELS } from '../../../utils/constants';
import { Plus, X, Briefcase, DollarSign, MapPin } from 'lucide-react';

export const JobPostingForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    company: initialData?.company || 'Nexus Cloud Technologies',
    category: initialData?.category || 'Engineering',
    type: initialData?.type || 'Full-time',
    experience: initialData?.experience || 'Mid-Level (3-5 yrs)',
    location: initialData?.location || '',
    salaryMin: initialData?.salary?.min || '',
    salaryMax: initialData?.salary?.max || '',
    currency: initialData?.salary?.currency || '₹',
    description: initialData?.description || '',
    skills: initialData?.skillsRequired || ['React', 'Node.js', 'MongoDB'],
  });

  const [skillInput, setSkillInput] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !formData.skills.includes(trimmed)) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      title: formData.title,
      company: formData.company,
      category: formData.category,
      type: formData.type,
      experience: formData.experience,
      location: formData.location,
      salary: {
        min: Number(formData.salaryMin) || 0,
        max: Number(formData.salaryMax) || 0,
        currency: formData.currency,
      },
      skillsRequired: formData.skills,
      description: formData.description,
      postedAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setSubmitting(false);
      if (onSubmit) onSubmit(payload);
    }, 600);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel"
      style={{
        padding: '32px',
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
        <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Create New Job Opportunity</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Publish your opening to candidates with automated rule-based skill overlap matching.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <InputField
          label="Job Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Senior MERN Stack Architect"
          required
        />
        <InputField
          label="Company Name"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="e.g. Nexus Cloud Technologies"
          required
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {/* Employment Type */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Employment Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={{
              padding: '10px 14px',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              outline: 'none',
            }}
          >
            {JOB_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Experience Level */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Experience Required
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            style={{
              padding: '10px 14px',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              outline: 'none',
            }}
          >
            {EXPERIENCE_LEVELS.map((exp) => (
              <option key={exp} value={exp}>{exp}</option>
            ))}
          </select>
        </div>

        <InputField
          label="Work Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g. Bangalore, India (Hybrid)"
          required
        />
      </div>

      {/* Salary Range */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        <InputField
          label="Min Salary / CTC"
          name="salaryMin"
          type="number"
          value={formData.salaryMin}
          onChange={handleChange}
          placeholder="e.g. 1500000"
        />
        <InputField
          label="Max Salary / CTC"
          name="salaryMax"
          type="number"
          value={formData.salaryMax}
          onChange={handleChange}
          placeholder="e.g. 2500000"
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Currency
          </label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            style={{
              padding: '10px 14px',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              outline: 'none',
            }}
          >
            <option value="₹">₹ (INR)</option>
            <option value="$">$ (USD)</option>
            <option value="€">€ (EUR)</option>
          </select>
        </div>
      </div>

      {/* Skills Required */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          Required Skills (Used for Rule-Based Match Scoring)
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
          {formData.skills.map((skill) => (
            <span
              key={skill}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                color: '#c7d2fe',
                fontSize: '0.8rem',
              }}
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                style={{ background: 'transparent', border: 'none', color: '#c7d2fe', cursor: 'pointer', padding: 0 }}
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Add a required skill and press Enter or Add..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSkill();
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
            type="button"
            onClick={handleAddSkill}
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontSize: '0.85rem',
            }}
          >
            Add
          </button>
        </div>
      </div>

      {/* Description */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          Detailed Role Description
        </label>
        <textarea
          name="description"
          rows={5}
          value={formData.description}
          onChange={handleChange}
          placeholder="Outline candidate responsibilities, expectations, and architecture requirements..."
          required
          style={{
            width: '100%',
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 14px',
            color: 'var(--text-primary)',
            fontSize: '0.9rem',
            fontFamily: 'var(--font-main)',
            outline: 'none',
            resize: 'vertical',
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
        <Button type="submit" loading={submitting}>
          Publish Job Posting
        </Button>
      </div>
    </form>
  );
};

export default JobPostingForm;

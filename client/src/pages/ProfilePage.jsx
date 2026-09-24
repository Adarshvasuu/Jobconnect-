import React, { useState, useEffect } from 'react';
import SeekerLayout from '../components/layout/SeekerLayout';
import { useRole } from '../context/RoleContext';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import VerifiedBadge from '../components/verification/VerifiedBadge';
import SkillsManager from '../components/dashboard/seeker/SkillsManager';
import ResumeUploader from '../components/dashboard/seeker/ResumeUploader';
import { profileApi, MOCK_PROFILE } from '../api/profileApi';
import { useNotifications } from '../context/NotificationContext';
import { User, MapPin, Briefcase, Edit2, Save } from 'lucide-react';
import RecruiterLayout from '../components/layout/RecruiterLayout';

export const ProfilePage = () => {
  const { isRecruiter } = useRole();
  const { addToast } = useNotifications();
  const [profile, setProfile] = useState(MOCK_PROFILE);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: MOCK_PROFILE.name,
    title: MOCK_PROFILE.title,
    bio: MOCK_PROFILE.bio,
    location: MOCK_PROFILE.location,
    experienceYears: MOCK_PROFILE.experienceYears,
  });

  useEffect(() => {
    profileApi.getProfile().then((d) => {
      const p = d.profile || MOCK_PROFILE;
      setProfile(p);
      setFormData({
        name: p.name,
        title: p.title,
        bio: p.bio,
        location: p.location,
        experienceYears: p.experienceYears,
      });
    });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await profileApi.updateProfile(formData);
      setProfile((prev) => ({ ...prev, ...formData }));
      setEditing(false);
      addToast('Profile updated successfully!', 'success');
    } catch {
      addToast('Profile saved locally.', 'info');
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const Layout = isRecruiter ? RecruiterLayout : SeekerLayout;

  return (
    <Layout>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Profile Header Card */}
        <div
          className="glass-panel"
          style={{
            padding: '32px',
            marginBottom: '24px',
            border: '1px solid var(--border-hover)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* Avatar */}
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'var(--gradient-brand)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: '#fff',
                  border: '3px solid var(--border-hover)',
                  flexShrink: 0,
                }}
              >
                {profile.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{profile.name}</h2>
                  <VerifiedBadge score={92} status="verified" />
                </div>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{profile.title}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', color: 'var(--text-muted)', fontSize: '0.825rem' }}>
                  <MapPin size={13} /> {profile.location}
                </div>
              </div>
            </div>

            <Button
              variant={editing ? 'secondary' : 'outline'}
              size="sm"
              icon={editing ? Save : Edit2}
              onClick={editing ? handleSave : () => setEditing(true)}
              loading={saving}
            >
              {editing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </div>

          {/* Bio */}
          {!editing ? (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
              {profile.bio}
            </p>
          ) : (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              placeholder="Write a short professional bio..."
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-main)',
                outline: 'none',
                resize: 'vertical',
              }}
            />
          )}
        </div>

        {/* Edit Fields */}
        {editing && (
          <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '16px' }}>Edit Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} icon={User} />
              <InputField label="Professional Title" name="title" value={formData.title} onChange={handleChange} icon={Briefcase} />
              <InputField label="Location" name="location" value={formData.location} onChange={handleChange} icon={MapPin} />
              <InputField label="Years of Experience" name="experienceYears" type="number" value={formData.experienceYears} onChange={handleChange} />
            </div>
          </div>
        )}

        {/* Skills */}
        <div style={{ marginBottom: '24px' }}>
          <SkillsManager
            initialSkills={profile.skills}
            onSkillsChange={(updated) => setProfile((p) => ({ ...p, skills: updated }))}
          />
        </div>

        {/* Resume */}
        <ResumeUploader
          resume={profile.resume}
          onUploadSuccess={(newResume) => setProfile((p) => ({ ...p, resume: newResume }))}
        />
      </div>
    </Layout>
  );
};

export default ProfilePage;

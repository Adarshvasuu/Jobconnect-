import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, SkipForward } from 'lucide-react';
import Button from '../common/Button';

export const ChatInputFile = ({ onSubmit, onSkip }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onSubmit(selectedFile.name);
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-tertiary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        width: '100%',
      }}
    >
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragActive ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
          borderRadius: 'var(--radius-md)',
          padding: '28px 16px',
          textAlign: 'center',
          backgroundColor: dragActive ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255, 255, 255, 0.02)',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
          }}
        />

        {selectedFile ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <FileText size={36} color="var(--accent-emerald)" />
            <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
              {selectedFile.name}
            </span>
            <span style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready for local verification
            </span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <UploadCloud size={38} color="var(--accent-primary)" />
            <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
              Click to browse or drop your resume
            </span>
            <span style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>
              Supports PDF or DOCX (Max 5MB)
            </span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {onSkip && (
          <Button variant="ghost" size="sm" onClick={onSkip} icon={SkipForward}>
            Skip for now
          </Button>
        )}
        <div style={{ marginLeft: 'auto' }}>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={!selectedFile}
            icon={CheckCircle}
          >
            Upload & Verify
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInputFile;

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
        backgroundColor: '#FFFFFF',
        border: '1.5px solid #CBD5E1',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.05)',
      }}
    >
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragActive ? '#2563EB' : '#94A3B8'}`,
          borderRadius: '12px',
          padding: '28px 16px',
          textAlign: 'center',
          backgroundColor: dragActive ? '#EFF6FF' : '#F8FAFC',
          cursor: 'pointer',
          position: 'relative',
          transition: 'all 0.2s ease',
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
            <FileText size={38} color="#059669" />
            <span style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.975rem' }}>
              {selectedFile.name}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready for integrity check
            </span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2563EB',
                marginBottom: '4px',
              }}
            >
              <UploadCloud size={28} />
            </div>
            <span style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.975rem' }}>
              Click to browse or drag & drop resume
            </span>
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
              PDF or DOCX format (Max 5MB)
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

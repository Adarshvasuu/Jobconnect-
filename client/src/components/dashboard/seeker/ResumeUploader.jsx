import React, { useRef, useState } from 'react';
import { FileText, UploadCloud, CheckCircle, RefreshCw } from 'lucide-react';
import Button from '../../common/Button';
import VerifiedBadge from '../../verification/VerifiedBadge';

export const ResumeUploader = ({ resume, onUploadSuccess }) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        if (onUploadSuccess) {
          onUploadSuccess({
            fileName: file.name,
            fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
            uploadedAt: new Date().toISOString(),
          });
        }
      }, 800);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h3 style={{ fontSize: '1.05rem', margin: 0 }}>Active Verified Resume</h3>
        <VerifiedBadge score={92} status="verified" />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-primary)',
          }}
        >
          <FileText size={22} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {resume?.fileName || 'Adarsh_Sharma_Resume_2026.pdf'}
          </div>
          <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>
            {resume?.fileSize || '1.2 MB'} • Uploaded {new Date(resume?.uploadedAt || Date.now()).toLocaleDateString()}
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx"
        style={{ display: 'none' }}
      />

      <Button
        variant="secondary"
        size="sm"
        icon={RefreshCw}
        loading={isUploading}
        onClick={() => fileInputRef.current?.click()}
      >
        Upload New Version
      </Button>
    </div>
  );
};

export default ResumeUploader;

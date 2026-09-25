import React, { useRef, useState } from 'react';
import { FileText, RefreshCw, CheckCircle2 } from 'lucide-react';
import MetallicButton from '../../landing/MetallicButton';
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
          Active Verified Resume
        </h3>
        <VerifiedBadge score={92} status="verified" />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '16px',
          borderRadius: '14px',
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            backgroundColor: 'rgba(59, 130, 246, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#2563EB',
            flexShrink: 0,
          }}
        >
          <FileText size={22} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {resume?.fileName || 'Gokul_Sharma_Resume_2026.pdf'}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px' }}>
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

      <MetallicButton
        icon={<RefreshCw size={15} />}
        onClick={() => fileInputRef.current?.click()}
        variant="metallic"
        style={{ width: '100%', padding: '10px 18px', fontSize: '0.88rem' }}
      >
        {isUploading ? 'Uploading & Verifying...' : 'Upload New Version'}
      </MetallicButton>
    </div>
  );
};

export default ResumeUploader;

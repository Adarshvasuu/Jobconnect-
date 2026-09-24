export const USER_ROLES = {
  SEEKER: 'seeker',
  RECRUITER: 'recruiter',
  ADMIN: 'admin',
};

export const APPLICATION_STATUS = {
  APPLIED: 'applied',
  REVIEWING: 'reviewing',
  SHORTLISTED: 'shortlisted',
  INTERVIEW: 'interview',
  OFFERED: 'offered',
  REJECTED: 'rejected',
};

export const APPLICATION_STATUS_LABELS = {
  [APPLICATION_STATUS.APPLIED]: 'Applied',
  [APPLICATION_STATUS.REVIEWING]: 'Under Review',
  [APPLICATION_STATUS.SHORTLISTED]: 'Shortlisted',
  [APPLICATION_STATUS.INTERVIEW]: 'Interview Scheduled',
  [APPLICATION_STATUS.OFFERED]: 'Offered',
  [APPLICATION_STATUS.REJECTED]: 'Rejected',
};

export const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Remote',
  'Hybrid',
  'Contract',
  'Internship',
];

export const EXPERIENCE_LEVELS = [
  'Entry Level (0-2 yrs)',
  'Mid-Level (3-5 yrs)',
  'Senior (5-8 yrs)',
  'Lead / Director (8+ yrs)',
];

export const STORAGE_KEYS = {
  TOKEN: 'jobconnect_token',
  USER: 'jobconnect_user',
  ROLE: 'jobconnect_role',
};

export const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250';

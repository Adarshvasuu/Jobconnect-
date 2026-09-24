export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export function isValidPassword(password) {
  // At least 6 characters
  return typeof password === 'string' && password.length >= 6;
}

export function isNotEmpty(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

export function validateLoginForm({ email, password }) {
  const errors = {};
  if (!email || !isValidEmail(email)) {
    errors.email = 'Please provide a valid email address';
  }
  if (!password || !isValidPassword(password)) {
    errors.password = 'Password must be at least 6 characters';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateSignupForm({ name, email, password, role }) {
  const errors = {};
  if (!name || name.trim().length < 2) {
    errors.name = 'Full name is required (minimum 2 characters)';
  }
  if (!email || !isValidEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }
  if (!password || !isValidPassword(password)) {
    errors.password = 'Password must be at least 6 characters long';
  }
  if (!role || !['seeker', 'recruiter'].includes(role)) {
    errors.role = 'Please select a valid role (job seeker or recruiter)';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Formats a date string or timestamp into readable format (e.g. Sep 24, 2026)
 */
export function formatDate(dateInput) {
  if (!dateInput) return 'N/A';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return 'Invalid date';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

/**
 * Returns a humanized relative time string (e.g. "2 hours ago", "3 days ago")
 */
export function timeAgo(dateInput) {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';

  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(months / 12);
  return `${years}y ago`;
}

/**
 * Format currency with symbols (e.g. $120,000 or ₹18,00,000)
 */
export function formatSalary(min, max, currency = '$') {
  if (!min && !max) return 'Competitive';
  const formatNum = (num) => (num >= 1000 ? `${(num / 1000).toFixed(0)}k` : num);
  if (min && max) return `${currency}${formatNum(min)} - ${currency}${formatNum(max)}`;
  if (min) return `From ${currency}${formatNum(min)}`;
  return `Up to ${currency}${formatNum(max)}`;
}

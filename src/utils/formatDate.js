/**
 * Formats an ISO date string into a readable format (e.g., June 2, 2026).
 * @param {string} dateString - Date string (e.g., '2026-05-15')
 * @returns {string} Formatted date
 */
export default function formatDate(dateString) {
  if (!dateString) return 'Pending';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

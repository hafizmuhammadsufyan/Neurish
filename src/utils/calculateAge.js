/**
 * Calculates a child's age in Months or Years.Months format based on DOB.
 * @param {string} dobString - ISO format date of birth (e.g., '2024-12-01')
 * @returns {string} Human-readable age string
 */
export default function calculateAge(dobString) {
  if (!dobString) return '0 Months';
  const dob = new Date(dobString);
  const diffMs = Date.now() - dob.getTime();
  const ageDate = new Date(diffMs);
  const years = Math.abs(ageDate.getUTCFullYear() - 1970);
  const months = ageDate.getUTCMonth();
  
  if (years === 0) {
    return `${months} ${months === 1 ? 'Month' : 'Months'}`;
  }
  return `${years}.${months} ${years === 1 && months === 0 ? 'Year' : 'Years'}`;
}

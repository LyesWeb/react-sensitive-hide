/**
 * Calculate the age of a person based on their date of birth
 * @param birthDate - The date of birth
 * @returns The age in years
 */
export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  // If the birthday hasn't occurred yet this year, subtract 1 from age
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Check if a person meets the minimum age requirement
 * @param birthDate - The date of birth
 * @param minimumAge - The minimum age required
 * @returns true if the person meets the minimum age, false otherwise
 */
export function isAgeValid(birthDate: Date, minimumAge: number): boolean {
  const age = calculateAge(birthDate);
  return age >= minimumAge;
}


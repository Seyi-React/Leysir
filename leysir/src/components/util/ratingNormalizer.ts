/**
 * Normalizes a rating from 0-100 scale to 0-5 scale
 */
export const normalizeRating = (rating: number): number => {
  // First clamp the value between 0 and 100
  const clampedRating = Math.min(100, Math.max(0, rating));
  
  // Convert to 0-5 scale and round to nearest 0.5
  return Math.round((clampedRating / 20) * 2) / 2;
};

/**
 * Returns an array of valid rating options from 0 to 5 in 0.5 increments
 */
export const getRatingOptions = (): number[] => {
  const options: number[] = [];
  for (let i = 0; i <= 10; i++) {
    options.push(i * 0.5);
  }
  return options;
};

/**
 * Converts a 0-5 scale rating back to 0-100 scale
 */
export const denormalizeRating = (normalizedRating: number): number => {
  return Math.min(5, Math.max(0, normalizedRating)) * 20;
};

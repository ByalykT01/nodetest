/**
 * Form data validation utility
 * @param {Object} data - Form data object
 * @returns {Object} Validation result with success status and errors if any
 */
function validateFormData(data) {
  const { name, email, age, message } = data;
  const errors = [];

  // Validate name (required, at least 2 characters)
  if (!name || name.trim().length < 2) {
    errors.push("Name is required and must be at least 2 characters");
  }

  // Validate email (required, must be valid email format)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("Valid email address is required");
  }

  // Validate age (optional, but must be a number between 18-120 if provided)
  if (age !== undefined) {
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 120) {
      errors.push("Age must be a number between 18 and 120");
    }
  }

  // Validate message (optional, but must be at least 10 characters if provided)
  if (message !== undefined && message.trim().length < 10) {
    errors.push("Message must be at least 10 characters long");
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
  };
}

module.exports = {
  validateFormData,
};

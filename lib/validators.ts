/**
 * Validates an email address
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates a phone number (basic international format)
 * Accepts digits, +, -, spaces, parentheses
 */
export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^[\d\s\-+()]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7
}

/**
 * Validates that a string is not empty and is at least 2 characters
 */
export function validateName(name: string): boolean {
  return name.trim().length >= 2
}

/**
 * Validates that a string is not empty
 */
export function validateRequired(value: string): boolean {
  return value.trim().length > 0
}

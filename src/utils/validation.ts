/**
 * Validation Utilities
 */

export const validators = {
  /**
   * Validate email format
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate password strength
   * At least 8 characters, 1 uppercase, 1 lowercase, 1 number
   */
  isStrongPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  },

  /**
   * Validate phone number (basic international format)
   */
  isValidPhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
  },

  /**
   * Validate required field
   */
  isRequired(value: unknown): boolean {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return true;
  },

  /**
   * Validate minimum length
   */
  minLength(value: string, min: number): boolean {
    return value.length >= min;
  },

  /**
   * Validate maximum length
   */
  maxLength(value: string, max: number): boolean {
    return value.length <= max;
  },

  /**
   * Validate numeric value
   */
  isNumeric(value: string): boolean {
    return /^\d+$/.test(value);
  },

  /**
   * Validate date format (YYYY-MM-DD)
   */
  isValidDate(dateString: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) return false;
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  },
};

export interface ValidationRule {
  validator: (value: unknown) => boolean;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
}

/**
 * Validate form data against rules
 */
export function validateForm(
  data: Record<string, unknown>,
  rules: Record<string, ValidationRule[]>
): ValidationResult {
  const errors: Record<string, string[]> = {};

  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = data[field];
    const fieldErrors: string[] = [];

    for (const rule of fieldRules) {
      if (!rule.validator(value)) {
        fieldErrors.push(rule.message);
      }
    }

    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Common validation rules factory
 */
export const rules = {
  required: (fieldName: string): ValidationRule => ({
    validator: validators.isRequired,
    message: `${fieldName} is required`,
  }),

  email: (): ValidationRule => ({
    validator: (v) => validators.isValidEmail(String(v)),
    message: 'Please enter a valid email address',
  }),

  password: (): ValidationRule => ({
    validator: (v) => validators.isStrongPassword(String(v)),
    message: 'Password must be at least 8 characters with uppercase, lowercase, and number',
  }),

  phone: (): ValidationRule => ({
    validator: (v) => validators.isValidPhone(String(v)),
    message: 'Please enter a valid phone number',
  }),

  minLength: (min: number): ValidationRule => ({
    validator: (v) => validators.minLength(String(v), min),
    message: `Must be at least ${min} characters`,
  }),

  maxLength: (max: number): ValidationRule => ({
    validator: (v) => validators.maxLength(String(v), max),
    message: `Must be no more than ${max} characters`,
  }),
};

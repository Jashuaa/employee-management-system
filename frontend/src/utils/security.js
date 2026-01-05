/**
 * Security Utilities for Frontend
 * Provides input sanitization and validation helpers
 */

/**
 * Sanitizes user input to prevent XSS attacks
 * Removes potentially dangerous HTML/script tags
 * @param {string} input - User input to sanitize
 * @returns {string} - Sanitized string
 */
export function sanitizeInput(input) {
    if (typeof input !== 'string') return input;

    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .replace(/`/g, '&#96;')
        .trim();
}

/**
 * Validates email format with additional security checks
 * @param {string} email - Email to validate
 * @returns {object} - { isValid: boolean, message: string }
 */
export function validateEmail(email) {
    if (!email || !email.trim()) {
        return { isValid: false, message: 'Email is required.' };
    }

    const emailLower = email.toLowerCase().trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check for common typos
    const gmailTypos = ['@gmil.com', '@gail.com', '@gmal.com', '@gnail.com', '@gmial.com'];
    if (gmailTypos.some(typo => emailLower.endsWith(typo))) {
        return { isValid: false, message: 'Did you mean @gmail.com?' };
    }
    if (emailLower.endsWith('@yaho.com')) {
        return { isValid: false, message: 'Did you mean @yahoo.com?' };
    }

    // Check format
    if (!emailRegex.test(email)) {
        return { isValid: false, message: 'Please enter a valid email address.' };
    }

    // Security: Check for suspicious patterns
    if (email.includes('<') || email.includes('>') || email.includes('javascript:')) {
        return { isValid: false, message: 'Invalid characters in email.' };
    }

    return { isValid: true, message: '' };
}

/**
 * Validates and sanitizes name input
 * @param {string} name - Name to validate
 * @returns {object} - { isValid: boolean, message: string, sanitized: string }
 */
export function validateName(name) {
    if (!name || !name.trim()) {
        return { isValid: false, message: 'Name is required.', sanitized: '' };
    }

    const sanitized = sanitizeInput(name);

    // Check for minimum length
    if (sanitized.length < 2) {
        return { isValid: false, message: 'Name must be at least 2 characters.', sanitized };
    }

    // Check for maximum length
    if (sanitized.length > 100) {
        return { isValid: false, message: 'Name must be less than 100 characters.', sanitized };
    }

    return { isValid: true, message: '', sanitized };
}

/**
 * Validates salary input
 * @param {string|number} salary - Salary to validate
 * @returns {object} - { isValid: boolean, message: string }
 */
export function validateSalary(salary) {
    const salaryStr = String(salary).trim();

    if (!salaryStr) {
        return { isValid: false, message: 'Salary is required.' };
    }

    const salaryNum = Number(salary);

    if (isNaN(salaryNum)) {
        return { isValid: false, message: 'Salary must be a number.' };
    }

    if (salaryNum <= 0) {
        return { isValid: false, message: 'Salary must be a positive number.' };
    }

    // Security: Reasonable upper limit
    if (salaryNum > 999999999) {
        return { isValid: false, message: 'Salary value is too large.' };
    }

    return { isValid: true, message: '' };
}

/**
 * Rate limiting helper for form submissions
 * Prevents rapid-fire form submissions
 */
export class RateLimiter {
    constructor(minIntervalMs = 1000) {
        this.minInterval = minIntervalMs;
        this.lastSubmitTime = 0;
    }

    canSubmit() {
        const now = Date.now();
        if (now - this.lastSubmitTime < this.minInterval) {
            return false;
        }
        this.lastSubmitTime = now;
        return true;
    }

    reset() {
        this.lastSubmitTime = 0;
    }
}

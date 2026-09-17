/**
 * Shared server-side validation for the ANCHOR grievance form.
 * Used by /api/grievance route handler.
 */

export type ValidationResult =
  | { ok: true }
  | { ok: false; error: string };

/** Max lengths */
const MAX_NAME = 100;
const MAX_LOCATION = 200;
const MAX_EMAIL = 254;
const MAX_GRIEVANCE = 5000;
const MIN_GRIEVANCE = 10;

/** RFC 5322 simplified email regex (sufficient for server-side guard) */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateName(value: unknown): ValidationResult {
  if (typeof value !== "string") return { ok: false, error: "Name must be a string." };
  const trimmed = value.trim();
  if (trimmed.length === 0) return { ok: false, error: "Name is required." };
  if (trimmed.length > MAX_NAME) return { ok: false, error: `Name must be ${MAX_NAME} characters or fewer.` };
  return { ok: true };
}

export function validateAge(value: unknown): ValidationResult {
  if (value === undefined || value === null || value === "") {
    return { ok: false, error: "Age is required." };
  }
  const num = Number(value);
  if (!Number.isFinite(num)) return { ok: false, error: "Age must be a number." };
  if (!Number.isInteger(num)) return { ok: false, error: "Age must be a whole number." };
  if (num < 1 || num > 120) return { ok: false, error: "Age must be between 1 and 120." };
  return { ok: true };
}

export function validateLocation(value: unknown): ValidationResult {
  if (typeof value !== "string") return { ok: false, error: "Location must be a string." };
  const trimmed = value.trim();
  if (trimmed.length === 0) return { ok: false, error: "Location is required." };
  if (trimmed.length > MAX_LOCATION) return { ok: false, error: `Location must be ${MAX_LOCATION} characters or fewer.` };
  return { ok: true };
}

export function validateEmail(value: unknown): ValidationResult {
  if (typeof value !== "string") return { ok: false, error: "Email must be a string." };
  const trimmed = value.trim();
  if (trimmed.length === 0) return { ok: false, error: "Email is required." };
  if (trimmed.length > MAX_EMAIL) return { ok: false, error: "Email address is too long." };
  if (!EMAIL_REGEX.test(trimmed)) return { ok: false, error: "Email address is invalid." };
  // Guard against header injection
  if (/[\r\n]/.test(trimmed)) return { ok: false, error: "Email address contains invalid characters." };
  return { ok: true };
}

export function validateGrievance(value: unknown): ValidationResult {
  if (typeof value !== "string") return { ok: false, error: "Grievance must be a string." };
  const trimmed = value.trim();
  if (trimmed.length === 0) return { ok: false, error: "Grievance is required." };
  if (trimmed.length < MIN_GRIEVANCE) return { ok: false, error: `Please describe your situation in at least ${MIN_GRIEVANCE} characters.` };
  if (trimmed.length > MAX_GRIEVANCE) return { ok: false, error: `Grievance must be ${MAX_GRIEVANCE} characters or fewer.` };
  return { ok: true };
}

/** Sanitize a string for safe inclusion in email body — strips control characters */
export function sanitize(value: string): string {
  return value.trim().replace(/[\u0000-\u001F\u007F]/g, " ");
}

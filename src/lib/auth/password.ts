import { hash, compare } from 'bcryptjs';

const BCRYPT_ROUNDS = 10;

/**
 * Hash a password with bcrypt (salted, slow – suitable for passwords).
 */
export async function hashPassword(password: string): Promise<string> {
  return hash(password, BCRYPT_ROUNDS);
}

/**
 * Verify a password against a stored hash.
 * Supports both bcrypt hashes (new) and legacy SHA-256 hashes (for migration).
 * Legacy hashes are unsafe; users should be encouraged to reset password.
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  if (hashedPassword.startsWith('$2') || hashedPassword.startsWith('$2a') || hashedPassword.startsWith('$2b')) {
    return compare(password, hashedPassword);
  }
  // Legacy: old SHA-256 unsalted hashes (DO NOT use for new passwords)
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const legacyHash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return legacyHash === hashedPassword;
}

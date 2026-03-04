/**
 * Global Finance & Business Logic Constants
 * ----------------------------------------
 */
export const CURRENCY = "UGX";
export const WITHDRAWAL_FEE_PERCENT = 20; // High-tier platform fee
export const BRAND_FEE_PERCENT = 15; // Revenue share for the brand
export const MIN_WITHDRAWAL_UGX = 20000; // Threshold to keep transaction costs viable

/**
 * Manages request throttling (e.g., for OTP or Withdrawals).
 * Returns seconds remaining and a UI-ready 'MM:SS' string.
 */
export const GetRemainingCooldown = (
  lastRequestedAt: string,
  cooldownSeconds: number = 120,
) => {
  const lastRequest = new Date(lastRequestedAt).getTime();
  const now = Date.now();

  // Determine the timestamp when the lockout lifted
  const allowedAt = lastRequest + cooldownSeconds * 1000;
  const diff = allowedAt - now;

  if (diff <= 0) {
    return { totalSeconds: 0, formatted: "0:00", isExpired: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return {
    totalSeconds,
    formatted: `${minutes}:${seconds.toString().padStart(2, "0")}`,
    isExpired: false,
  };
};

/**
 * Protects PII by masking the middle of an email string.
 * Example: "alexander@gmail.com" -> "alexxxxxer@gmail.com"
 */
export const MaskEmail = (email: string): string => {
  const [local, domain] = email.split("@");
  // Safety check: don't mask if we can't preserve at least 3 start and 2 end chars
  if (local.length <= 5) return email;

  const start = local.slice(0, 3);
  const end = local.slice(-2);
  const masked = start + "x".repeat(local.length - 5) + end;
  return `${masked}@${domain}`;
};

/**
 * Returns a localized greeting based on the user's system clock.
 */
export const GreetUser = (): string => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "Good Morning, ";
  if (hour >= 12 && hour < 17) return "Good Afternoon, ";
  if (hour >= 17 && hour < 21) return "Good Evening, ";
  return "Nights, "; // Late night/Early morning fallback
};

/**
 * Formats numbers into UGX currency strings.
 * Note: Uganda Shillings usually don't use decimals (maximumFractionDigits: 0).
 */
export const FormatUGXCurrency = (value: number) => {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * API Body Formatters
 * Useful for converting Frontend (camelCase) to Database (snake_case) payloads.
 */
export const CamelToSnakeCase = (str: string): string =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const ObjectKeysToSnakeCase = <T extends Record<string, any>>(
  obj: T,
): Record<string, any> => {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      acc[CamelToSnakeCase(key)] = value;
      return acc;
    },
    {} as Record<string, any>,
  );
};

/**
 * Maps single-character database codes to human-readable labels.
 */
export const GetFullGenderName = (G: "B" | "F" | "M"): string => {
  return { B: "Both", F: "Female", M: "Male" }[G];
};

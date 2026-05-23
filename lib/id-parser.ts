import { getInformation, isValid, formatID } from 'egyptian-nationalid';
import type { IDParseResult } from '@/types';

/**
 * Parses an Egyptian National ID and returns structured, safe data.
 * All processing is done locally — no network requests.
 */
export function parseNationalId(id: string, lang: 'english' | 'arabic' = 'english'): IDParseResult {
  if (!id || id.length !== 14 || !/^\d{14}$/.test(id)) {
    return { valid: false, error: 'Invalid ID format' };
  }

  try {
    const result = getInformation(id, lang);

    if (!result.valid) {
      return { valid: false, error: (result as { error: string }).error };
    }

    const info = result as Extract<typeof result, { valid: true }>;
    const birthDate = info.birthday.date
      ? new Date(info.birthday.date)
      : new Date(info.birthday.text);

    const formattedStr = formatID(id);

    return {
      valid: true,
      national_id: id,
      formattedId: formattedStr,
      gender: info.gender,
      genderLabel: info.type,
      birthDate,
      birthDateText: info.birthday.text,
      age: info.age,
      governorate: info.governorate,
      century: info.century,
      isAdult: info.age >= 18,
    };
  } catch {
    return { valid: false, error: 'Failed to parse ID' };
  }
}

/**
 * Validates if a string is a properly formed 14-digit Egyptian National ID.
 */
export function validateIdFormat(id: string): {
  valid: boolean;
  errorKey?: string;
} {
  if (!id) return { valid: false, errorKey: 'required' };
  if (!/^\d+$/.test(id)) return { valid: false, errorKey: 'nonNumeric' };
  if (id.length < 14) return { valid: false, errorKey: 'tooShort' };
  if (id.length > 14) return { valid: false, errorKey: 'tooLong' };
  if (!isValid(id)) return { valid: false, errorKey: 'invalid' };
  return { valid: true };
}

/**
 * Formats a birth date in a human-readable way based on locale.
 */
export function formatBirthDate(date: Date, locale: string): string {
  return date.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

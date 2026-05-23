export type Locale = 'en' | 'ar';

export interface ParsedIDResult {
  valid: true;
  national_id: string;
  formattedId: string;
  gender: 'male' | 'female';
  genderLabel: string;
  birthDate: Date;
  birthDateText: string;
  age: number;
  governorate: string;
  century: string;
  isAdult: boolean;
}

export interface InvalidIDResult {
  valid: false;
  error: string;
}

export type IDParseResult = ParsedIDResult | InvalidIDResult;

export interface ResultCardData {
  icon: string;
  labelKey: string;
  value: string;
  accentColor?: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

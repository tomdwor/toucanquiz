const LANG_NAMES: Record<string, string> = {
  en: 'English',
  pl: 'Polish',
  es: 'Spanish',
  de: 'German',
  fr: 'French',
  it: 'Italian',
  pt: 'Portuguese',
  ru: 'Russian',
  zh: 'Chinese',
  ja: 'Japanese',
  ko: 'Korean',
  ar: 'Arabic',
}

export function langName(code: string): string {
  return LANG_NAMES[code] ?? code
}

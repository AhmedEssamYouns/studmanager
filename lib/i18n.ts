export type Locale = 'ar' | 'en';

export const locales: Locale[] = ['ar', 'en'];
export const defaultLocale: Locale = 'ar';

export const isValidLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale);
};

export const getDirection = (locale: Locale): 'rtl' | 'ltr' => {
  return locale === 'ar' ? 'rtl' : 'ltr';
};

export const getOppositeLocale = (locale: Locale): Locale => {
  return locale === 'ar' ? 'en' : 'ar';
};

export const RTL_LANGUAGES = ['ar'];

export const isRTL = (locale: string): boolean => {
  return RTL_LANGUAGES.includes(locale);
};

export const getDirection = (locale: string): 'ltr' | 'rtl' => {
  return isRTL(locale) ? 'rtl' : 'ltr';
};
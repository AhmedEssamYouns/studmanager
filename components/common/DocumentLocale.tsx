'use client';

import { useEffect } from 'react';
import type { Locale } from '@/lib/i18n';

interface DocumentLocaleProps {
  locale: Locale;
  direction: 'rtl' | 'ltr';
}

export function DocumentLocale({ locale, direction }: DocumentLocaleProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = direction;
  }, [locale, direction]);

  return null;
}

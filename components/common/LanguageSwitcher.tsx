'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/lib/locale-context';
import { getOppositeLocale } from '@/lib/i18n';

export function LanguageSwitcher() {
  const { locale, direction } = useLocale();
  const pathname = usePathname();
  const oppositeLocale = getOppositeLocale(locale);

  // Replace current locale with opposite locale in pathname
  const newPathname = pathname.replace(`/${locale}/`, `/${oppositeLocale}/`);

  return (
    <Link
      href={newPathname}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border-gray hover:bg-secondary-gray transition-colors ${
        direction === 'rtl' ? 'flex-row-reverse' : ''
      }`}
      title={oppositeLocale === 'ar' ? 'العربية' : 'English'}
    >
      <span className="text-xs font-medium">
        {oppositeLocale === 'ar' ? 'العربية' : 'EN'}
      </span>
    </Link>
  );
}

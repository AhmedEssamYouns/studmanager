'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getOppositeLocale, locales, type Locale } from '@/lib/i18n';
import { useLocale } from '@/lib/locale-context';

function switchPathLocale(pathname: string, currentLocale: Locale, nextLocale: Locale) {
  const exactPrefix = `/${currentLocale}`;
  if (pathname === exactPrefix) return `/${nextLocale}`;
  if (pathname.startsWith(`${exactPrefix}/`)) {
    return pathname.replace(`${exactPrefix}/`, `/${nextLocale}/`);
  }
  return `/${nextLocale}${pathname === '/' ? '' : pathname}`;
}

export function LocaleMenu() {
  const { locale } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen((current) => !current)}
        className="h-5 w-8 overflow-hidden rounded-sm shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change language"
        title={getOppositeLocale(locale) === 'ar' ? 'العربية' : 'English'}
      >
        <span className="block h-1/3 bg-[#d9252a]" />
        <span className="block h-1/3 bg-white" />
        <span className="block h-1/3 bg-[#1b2248]" />
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-40 min-w-[10rem] rounded-[20px] bg-white p-2 shadow-[0_16px_32px_rgba(91,53,24,0.14)]">
          {locales.map((targetLocale) => {
            const label = targetLocale === 'ar' ? 'العربية' : 'English';
            const active = targetLocale === locale;

            return (
              <button
                key={targetLocale}
                onClick={() => {
                  router.push(switchPathLocale(pathname, locale, targetLocale));
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  active ? 'bg-[#f5efbb] text-[#2b2330]' : 'text-[#2b2330] hover:bg-[#f8efe7]'
                }`}
                role="menuitem"
              >
                <span>{label}</span>
                {active && <span className="h-2.5 w-2.5 rounded-full bg-[#4b2f1a]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

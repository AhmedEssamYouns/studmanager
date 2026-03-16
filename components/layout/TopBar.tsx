'use client';

import { useLocale, useTranslation } from '@/lib/locale-context';
import { BellIcon, SearchIcon } from './AppIcons';
import { LocaleMenu } from '@/components/common/LocaleMenu';

interface TopBarProps {
  searchWidthClass?: string;
}

export function TopBar({ searchWidthClass = 'sm:w-[25rem] md:w-[28rem]' }: TopBarProps) {
  const { t } = useTranslation();
  const { direction } = useLocale();

  return (
    <div className="flex flex-col gap-3 rounded-[16px] bg-white px-4 py-3 shadow-[0_10px_35px_rgba(94,56,23,0.06)] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:rounded-[26px] sm:px-6 sm:py-4 lg:px-8">
      <div className={`relative w-full ${searchWidthClass}`}>
        <SearchIcon
          className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 text-[#5a473d] ${            direction === 'rtl' ? 'right-4' : 'left-4'
          }`}
        />
        <input
          type="search"
          placeholder={t('common.search')}
          className={`h-11 w-full rounded-2xl border border-[#ece2da] bg-white text-sm text-[#2c2330] outline-none transition placeholder:text-[#d9cfc5] focus:border-[#5a3b25] focus:ring-2 focus:ring-[#5a3b25]/10 ${
            direction === 'rtl' ? 'pr-12 text-right' : 'pl-12 text-left'
          }`}
        />
      </div>

      <div className="flex items-center gap-5">
        <button className="relative text-[#2f2220] transition hover:text-[#5a3b25]" aria-label="Notifications">
          <BellIcon className="h-6 w-6" />
          <span
            className={`absolute -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#d63f46] text-[11px] font-semibold text-white ${
              direction === 'rtl' ? '-right-1' : '-left-1'
            }`}
          >
            4
          </span>
        </button>

        <LocaleMenu />

        <div className="flex items-center gap-3 text-[#2f2220]">
          <span className="font-semibold">محمد صلاح</span>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_35%,#d9b898,#6b4d39)] text-sm font-semibold text-white shadow-inner">
            م
          </div>
        </div>
      </div>
    </div>
  );
}

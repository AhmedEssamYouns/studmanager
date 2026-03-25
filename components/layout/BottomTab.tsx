'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslation } from '@/lib/locale-context';
import Image from 'next/image';
import { 
  Home, 
  LayoutGrid, 
  Utensils, 
  HeartPulse, 
  BarChart3 
} from 'lucide-react';

const tabs = [
  { key: 'dashboard', icon: Home, route: 'dashboard' },
  { key: 'horses', icon: LayoutGrid, route: 'horses' },
  { key: 'nutrition', icon: Utensils, route: 'nutrition' },
  { key: 'health', icon: HeartPulse, route: 'health' },
  { key: 'reports', icon: BarChart3, route: 'reports' },
];

export function BottomTab() {
  const { locale, direction } = useLocale();
  const { t } = useTranslation();
  const pathname = usePathname();
  const isRTL = direction === 'rtl';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 px-2 py-2 flex items-center justify-around md:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
      {tabs.map((tab) => {
        const href = `/${locale}/${tab.route}`;
        const isActive = pathname.startsWith(href);
        const Icon = tab.icon;
        const isHorseTab = tab.key === 'horses';

        return (
          <Link
            key={tab.key}
            href={href}
            className={`flex flex-col items-center gap-1 min-w-[4rem] transition-colors duration-200 ${
              isActive ? 'text-[#4b2f1a]' : 'text-gray-400'
            }`}
          >
            <div className={`p-1.5 rounded-xl transition-all duration-300 ${
              isActive ? 'bg-[#f5efbb] scale-110' : 'bg-transparent'
            }`}>
              {isHorseTab ? (
                <Image
                  src={isActive ? '/svgs/horse-active.svg' : '/sidebar/horse.svg'}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
              ) : (
                <Icon size={20} className={isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'} />
              )}
            </div>
            <span className={`text-[10px] font-bold ${isRTL ? 'font-cairo' : ''}`}>
              {t(`sidebar.${tab.key}`)}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

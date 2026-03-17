'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslation } from '@/lib/locale-context';
import {
  CalendarIcon,
  ContactsIcon,
  DashboardIcon,
  DatabaseIcon,
  ExpensesIcon,
  NewsIcon,
  RevenueIcon,
} from './AppIcons';
import { LocaleMenu } from '@/components/common/LocaleMenu';

const sidebarItems = [
  { key: 'dashboard' },
  { key: 'team' },
  { key: 'settings', route: 'settings' },
  { key: 'horses' },
  { key: 'health' },
  { key: 'nutrition' },
  { key: 'performance' },
  { key: 'reproduction', route: 'reproduction' },
  { key: 'expenses' },
  { key: 'reports', route: 'reports' },
  { key: 'contacts' },
  { key: 'news' },
  { key: 'evaluations', route: 'calendar' },
  { key: 'database', route: 'database' },
];

interface SidebarItemProps {
  item: (typeof sidebarItems)[0];
  isActive: boolean;
  href: string;
}

function SidebarItem({ item, isActive, href }: SidebarItemProps) {
  const { t } = useTranslation();
  const { direction } = useLocale();
  const iconClassName = `h-5 w-5 flex-shrink-0 ${isActive ? 'text-[#4b2f1a]' : 'text-[#2b2330]'}`;

  const renderIcon = () => {
    switch (item.key) {
      case 'dashboard':
        return isActive ? (
          <img src="/sidebar/dashboard-active.svg" alt="" className="h-5 w-5 flex-shrink-0" />
        ) : (
          <DashboardIcon className={iconClassName} />
        );
      case 'team':
        return (
          <img
            src={isActive ? '/svgs/manage-members-foucs.svg' : '/svgs/manage-members.svg'}
            alt=""
            className="h-5 w-5 flex-shrink-0"
          />
        );
      case 'horses':
        return (
          <img
            src={isActive ? '/svgs/horse-active.svg' : '/sidebar/horse.svg'}
            alt=""
            className="h-5 w-5 flex-shrink-0"
          />
        );
      case 'health':
        return (
          <img
            src={isActive ? '/health/active-tab.svg' : '/health/tab.svg'}
            alt=""
            className="h-5 w-5 flex-shrink-0"
          />
        );
      case 'nutrition':
        return (
          <img
            src={isActive ? '/nutrition/acitve.svg' : '/nutrition/not-active.svg'}
            alt=""
            className="h-5 w-5 flex-shrink-0"
          />
        );
      case 'performance':
        return (
          <img
            src={isActive ? '/performance/activeicontabsidebar.svg' : '/performance/notacitve.svg'}
            alt=""
            className="h-5 w-5 flex-shrink-0"
          />
        );
      case 'expenses':
        return <ExpensesIcon className={iconClassName} />;
      case 'reports':
        return <RevenueIcon className={iconClassName} />;
      case 'contacts':
        return <ContactsIcon className={iconClassName} />;
      case 'news':
        return <NewsIcon className={iconClassName} />;
      case 'evaluations':
        return <CalendarIcon className={iconClassName} />;
      case 'assessments':
        return <DatabaseIcon className={iconClassName} />;
      default:
        return <DashboardIcon className={iconClassName} />;
    }
  };

  return (
    <Link href={href} className="block">
      <div
        className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-300 ${direction === 'rtl'
          ? 'flex-row-reverse justify-end text-right'
          : 'flex-row justify-start text-left'
          } ${isActive
            ? 'bg-[#f5efbb] text-[#241a17] shadow-[0_10px_24px_rgba(107,77,41,0.08)]'
            : 'text-[#2b2330] hover:bg-[#f8efe7]'
          }`}
      >
        {direction !== 'rtl' && <span>{renderIcon()}</span>}
        <span className="text-[0.82rem] font-semibold leading-tight">{t(`sidebar.${item.key}`)}</span>
        {direction === 'rtl' && <span>{renderIcon()}</span>}
      </div>
    </Link>
  );
}

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open = true, onClose }: SidebarProps) {
  const { locale, direction } = useLocale();
  const pathname = usePathname();

  const isRTL = direction === 'rtl';

  return (
    <aside
      className={`fixed z-50 h-full w-[17rem] overflow-y-auto rounded-none bg-white px-4 py-5 shadow-[0_20px_40px_rgba(96,56,23,0.08)] transition-transform duration-300 ease-in-out
        md:top-8 md:z-20 md:h-[calc(100vh-4rem)] md:w-[17.5rem] md:rounded-[28px] md:px-5 md:py-6 md:translate-x-0
        ${isRTL
          ? `top-0 right-0 md:right-10 ${open ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`
          : `top-0 left-0 md:left-10 ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`
        }`}
    >
      <div className="mb-6 md:mb-8 flex justify-center">
        <Link href={`/${locale}/dashboard`}>
          <img src="/brand/logo.svg" alt="StudManager" className="h-10 w-auto object-contain sm:h-12 md:h-16 cursor-pointer" />
        </Link>
      </div>

      <nav className="space-y-1">
        {sidebarItems.map((item) => {
          const route = item.route || item.key;
          const href = `/${locale}/${route}`;
          const isActive = pathname.startsWith(href);
          return (
            <div key={item.key} onClick={onClose}>
              <SidebarItem item={item} isActive={isActive} href={href} />
            </div>
          );
        })}

        {/* Mobile-only language toggle */}
        <div className="md:hidden mt-6 pt-6 border-t border-gray-100 flex justify-center">
          <LocaleMenu variant="mobile" />
        </div>
      </nav>
    </aside>
  );
}
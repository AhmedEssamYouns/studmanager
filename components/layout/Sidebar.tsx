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
  MedicalIcon,
  NewsIcon,
  NutritionIcon,
  RevenueIcon,
} from './AppIcons';

const sidebarItems = [
  { key: 'dashboard' },
  { key: 'team' },
  { key: 'horses' },
  { key: 'health' },
  { key: 'nutrition' },
  { key: 'expenses' },
  { key: 'reports' },
  { key: 'contacts' },
  { key: 'news' },
  { key: 'evaluations' },
  { key: 'assessments' },
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
        return <MedicalIcon className={iconClassName} />;
      case 'nutrition':
        return <NutritionIcon className={iconClassName} />;
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
        className={`relative flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all duration-300 ${
          direction === 'rtl' ? 'flex-row-reverse justify-end text-right' : 'justify-start'
        } ${
          isActive
            ? 'bg-[#f5efbb] text-[#241a17] shadow-[0_10px_24px_rgba(107,77,41,0.08)]'
            : 'text-[#2b2330] hover:bg-[#f8efe7]'
        }`}
      >
        <span className="text-sm font-semibold sm:text-[1.02rem]">
          {t(`sidebar.${item.key}`)}
        </span>
        <span>{renderIcon()}</span>
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

  return (
    <aside
      className={`fixed top-16 z-20 h-[calc(100vh-4rem)] w-[17.5rem] overflow-y-auto rounded-[28px] bg-white px-4 py-6 shadow-[0_20px_40px_rgba(96,56,23,0.08)] transition-all duration-300 md:top-8 md:px-5 ${
        direction === 'rtl'
          ? open
            ? 'right-0 md:right-10'
            : '-right-[19.5rem] md:right-10'
          : open
            ? 'left-0 md:left-10'
            : '-left-[19.5rem] md:left-10'
      } md:translate-x-0`}
    >
      <div className="mb-8 flex justify-center">
        <img src="/brand/logo.svg" alt="StudManager" className="h-12 w-auto object-contain sm:h-16" />
      </div>

      <nav className="space-y-2">
        {sidebarItems.map((item) => {
          const href = `/${locale}/${item.key}`;
          const isActive = pathname === href || pathname === `/${locale}/${item.key}/`;
          return (
            <div key={item.key} onClick={onClose}>
              <SidebarItem
                item={item}
                isActive={isActive}
                href={href}
              />
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

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
        <span className="text-[1.02rem] font-semibold">
          {t(`sidebar.${item.key}`)}
        </span>
        <span>{renderIcon()}</span>
      </div>
    </Link>
  );
}

export function Sidebar() {
  const { locale, direction } = useLocale();
  const pathname = usePathname();

  return (
    <aside
      className={`fixed top-8 z-20 h-[calc(100vh-4rem)] w-[17.5rem] overflow-y-auto rounded-[28px] bg-white px-5 py-6 shadow-[0_20px_40px_rgba(96,56,23,0.08)] ${
        direction === 'rtl' ? 'right-10' : 'left-10'
      }`}
    >
      <div className="mb-8 flex justify-center">
        <img src="/brand/logo.svg" alt="StudManager" className="h-16 w-auto object-contain" />
      </div>

      <nav className="space-y-2">
        {sidebarItems.map((item) => {
          const href = `/${locale}/${item.key}`;
          const isActive = pathname === href || pathname === `/${locale}/${item.key}/`;
          return (
            <SidebarItem
              key={item.key}
              item={item}
              isActive={isActive}
              href={href}
            />
          );
        })}
      </nav>
    </aside>
  );
}

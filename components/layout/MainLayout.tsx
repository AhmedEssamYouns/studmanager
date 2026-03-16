'use client';

import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { useLocale } from '@/lib/locale-context';

interface MainLayoutProps {
  children: ReactNode;
}

import { TopBar } from './TopBar';

export function MainLayout({ children }: MainLayoutProps) {
  const { direction } = useLocale();

  return (
    <div className="min-h-screen bg-secondary-gray">
      <Sidebar />

      <main
        className={`min-h-screen px-8 py-8 ${
          direction === 'rtl' ? 'mr-[19.25rem] ml-10' : 'ml-[19.25rem] mr-10'
        }`}
      >
        <div className="space-y-6">
          <TopBar />
          <div>{children}</div>
        </div>
      </main>
    </div>
  );
}

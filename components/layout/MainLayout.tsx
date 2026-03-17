'use client';

import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { useLocale } from '@/lib/locale-context';
import { TopBar } from './TopBar';
import { BottomTab } from './BottomTab';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { direction } = useLocale();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-secondary-gray overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main
        className={`min-h-screen px-3 pt-20 pb-24 transition-all duration-300 sm:px-4 sm:pt-24 sm:pb-28 md:px-8 md:py-8 md:pb-8 ${
          direction === 'rtl'
            ? 'md:mr-[19.25rem] md:ml-6'
            : 'md:ml-[19.25rem] md:mr-6'
        }`}
      >
        <div className="space-y-4 sm:space-y-6">
          <TopBar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
          <div className="overflow-x-hidden">{children}</div>
        </div>
      </main>

      {/* Bottom Navigation for mobile */}
      <BottomTab />
    </div>
  );
}

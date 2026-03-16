'use client';

import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { useLocale } from '@/lib/locale-context';
import { MenuIcon, CloseIcon } from './AppIcons';

interface MainLayoutProps {
  children: ReactNode;
}

import { TopBar } from './TopBar';

export function MainLayout({ children }: MainLayoutProps) {
  const { direction } = useLocale();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-secondary-gray">
      {/* Mobile Menu Button */}
      <div className="sticky top-0 z-30 flex h-16 items-center bg-white shadow-sm md:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`flex items-center justify-center p-4 ${direction === 'rtl' ? 'ml-auto' : ''}`}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? (
            <CloseIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main
        className={`min-h-[calc(100vh-4rem)] px-4 py-6 transition-all duration-300 md:px-8 md:py-8 ${
          direction === 'rtl'
            ? 'md:mr-[19.25rem] md:ml-6'
            : 'md:ml-[19.25rem] md:mr-6'
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

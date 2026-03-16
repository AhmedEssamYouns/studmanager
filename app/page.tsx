'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n';
import { SplashScreen } from '@/components/common/SplashScreen';

export default function RootPage() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      redirect(`/${defaultLocale}/dashboard`);
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return null; // This won't be reached due to redirect
}

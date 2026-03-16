'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { defaultLocale, isValidLocale, Locale } from '@/lib/i18n';
import { LottieAnimation } from '@/components/common/LottieAnimation';
import notFoundAnimation from '@/app/assets/lottie/not-found.json';

const messages: Record<Locale, { title: string; subtitle: string; backHome: string }> = {
  en: {
    title: 'Page not found',
    subtitle: "The page you're looking for doesn't exist.",
    backHome: 'Back to dashboard',
  },
  ar: {
    title: 'الصفحة غير موجودة',
    subtitle: 'الصفحة التي تبحث عنها غير موجودة.',
    backHome: 'العودة إلى لوحة التحكم',
  },
};

export default function RootNotFound() {
  const pathname = usePathname();
  const pathSegments = pathname?.split('/').filter(Boolean) || [];
  const locale = (pathSegments[0] && isValidLocale(pathSegments[0])) ? (pathSegments[0] as Locale) : defaultLocale;
  const t = messages[locale];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary-gray px-6 text-center">
      <div className="w-full max-w-xl">
        <LottieAnimation animationData={notFoundAnimation} className="mx-auto h-29 w-full" />
        <h1 className="mt-6 text-3xl font-bold text-[#21203a]">{t.title}</h1>
        <p className="mt-3 text-lg text-[#6b6b7b]">{t.subtitle}</p>
        <Link
          href={`/${locale}/dashboard`}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#4b2f1a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3f2616]"
        >
          {t.backHome}
        </Link>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useLocale, useTranslation } from '@/lib/locale-context';
import { LottieAnimation } from './LottieAnimation';
import notFoundAnimation from '@/app/assets/lottie/not-found.json';

export function NotFoundPage() {
  const { locale } = useLocale();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="w-full max-w-xl">
        <LottieAnimation animationData={notFoundAnimation} className="mx-auto h-64 w-full" />
        <h1 className="mt-6 text-3xl font-bold text-[#21203a]">{t('notFound.title')}</h1>
        <p className="mt-3 text-lg text-[#6b6b7b]">{t('notFound.subtitle')}</p>
        <Link
          href={`/${locale}/dashboard`}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#4b2f1a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3f2616]"
        >
          {t('notFound.backHome')}
        </Link>
      </div>
    </div>
  );
}

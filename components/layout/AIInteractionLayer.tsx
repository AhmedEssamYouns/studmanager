'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/lib/locale-context';
import { AICategoryPicker } from '@/components/ai/AICategoryPicker';

export function AIInteractionLayer() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const isAIPage = pathname === `/${locale}/ai`;

  return (
    <>
      <AICategoryPicker
        trigger={
          <div className="relative flex h-44 w-16 items-center justify-center">
            <Image
              src="/svgs/aibtn.svg"
              alt="AI Button"
              fill
              className="object-contain"
            />
          </div>
        }
        triggerClassName="fixed left-5 top-1/2 z-50 hidden -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 md:block"
      />

      {!isAIPage && (
        <AICategoryPicker
          trigger={
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d6cfc9] bg-white shadow-md">
              <Image
                src="/ai/الاداء.svg"
                alt="AI Mobile"
                width={36}
                height={36}
              />
            </div>
          }
          triggerClassName="fixed bottom-24 left-6 z-50 cursor-pointer transition-transform active:scale-90 md:hidden"
        />
      )}
    </>
  );
}

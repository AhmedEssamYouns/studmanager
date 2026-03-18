'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/lib/locale-context';

const AI_CATEGORIES = [
  { id: 'performance', name: 'الاداء', icon: '/ai/الاداء.svg' },
  { id: 'production', name: 'الانتاج', icon: '/ai/الانتاج.svg' },
  { id: 'nutrition', name: 'التغذية', icon: '/ai/التغذية.svg' },
  { id: 'accounts', name: 'الحسابات', icon: '/ai/الحسابات.svg' },
  { id: 'doctor', name: 'الطبيب', icon: '/ai/الطبيب.svg' },
];

export function AIInteractionLayer() {
  const router = useRouter();
  const { locale, direction } = useLocale();
  const isRTL = direction === 'rtl';
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleCategoryClick = (id: string) => {
    setIsOpen(false);
    router.push(`/${locale}/ai?model=${id}`);
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Desktop Button */}
      <div
        className={`fixed top-1/2 -translate-y-1/2 z-50 hidden md:block cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group ${false ? 'right-5 translate-x-1/2' : 'left-5 -translate-x-1/2'
          }`}
        onClick={handleOpen}
      >
        <div className="relative w-16 h-44 flex items-center justify-center">
          <Image
            src="/svgs/aibtn.svg"
            alt="AI Button"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Mobile Button */}
      <div
        className={`fixed bottom-24 z-50 md:hidden cursor-pointer active:scale-90 transition-transform ${false ? 'right-6' : 'left-6'
          }`}
        onClick={handleOpen}
      >
        <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center border border-[#d6cfc9]">
          <Image
            src="/ai/الاداء.svg"
            alt="AI Mobile"
            width={36}
            height={36}
          />
        </div>
      </div>

      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-full max-w-6xl bg-[#e9e5e2] rounded-[28px] md:rounded-[40px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 ease-out">
            {/* Header */}
            <div className="flex items-center justify-between px-5 md:px-8 py-4 md:py-6 border-b border-[#d6cfc9]">
              <div className="text-right">
                <h2 className="text-xl md:text-2xl font-bold text-[#2b2330]">
                  المساعد الذكي
                </h2>
                <p className="text-[#6b5e57] text-xs md:text-sm mt-1">
                  اختر التصنيف لبدء التحليل
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 md:p-3 hover:bg-[#d6cfc9]/40 rounded-full transition-all active:scale-90"
              >
                <X size={22} />
              </button>
            </div>

            {/* Grid */}
            <div className="p-4 md:p-10">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
                {AI_CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className="flex flex-col items-center gap-3 md:gap-5 p-4 md:p-6 rounded-2xl md:rounded-[24px] bg-[#f1eeeb] shadow-md hover:shadow-lg transition-all cursor-pointer hover:bg-[#ece8e4]"
                  >
                    <div className="w-14 h-14 md:w-20 md:h-20 relative">
                      <Image
                        src={cat.icon}
                        alt={cat.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <span className="text-[#2b2330] font-semibold text-sm md:text-base text-center">
                      {cat.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
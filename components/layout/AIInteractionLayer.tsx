'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLocale } from '@/lib/locale-context';
import { X } from 'lucide-react';

const AI_CATEGORIES = [
  { id: 'performance', name: 'الاداء', icon: '/ai/الاداء.svg' },
  { id: 'production', name: 'الانتاج', icon: '/ai/الانتاج.svg' },
  { id: 'nutrition', name: 'التغذية', icon: '/ai/التغذية.svg' },
  { id: 'accounts', name: 'الحسابات', icon: '/ai/الحسابات.svg' },
  { id: 'doctor', name: 'الطبيب', icon: '/ai/الطبيب.svg' },
];

export function AIInteractionLayer() {
  const { direction } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOpen = () => {
    setShowFlash(true);
    setTimeout(() => {
      setShowFlash(false);
      setIsOpen(true);
    }, 150);
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Screen Flash Effect */}
      {showFlash && (
        <div className="fixed inset-0 z-[200] bg-white animate-out fade-out duration-300 pointer-events-none" />
      )}

      {/* AI Button - Desktop */}
      <div
        className={`fixed top-1/2 -translate-y-1/2 z-50 hidden md:block cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group ${'left-5 -translate-x-1/2'
          }`}
        onClick={handleOpen}
      >
        <div className="relative w-16 h-44 flex items-center justify-center">
          <Image
            src="/svgs/aibtn.svg"
            alt="AI Button"
            fill
            className="object-contain drop-shadow-[0_0_15px_rgba(234,179,8,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(234,179,8,0.5)] transition-all"
          />
        </div>
      </div>

      {/* AI Button - Mobile */}
      <div
        className="fixed bottom-24 left-6 z-50 md:hidden cursor-pointer active:scale-90 transition-transform"
        onClick={handleOpen}
      >
        <div className="w-16 h-16 bg-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.1)] flex items-center justify-center border-2 border-primary-gold relative overflow-hidden">
          <Image
            src="/ai/الاداء.svg"
            alt="AI Mobile"
            width={36}
            height={36}
            className="z-10 relative left-0.5 pr-0.5"
          />
          <div className="absolute inset-0 bg-primary-gold/10 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-gold/0 via-white/40 to-primary-gold/0 translate-x-[-100%] animate-[shimmer_2s_infinite]" />
        </div>
      </div>

      {/* AI Dashboard Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center  justify-center p-4">
          <div
            className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-xl transition-all duration-500 animate-in fade-in"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-full max-w-5xl bg-white/5 border border-white/20 rounded-[40px] shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Glossy Header */}
            <div className="flex items-center justify-between p-8 border-b border-white/10 bg-white/5">
              <div className="text-right">
                <h2 className="text-3xl font-bold bg-gradient-to-l from-white to-white/60 bg-clip-text text-transparent">المساعد الذكي</h2>
                <p className="text-white/40 text-sm mt-1">اختر التصنيف لبدء التحليل المدعوم بالذكاء الاصطناعي</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-3 hover:bg-white/10 rounded-full transition-all text-white border border-white/10 active:scale-90"
              >
                <X size={28} />
              </button>

            </div>

            {/* Categories Grid */}
            <div className="p-10 grid grid-cols-2 lg:grid-cols-5 gap-8">
              {AI_CATEGORIES.map((cat, index) => (
                <div
                  key={cat.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="group flex flex-col items-center gap-6 p-8 rounded-[32px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary-gold/50 hover:shadow-[0_0_30px_rgba(234,179,8,0.15)] transition-all cursor-pointer animate-in slide-in-from-bottom-5"
                >
                  <div className="w-20 h-20 relative transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                    <div className="absolute inset-0 bg-primary-gold/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Image
                      src={cat.icon}
                      alt={cat.name}
                      fill
                      className="object-contain relative z-10"
                    />
                  </div>
                  <span className="text-white font-semibold text-xl tracking-wide">
                    {cat.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Glow */}
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-primary-gold/20 blur-[100px] rounded-full pointer-events-none" />
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </>
  );
}

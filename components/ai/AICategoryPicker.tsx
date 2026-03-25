"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/lib/locale-context";

const AI_CATEGORIES = [
  { id: "performance", name: "الاداء", icon: "/ai/الاداء.svg" },
  { id: "production", name: "الانتاج", icon: "/ai/الانتاج.svg" },
  { id: "nutrition", name: "التغذية", icon: "/ai/التغذية.svg" },
  { id: "accounts", name: "الحسابات", icon: "/ai/الحسابات.svg" },
  { id: "doctor", name: "الطبيب", icon: "/ai/الطبيب.svg" },
];

interface AICategoryPickerProps {
  trigger: ReactNode;
  triggerClassName?: string;
}

export function AICategoryPicker({
  trigger,
  triggerClassName,
}: AICategoryPickerProps) {
  const router = useRouter();
  const { locale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryClick = (id: string) => {
    setIsOpen(false);
    router.push(`/${locale}/ai?model=${id}`);
  };

  return (
    <>
      <button
        type="button"
        className={triggerClassName}
        onClick={() => setIsOpen(true)}
      >
        {trigger}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6">
          <div
            className="absolute inset-0 animate-in fade-in bg-black/30 backdrop-blur-sm duration-300"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-full max-w-6xl overflow-hidden rounded-[28px] bg-[#e9e5e2] shadow-xl animate-in fade-in zoom-in-95 duration-300 ease-out md:rounded-[40px]">
            <div className="flex items-center justify-between border-b border-[#d6cfc9] px-5 py-4 md:px-8 md:py-6">
              <div className="text-right">
                <h2 className="text-xl font-bold text-[#2b2330] md:text-2xl">
                  المساعد الذكي
                </h2>
                <p className="mt-1 text-xs text-[#6b5e57] md:text-sm">
                  اختر التصنيف لبدء التحليل
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 transition-all hover:bg-[#d6cfc9]/40 active:scale-90 md:p-3"
              >
                <X size={22} />
              </button>
            </div>

            <div className="p-4 md:p-10">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-8 lg:grid-cols-5">
                {AI_CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className="flex cursor-pointer flex-col items-center gap-3 rounded-2xl bg-[#f1eeeb] p-4 shadow-md transition-all hover:bg-[#ece8e4] hover:shadow-lg md:gap-5 md:rounded-[24px] md:p-6"
                  >
                    <div className="relative h-14 w-14 md:h-20 md:w-20">
                      <Image
                        src={cat.icon}
                        alt={cat.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <span className="text-center text-sm font-semibold text-[#2b2330] md:text-base">
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

"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useLocale } from "@/lib/locale-context";
import Link from "next/link";
import Image from "next/image";

// Performance dashboard categories mapped to the user-provided images
const PERFORMANCE_CATEGORIES = [
  { id: "trainings", labelAr: "التدريبات", labelEn: "Trainings", icon: "/performance/التدريبات.svg" },
  { id: "competitions", labelAr: "المسابقات", labelEn: "Competitions", icon: "/performance/المسابقات.svg" },
  { id: "haircut", labelAr: "قص الشعر", labelEn: "Haircut", icon: "/performance/قص الشعر.svg" },
];

export default function PerformanceDashboardPage() {
  const { locale, direction } = useLocale();
  const isRTL = direction === "rtl";

  return (
    <MainLayout>
      <div className={`p-6 max-w-6xl mx-auto space-y-6 ${isRTL ? "text-right font-cairo" : "text-left font-inter"}`}>
        
        {/* Categories Grid */}
        <div className="flex flex-wrap gap-6 justify-center lg:justify-end xl:justify-end flex-row-reverse mt-10">
          {PERFORMANCE_CATEGORIES.map((category) => {
            const label = isRTL ? category.labelAr : category.labelEn;
            return (
              <Link 
                key={category.id} 
                href={`/${locale}/performance/${category.id}`}
                className="bg-white rounded-[24px] p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center justify-center gap-4 w-[180px] h-[180px]"
              >
                <div className="relative w-16 h-16">
                  <Image 
                    src={category.icon} 
                    alt={label} 
                    fill 
                    className="object-contain"
                  />
                </div>
                <span className="text-[#3b2b20] font-bold text-center text-[15px] leading-tight mt-2">
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}

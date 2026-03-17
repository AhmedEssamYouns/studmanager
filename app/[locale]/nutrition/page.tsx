"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useLocale } from "@/lib/locale-context";
import Link from "next/link";
import Image from "next/image";

// Nutrition dashboard categories mapped to the user-provided images
const NUTRITION_CATEGORIES = [
  { id: "feed-changes", labelAr: "تغييرات الأعلاف", labelEn: "Feed Changes", icon: "/nutrition/تغييرات الأعلاف.svg" },
  { id: "monthly-supplements", labelAr: "المكملات الشهرية", labelEn: "Monthly Supplements", icon: "/nutrition/المكملات الشهرية.svg" },
  { id: "tournament-supplements", labelAr: "مكملات المهرجنات", labelEn: "Tournament Supplements", icon: "/nutrition/مكملات المهرجنات.svg" },
  { id: "nutrition-assistant", labelAr: "مساعد التغذية", labelEn: "Nutrition Assistant", icon: "/nutrition/مساعد التغذية.png" },
];

export default function NutritionDashboardPage() {
  const { locale, direction } = useLocale();
  const isRTL = direction === "rtl";

  return (
    <MainLayout>
      <div className={`p-6 max-w-6xl mx-auto space-y-6 ${isRTL ? "text-right font-cairo" : "text-left font-inter"}`}>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center mt-10">
          {NUTRITION_CATEGORIES.map((category) => {
            const label = isRTL ? category.labelAr : category.labelEn;
            return (
              <Link 
                key={category.id} 
                href={`/${locale}/nutrition/${category.id}`}
                className="bg-white rounded-[24px] p-4 sm:p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center justify-center gap-4 w-full aspect-square"
              >
                <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                  <Image 
                    src={category.icon} 
                    alt={label} 
                    fill 
                    className="object-contain"
                  />
                </div>
                <span className="text-[#3b2b20] font-bold text-center text-[13px] sm:text-[15px] leading-tight mt-2 line-clamp-2">
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

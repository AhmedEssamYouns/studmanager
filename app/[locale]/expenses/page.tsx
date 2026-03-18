"use client";


import { MainLayout } from "@/components/layout/MainLayout";
import { useLocale } from "@/lib/locale-context";
import Image from "next/image";
import Link from "next/link";


// ===== Categories =====
const EXPENSES_CATEGORIES = [
    { id: "subscription", labelAr: "عضوية", labelEn: "Subscription", icon: "/expenses/subscription.svg" },
    { id: "purchase", labelAr: "عملية الشراء", labelEn: "Purchase", icon: "/expenses/purchase.svg" },
    { id: "nutrition", labelAr: "التغذية", labelEn: "Nutrition", icon: "/expenses/nutrition.svg" },
    { id: "clinics", labelAr: "العيادات", labelEn: "Clinics", icon: "/expenses/clinics.svg" },
    { id: "housing", labelAr: "الإيواء", labelEn: "Housing", icon: "/expenses/housing.svg" },
    { id: "other", labelAr: "مصاريف أخرى", labelEn: "Other Expenses", icon: "/expenses/other.svg" },
    { id: "labor", labelAr: "العمالة", labelEn: "Labor", icon: "/expenses/labor.svg" },
    { id: "equipment", labelAr: "معدات الخيول", labelEn: "Horse Equipment", icon: "/expenses/equipment.svg" },
    { id: "transport", labelAr: "النقل", labelEn: "Transport", icon: "/expenses/transport.svg" },

];

export default function ExpensesPage() {
    const { locale, direction } = useLocale();
    const isRTL = direction === "rtl";

    return (
        <MainLayout>
            <div className={`p-6 max-w-6xl mx-auto space-y-6 ${isRTL ? "text-right font-cairo" : "text-left font-inter"}`}>

                {/* Categories Grid */}
                <div className="flex flex-wrap gap-6 justify-center lg:justify-end xl:justify-end flex-row-reverse mt-10">
                    {EXPENSES_CATEGORIES.map((category) => {
                        const label = isRTL ? category.labelAr : category.labelEn;
                        return (
                            <Link
                                key={category.id}
                                href={`/${locale}/expenses/${category.id}`}
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
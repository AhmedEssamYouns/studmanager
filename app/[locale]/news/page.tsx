"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useLocale, useTranslation } from "@/lib/locale-context";
import Image from "next/image";

const NEWS_ITEMS = {
  ar: [
    {
      id: 1,
      title: "اضافة مزرعة جديدة",
      date: "4 ابريل 2025",
      icon: "🌐",
      iconBg: "bg-blue-500",
      image:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&h=350&fit=crop",
      body:
        "إضافة جديدة إلى Studbook مزرعة مهنا\nفي خطوة جديدة لتعزيز شبكة المزارع المعتمدة وتوسيع نطاق الخدمة والرعاية البيطرية المتقدمة.\nمزرعة مهنا تُعد من المزارع الواعدة في مجال تربية ورعاية الخيول، وتتميز ببنية تحتية متطورة، واهتمام كبير بالتفاصيل في كل ما يتعلق بصحة الخيل وجودة العلف وبيئة التربية.",
    },
    {
      id: 2,
      title: "مهرجان جديد",
      date: "4 ابريل 2025",
      icon: "📍",
      iconBg: "bg-orange-500",
      image:
        "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&h=350&fit=crop",
      body:
        "مهرجان الخيول - المسخة السنوية\nيسعدنا أن نُعلن عن إطلاق فعالية جديدة لهذا العام، يجمع بين الترفيه والتعليم والتفاعل المباشر مع أفضل الخبراء في مجال تربية الخيول.\n\n◆ تفاصيل الحدث:\n• 📍 المكان: مزرعة مهنا – الساحة الرئيسية\n• 📅 التاريخ: 15 مايو 2025 المزيد...",
    },
  ],
  en: [
    {
      id: 1,
      title: "New Farm Added",
      date: "April 4, 2025",
      icon: "🌐",
      iconBg: "bg-blue-500",
      image:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&h=350&fit=crop",
      body:
        "A new farm has been added to Studbook.\nThis step expands the network of approved farms and strengthens advanced care and veterinary support.\nMehna Farm is one of the promising farms in horse breeding and care, with strong infrastructure and close attention to horse health, feed quality, and the breeding environment.",
    },
    {
      id: 2,
      title: "New Festival",
      date: "April 4, 2025",
      icon: "📍",
      iconBg: "bg-orange-500",
      image:
        "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&h=350&fit=crop",
      body:
        "Horse Festival - Annual Edition\nWe are pleased to announce a new event for this year that combines entertainment, education, and direct interaction with leading experts in horse breeding.\n\n◆ Event details:\n• Location: Mehna Farm - Main Arena\n• Date: May 15, 2025 and more...",
    },
  ],
} as const;

export default function NewsPage() {
  const { direction, locale } = useLocale();
  const { t } = useTranslation();
  const isRTL = direction === "rtl";
  const items = locale === "ar" ? NEWS_ITEMS.ar : NEWS_ITEMS.en;

  return (
    <MainLayout>
      <div
        className={`mx-auto p-6 ${isRTL ? "font-cairo" : ""}`}
        dir={direction}
      >
        <h1 className="mb-8 text-start text-2xl font-bold text-[#3b2b20]">
          {t("news.title")}
        </h1>

        <div className="space-y-10">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-gray-50 bg-white p-8 shadow-sm"
            >
              <div
                className={`mb-6 flex items-center gap-4 ${
                  isRTL ? "" : "justify-start"
                }`}
              >
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-xl text-white ${item.iconBg}`}
                >
                  {item.icon}
                </div>
                <div className={isRTL ? "text-right" : "text-left"}>
                  <h2 className="text-xl font-bold text-[#3b2b20]">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">{item.date}</p>
                </div>
              </div>

              <div
                className={`flex flex-col gap-6 md:flex-row ${
                  isRTL ? "" : "md:flex-row-reverse"
                }`}
              >
                <div className="relative h-[220px] w-full flex-shrink-0 overflow-hidden rounded-2xl md:w-[320px]">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>

                <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                  {item.body.split("\n").map((line, i) => (
                    <p key={i} className="mb-2 text-[15px] leading-relaxed text-gray-600">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

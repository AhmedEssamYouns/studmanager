"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useLocale } from "@/lib/locale-context";
import Image from "next/image";

const NEWS_ITEMS = [
  {
    id: 1,
    title: "اضافة مزرعة جديدة",
    date: "4 ابريل 2025",
    icon: "🌐",
    iconBg: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&h=350&fit=crop",
    body: "إضافة جديدة إلى Studbook مزرعة مهنا\nفي خطوة جديدة لتعزيز شبكة المزارع المعتمدة وتوسيع نطاق الخدمة والرعاية البيطرية المتقدمة.\nمزرعة مهنا تُعد من المزارع الواعدة في مجال تربية ورعاية الخيول، وتتميز ببنية تحتية متطورة، واهتمام كبير بالتفاصيل في كل ما يتعلق بصحة الخيل وجودة العلف وبيئة التربية.",
  },
  {
    id: 2,
    title: "مهرجان جديد",
    date: "4 ابريل 2025",
    icon: "📍",
    iconBg: "bg-orange-500",
    image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&h=350&fit=crop",
    body: "مهرجان الخيول - المسخة السنوية\nيسعدنا أن نُعلن عن إطلاق فعالية جديدة لهذا العام، يجمع بين الترفيه والتعليم والتفاعل المباشر مع أفضل الخبراء في مجال تربية الخيول.\n\n◆ تفاصيل الحدث:\n• 📍 المكان: مزرعة مهنا – الساحة الرئيسية\n• 📅 التاريخ: 15 مايو 2025 المزيد...",
  },
];

export default function NewsPage() {
  const { direction } = useLocale();
  const isRTL = direction === "rtl";

  return (
    <MainLayout>
      <div className={`p-6  mx-auto ${isRTL ? "font-cairo" : ""}`} dir={direction}>
        <h1 className="text-2xl font-bold text-[#3b2b20] mb-8 text-start">الأخبار</h1>

        <div className="space-y-10">
          {NEWS_ITEMS.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50">
              {/* Header - icon on right, text next to it in RTL */}
              <div className={`flex items-center gap-4 mb-6 ${isRTL ? "" : "justify-start"}`}>
                <div className={`w-12 h-12 rounded-full ${item.iconBg} flex items-center justify-center text-white text-xl flex-shrink-0`}>
                  {item.icon}
                </div>
                <div className={isRTL ? "text-right" : "text-left"}>
                  <h2 className="text-xl font-bold text-[#3b2b20]">{item.title}</h2>
                  <p className="text-gray-400 text-sm mt-1">{item.date}</p>
                </div>
              </div>

              {/* Content - Image on RIGHT for RTL, text on LEFT */}
              <div className={`flex flex-col md:flex-row gap-6 ${isRTL ? "" : "md:flex-row-reverse"}`}>
                {/* Image - appears first in DOM, rendered on right side in RTL */}
                <div className="relative w-full md:w-[320px] h-[220px] rounded-2xl overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                {/* Text */}
                <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                  {item.body.split("\n").map((line, i) => (
                    <p key={i} className="text-gray-600 leading-relaxed text-[15px] mb-2">{line}</p>
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

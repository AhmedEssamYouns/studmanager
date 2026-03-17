"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useLocale } from "@/lib/locale-context";
import { Bell, CheckCircle, AlertCircle, Info, Trash2 } from "lucide-react";

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "success" as const,
    titleAr: "تم حفظ البيانات بنجاح",
    titleEn: "Data saved successfully",
    bodyAr: "تم حفظ بيانات الخيل 'مداح مهنا' بنجاح.",
    bodyEn: "Horse data 'Madah Muhana' saved successfully.",
    time: "10:30 AM",
    date: "اليوم",
    read: false,
  },
  {
    id: 2,
    type: "warning" as const,
    titleAr: "موعد تطعيم قادم",
    titleEn: "Upcoming vaccination",
    bodyAr: "يجب تطعيم الخيل 'أصايل' خلال الأسبوع القادم.",
    bodyEn: "Horse 'Asayel' needs vaccination next week.",
    time: "09:15 AM",
    date: "اليوم",
    read: false,
  },
  {
    id: 3,
    type: "info" as const,
    titleAr: "تحديث النظام",
    titleEn: "System update",
    bodyAr: "تم تحديث النظام إلى الإصدار الأخير بنجاح.",
    bodyEn: "System updated to the latest version.",
    time: "08:00 AM",
    date: "اليوم",
    read: true,
  },
  {
    id: 4,
    type: "success" as const,
    titleAr: "تم إضافة خيل جديد",
    titleEn: "New horse added",
    bodyAr: "تمت إضافة الخيل 'فارس الليل' إلى القائمة.",
    bodyEn: "Horse 'Fares Al Layl' added to the list.",
    time: "03:45 PM",
    date: "أمس",
    read: true,
  },
  {
    id: 5,
    type: "warning" as const,
    titleAr: "مصروفات مرتفعة",
    titleEn: "High expenses",
    bodyAr: "المصروفات هذا الشهر تجاوزت الميزانية المحددة.",
    bodyEn: "This month's expenses exceeded the budget.",
    time: "11:20 AM",
    date: "أمس",
    read: true,
  },
  {
    id: 6,
    type: "info" as const,
    titleAr: "تقرير جديد جاهز",
    titleEn: "New report ready",
    bodyAr: "التقرير الشهري لأداء الخيل جاهز للمراجعة.",
    bodyEn: "Monthly horse performance report is ready for review.",
    time: "02:00 PM",
    date: "منذ يومين",
    read: true,
  },
];

const ICON_MAP = {
  success: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" },
  warning: { icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-50" },
  info: { icon: Info, color: "text-blue-500", bg: "bg-blue-50" },
};

export default function NotificationsPage() {
  const { direction } = useLocale();
  const isRTL = direction === "rtl";

  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <MainLayout>
      <div className={`p-3 sm:p-6  mx-auto ${isRTL ? "font-cairo" : ""}`} dir={direction}>
        {/* Header */}
        <div className={`flex items-center justify-between mb-6 ${isRTL ? "" : ""}`}>
          <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className="relative">
              <Bell className="w-6 h-6 text-[#3b2b20]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{unreadCount}</span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#3b2b20]">
              {isRTL ? "الإشعارات" : "Notifications"}
            </h1>
          </div>
          <button className="text-sm text-[#3b2b20] font-semibold hover:underline">
            {isRTL ? "تحديد الكل كمقروء" : "Mark all as read"}
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {MOCK_NOTIFICATIONS.map((notif) => {
            const iconConfig = ICON_MAP[notif.type];
            const IconComponent = iconConfig.icon;

            return (
              <div
                key={notif.id}
                className={`bg-white rounded-2xl p-4 sm:p-5 shadow-sm border transition-all hover:shadow-md ${notif.read ? "border-gray-100" : "border-[#f5efbb] bg-[#fffdf5]"
                  }`}
              >
                <div className={`flex gap-3 sm:gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  {/* Icon */}
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full ${iconConfig.bg} flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className={`w-5 h-5 ${iconConfig.color}`} />
                  </div>

                  {/* Content */}
                  <div className={`flex-1 min-w-0 ${isRTL ? "text-right" : "text-left"}`}>
                    <div className={`flex items-start justify-between gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <h3 className={`text-sm sm:text-[15px] font-bold text-[#3b2b20] ${!notif.read ? "" : "font-semibold"}`}>
                        {isRTL ? notif.titleAr : notif.titleEn}
                      </h3>
                      <div className={`flex items-center gap-2 flex-shrink-0 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <span className="text-xs text-gray-400">{notif.time}</span>
                        {!notif.read && <span className="w-2 h-2 rounded-full bg-[#3b2b20]" />}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
                      {isRTL ? notif.bodyAr : notif.bodyEn}
                    </p>
                    <span className="text-[11px] text-gray-400 mt-2 inline-block">{notif.date}</span>
                  </div>

                  {/* Delete */}
                  <button className="p-1.5 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors self-start flex-shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout >
  );
}

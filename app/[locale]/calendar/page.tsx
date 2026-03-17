"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useLocale } from "@/lib/locale-context";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const DAYS_AR = ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"];

const EVENT_COLORS = [
  "bg-[#e8f5e9] text-green-800",
  "bg-[#fff8e1] text-amber-800",
  "bg-[#e3f2fd] text-blue-800",
  "bg-[#fce4ec] text-red-800",
  "bg-[#fff3e0] text-orange-800",
  "bg-[#f3e5f5] text-purple-800",
];

const MOCK_EVENTS = [
  { id: 1, name: "اسم العنصر", time: "10:00am", color: 0 },
  { id: 2, name: "اسم العنصر", time: "10:00am", color: 1 },
  { id: 3, name: "اسم العنصر", time: "10:00am", color: 2 },
  { id: 4, name: "اسم العنصر", time: "10:00am", color: 3 },
  { id: 5, name: "اسم العنصر", time: "10:00am", color: 4 },
  { id: 6, name: "اسم العنصر", time: "10:00am", color: 5 },
];

// Calendar events placed on specific days
const CALENDAR_EVENTS: Record<number, { name: string; time: string; color: string }> = {
  4: { name: "اسم العنصر", time: "10:00 AM", color: "bg-[#e3f2fd] text-blue-800" },
  11: { name: "اسم العنصر", time: "10:00 AM", color: "bg-[#fff8e1] text-amber-800" },
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  // Saturday = 0 for Arabic calendar
  const day = new Date(year, month, 1).getDay();
  // JS: 0=Sun, 6=Sat. Arabic week starts Sat=0
  return (day + 1) % 7;
}

const MONTHS_AR = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

export default function CalendarPage() {
  const { direction } = useLocale();
  const isRTL = direction === "rtl";
  const [currentYear, setCurrentYear] = useState(2025);
  const [currentMonth, setCurrentMonth] = useState(0); // January
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  // Build calendar grid
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  // Fill remaining cells for last row
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  // Get days from prev/next month for empty cells
  const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1);

  return (
    <MainLayout>
      <div className={`p-6 max-w-[1400px] mx-auto ${isRTL ? "text-right font-cairo" : "text-left"}`} dir={direction}>
        <h1 className="text-2xl font-bold text-[#3b2b20] mb-8 text-start">التقويم و الأحداث</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Calendar */}
          <div className="flex-1 bg-white rounded-3xl p-6 shadow-sm">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <button onClick={prevMonth} className="p-1.5 hover:bg-gray-100 rounded-full"><ChevronRight className="w-5 h-5" /></button>
                <button onClick={nextMonth} className="p-1.5 hover:bg-gray-100 rounded-full"><ChevronLeft className="w-5 h-5" /></button>
              </div>
              <h2 className="text-lg font-bold text-[#3b2b20]">{MONTHS_AR[currentMonth]} {currentYear}</h2>
              <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                {(["day", "week", "month"] as const).map(mode => (
                  <button key={mode} onClick={() => setViewMode(mode)} className={`px-4 py-2 text-sm font-semibold ${viewMode === mode ? "bg-[#3b2b20] text-white" : "text-gray-600 hover:bg-gray-50"}`}>
                    {mode === "month" ? "شهر" : mode === "week" ? "أسبوع" : "يوم"}
                  </button>
                ))}
              </div>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS_AR.map(day => (
                <div key={day} className="text-center text-sm font-semibold text-gray-500 py-2">{day}</div>
              ))}
            </div>

            {/* Calendar Cells */}
            <div className="grid grid-cols-7 border-t border-l border-gray-100">
              {cells.map((day, i) => {
                const event = day ? CALENDAR_EVENTS[day] : null;
                const isOutside = day === null;
                const outsideDay = isOutside ? (i < firstDay ? prevMonthDays - (firstDay - 1 - i) : i - firstDay - daysInMonth + 1) : null;

                return (
                  <div key={i} className={`min-h-[80px] border-r border-b border-gray-100 p-2 ${isOutside ? "bg-gray-50/50" : ""}`}>
                    <span className={`text-sm ${isOutside ? "text-gray-300" : "text-gray-700 font-medium"}`}>
                      {day || outsideDay}
                    </span>
                    {event && (
                      <div className={`mt-1 px-2 py-1 rounded-lg text-[11px] font-semibold ${event.color}`}>
                        <div>{event.name}</div>
                        <div className="opacity-70">⏰ {event.time}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Events Sidebar */}
          <div className="w-full lg:w-[280px] space-y-4">
            <div>
              <h3 className="text-lg font-bold text-[#3b2b20] mb-1">الحدث</h3>
              <p className="text-gray-400 text-sm mb-4">اسحب و أفلت</p>
            </div>
            {MOCK_EVENTS.map(evt => (
              <div key={evt.id} className={`rounded-2xl px-5 py-4 ${EVENT_COLORS[evt.color]} cursor-grab`}>
                <div className="font-bold text-[15px]">{evt.name}</div>
                <div className="text-sm opacity-70">{evt.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

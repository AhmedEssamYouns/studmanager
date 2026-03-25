"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useLocale, useTranslation } from "@/lib/locale-context";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

const EVENT_COLORS = [
  "bg-[#e8f5e9] text-green-800",
  "bg-[#fff8e1] text-amber-800",
  "bg-[#e3f2fd] text-blue-800",
  "bg-[#fce4ec] text-red-800",
  "bg-[#fff3e0] text-orange-800",
  "bg-[#f3e5f5] text-purple-800",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number, isRTL: boolean) {
  const day = new Date(year, month, 1).getDay();
  return isRTL ? (day + 1) % 7 : day;
}

export default function CalendarPage() {
  const { direction } = useLocale();
  const { t } = useTranslation();
  const isRTL = direction === "rtl";
  const [currentYear, setCurrentYear] = useState(2025);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");

  const days = useMemo(
    () =>
      isRTL
        ? [
            t("days.saturday"),
            t("days.sunday"),
            t("days.monday"),
            t("days.tuesday"),
            t("days.wednesday"),
            t("days.thursday"),
            t("days.friday"),
          ]
        : [
            t("days.sunday"),
            t("days.monday"),
            t("days.tuesday"),
            t("days.wednesday"),
            t("days.thursday"),
            t("days.friday"),
            t("days.saturday"),
          ],
    [isRTL, t],
  );

  const months = useMemo(
    () => [
      t("months.january"),
      t("months.february"),
      t("months.march"),
      t("months.april"),
      t("months.may"),
      t("months.jun"),
      t("months.july"),
      t("months.august"),
      t("months.september"),
      t("months.october"),
      t("months.november"),
      t("months.december"),
    ],
    [t],
  );

  const mockEvents = useMemo(
    () => [
      { id: 1, name: t("calendar.eventName"), time: "10:00am", color: 0 },
      { id: 2, name: t("calendar.eventName"), time: "10:00am", color: 1 },
      { id: 3, name: t("calendar.eventName"), time: "10:00am", color: 2 },
      { id: 4, name: t("calendar.eventName"), time: "10:00am", color: 3 },
      { id: 5, name: t("calendar.eventName"), time: "10:00am", color: 4 },
      { id: 6, name: t("calendar.eventName"), time: "10:00am", color: 5 },
    ],
    [t],
  );

  const calendarEvents = useMemo(
    () => ({
      4: {
        name: t("calendar.eventName"),
        time: "10:00 AM",
        color: "bg-[#e3f2fd] text-blue-800",
      },
      11: {
        name: t("calendar.eventName"),
        time: "10:00 AM",
        color: "bg-[#fff8e1] text-amber-800",
      },
    }),
    [t],
  );

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth, isRTL);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
      return;
    }
    setCurrentMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
      return;
    }
    setCurrentMonth((m) => m + 1);
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1);

  return (
    <MainLayout>
      <div
        className={`mx-auto max-w-[1400px] p-6 ${
          isRTL ? "font-cairo text-right" : "text-left"
        }`}
        dir={direction}
      >
        <h1 className="mb-8 text-start text-2xl font-bold text-[#3b2b20]">
          {t("calendar.title")}
        </h1>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1 rounded-3xl bg-white p-6 shadow-sm">
            <div
              className="mb-6 flex items-center justify-between gap-4"
              dir={isRTL ? "rtl" : "ltr"}
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={prevMonth}
                  className="rounded-full p-1.5 hover:bg-gray-100"
                  aria-label={t("common.back")}
                >
                  {isRTL ? (
                    <ChevronRight className="h-5 w-5" />
                  ) : (
                    <ChevronLeft className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={nextMonth}
                  className="rounded-full p-1.5 hover:bg-gray-100"
                  aria-label={t("common.next")}
                >
                  {isRTL ? (
                    <ChevronLeft className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </button>
              </div>

              <h2 className="text-lg font-bold text-[#3b2b20]">
                {months[currentMonth]} {currentYear}
              </h2>

              <div
                className="flex overflow-hidden rounded-xl border border-gray-200"
                dir={isRTL ? "rtl" : "ltr"}
              >
                {(["day", "week", "month"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-4 py-2 text-sm font-semibold ${
                      viewMode === mode
                        ? "bg-[#3b2b20] text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {mode === "month"
                      ? t("calendar.viewMonth")
                      : mode === "week"
                        ? t("calendar.viewWeek")
                        : t("calendar.viewDay")}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-2 grid grid-cols-7">
              {days.map((day) => (
                <div
                  key={day}
                  className="py-2 text-center text-sm font-semibold text-gray-500"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 border-l border-t border-gray-100">
              {cells.map((day, i) => {
                const event = day ? calendarEvents[day as keyof typeof calendarEvents] : null;
                const isOutside = day === null;
                const outsideDay = isOutside
                  ? i < firstDay
                    ? prevMonthDays - (firstDay - 1 - i)
                    : i - firstDay - daysInMonth + 1
                  : null;

                return (
                  <div
                    key={i}
                    className={`min-h-[80px] border-b border-r border-gray-100 p-2 ${
                      isOutside ? "bg-gray-50/50" : ""
                    }`}
                  >
                    <span
                      className={`text-sm ${
                        isOutside ? "text-gray-300" : "font-medium text-gray-700"
                      }`}
                    >
                      {day || outsideDay}
                    </span>
                    {event && (
                      <div
                        className={`mt-1 rounded-lg px-2 py-1 text-[11px] font-semibold ${event.color}`}
                      >
                        <div>{event.name}</div>
                        <div className="opacity-70">⏰ {event.time}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full space-y-4 lg:w-[280px]">
            <div>
              <h3 className="mb-1 text-lg font-bold text-[#3b2b20]">
                {t("calendar.event")}
              </h3>
              <p className="mb-4 text-sm text-gray-400">{t("common.dragAndDrop")}</p>
            </div>
            {mockEvents.map((evt) => (
              <div
                key={evt.id}
                className={`cursor-grab rounded-2xl px-5 py-4 ${EVENT_COLORS[evt.color]}`}
              >
                <div className="text-[15px] font-bold">{evt.name}</div>
                <div className="text-sm opacity-70">{evt.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

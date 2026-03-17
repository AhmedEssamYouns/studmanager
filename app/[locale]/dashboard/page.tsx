'use client';

import Link from 'next/link';
import React from 'react';
import { useLocale } from '@/lib/locale-context';
import { MainLayout } from '@/components/layout/MainLayout';
import { SplashScreen } from '@/components/common/SplashScreen';

const stats = [
  {
    label: 'عدد الخيل',
    value: '200',
    accent: 'text-[#7a5b4a]',
    icon: <img src="/svgs/عدد الخيل.svg" alt="" className="h-24 w-24 object-contain" />,
  },
  {
    label: 'مصروفات',
    value: '500$',
    accent: 'text-[#008f9c]',
    icon: <img src="/svgs/مصروفات.svg" alt="" className="h-24 w-24 object-contain" />,
  },
  {
    label: 'أرباح',
    value: '500$',
    accent: 'text-[#d37a17]',
    icon: <img src="/svgs/earning.svg" alt="" className="h-24 w-24 object-contain" />,
  },
  {
    label: 'مبيعات',
    value: '500',
    accent: 'text-[#d81c24]',
    icon: <img src="/svgs/red-horse.svg" alt="" className="h-24 w-24 object-contain" />,
  },
];

const recentInvoices = [
  { product: 'اسم المنتج', client: 'محمد أحمد', number: '123456', status: 'قيد التنفيذ', statusClass: 'bg-[#ffe9aa] text-[#b38000]', category: 'طعام', cost: '1200$' },
  { product: 'اسم المنتج', client: 'محمد أحمد', number: '123456', status: 'مرفوض', statusClass: 'bg-[#ffd5c5] text-[#ff2617]', category: 'كهرباء', cost: '1200$' },
  { product: 'اسم المنتج', client: 'محمد أحمد', number: '123456', status: 'مدفوع', statusClass: 'bg-[#cdf7d5] text-[#13a43a]', category: 'بقالة', cost: '1200$' },
  { product: 'اسم المنتج', client: 'محمد أحمد', number: '123456', status: 'مدفوع', statusClass: 'bg-[#cdf7d5] text-[#13a43a]', category: 'ملابس', cost: '1200$' },
  { product: 'اسم المنتج', client: 'محمد أحمد', number: '123456', status: 'مدفوع', statusClass: 'bg-[#cdf7d5] text-[#13a43a]', category: 'طعام', cost: '1200$' },
];

const days = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

const calendarWeeks = [
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [29, 30, 31, '1 فبراير', 2, 3, 4],
];

const events = [
  { title: 'اسم الحدث', time: '10:00 AM إلى 12:00 PM', color: 'bg-[#d8f4ff] text-[#2b99d3] border-[#34aaf6]' },
  { title: 'اسم الحدث', time: '10:00 AM إلى 12:00 PM', color: 'bg-[#fff0c5] text-[#c88d1d] border-[#f0c04b]' },
  { title: 'اسم الحدث', time: '10:00 AM إلى 12:00 PM', color: 'bg-[#d5f8de] text-[#39b56c] border-[#49d77d]' },
  { title: 'اسم الحدث', time: '10:00 AM إلى 12:00 PM', color: 'bg-[#ffd8c9] text-[#ff2317] border-[#ff3b2f]' },
  { title: 'اسم الحدث', time: '10:00 AM إلى 12:00 PM', color: 'bg-[#ffe4c8] text-[#ff8a3d] border-[#ff9a56]' },
  { title: 'اسم الحدث', time: '10:00 AM إلى 12:00 PM', color: 'bg-[#f4ddff] text-[#8b4cff] border-[#a34fff]' },
];

export default function DashboardPage() {
  const { locale, direction } = useLocale();

  const [activeView, setActiveView] = React.useState<'day' | 'week' | 'month'>('month');

  

  const viewTabs = [
    { key: 'day', label: 'يوم' },
    { key: 'week', label: 'أسبوع' },
    { key: 'month', label: 'شهر' },
  ] as const;
  const tabIndex = viewTabs.findIndex((tab) => tab.key === activeView);
  const sliderStyle = direction === 'rtl' ? { right: `${tabIndex * 33.333}%` } : { left: `${tabIndex * 33.333}%` };

  return (
    <MainLayout>
      <div className="space-y-4 sm:space-y-6 lg:space-y-7">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 [direction:rtl]">
          {stats.map((stat) => (
            <article key={stat.label} className="flex flex-col-reverse items-center justify-between gap-4 rounded-[16px] bg-white px-4 py-5 sm:rounded-[24px] sm:px-6 sm:py-6 lg:flex-row-reverse">
              <div className="space-y-1 text-center sm:text-right">
                <div className={`text-lg font-bold sm:text-[1.85rem] ${stat.accent}`}>{stat.value}</div>
                <div className="text-sm font-semibold text-[#2b2231] sm:text-[1.6rem]">{stat.label}</div>
              </div>
              {stat.icon}
            </article>
          ))}
        </section>

        <section className="overflow-x-auto rounded-[16px] bg-white shadow-[0_16px_36px_rgba(94,56,23,0.05)] sm:rounded-[28px]">
          <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6">
            <h2 className="text-lg font-bold text-[#21203a] sm:text-[2.3rem]">
              الفواتير الأخيرة
            </h2>
            <Link
              href={`/${locale}/invoices`}
              className="inline-flex rounded-full bg-[#4b2f1a] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#3f2616] sm:px-6 sm:text-sm"
            >
              الفواتير
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0 text-right text-sm sm:text-base">
              <thead className="hidden sm:table-header-group">
                <tr className="text-[0.9rem] text-[#c3beb9] sm:text-[1.02rem]">
                  <th className="border-b border-[#efe4dc] px-3 py-4 font-semibold sm:px-6 sm:py-5">المنتج</th>
                  <th className="border-b border-[#efe4dc] px-3 py-4 font-semibold sm:px-6 sm:py-5">اسم العميل</th>
                  <th className="border-b border-[#efe4dc] px-3 py-4 font-semibold sm:px-6 sm:py-5">رقم الفاتورة</th>
                  <th className="border-b border-[#efe4dc] px-3 py-4 font-semibold sm:px-6 sm:py-5">الحالة</th>
                  <th className="border-b border-[#efe4dc] px-3 py-4 font-semibold sm:px-6 sm:py-5">الفئة</th>
                  <th className="border-b border-[#efe4dc] px-3 py-4 font-semibold sm:px-6 sm:py-5">التكلفة</th>
                </tr>
              </thead>
              <tbody className="text-xs font-semibold text-[#27304a] sm:text-[1.08rem]">
                {recentInvoices.slice(0, 5).map((invoice, index) => (
                  <tr key={`${invoice.number}-${index}`} className="border-b border-[#f3e7df]">
                    <td className="px-3 py-4 sm:px-6 sm:py-5">{invoice.product}</td>
                    <td className="hidden px-3 py-4 sm:table-cell sm:px-6 sm:py-5">{invoice.client}</td>
                    <td className="hidden px-3 py-4 sm:table-cell sm:px-6 sm:py-5">{invoice.number}</td>
                    <td className="px-3 py-4 sm:px-6 sm:py-5">
                      <span className={`inline-flex min-w-fit justify-center rounded-lg px-2 py-1 text-xs font-bold sm:min-w-[5.8rem] sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm ${invoice.statusClass}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="hidden px-3 py-4 sm:table-cell sm:px-6 sm:py-5">{invoice.category}</td>
                    <td className="px-3 py-4 sm:px-6 sm:py-5">{invoice.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-[14.5rem_1fr] lg:gap-5">
          <aside className="order-2 rounded-[16px] bg-white p-4 shadow-[0_16px_36px_rgba(94,56,23,0.05)] sm:rounded-[28px] sm:p-6 lg:order-1">
            <div className="mb-4 text-right sm:mb-5">
              <h3 className="text-lg font-bold text-[#20203c] sm:text-[2.1rem]">
                الحدث
              </h3>
              <p className="text-xs text-[#d7d0ca] sm:text-base">سحب و إفلات</p>
            </div>

            <div className="space-y-2 sm:space-y-4">
              {events.slice(0, 3).map((event) => (
                <div
                  key={`${event.title}-${event.color}`}
                  className={`rounded-lg border-r-4 px-3 py-3 text-right sm:rounded-2xl sm:px-4 sm:py-4 ${event.color}`}
                >
                  <div className="text-xs font-bold sm:text-lg">{event.title}</div>
                  <div className="mt-1 text-xs font-semibold sm:text-sm">{event.time}</div>
                </div>
              ))}
            </div>
          </aside>

          <article className="order-1 rounded-[16px] bg-white p-4 shadow-[0_16px_36px_rgba(94,56,23,0.05)] sm:rounded-[28px] sm:p-6 lg:order-2">
            <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex items-center gap-1 rounded-xl border border-[#4b2f1a] p-0.5 text-xs font-semibold text-[#4b2f1a] sm:gap-0 sm:text-sm">
                <span
                  className="absolute top-0.5 bottom-0.5 w-[calc(33.333%-2px)] rounded-[10px] bg-[#4b2f1a] transition-all duration-300 ease-out"
                  style={sliderStyle}
                />
                {viewTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveView(tab.key)}
                    className={`relative z-10 min-w-[3rem] px-2 py-1 transition-colors duration-300 sm:min-w-[4.35rem] sm:px-4 sm:py-1.5 ${
                      activeView === tab.key ? 'text-white' : 'text-[#4b2f1a]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="text-base font-bold text-[#20203c] sm:text-[2rem]">
                <span className="mr-2 text-xs text-[#2f2f55] sm:text-[#2f2f55]">
                  يناير
                </span>
                2025
              </div>

              <div className="flex items-center gap-2 text-[#4b2f1a] sm:gap-3">
                <button className="flex h-7 w-7 items-center justify-center rounded-full border border-[#4b2f1a] text-lg sm:h-9 sm:w-9 sm:text-xl">
                  {direction === 'rtl' ? '‹':'›'}
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded-full border border-[#4b2f1a] text-lg sm:h-9 sm:w-9 sm:text-xl">
                                  {direction === 'rtl' ? '›':'‹'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 border-r border-t border-[#d9d4cf] sm:gap-0">
              {days.map((day) => (
                <div
                  key={day}
                  className="border-b border-l border-[#efe7e2] px-2 py-2 text-center text-xs font-semibold text-[#cbc5c0] sm:px-3 sm:py-4 sm:text-[1.02rem]"
                >
                  {day}
                </div>
              ))}

              {calendarWeeks.flatMap((week, weekIndex) =>
                week.map((day, dayIndex) => {
                  const dayLabel = typeof day === 'number' ? day.toString() : day;
                  const eventLabel =
                    weekIndex === 0 && dayIndex === 0
                      ? 'اسم الحدث'
                      : weekIndex === 1 && dayIndex === 2
                        ? 'اسم الحدث'
                        : '';

                  return (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className="relative min-h-[3rem] border-b border-l border-[#d9d4cf] px-1 py-1 sm:min-h-[6.4rem] sm:px-3 sm:py-2"
                    >
                      <div className="text-right text-xs font-bold text-[#232741] sm:text-[1.7rem]">
                        {dayLabel}
                      </div>
                      {eventLabel && (
                        <div className="mt-1 hidden rounded-lg bg-[#fdb900] px-2 py-1 text-xs font-semibold text-[#2b2330] sm:block">
                          {eventLabel}
                        </div>
                      )}
                    </div>
                  );
                }),
              )}
            </div>
          </article>
        </section>
      </div>
    </MainLayout>
  );
}

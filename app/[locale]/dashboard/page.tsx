'use client';

import Link from 'next/link';
import React from 'react';
import { useLocale } from '@/lib/locale-context';
import { MainLayout } from '@/components/layout/MainLayout';
import { TopBar } from '@/components/layout/TopBar';

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
  const viewTabs = [
    { key: 'day', label: 'يوم' },
    { key: 'week', label: 'أسبوع' },
    { key: 'month', label: 'شهر' },
  ] as const;
  const [activeView, setActiveView] = React.useState<(typeof viewTabs)[number]['key']>('month');
  const tabIndex = viewTabs.findIndex((tab) => tab.key === activeView);
  const sliderStyle = direction === 'rtl' ? { right: `${tabIndex * 33.333}%` } : { left: `${tabIndex * 33.333}%` };

  return (
    <MainLayout>
      <div className="space-y-7">
        <TopBar />

        <section className="grid grid-cols-4 gap-5 [direction:rtl]">
          {stats.map((stat) => (
            <article key={stat.label} className="flex flex-row-reverse items-center justify-between rounded-[24px] bg-white px-7 py-6">
              <div className="space-y-1 text-right">
                <div className={`text-[1.85rem] font-bold ${stat.accent}`}>{stat.value}</div>
                <div className="text-[1.6rem] font-semibold text-[#2b2231]">{stat.label}</div>
              </div>
              {stat.icon}
            </article>
          ))}
        </section>

        <section className="rounded-[28px] bg-white shadow-[0_16px_36px_rgba(94,56,23,0.05)]">
          <div className="flex items-center justify-between px-6 py-6">
            <h2 className="text-[2.3rem] font-bold text-[#21203a]">الفواتير الأخيرة</h2>
            <Link href={`/${locale}/invoices`} className="rounded-full bg-[#4b2f1a] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#3f2616]">
              الفواتير
            </Link>
          </div>

          <table className="w-full border-separate border-spacing-0 text-right">
            <thead>
              <tr className="text-[1.02rem] text-[#c3beb9]">
                <th className="border-b border-[#efe4dc] px-6 py-5 font-semibold">المنتج</th>
                <th className="border-b border-[#efe4dc] px-6 py-5 font-semibold">اسم العميل</th>
                <th className="border-b border-[#efe4dc] px-6 py-5 font-semibold">رقم الفاتورة</th>
                <th className="border-b border-[#efe4dc] px-6 py-5 font-semibold">الحالة</th>
                <th className="border-b border-[#efe4dc] px-6 py-5 font-semibold">الفئة</th>
                <th className="border-b border-[#efe4dc] px-6 py-5 font-semibold">التكلفة</th>
              </tr>
            </thead>
            <tbody className="text-[1.08rem] font-semibold text-[#27304a]">
              {recentInvoices.map((invoice, index) => (
                <tr key={`${invoice.number}-${index}`}>
                  <td className="border-b border-[#f3e7df] px-6 py-5">{invoice.product}</td>
                  <td className="border-b border-[#f3e7df] px-6 py-5">{invoice.client}</td>
                  <td className="border-b border-[#f3e7df] px-6 py-5">{invoice.number}</td>
                  <td className="border-b border-[#f3e7df] px-6 py-5">
                    <span className={`inline-flex min-w-[5.8rem] justify-center rounded-xl px-4 py-2 text-sm font-bold ${invoice.statusClass}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="border-b border-[#f3e7df] px-6 py-5">{invoice.category}</td>
                  <td className="border-b border-[#f3e7df] px-6 py-5">{invoice.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="grid grid-cols-[14.5rem_1fr] gap-5">
          <aside className="rounded-[28px] bg-white p-6 shadow-[0_16px_36px_rgba(94,56,23,0.05)]">
            <div className="mb-5 text-right">
              <h3 className="text-[2.1rem] font-bold text-[#20203c]">الحدث</h3>
              <p className="text-[#d7d0ca]">سحب و إفلات</p>
            </div>

            <div className="space-y-4">
              {events.map((event) => (
                <div key={`${event.title}-${event.color}`} className={`rounded-2xl border-r-4 px-4 py-4 text-right ${event.color}`}>
                  <div className="text-lg font-bold">{event.title}</div>
                  <div className="mt-1 text-sm font-semibold">{event.time}</div>
                </div>
              ))}
            </div>
          </aside>

          <article className="rounded-[28px] bg-white p-6 shadow-[0_16px_36px_rgba(94,56,23,0.05)]">
            <div className="mb-5 flex items-center justify-between">
              <div className="relative flex items-center rounded-xl border border-[#4b2f1a] p-0.5 text-sm font-semibold text-[#4b2f1a]">
                <span
                  className="absolute top-0.5 bottom-0.5 w-[calc(33.333%-2px)] rounded-[10px] bg-[#4b2f1a] transition-all duration-300 ease-out"
                  style={sliderStyle}
                />
                {viewTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveView(tab.key)}
                    className={`relative z-10 min-w-[4.35rem] px-4 py-1.5 transition-colors duration-300 ${
                      activeView === tab.key ? 'text-white' : 'text-[#4b2f1a]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="text-[2rem] font-bold text-[#20203c]">
                <span className="mr-2 text-[#2f2f55]">يناير</span>
                2025
              </div>

              <div className="flex items-center gap-3 text-[#4b2f1a]">
                <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4b2f1a] text-xl">›</button>
                <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4b2f1a] text-xl">‹</button>
              </div>
            </div>

            <div className="grid grid-cols-7 border-r border-t border-[#d9d4cf]">
              {days.map((day) => (
                <div key={day} className="border-b border-l border-[#efe7e2] px-3 py-4 text-center text-[1.02rem] font-semibold text-[#cbc5c0]">
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
                      className="relative min-h-[6.4rem] border-b border-l border-[#d9d4cf] px-3 py-2"
                    >
                      <div className="text-right text-[1.7rem] font-bold text-[#232741]">{dayLabel}</div>
                      {eventLabel && (
                        <div className="absolute bottom-4 right-3 rounded-xl border-r-4 border-[#33a7ef] bg-[#dbf4ff] px-4 py-2 text-sm font-semibold text-[#26a1e5]">
                          {eventLabel}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </article>
        </section>
      </div>
    </MainLayout>
  );
}

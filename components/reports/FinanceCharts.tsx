"use client";

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslation } from "@/lib/locale-context";

interface FinanceLineChartProps {
  title: string;
  data: any[];
  lineColor: string;
  dotColor: string;
}

export function FinanceCharts() {
  const { t } = useTranslation();

  const months = [
    t('months.january'), t('months.february'), t('months.march'), 
    t('months.april'), t('months.may'), t('months.jun'),
    t('months.july'), t('months.august'), t('months.september'), 
    t('months.october'), t('months.november'), t('months.december')
  ];

  const REVENUE_DATA = months.map((m, i) => ({
    name: m,
    value: [867, 1012, 2108, 3820, 3502, 2589, 670, 4733, 4098, 2737, 920, 1200][i],
  }));

  const EXPENSE_DATA = months.map((m, i) => ({
    name: m,
    value: [920, 867, 1012, 2108, 3820, 3502, 2589, 670, 4733, 4098, 2737, 1200][i],
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FinanceLineChart title={t('reports.revenue')} data={REVENUE_DATA} lineColor="#4caf50" dotColor="#4caf50" />
      <FinanceLineChart title={t('reports.expenses')} data={EXPENSE_DATA} lineColor="#ef5350" dotColor="#ef5350" />
    </div>
  );
}

function FinanceLineChart({ title, data, lineColor, dotColor }: FinanceLineChartProps) {
  const [year, setYear] = useState(2025);
  const { direction } = useLocale();

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
      <h3 className="text-[15px] font-bold text-[#3b2b20] mb-4 text-center">{title}</h3>
      <div className="w-full h-[220px]">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 9 }} interval={0} angle={-45} textAnchor="end" height={50} reversed={direction === 'rtl'} />
            <YAxis tick={{ fontSize: 10 }} domain={[0, 5000]} orientation={direction === 'rtl' ? 'right' : 'left'} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke={lineColor} strokeWidth={2} dot={{ r: 3, fill: dotColor, stroke: dotColor }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center mt-3 gap-3">
        <button onClick={() => setYear(y => y + (direction === 'rtl' ? -1 : 1))} className="p-1 hover:bg-gray-100 rounded-full"><ChevronLeft className="w-4 h-4 text-gray-500" /></button>
        <span className="text-sm font-semibold text-[#3b2b20]">{year}</span>
        <button onClick={() => setYear(y => y + (direction === 'rtl' ? 1 : -1))} className="p-1 hover:bg-gray-100 rounded-full"><ChevronRight className="w-4 h-4 text-gray-500" /></button>
      </div>
    </div>
  );
}

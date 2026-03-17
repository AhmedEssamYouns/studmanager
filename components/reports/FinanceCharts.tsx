"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS_AR = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

const REVENUE_DATA = MONTHS_AR.map((m, i) => ({
  name: m,
  value: [867, 1012, 2108, 3820, 3502, 2589, 670, 4733, 4098, 2737, 920, 1200][i],
}));

const EXPENSE_DATA = MONTHS_AR.map((m, i) => ({
  name: m,
  value: [920, 867, 1012, 2108, 3820, 3502, 2589, 670, 4733, 4098, 2737, 1200][i],
}));

interface FinanceLineChartProps {
  title: string;
  data: typeof REVENUE_DATA;
  lineColor: string;
  dotColor: string;
}

function FinanceLineChart({ title, data, lineColor, dotColor }: FinanceLineChartProps) {
  const [year, setYear] = useState(2025);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
      <h3 className="text-[15px] font-bold text-[#3b2b20] mb-4 text-center">{title}</h3>
      <div className="w-full h-[220px]">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 9 }} interval={0} angle={-45} textAnchor="end" height={50} />
            <YAxis tick={{ fontSize: 10 }} domain={[0, 5000]} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke={lineColor} strokeWidth={2} dot={{ r: 3, fill: dotColor, stroke: dotColor }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center mt-3 gap-3">
        <button onClick={() => setYear(y => y + 1)} className="p-1 hover:bg-gray-100 rounded-full"><ChevronLeft className="w-4 h-4 text-gray-500" /></button>
        <span className="text-sm font-semibold text-[#3b2b20]">{year}</span>
        <button onClick={() => setYear(y => y - 1)} className="p-1 hover:bg-gray-100 rounded-full"><ChevronRight className="w-4 h-4 text-gray-500" /></button>
      </div>
    </div>
  );
}

export function FinanceCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FinanceLineChart title="الإيرادات" data={REVENUE_DATA} lineColor="#4caf50" dotColor="#4caf50" />
      <FinanceLineChart title="المصروفات" data={EXPENSE_DATA} lineColor="#ef5350" dotColor="#ef5350" />
    </div>
  );
}

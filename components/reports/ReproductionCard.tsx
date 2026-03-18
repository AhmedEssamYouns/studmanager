"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useLocale, useTranslation } from "@/lib/locale-context";

export function ReproductionCard() {
  const { t } = useTranslation();
  const { direction } = useLocale();
  const isRTL = direction === 'rtl';

  const REPRO_BAR_DATA = [
    { name: t('reports.naturalBreeding'), value: 15 },
    { name: t('reports.frozenSemen'), value: 7 },
    { name: t('reports.freshSemen'), value: 6 },
    { name: t('reports.embryoTransfer'), value: 3 },
  ];

  const REPRO_PIE_DATA = [
    { name: t('reports.naturalBreeding'), value: 40, color: "#7ecfc0" },
    { name: t('reports.freshSemen'), value: 25, color: "#7b61ff" },
    { name: t('reports.frozenSemen'), value: 20, color: "#ffd93d" },
    { name: t('reports.embryoTransfer'), value: 10, color: "#2ec4b6" },
    { name: t('reports.failed'), value: 5, color: "#333" },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
      <h3 className={`text-[15px] font-bold text-[#3b2b20] mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
        {t('reports.reproduction')} <span className="text-gray-400 font-normal text-xs">({t('reports.total')}: 31)</span>
      </h3>
      <div className={`flex flex-col md:flex-row items-center gap-6 ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Bar Chart */}
        <div className="flex-1 w-full h-[180px]">
          <ResponsiveContainer>
            <BarChart data={REPRO_BAR_DATA} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 20]} tick={{ fontSize: 10 }} hide={isRTL} />
              <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 10 }} orientation={isRTL ? 'right' : 'left'} />
              <Tooltip />
              <Bar dataKey="value" radius={isRTL ? [6, 0, 0, 6] : [0, 6, 6, 0]}>
                {REPRO_BAR_DATA.map((_, i) => <Cell key={i} fill={["#ffd93d", "#ffd93d", "#7ecfc0", "#2ec4b6"][i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Donut */}
        <div className={`flex items-center gap-4 ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className="space-y-1.5">
            {REPRO_PIE_DATA.map(d => (
              <div key={d.name} className={`flex items-center gap-1.5 text-[11px] ${isRTL ? 'justify-end' : 'justify-start'}`}>
                {!isRTL && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />}
                <span className="text-gray-600">{d.name}</span>
                {isRTL && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />}
              </div>
            ))}
          </div>
          <div className="relative w-[100px] h-[100px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={REPRO_PIE_DATA} cx="50%" cy="50%" innerRadius={25} outerRadius={45} dataKey="value" stroke="none">
                  {REPRO_PIE_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm font-bold text-[#3b2b20]">90%</span>
              <span className="text-[9px] text-gray-400">{t('reports.successRate')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

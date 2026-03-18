"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useLocale, useTranslation } from "@/lib/locale-context";

export function HealthCard() {
  const { t } = useTranslation();
  const { direction } = useLocale();

  const HEALTH_DATA = [
    { name: t('reports.underTreatment'), value: 100, color: "#f8a4a4" },
    { name: t('reports.healthy'), value: 10, color: "#4caf50" },
  ];

  const total = HEALTH_DATA.reduce((s, d) => s + d.value, 0);
  const isRTL = direction === "rtl";

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
      <h3 className={`text-[15px] font-bold text-[#3b2b20] mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
        {t('reports.healthCare')} <span className="text-gray-400 font-normal text-xs">({t('reports.total')}: {total})</span>
      </h3>
      <div className={`flex items-center gap-6 ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className="flex-1 space-y-2">
          {HEALTH_DATA.map(d => (
            <div key={d.name} className={`flex items-center gap-2 text-xs ${isRTL ? 'justify-end' : 'justify-start'}`}>
              {!isRTL && <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />}
              <span className="text-gray-600">{d.name}</span>
              {isRTL && <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />}
            </div>
          ))}
        </div>
        <div className="relative w-[110px] h-[110px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={HEALTH_DATA} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value" stroke="none" startAngle={90} endAngle={-270}>
                {HEALTH_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-[#3b2b20]">{HEALTH_DATA[1].value}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

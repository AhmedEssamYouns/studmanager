"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Image from "next/image";

const HORSE_PIE_DATA = [
  { name: "الفحول", value: 100, color: "#7b61ff" },
  { name: "الأفراس", value: 80, color: "#ff6b6b" },
  { name: "المهر", value: 10, color: "#2ec4b6" },
  { name: "المهرة", value: 30, color: "#ffd93d" },
];

const HOUSING_DATA = [
  { label: "متاح", value: 50, color: "#4caf50" },
  { label: "مشغول", value: 50, color: "#ef5350" },
];

export function HorsesOverviewCard() {
  const total = HORSE_PIE_DATA.reduce((s, d) => s + d.value, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Horses Pie */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
        <h3 className="text-[15px] font-bold text-[#3b2b20] mb-4 text-right">الخيل</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            {HORSE_PIE_DATA.map(d => (
              <div key={d.name} className="flex items-center justify-between text-xs mb-2">
                <span className="text-gray-500">{d.name}</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#3b2b20]">{d.value}</span>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="relative w-[120px] h-[120px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={HORSE_PIE_DATA} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" stroke="none">
                  {HORSE_PIE_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-[#3b2b20]">{total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Housing Bar */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
        <h3 className="text-[15px] font-bold text-[#3b2b20] mb-4 text-right">الإيواء <span className="text-gray-400 font-normal text-xs">(الإجمالي: 80)</span></h3>
        <div className="flex items-center text-xs text-gray-500 mb-3 justify-between px-2">
          {[0, 10, 20, 30, 40, 50].map(n => <span key={n}>{n}</span>)}
        </div>
        {HOUSING_DATA.map(d => (
          <div key={d.label} className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-500">{d.value} {d.label}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-6 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${d.value}%`, backgroundColor: d.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Foal count cards with horse SVGs
export function FoalCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50 flex items-center justify-between">
        <div className="text-right">
          <p className="text-sm text-gray-500 mb-1">عدد القهرة العشر</p>
          <p className="text-4xl font-bold text-[#3b2b20]">28</p>
        </div>
        <div className="relative w-16 h-16">
          <Image src="/svgs/horsecheck.svg" alt="horse" fill className="object-contain" />
        </div>
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50 flex items-center justify-between">
        <div className="text-right">
          <p className="text-sm text-gray-500 mb-1">عدد القهرة غير عشر</p>
          <p className="text-4xl font-bold text-[#3b2b20]">10</p>
        </div>
        <div className="relative w-16 h-16">
          <Image src="/svgs/horseredX.svg" alt="horse" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}

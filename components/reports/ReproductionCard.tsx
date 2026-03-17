"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const REPRO_BAR_DATA = [
  { name: "الطلاق الطبيعية", value: 15 },
  { name: "سايل متوج مجمد", value: 7 },
  { name: "سايل متوج حديث", value: 6 },
  { name: "نقل الأجنة", value: 3 },
];

const REPRO_PIE_DATA = [
  { name: "الطلاق الطبيعية", value: 40, color: "#7ecfc0" },
  { name: "سايل متوج حديث", value: 25, color: "#7b61ff" },
  { name: "سايل متوج مجمد", value: 20, color: "#ffd93d" },
  { name: "نقل الأجنة", value: 10, color: "#2ec4b6" },
  { name: "فشل", value: 5, color: "#333" },
];

export function ReproductionCard() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
      <h3 className="text-[15px] font-bold text-[#3b2b20] mb-4 text-right">
        التناسليات <span className="text-gray-400 font-normal text-xs">(الإجمالي: 31)</span>
      </h3>
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Bar Chart */}
        <div className="flex-1 w-full h-[180px]">
          <ResponsiveContainer>
            <BarChart data={REPRO_BAR_DATA} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 20]} tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {REPRO_BAR_DATA.map((_, i) => <Cell key={i} fill={["#ffd93d", "#ffd93d", "#7ecfc0", "#2ec4b6"][i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Donut */}
        <div className="flex items-center gap-4">
          <div className="space-y-1.5">
            {REPRO_PIE_DATA.map(d => (
              <div key={d.name} className="flex items-center gap-1.5 text-[11px]">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-gray-600">{d.name}</span>
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
              <span className="text-[9px] text-gray-400">نسبة النجاح</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

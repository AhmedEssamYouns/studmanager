"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";
import StallionsTab from "./StalionsTab";
import MaresTab from "./MaresTab";

const tabs = ["overview", "records"] as const;

export function ReproductionPageContent() {
  const { locale } = useLocale();
  const [active, setActive] = useState<(typeof tabs)[number]>("overview");

  const labels = {
    overview: locale === "ar" ? "الفحول" : "Stallions",
    records: locale === "ar" ? "الفرس" : "Mares",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-[2.1rem] font-bold text-[#27304a]">
          {labels.overview}
        </h1>
      </div>
      <div className={`flex gap-3 rounded-xl p-1 `}>
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`px-4 py-2 rounded-lg min-w-[8rem] text-sm font-semibold transition w-full ${
              active === t
                ? "bg-[#4b2f1a] text-[#ffffff] shadow-[0_6px_16px_rgba(75,47,26,0.12)]"
                : "bg-white text-[#5a4a42] hover:bg-[#fbf6f2]"
            }`}
          >
            {labels[t]}
          </button>
        ))}
      </div>
      <div>
        {active === "overview" && <StallionsTab />}
        {active === "records" && <MaresTab />}
      </div>
    </div>
  );
}

export default ReproductionPageContent;

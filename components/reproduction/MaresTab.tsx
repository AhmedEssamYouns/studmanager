"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";
import EmbryoTransferTab from "@/components/reproduction/tabs/EmbryoTransferTab";
import ReproductionControlTab from "@/components/reproduction/tabs/ReproductionControlTab";
import MaresOverviewTab from "./tabs/MaresOverviewTab";

type TabKey = "overview" | "transfer" | "control";

export default function MaresTab() {
  const { locale, direction } = useLocale();
  const isRTL = direction === "rtl";

  const [active, setActive] = useState<TabKey>("overview");

  const tabs: { key: TabKey; label: string }[] = [
    {
      key: "overview",
      label: locale === "ar" ? "ملخص التناسل" : "Reproduction overview",
    },
    {
      key: "transfer",
      label: locale === "ar" ? "نقل الأجنة" : "Embryo transfer",
    },
    {
      key: "control",
      label: locale === "ar" ? "التحكم في التناسل" : "Reproduction control",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs header (responsive) */}
      <div
        className={`flex gap-3 justify-end flex-wrap ${
          isRTL ? "flex-row-reverse justify-start" : ""
        }`}
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`px-5 py-3 rounded-2xl text-sm font-semibold border transition ${
              active === t.key
                ? "bg-[#fff6e7] border-[#bfae87] text-[#2c2330]"
                : "bg-white border-[#e8e2dd] text-[#2c2330]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {active === "overview" && <MaresOverviewTab />}
      {active === "transfer" && <EmbryoTransferTab />}
      {active === "control" && <ReproductionControlTab />}
    </div>
  );
}

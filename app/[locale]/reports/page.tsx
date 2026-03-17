"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useLocale } from "@/lib/locale-context";
import { HorsesOverviewCard, FoalCards } from "@/components/reports/HorsesOverview";
import { HealthCard } from "@/components/reports/HealthCard";
import { ReproductionCard } from "@/components/reports/ReproductionCard";
import { FinanceCharts } from "@/components/reports/FinanceCharts";

export default function ReportsPage() {
  const { direction } = useLocale();
  const isRTL = direction === "rtl";

  return (
    <MainLayout>
      <div className={`p-6 max-w-[1400px] mx-auto space-y-5 ${isRTL ? "text-right font-cairo" : "text-left"}`} dir={direction}>
        <h1 className="text-2xl font-bold text-[#3b2b20] text-center mb-2">التقارير</h1>

        {/* Row 1: Horses Pie + Housing Bar */}
        <HorsesOverviewCard />

        {/* Row 2: Health + Reproduction */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ReproductionCard />
          <HealthCard />
        </div>

        {/* Row 3: Foal Cards */}
        <FoalCards />

        {/* Row 4: Finance Line Charts */}
        <FinanceCharts />
      </div>
    </MainLayout>
  );
}

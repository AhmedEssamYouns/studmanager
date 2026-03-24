"use client";

import { use } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { HealthCategoryTable } from "@/components/health/HealthCategoryTable";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslation } from "@/lib/locale-context";

interface HealthCategoryPageProps {
  params: Promise<{
    category: string;
    locale: string;
  }>;
}

export default function HealthCategoryPage(props: HealthCategoryPageProps) {
  const params = use(props.params);
  const { direction, locale } = useLocale();
  const { t } = useTranslation();
  const isRTL = direction === "rtl";

  return (
    <MainLayout>
      <div className={`p-4 sm:p-6 max-w-[1400px] mx-auto ${isRTL ? "text-right" : "text-left"}`}>
        {/* Back Button */}
        <Link
          href={`/${locale}/health`}
          className="inline-flex items-center gap-2 mb-6 font-bold text-[#b4987a] hover:text-[#91765c] transition-colors font-cairo"
        >
          {isRTL ? (
            <>
              {t("common.back")}
              <ChevronRight className="w-5 h-5" />
            </>
          ) : (
             <>
              <ChevronLeft className="w-5 h-5" />
              {t("common.back")}
             </>
          )}
        </Link>

        <HealthCategoryTable categoryId={params.category} />
      </div>
    </MainLayout>
  );
}

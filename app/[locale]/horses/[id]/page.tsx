"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { HorseProfileHeader, HorsePedigreeStats, HorseProfileTabs, HorsePedigreeTree, HorseInfoTab, HorsePhotosTab, HorseVideosTab, HorseChildrenTab, HorseSiblingsTab, HorseCompetitionTab } from "@/components/horses";
import { useLocale, useTranslation } from "@/lib/locale-context";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock data - would be fetched from API in production
const mockHorseDetail = {
  id: "1",
  nameAr: "اسم الخيل",
  nameEn: "Horse Name",
  type: "ذكر",
  gender: "male",
  birthDate: "20/10/2007",
  features: 500,
  image:
    "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop",
  pedigreeImage: "/brand/image.png",
  // Pedigree stats
  maleOffspring: 150,
  femaleOffspring: 50,
  maleResults: 100,
  femaleResults: 50,
  // Extended info
  origin: "Saudi Arabia",
  registrationNumber: "REG123456",
  color: "White",
};

export default function HorseProfilePage({
  params: _params,
}: {
  params: { locale: string; id: string };
}) {
  const { t } = useTranslation();
  const { direction } = useLocale();
  const isRTL = direction === "rtl";

  const [activeTab, setActiveTab] = useState("pedigree");

  return (
    <MainLayout>
      <div className={`min-h-screen pb-12 ${isRTL ? "text-right" : "text-left"}`}>
        {/* Back Button */}
        <div className="px-2 sm:px-0">
          <Link
            href={`/horses`}
            className="inline-flex items-center gap-2 mb-6 text-amber-900 hover:text-amber-800 transition-colors"
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
        </div>

        {/* Profile Header */}
        <HorseProfileHeader horse={mockHorseDetail} />

        {/* Pedigree Stats */}
        <HorsePedigreeStats horse={mockHorseDetail} />

        {/* Navigation Tabs */}
        <HorseProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        {activeTab === "pedigree" && <HorsePedigreeTree horse={mockHorseDetail} />}
        {activeTab === "info" && <HorseInfoTab horse={mockHorseDetail} />}
        {activeTab === "photos" && <HorsePhotosTab horse={mockHorseDetail} />}
        {activeTab === "videos" && <HorseVideosTab horse={mockHorseDetail} />}
        {activeTab === "children" && <HorseChildrenTab horse={mockHorseDetail} />}
        {activeTab === "siblings" && <HorseSiblingsTab horse={mockHorseDetail} />}
        {activeTab === "competition" && <HorseCompetitionTab horse={mockHorseDetail} />}

      </div>
    </MainLayout>
  );
}

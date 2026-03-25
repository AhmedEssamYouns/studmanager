"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { HorsePedigreeTree } from "@/components/horses";
import { useLocale, useTranslation } from "@/lib/locale-context";

const mockHorse = {
  id: "1",
  name: "اسم الخيل",
  pedigreeImage: "/brand/image.png",
};

export default function MatingTestPage() {
  const { direction, locale } = useLocale();
  const { t } = useTranslation();
  const isRTL = direction === "rtl";
  const [headerTab, setHeaderTab] = useState<"test" | "analysis">("test");
  const [analysisTab, setAnalysisTab] = useState<"father" | "mother" | "inbreeding">("father");
  const [currentPage, setCurrentPage] = useState(1);

  const pedigreeData = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    generation: i + 1,
    horseName: "اسم الخيل",
    year: "1990",
    gender: i === 2 || i === 3 ? "أنثى" : "ذكر",
    country: "مصر",
    father: "اسم الاب",
    mother: "اسم الام",
  }));

  const inbreedingData = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    repetitions: [25, 2, 3, 4, 5, 6, 7, 8, 9, 10][i],
    total: "50%",
    male: "0.36%",
    female: "0.40%",
    gen1: "",
    gen2: "",
    gen3: "",
    gen4: "",
    gen5: "",
  }));

  return (
    <MainLayout>
      <div
        className={`min-h-screen pb-12 ${isRTL ? "font-cairo text-right" : "text-left"}`}
        dir={direction}
      >
        <div className="flex items-start justify-between gap-4 px-1 pt-4" dir="ltr">
          <Link
            href={`/${locale}/horses`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#4a3324] transition hover:bg-white/70"
            aria-label={t("common.back")}
          >
            <Image src="/horse/back.svg" alt="" width={28} height={28} />
          </Link>

          <div className="inline-flex gap-3" dir={isRTL ? "ltr" : "rtl"}>

           <button
              type="button"
              onClick={() => setHeaderTab("analysis")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                headerTab === "analysis"
                  ? "bg-[#3b2b20] text-white"
                  : "border border-[#e4d9cf] bg-white text-[#5a473d]"
              }`}
            >
              <Image
                src="/horse/Analysis.svg"
                alt=""
                width={20}
                height={20}
                className={headerTab === "analysis" ? "brightness-0 invert" : ""}
              />
              <span>{t("matingTest.analysis")}</span>
            </button>
            <button
              type="button"
              onClick={() => setHeaderTab("test")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                headerTab === "test"
                  ? "bg-[#3b2b20] text-white"
                  : "border border-[#e4d9cf] bg-white text-[#5a473d]"
              }`}
            >
              <Image
                src="/horse/انساب-notactive.svg"
                alt=""
                width={20}
                height={20}
                className={headerTab === "test" ? "brightness-0 invert" : ""}
              />
              <span>{t("matingTest.test")}</span>
            </button>

           
          </div>
        </div>

        {headerTab === "test" ? (
          <div className="mt-8 space-y-6">
            <div className="space-y-2 text-sm font-semibold text-[#c5beb8] sm:text-base">
              <p className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c5beb8]" />
                <span>{t("database.matingNoteHeader")}</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c5beb8]" />
                <span>{t("database.matingNoteSub")}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              <input
                type="text"
                placeholder={t("database.fatherName")}
                className={`h-14 rounded-[20px] border border-[#a79a90] bg-transparent px-6 text-lg font-semibold text-[#45342b] outline-none transition placeholder:text-[#6c6158] focus:border-[#3b2b20] ${
                  isRTL ? "text-right" : "text-left"
                }`}
              />

              <input
                type="text"
                placeholder={t("database.motherName")}
                className={`h-14 rounded-[20px] border border-[#a79a90] bg-transparent px-6 text-lg font-semibold text-[#45342b] outline-none transition placeholder:text-[#6c6158] focus:border-[#3b2b20] ${
                  isRTL ? "text-right" : "text-left"
                }`}
              />
            </div>

            <div className="pt-2">
              <h1 className="text-[1.8rem] font-bold text-[#20203c]">
                {t("database.matingResult")}
              </h1>
            </div>

            <HorsePedigreeTree
              horse={mockHorse}
              showTitle={false}
              controlsVariant="compact"
            />
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between" dir="ltr">
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-[#4a3324] transition hover:bg-white/70"
                aria-label={isRTL ? "تحميل" : "Download"}
              >
                <Image src="/horse/download.svg" alt="" width={24} height={24} />
              </button>

              <div className={isRTL ? "text-right" : "text-left"}>
                <h1 className="text-[1.8rem] font-bold text-[#20203c]">
                  {t("matingTest.title")}
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap gap-3" dir={isRTL ? "rtl" : "ltr"}>
              {[
                { key: "father" as const, label: t("matingTest.fatherLine") },
                { key: "mother" as const, label: t("matingTest.motherLine") },
                { key: "inbreeding" as const, label: t("matingTest.inbreeding") },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setAnalysisTab(tab.key)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                    analysisTab === tab.key
                      ? "border border-[#8d7d45] bg-[#f5f3ca] text-[#3b2b20] shadow-sm"
                      : "border border-[#ece2da] bg-white text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {(analysisTab === "father" || analysisTab === "mother") && (
              <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_12px_30px_rgba(91,53,24,0.08)]">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px]">
                    <thead>
                      <tr className="bg-[#4b2f1a] text-sm text-white">
                        <th className="px-4 py-4 rounded-r-xl">{t("matingTest.generation")}</th>
                        <th className="px-4 py-4">{t("matingTest.horseName")}</th>
                        <th className="px-4 py-4">{t("matingTest.year")}</th>
                        <th className="px-4 py-4">{t("matingTest.gender")}</th>
                        <th className="px-4 py-4">{t("matingTest.birthCountry")}</th>
                        <th className="px-4 py-4">{t("matingTest.father")}</th>
                        <th className="px-4 py-4 rounded-l-xl">{t("matingTest.mother")}</th>
                      </tr>
                    </thead>

                    <tbody>
                      {pedigreeData.map((row, index) => (
                        <tr
                          key={row.id}
                          className={`border-b border-[#e8edf7] text-[#2f3750] ${
                            index % 2 === 0 ? "bg-white" : "bg-[#fdfbf7]"
                          }`}
                        >
                          <td className="px-4 py-4 text-center">{row.generation}</td>
                          <td className="px-4 py-4 font-medium text-[#24304f]">{row.horseName}</td>
                          <td className="px-4 py-4">{row.year}</td>
                          <td className="px-4 py-4">{row.gender}</td>
                          <td className="px-4 py-4">{row.country}</td>
                          <td className="px-4 py-4">{row.father}</td>
                          <td className="px-4 py-4">{row.mother}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {analysisTab === "inbreeding" && (
              <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_12px_30px_rgba(91,53,24,0.08)]">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="bg-[#4b2f1a] text-sm text-white">
                        <th rowSpan={2} className="px-4 py-4 rounded-r-xl">
                          {t("matingTest.horseName")}
                        </th>
                        <th rowSpan={2} className="px-4 py-4">
                          {t("matingTest.repetitions")}
                        </th>
                        <th rowSpan={2} className="px-4 py-4">{t("matingTest.total")}</th>
                        <th colSpan={2} className="border-b border-[#6b4f3a] px-4 py-2 text-center">
                          {t("matingTest.percentage")}
                        </th>
                        <th rowSpan={2} className="px-4 py-4">1</th>
                        <th rowSpan={2} className="px-4 py-4">2</th>
                        <th rowSpan={2} className="px-4 py-4">3</th>
                        <th rowSpan={2} className="px-4 py-4">4</th>
                        <th rowSpan={2} className="px-4 py-4 rounded-l-xl">5</th>
                      </tr>
                      <tr className="bg-[#4b2f1a] text-sm text-white">
                        <th className="border-r border-[#6b4f3a] px-4 py-2 text-center">
                          {t("matingTest.male")}
                        </th>
                        <th className="px-4 py-2 text-center">{t("matingTest.female")}</th>
                      </tr>
                    </thead>

                    <tbody>
                      {inbreedingData.map((row, index) => (
                        <tr
                          key={row.id}
                          className={`border-b border-[#e8edf7] ${
                            index % 2 === 0 ? "bg-white" : "bg-[#fdfbf7]"
                          }`}
                        >
                          <td className="px-4 py-4 font-medium text-[#24304f]">اسم الخيل</td>
                          <td className="px-4 py-4">{row.repetitions}</td>
                          <td className="px-4 py-4">{row.total}</td>
                          <td className="border-r border-gray-200 px-4 py-4 text-center text-sm">
                            {row.male}
                          </td>
                          <td className="px-4 py-4 text-center text-sm">{row.female}</td>
                          <td className="px-4 py-4 text-sm text-gray-400">{row.gen1}</td>
                          <td className="px-4 py-4 text-sm text-gray-400">{row.gen2}</td>
                          <td className="px-4 py-4 text-sm text-gray-400">{row.gen3}</td>
                          <td className="px-4 py-4 text-sm text-gray-400">{row.gen4}</td>
                          <td className="px-4 py-4 text-sm text-gray-400">{row.gen5}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-2 pt-2" dir="ltr">
              <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#cdbfb3] bg-white text-[#3b2b20]">
                {isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </button>

              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm ${
                    currentPage === page
                      ? "bg-[#3b2b20] text-white"
                      : "border border-[#3b2b20] bg-white text-[#3b2b20]"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#3b2b20] bg-white text-[#3b2b20]"
              >
                ...
              </button>

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#3b2b20] bg-white text-[#3b2b20]"
              >
                32
              </button>

              <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#cdbfb3] bg-white text-[#3b2b20]">
                {isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

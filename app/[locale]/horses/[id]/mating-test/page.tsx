"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useLocale, useTranslation } from "@/lib/locale-context";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function MatingTestPage({
    params,
}: {
    params: { locale: string; id: string };
}) {
    const { direction } = useLocale();
    const { t } = useTranslation();
    const isRTL = direction === "rtl";

    const [activeTab, setActiveTab] = useState("father");
    const [currentPage, setCurrentPage] = useState(1);

    // 🟤 Data للـ pedigree
    const pedigreeData = Array.from({ length: 10 }).map((_, i) => ({
        id: i + 1,
        generation: i + 1,
        horseName: "اسم الخيل",
        year: "1990",
        gender: i % 2 === 0 ? "ذكر" : "أنثى",
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
        gen1: "", gen2: "", gen3: "", gen4: "", gen5: "",
    }));

    return (
        <MainLayout>
            <div className={`min-h-screen pb-12 ${isRTL ? "text-right" : "text-left"}`}>

                {/* Top Buttons */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-3">
                        <button className="bg-white border px-5 py-2.5 rounded-xl flex items-center gap-2">
                            <Image src="/horse/انساب-notactive.svg" alt="" width={20} height={20} />
                            {t("matingTest.test")}
                        </button>

                        <button className="bg-[#3b2b20] text-white px-5 py-2.5 rounded-xl flex items-center gap-2">
                            <Image src="/horse/Analysis.svg" alt="" width={20} height={20} />
                            {t("matingTest.analysis")}
                        </button>
                    </div>

                    <Link href={`/${params.locale}/horses/${params.id}`}>
                        <Image src="/horse/back.svg" alt="" width={32} height={32} />
                    </Link>
                </div>

                {/* Title */}
                <div className="flex justify-between items-center py-4">
                    <h2 className="text-xl font-bold text-[#3b2b20]">
                        {t("matingTest.title")}
                    </h2>

                    <button>
                        <Image src="/horse/download.svg" alt="" width={24} height={24} />
                    </button>
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                    {[
                        { key: "father", label: t("matingTest.fatherLine") },
                        { key: "mother", label: t("matingTest.motherLine") },
                        { key: "inbreeding", label: t("matingTest.inbreeding") },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === tab.key
                                ? "bg-[#F5F3CA] text-[#3b2b20] shadow-sm border border-[#E8E2B8]"
                                : "bg-white text-gray-500 hover:bg-gray-100 border"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {(activeTab === "father" || activeTab === "mother") && (
                    <div className="bg-white rounded-3xl p-6 shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px]">
                                <thead>
                                    <tr className="bg-[#4b2f1a] text-white text-sm">
                                        <th className="py-4 px-4 rounded-r-xl">{t("matingTest.generation")}</th>
                                        <th className="py-4 px-4">{t("matingTest.horseName")}</th>
                                        <th className="py-4 px-4">{t("matingTest.year")}</th>
                                        <th className="py-4 px-4">{t("matingTest.gender")}</th>
                                        <th className="py-4 px-4">{t("matingTest.birthCountry")}</th>
                                        <th className="py-4 px-4">{t("matingTest.father")}</th>
                                        <th className="py-4 px-4 rounded-l-xl">{t("matingTest.mother")}</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {pedigreeData.map((row, index) => (
                                        <tr
                                            key={row.id}
                                            className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-[#fdfbf7]"
                                                }`}
                                        >
                                            <td className="py-4 px-4">{row.generation}</td>
                                            <td className="py-4 px-4 font-medium text-[#3b2b20]">
                                                {row.horseName}
                                            </td>
                                            <td className="py-4 px-4">{row.year}</td>
                                            <td className="py-4 px-4">{row.gender}</td>
                                            <td className="py-4 px-4">{row.country}</td>
                                            <td className="py-4 px-4">{row.father}</td>
                                            <td className="py-4 px-4">{row.mother}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}


                {activeTab === "inbreeding" && (
                    <div className="bg-white rounded-3xl p-6 shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px]">
                                <thead>
                                    <tr className="bg-[#4b2f1a] text-white text-sm">
                                        <th rowSpan={2} className="py-4 px-4 rounded-r-xl">{t("matingTest.horseName")}</th>
                                        <th rowSpan={2} className="py-4 px-4">{t("matingTest.repetitions")}</th>
                                        <th rowSpan={2} className="py-4 px-4">{t("matingTest.total")}</th>
                                        <th
                                            colSpan={2}
                                            className="py-2 px-4 text-center border-b border-[#6b4f3a]"
                                        >
                                            {t("matingTest.percentage")}
                                        </th>
                                        <th rowSpan={2} className="py-4 px-4">1</th>
                                        <th rowSpan={2} className="py-4 px-4">2</th>
                                        <th rowSpan={2} className="py-4 px-4">3</th>
                                        <th rowSpan={2} className="py-4 px-4">4</th>
                                        <th rowSpan={2} className="py-4 px-4 rounded-l-xl">5</th>
                                    </tr>
                                    <tr className="bg-[#4b2f1a] text-white text-sm">
                                        <th className="py-2 px-4 text-center border-r border-[#6b4f3a]">
                                            {t("matingTest.male")}
                                        </th>
                                        <th className="py-2 px-4 text-center">
                                            {t("matingTest.female")}
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {inbreedingData.map((row, index) => (
                                        <tr
                                            key={row.id}
                                            className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-[#fdfbf7]"}`}
                                        >
                                            <td className="py-4 px-4 font-medium text-[#3b2b20]">اسم الخيل</td>
                                            <td className="py-4 px-4">{row.repetitions}</td>
                                            <td className="py-4 px-4">{row.total}</td>
                                            <td className="py-4 px-4 text-sm text-center border-r border-gray-200">{row.male}</td>
                                            <td className="py-4 px-4 text-sm text-center">{row.female}</td>
                                            <td className="py-4 px-4 text-sm text-gray-400">{row.gen1}</td>
                                            <td className="py-4 px-4 text-sm text-gray-400">{row.gen2}</td>
                                            <td className="py-4 px-4 text-sm text-gray-400">{row.gen3}</td>
                                            <td className="py-4 px-4 text-sm text-gray-400">{row.gen4}</td>
                                            <td className="py-4 px-4 text-sm text-gray-400">{row.gen5}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                <div className="flex items-center justify-center mt-8 gap-2">
                    <button className="w-8 h-8 rounded-full border">
                        {isRTL ? <ChevronRight /> : <ChevronLeft />}
                    </button>

                    {[1, 2, 3, 4, 5].map((page) => (
                        <button
                            key={page}
                            className={`w-8 h-8 rounded-full ${currentPage === page
                                ? "bg-[#3b2b20] text-white"
                                : "border"
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button className="w-8 h-8 rounded-full border">
                        {isRTL ? <ChevronLeft /> : <ChevronRight />}
                    </button>
                </div>
            </div>
        </MainLayout>
    );
}
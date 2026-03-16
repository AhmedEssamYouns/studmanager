"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { HorseCard } from "@/components/horses/HorseCard";
import { HorseFormModal } from "@/components/horses/HorseFormModal";
import { useLocale, useTranslation } from "@/lib/locale-context";
import { useState } from "react";

const mockHorses = [
  {
    id: "1",
    nameAr: "اسم الخيل",
    nameEn: "Horse Name",
    type: "ذكر",
    birthDate: "20/10/2007",
    features: 500,
    image:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop",
    gender: "male",
  },
  {
    id: "2",
    nameAr: "اسم الخيل",
    nameEn: "Horse Name",
    type: "ذكر",
    birthDate: "20/10/2007",
    features: 500,
    image:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop",
    gender: "male",
  },
  {
    id: "3",
    nameAr: "اسم الخيل",
    nameEn: "Horse Name",
    type: "ذكر",
    birthDate: "20/10/2007",
    features: 500,
    image:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop",
    gender: "male",
  },
];

interface StudbookHorse {
  id: string;
  nameAr: string;
  nameEn: string;
  type: string;
  birthDate: string;
  features: number;
  image: string;
}

const mockStudbookHorses: StudbookHorse[] = [
  {
    id: "sb1",
    nameAr: "اسم الخيل",
    nameEn: "Horse Name",
    type: "ذكر",
    birthDate: "20/10/2007",
    features: 500,
    image:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop",
  },
  {
    id: "sb2",
    nameAr: "اسم الخيل",
    nameEn: "Horse Name",
    type: "ذكر",
    birthDate: "20/10/2007",
    features: 500,
    image:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop",
  },
  {
    id: "sb3",
    nameAr: "اسم الخيل",
    nameEn: "Horse Name",
    type: "ذكر",
    birthDate: "20/10/2007",
    features: 500,
    image:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop",
  },
];

export default function HorsesPage() {
  const { t } = useTranslation();
  const { direction } = useLocale();
  const isRTL = direction === "rtl";

  const [isStudbookOpen, setIsStudbookOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addMode, setAddMode] = useState<"manual" | "studbook">("manual");
  const [selectedStudbookHorse, setSelectedStudbookHorse] =
    useState<StudbookHorse | null>(null);
  const [initialHorseData, setInitialHorseData] = useState<any | null>(null);

  const [mainSearchQuery, setMainSearchQuery] = useState("");
  const [studbookSearchQuery, setStudbookSearchQuery] = useState("");

  const handleAddHorse = (data: any) => {
    console.log("New horse:", data);
    setIsAddModalOpen(false);
  };

  const handleOpenStudbook = () => {
    setAddMode("studbook");
    setSelectedStudbookHorse(null);
    setStudbookSearchQuery("");
    setIsStudbookOpen(true);
  };

  const handleOpenManual = () => {
    setAddMode("manual");
    setInitialHorseData(null);
    setIsStudbookOpen(false);
    setIsAddModalOpen(true);
  };

  const handleSelectStudbookHorse = (horse: StudbookHorse) => {
    setSelectedStudbookHorse(horse);
  };

  const handleAddFromStudbook = () => {
    if (selectedStudbookHorse) {
      setInitialHorseData({
        nameAr: selectedStudbookHorse.nameAr,
        nameEn: selectedStudbookHorse.nameEn,
        type: selectedStudbookHorse.type,
        gender: "male",
        birthDate: selectedStudbookHorse.birthDate,
        image: selectedStudbookHorse.image,
      });
    }

    setIsStudbookOpen(false);
    setIsAddModalOpen(true);
  };

  const filteredHorses = mockHorses.filter((horse) => {
    if (!mainSearchQuery.trim()) return true;

    return (
      horse.nameAr.includes(mainSearchQuery) ||
      horse.nameEn.toLowerCase().includes(mainSearchQuery.toLowerCase())
    );
  });

  const filteredStudbookHorses = mockStudbookHorses.filter((horse) => {
    if (!studbookSearchQuery.trim()) return true;

    return (
      horse.nameAr.includes(studbookSearchQuery) ||
      horse.nameEn.toLowerCase().includes(studbookSearchQuery.toLowerCase())
    );
  });

  return (
    <MainLayout>
      <div
        className={`bg-primary-light border-b border-border-gray p-6 rounded-[28px] ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        <div
          className={`flex items-center justify-between gap-6 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <h1 className="text-2xl font-semibold text-text-dark">
            {t("horses.title")}
          </h1>

          <div className="relative flex-1 max-w-[30rem]">
            <input
              type="search"
              value={mainSearchQuery}
              onChange={(e) => setMainSearchQuery(e.target.value)}
              placeholder={t("common.search")}
              className={`h-11 w-full rounded-2xl border border-[#ece2da] bg-white text-sm text-[#2c2330] outline-none transition placeholder:text-[#d9cfc5] focus:border-[#5a3b25] focus:ring-2 focus:ring-[#5a3b25]/10 ${
                isRTL ? "pr-12 text-right" : "pl-12 text-left"
              }`}
            />

            <span
              className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 text-[#5a473d] ${
                isRTL ? "right-4" : "left-4"
              }`}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 10.5a7.5 7.5 0 0012.15 6.15z"
                />
              </svg>
            </span>
          </div>

          <button
            onClick={handleOpenStudbook}
            className="bg-primary-dark text-primary-light px-6 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all flex items-center gap-2"
          >
            +
            {t("horses.addNew")}
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHorses.map((horse) => (
            <HorseCard key={horse.id} horse={horse} />
          ))}
        </div>
      </div>

      {isStudbookOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6">
          <div
            dir={'ltr'}
            className="w-full max-w-6xl bg-[#faf5f2] rounded-[28px] shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-8 py-6 border-b border-[#eadfd9]">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleOpenManual}
                  className="rounded-full border border-[#eadfd9] bg-white px-6 py-2 text-sm font-medium text-text-dark hover:bg-[#f3e8e3] transition"
                >
                  {t("horses.addManually")}
                </button>

                <div className="relative w-[360px]">
                  <input
                    type="search"
                    value={studbookSearchQuery}
                    onChange={(e) => setStudbookSearchQuery(e.target.value)}
                    placeholder={t("common.search")}
                    className={`h-11 w-full rounded-full border border-[#eadfd9] bg-white text-sm outline-none focus:border-[#5a3b25] focus:ring-2 focus:ring-[#5a3b25]/10 ${
                      isRTL ? "pr-12 text-right" : "pl-12 text-left"
                    }`}
                  />

                  <span
                    className={`absolute top-1/2 -translate-y-1/2 text-[#5a473d] ${
                      isRTL ? "right-4" : "left-4"
                    }`}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 10.5a7.5 7.5 0 0012.15 6.15z"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div className={`flex  items-center gap-4 `}>
                <h2 className="text-xl font-semibold text-text-dark">
                  {t("horses.addFromStudbook")}
                </h2>

                <button
                  onClick={() => setIsStudbookOpen(false)}
                  className="text-gray-500 hover:text-black transition"
                >
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="px-8 py-6">
              <p className="text-center text-sm text-[#8a7b70] mb-6">
                {t("horses.studbookInstruction") ||
                  "إضغط على بطاقة الخيل للتحديد"}
              </p>

              <div className="grid grid-cols-3 gap-6">
                {filteredStudbookHorses.map((horse) => (
                  <div
                    key={horse.id}
                    onClick={() => handleSelectStudbookHorse(horse)}
                    className={`rounded-2xl border bg-white p-4 cursor-pointer transition ${
                      selectedStudbookHorse?.id === horse.id
                        ? "border-[#5a3b25] ring-2 ring-[#5a3b25]/20"
                        : "border-[#eadfd9]"
                    }`}
                  >
                    <img
                      src={horse.image}
                      alt={horse.nameEn}
                      className="h-40 w-full object-cover rounded-xl"
                    />

                    <div className="mt-4 text-center">
                      <div className="font-semibold text-[#3a2c24]">
                        {horse.nameAr}
                      </div>
                      <div className="text-sm text-[#8a7b70]">
                        {horse.nameEn}
                      </div>

                      <div className="mt-3 flex justify-between text-xs text-[#7a6c63]">
                        <div>
                          {t("horses.birthDate")}: {horse.birthDate}
                        </div>
                        <div>
                          {t("horses.type")}: {horse.type}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className={`mt-8 flex gap-4 ${
                  isRTL ? "flex-row-reverse justify-start" : "justify-end"
                }`}
              >
                <button
                  onClick={() => setIsStudbookOpen(false)}
                  className="rounded-xl border border-[#eadfd9] bg-white px-6 py-3 text-sm font-medium hover:bg-[#f3e8e3] transition"
                >
                  {t("common.cancel")}
                </button>

                <button
                  onClick={handleAddFromStudbook}
                  disabled={!selectedStudbookHorse}
                  className="rounded-xl bg-[#5a3b25] text-white px-6 py-3 text-sm font-medium hover:opacity-90 transition disabled:opacity-40"
                >
                  {t("common.add")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <HorseFormModal
        isOpen={isAddModalOpen}
        isManual={addMode === "manual"}
        initialData={initialHorseData}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddHorse}
      />
    </MainLayout>
  );
}
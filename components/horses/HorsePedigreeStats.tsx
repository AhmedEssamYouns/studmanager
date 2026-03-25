"use client";

import { FC } from "react";
import { useLocale } from "@/lib/locale-context";

interface Horse {
  maleOffspring: number;
  femaleOffspring: number;
  maleResults: number;
  femaleResults: number;
}

interface HorsePedigreeStatsProps {
  horse: Horse;
}

export const HorsePedigreeStats: FC<HorsePedigreeStatsProps> = ({ horse }) => {
  const { direction } = useLocale();
  const isRTL = direction === "rtl";

  return (
    <div className="mb-8 grid grid-cols-2 gap-3 sm:gap-6">
      {/* الإخوة (Siblings) Section */}
      <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-4 shadow-sm sm:p-8">
        <h2 className="mb-2 text-lg font-bold text-[#3d2a1b] sm:text-2xl">
          {isRTL ? "الإخوة" : "Siblings"}
        </h2>
        <div className="mb-4 text-xl font-bold text-[#1f2937] sm:mb-8 sm:text-2xl">
          {horse.femaleResults + horse.maleResults}
        </div>

        <div className="flex w-full items-center justify-center">
          <div className="flex-1 flex flex-col items-center">
            <div className="mb-2 text-lg font-bold text-[#1f2937] sm:text-2xl">
              {horse.femaleResults}
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-[#3d2a1b] sm:text-xl">
              <span>{isRTL ? "أنثى" : "Female"}</span>
              <span className="text-lg sm:text-2xl">♀</span>
            </div>
          </div>

          <div className="mx-2 h-12 w-px bg-gray-300 sm:mx-4 sm:h-16" />

          <div className="flex-1 flex flex-col items-center">
            <div className="mb-2 text-lg font-bold text-[#1f2937] sm:text-2xl">
              {horse.maleResults}
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-[#3d2a1b] sm:text-xl">
              <span>{isRTL ? "ذكر" : "Male"}</span>
              <span className="text-lg sm:text-2xl">♂</span>
            </div>
          </div>
        </div>
      </div>

      {/* الإنتاج (Production) Section */}
      <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-4 shadow-sm sm:p-8">
        <h2 className="mb-2 text-lg font-bold text-[#3d2a1b] sm:text-2xl">
          {isRTL ? "الإنتاج" : "Production"}
        </h2>
        <div className="mb-4 text-xl font-bold text-[#1f2937] sm:mb-8 sm:text-2xl">
          {horse.femaleOffspring + horse.maleOffspring}
        </div>

        <div className="flex w-full items-center justify-center">
          <div className="flex-1 flex flex-col items-center">
            <div className="mb-2 text-lg font-bold text-[#1f2937] sm:text-2xl">
              {horse.femaleOffspring}
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-[#3d2a1b] sm:text-xl">
              <span>{isRTL ? "أنثى" : "Female"}</span>
              <span className="text-lg sm:text-2xl">♀</span>
            </div>
          </div>

          <div className="mx-2 h-12 w-px bg-gray-300 sm:mx-4 sm:h-16" />

          <div className="flex-1 flex flex-col items-center">
            <div className="mb-2 text-lg font-bold text-[#1f2937] sm:text-2xl">
              {horse.maleOffspring}
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-[#3d2a1b] sm:text-xl">
              <span>{isRTL ? "ذكر" : "Male"}</span>
              <span className="text-lg sm:text-2xl">♂</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

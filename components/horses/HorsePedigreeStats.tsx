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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* الإخوة (Siblings) Section */}
      <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-[#3d2a1b] mb-2">
          {isRTL ? "الإخوة" : "Siblings"}
        </h2>
        <div className="text-2xl font-bold text-[#1f2937] mb-8">
          {horse.femaleResults + horse.maleResults}
        </div>

        <div className="flex w-full items-center justify-center">
          <div className="flex-1 flex flex-col items-center">
            <div className="text-2xl font-bold text-[#1f2937] mb-2">
              {horse.femaleResults}
            </div>
            <div className="text-xl text-[#3d2a1b] font-medium flex items-center gap-1">
              <span>{isRTL ? "أنثى" : "Female"}</span>
              <span className="text-2xl">♀</span>
            </div>
          </div>

          <div className="h-16 w-px bg-gray-300 mx-4" />

          <div className="flex-1 flex flex-col items-center">
            <div className="text-2xl font-bold text-[#1f2937] mb-2">
              {horse.maleResults}
            </div>
            <div className="text-xl text-[#3d2a1b] font-medium flex items-center gap-1">
              <span>{isRTL ? "ذكر" : "Male"}</span>
              <span className="text-2xl">♂</span>
            </div>
          </div>
        </div>
      </div>

      {/* الإنتاج (Production) Section */}
      <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-[#3d2a1b] mb-2">
          {isRTL ? "الإنتاج" : "Production"}
        </h2>
        <div className="text-2xl font-bold text-[#1f2937] mb-8">
          {horse.femaleOffspring + horse.maleOffspring}
        </div>

        <div className="flex w-full items-center justify-center">
          <div className="flex-1 flex flex-col items-center">
            <div className="text-2xl font-bold text-[#1f2937] mb-2">
              {horse.femaleOffspring}
            </div>
            <div className="text-xl text-[#3d2a1b] font-medium flex items-center gap-1">
              <span>{isRTL ? "أنثى" : "Female"}</span>
              <span className="text-2xl">♀</span>
            </div>
          </div>

          <div className="h-16 w-px bg-gray-300 mx-4" />

          <div className="flex-1 flex flex-col items-center">
            <div className="text-2xl font-bold text-[#1f2937] mb-2">
              {horse.maleOffspring}
            </div>
            <div className="text-xl text-[#3d2a1b] font-medium flex items-center gap-1">
              <span>{isRTL ? "ذكر" : "Male"}</span>
              <span className="text-2xl">♂</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

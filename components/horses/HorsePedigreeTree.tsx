"use client";

import { FC } from "react";
import Image from "next/image";
import { useLocale } from "@/lib/locale-context";

interface Horse {
  pedigreeImage: string;
}

interface HorsePedigreeTreeProps {
  horse: Horse;
}

export const HorsePedigreeTree: FC<HorsePedigreeTreeProps> = ({ horse: _horse }) => {
  const { direction } = useLocale();
  const isRTL = direction === "rtl";

  return (
    <div className="mb-12 max-w-[1200px] mx-auto" dir={isRTL ? "rtl" : "ltr"}>
      <div className={`flex items-center justify-between mb-4 px-2`}>
        <h2 className="text-2xl font-bold text-[#2a2a2a]">
          {isRTL ? "شهادة النسب" : "Pedigree Certificate"}
        </h2>

        {/* Actions (Download & Expand) */}
        <div className="flex gap-4">
          <button className="text-gray-500 hover:text-black transition-colors" title="Download">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
          <button className="text-gray-500 hover:text-black transition-colors" title="Expand">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6" />
              <path d="M9 21H3v-6" />
              <path d="M21 3l-7 7" />
              <path d="M3 21l7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Pedigree Tree Container */}
      <div className="overflow-x-auto pb-4 hide-scrollbar">
        <div className="relative min-w-[1000px] aspect-[16/10] max-h-[800px] bg-[#fdfbf7] rounded-xl overflow-hidden shadow-sm flex items-center justify-center p-8">
          {/* Intricate Border Frame */}
          <Image
            src="/horse/border.png"
            alt="Border Frame"
            fill
            className="object-fill absolute inset-0 pointer-events-none"
          />

          {/* Center Logo with regular opacity as requested */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <Image
              src="/horse/centerinnerlogoofpedgree.svg"
              alt="Pedigree Center Logo"
              width={350}
              height={350}
              className="object-contain opacity-100"
            />
          </div>

          {/* Tree Nodes Structure */}
          <div className={` ${isRTL ? "flex-row-reverse" : "flex-row"} relative w-full h-full z-10 flex text-xs font-serif text-gray-700`}>
            {/* Generation 1 */}
            <div className="flex-[1.2] flex flex-col justify-around py-12 relative">
              <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-4 py-1 text-center truncate mx-4 shadow-sm z-10">
                Ahlam II (Mohter)
              </div>
              <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-4 py-1 text-center truncate mx-4 shadow-sm z-10">
                Nazeer (Father)
              </div>
            </div>

            {/* Generation 2 to 5 ... (rest of the tree structure) */}
            {/* ... remaining tree nodes ... */}
          </div>

          {/* Studbook Logo at the bottom left */}
          <div className="absolute bottom-6 left-6 w-32 h-12 z-20">
            <Image
              src="/horse/studbooklogo.png"
              alt="Studbook Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

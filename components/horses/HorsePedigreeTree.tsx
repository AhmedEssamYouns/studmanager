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

export const HorsePedigreeTree: FC<HorsePedigreeTreeProps> = ({ horse }) => {
  const { direction } = useLocale();
  const isRTL = direction === "rtl";

  return (
    <div className="mb-12" dir={isRTL ? "rtl" : "ltr"}>
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
      <div className="relative w-full aspect-[16/10] max-h-[800px] bg-[#fdfbf7] rounded-xl overflow-hidden shadow-sm flex items-center justify-center p-8">

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
          {/* Generation 1 (Leftmost / Rightmost in RTL) */}
          <div className="flex-[1.2] flex flex-col justify-around py-12 relative">
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-4 py-1 text-center truncate mx-4 shadow-sm z-10">
              Ahlam II (Mohter)
            </div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-4 py-1 text-center truncate mx-4 shadow-sm z-10">
              Nazeer (Father)
            </div>
          </div>

          {/* Lines between Gen 1 and 2 */}
          <div className="w-8 relative">
            {/* SVGs or pure CSS lines can go here, skipping complex path drawing for clarity, focusing on box layout */}
          </div>

          {/* Generation 2 */}
          <div className="flex-1 flex flex-col justify-between py-6 relative">
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-2 py-1 text-center truncate mx-2 shadow-sm z-10">
              Bint Zareefa (Mohter)
            </div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-2 py-1 text-center truncate mx-2 shadow-sm z-10">
              Sid Abouhom (Father)
            </div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-2 py-1 text-center truncate mx-2 shadow-sm z-10">
              Bint Samiha (Mohter)
            </div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-2 py-1 text-center truncate mx-2 shadow-sm z-10">
              Mansour (Father)
            </div>
          </div>

          <div className="w-4 relative"></div>

          {/* Generation 3 */}
          <div className="flex-1 flex flex-col justify-between py-4 relative">
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-1 text-center truncate mx-1 shadow-sm z-10">Zareefa (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-1 text-center truncate mx-1 shadow-sm z-10">Balance (Father)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-1 text-center truncate mx-1 shadow-sm z-10">Layla (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-1 text-center truncate mx-1 shadow-sm z-10">Al Deree (Father)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-1 text-center truncate mx-1 shadow-sm z-10">Samieha (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-1 text-center truncate mx-1 shadow-sm z-10">Kazmeen (Father)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-1 text-center truncate mx-1 shadow-sm z-10">Nafaa El Saghira (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-1 text-center truncate mx-1 shadow-sm z-10">Gamil Manial (Father)</div>
          </div>

          <div className="w-2 relative"></div>

          {/* Generation 4 */}
          <div className="flex-[1.5] flex flex-col justify-between py-2 text-[10px] relative">
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-0.5 text-center truncate mx-1 z-10">Dorra (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-0.5 text-center truncate mx-1 z-10">Kazmeen (Father)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-0.5 text-center truncate mx-1 z-10">Farida (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-0.5 text-center truncate mx-1 z-10">Ibn Samhan (Father)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-0.5 text-center truncate mx-1 z-10">Bint Sabah (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-0.5 text-center truncate mx-1 z-10">Ibn Rabdan (Father)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-0.5 text-center truncate mx-1 z-10">Saklawiyah Shaifiya (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-0.5 text-center truncate mx-1 z-10">Saklawi Sheifi (Father)</div>

            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-0.5 text-center truncate mx-1 z-10 mt-1">Bint Hadba Al Saghira (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-0.5 text-center truncate mx-1 z-10">Samhan (Father)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-0.5 text-center truncate mx-1 z-10">Kasima (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-0.5 text-center truncate mx-1 z-10">Sottam 1 (Father)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-0.5 text-center truncate mx-1 z-10">Nafieah Al Kabierah (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-0.5 text-center truncate mx-1 z-10">Maanegi Sbeyli (Father)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-0.5 text-center truncate mx-1 z-10">Dalal Al Zarka (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-1 py-0.5 text-center truncate mx-1 z-10">Saklawi II (Father)</div>
          </div>

          <div className="w-1 relative"></div>

          {/* Generation 5 (Rightmost) */}
          <div className="flex-[1.5] flex flex-col justify-between py-1 text-[8px] relative">
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Dalal El Hamra (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Saadun (Father)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Kasima (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Sottam I (Father)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Nadra El Saghira (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Saklawi II (Father)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Nafaa El Saghira (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Samhan (Father)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Sabah (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Kazmeen (Father)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Bint Gamila (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Rabdan El Azrak (Father)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Mom N/A (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Dad N/A (Father)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Mom N/A (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Dad N/A (Father)</div>

            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10 mt-1">Hadbah (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">El Halabi (Father)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Om Dalal (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Rabdan El Azrak (Father)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Kasida (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Narkisa (Father)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Selma II (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Astraled (Father)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Donia (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Rabdan El Azrak (Father)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Mom N/A (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Dad N/A (Father)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Om Dalal (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Rabdan El Azrak (Father)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Al Dahma (Mohter)</div>
            <div dir="ltr" className="bg-white/80 border border-gray-300 rounded px-0.5 py-px text-center truncate z-10">Saklawi I (Father)</div>
          </div>
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
  );
};

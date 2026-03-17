"use client";

import { FC } from "react";
import { useLocale } from "@/lib/locale-context";

interface HorsePhotosTabProps {
  horse?: any;
}

const DUMMY_PHOTOS = [
  "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1598974357801-bca105fa3216?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1522851218987-a3f2be67d341?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1506161494800-4786729a502c?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1591857997327-14280aeeb1eb?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1520286888494-b1eb21c43715?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1582260274154-1b12b5bdf704?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1627916327663-0d3a776e27bc?w=400&h=300&fit=crop",
];

export const HorsePhotosTab: FC<HorsePhotosTabProps> = () => {
  const { direction } = useLocale();
  const isRTL = direction === "rtl";

  return (
    <div className={`mb-12 ${isRTL ? "text-right" : "text-left"}`}>
      <h2 className="text-2xl font-bold text-[#2a2a2a] mb-6">
        {isRTL ? "الصور" : "Photos"}
      </h2>
      
      {/* Masonry-like layout using CSS columns */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {DUMMY_PHOTOS.map((photo, i) => (
          <div key={i} className="relative w-full rounded-2xl overflow-hidden break-inside-avoid">
            {/* The image component requires width/height so we use an intrinsic img tag for masonry if relying on the original ratio, or next/image with layout responsive */}
            <img 
              src={photo} 
              alt={`Horse photo ${i + 1}`} 
              className="w-full h-auto object-cover rounded-2xl" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

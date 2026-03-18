"use client";

import { useLocale } from "@/lib/locale-context";
import { X, Calendar, ChevronDown, Phone, Trash2 } from "lucide-react";
import Image from "next/image";
import arTranslations from "@/public/locales/ar.json";
import enTranslations from "@/public/locales/en.json";

type ModalType = "add" | "edit" | "delete" | null;

interface NutritionModalsProps {
  isOpen: boolean;
  type: ModalType;
  onClose: () => void;
  recordData?: any;
  categoryTitle?: string;
}

export const NutritionModals = ({
  isOpen,
  type,
  onClose,
  recordData: _recordData,
  categoryTitle,
}: NutritionModalsProps) => {
  const { direction, locale } = useLocale();

  if (!isOpen || !type) return null;

  const isRTL = direction === "rtl";
  const lang: "ar" | "en" = locale === "en" || direction === "ltr" ? "en" : "ar";
  const t = (lang === "ar" ? arTranslations : enTranslations).nutritionModals;

  const fallbackTitle = categoryTitle || t.defaultCategory;
  const addRecordTitle = t.addRecord.replace("{{cat}}", fallbackTitle);
  const editRecordTitle = t.editRecord.replace("{{cat}}", fallbackTitle);

  if (type === "delete") {
    return (
      <div
        className="fixed inset-0 bg-black/40 z-50 flex flex-col items-center justify-center p-4"
        dir={direction}
      >
        <div className="bg-white rounded-[32px] w-full max-w-sm p-10 flex flex-col items-center relative shadow-xl">
          <div className="w-24 h-24 mb-6 text-[#c53b3b]">
            <Trash2 className="w-full h-full stroke-1" />
          </div>
          <h2 className="text-[#2b2a3f] text-3xl font-bold mb-3 font-cairo">
            {t.deleteTitle}
          </h2>
          <p className="text-gray-500 text-sm mb-10 font-medium">
            {t.deleteSubtitle}
          </p>
          <div className="flex gap-4 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-3.5 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
            >
              {t.cancel}
            </button>
            <button className="flex-1 py-3.5 rounded-xl bg-[#b62424] text-white font-bold hover:bg-[#9a1a1a] transition-colors">
              {t.delete}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const modalTitle = type === "add" ? addRecordTitle : editRecordTitle;

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 overflow-y-auto"
      dir={direction}
    >
      <div className="bg-white rounded-3xl w-full max-w-4xl p-8 relative shadow-xl my-8 font-cairo">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 relative">
              <Image
                src="/nutrition/تغييرات الأعلاف.svg"
                alt="icon"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-[#2b2a3f] text-2xl font-bold">{modalTitle}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-12">
          <div className="relative">
            <div className={`absolute ${isRTL ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 pointer-events-none z-10`}>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
            <select
              className={`w-full bg-white border border-gray-300 rounded-xl py-4 text-gray-700 outline-none focus:border-[#4b2f1a] appearance-none ${isRTL ? "pr-4 pl-10 text-right" : "pl-4 pr-10 text-left"}`}
              dir={direction}
            >
              <option disabled selected>
                {type === "edit" ? "مداح مهنا" : t.selectHorse}
              </option>
              <option>مداح مهنا</option>
            </select>
          </div>

          <div className="relative">
            <div className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 pointer-events-none z-10`}>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={type === "edit" ? "04/7/2025" : t.changeDate}
              defaultValue={type === "edit" ? "04/7/2025" : ""}
              className={`w-full bg-white border border-gray-300 rounded-xl py-4 text-gray-700 outline-none focus:border-[#4b2f1a] placeholder-gray-400 font-inter ${isRTL ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left"}`}
            />
          </div>


          <div className="relative">
            <div className={`absolute ${isRTL ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 pointer-events-none z-10`}>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
            <select
              className={`w-full bg-white border border-gray-300 rounded-xl py-4 text-gray-700 outline-none focus:border-[#4b2f1a] appearance-none ${isRTL ? "pr-4 pl-10 text-right" : "pl-4 pr-10 text-left"}`}
              dir={direction}
            >
              <option disabled selected>{t.feedType}</option>
              <option>{t.feedType}</option>
            </select>
          </div>


          <div className="relative">
            <div className={`absolute ${isRTL ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 pointer-events-none z-10`}>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
            <select
              className={`w-full bg-white border border-gray-300 rounded-xl py-4 text-gray-700 outline-none focus:border-[#4b2f1a] appearance-none ${isRTL ? "pr-4 pl-10 text-right" : "pl-4 pr-10 text-left"}`}
              dir={direction}
            >
              <option disabled selected>
                {type === "edit" ? "50 كجم" : t.quantity}
              </option>
              <option>50 كجم</option>
            </select>
          </div>


          <div className="relative">
            <div className={`absolute ${isRTL ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 pointer-events-none z-10`}>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
            <select
              className={`w-full bg-white border border-gray-300 rounded-xl py-4 text-gray-700 outline-none focus:border-[#4b2f1a] appearance-none ${isRTL ? "pr-4 pl-10 text-right" : "pl-4 pr-10 text-left"}`}
              dir={direction}
            >
              <option disabled selected>{t.supplierName}</option>
              <option>{lang === "ar" ? "مورد الرياض" : "Riyadh Supplier"}</option>
            </select>
          </div>


          <div className="relative">
            <div className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 pointer-events-none z-10`}>
              <Phone className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t.supplierNumber}
              className={`w-full bg-white border border-gray-300 rounded-xl py-4 text-gray-700 outline-none focus:border-[#4b2f1a] placeholder-gray-400 ${isRTL ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left"}`}
              dir="ltr"
            />
          </div>


          <div className="relative">
            <div className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 pointer-events-none z-10`}>
              <span className="font-bold text-gray-400">$</span>
            </div>
            <input
              type="text"
              placeholder={type === "edit" ? "200$" : t.cost}
              defaultValue={type === "edit" ? "200$" : ""}
              className={`w-full bg-white border border-gray-300 rounded-xl py-4 text-gray-700 outline-none focus:border-[#4b2f1a] placeholder-gray-400 font-inter ${isRTL ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left"}`}
            />
          </div>

          <div className="relative">
            <div className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 pointer-events-none z-10`}>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={type === "edit" ? "04/7/2026" : t.notifyMe}
              defaultValue={type === "edit" ? "04/7/2026" : ""}
              className={`w-full bg-white border border-gray-300 rounded-xl py-4 text-gray-700 outline-none focus:border-[#4b2f1a] placeholder-gray-400 font-inter ${isRTL ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left"}`}
            />
          </div>

        </div>


        <div className="flex items-center gap-4 flex-row-reverse">
          <button
            onClick={onClose}
            className="px-10 py-3.5 border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
          >
            {t.cancel}
          </button>
          <button className="px-10 py-3.5 bg-[#3b2b20] text-white rounded-xl font-bold hover:bg-[#2e2119] transition-colors flex items-center gap-2">
            {t.save}
          </button>
        </div>

      </div>
    </div>
  );
};
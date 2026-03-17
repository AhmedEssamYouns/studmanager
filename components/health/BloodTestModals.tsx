"use client";

import { useLocale } from "@/lib/locale-context";
import { X, Calendar, ChevronDown, Phone, Trash2, FileIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

type ModalType = "add" | "edit" | "delete" | null;

interface BloodTestModalsProps {
  isOpen: boolean;
  type: ModalType;
  onClose: () => void;
  recordData?: any; // For edit modal pre-population
  categoryTitle?: string;
}

export const BloodTestModals = ({ isOpen, type, onClose, recordData, categoryTitle }: BloodTestModalsProps) => {
  const { direction } = useLocale();

  const [fileName] = useState<string | null>(recordData?.fileName || null);
  const [isPositive, setIsPositive] = useState<boolean>(recordData?.isPositive ?? false);

  if (!isOpen || !type) return null;

  // Handle Delete Modal specifically which has a very different layout
  if (type === "delete") {
    return (
      <div className="fixed inset-0 bg-black/40 z-50 flex flex-col items-center justify-center p-4" dir={direction}>
        <div className="bg-white rounded-[32px] w-full max-w-sm p-10 flex flex-col items-center relative shadow-xl">
          <div className="w-24 h-24 mb-6 text-[#c53b3b]">
             <Trash2 className="w-full h-full stroke-1" />
          </div>
          <h2 className="text-[#2b2a3f] text-3xl font-bold mb-3 font-cairo">حذف السجل؟</h2>
          <p className="text-gray-500 text-sm mb-10 font-medium">لن تتمكن من استعادة هذا السجل</p>
          
          <div className="flex gap-4 w-full">
            <button 
              onClick={onClose}
              className="flex-1 py-3.5 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
            >
              إلغاء
            </button>
            <button 
              className="flex-1 py-3.5 rounded-xl bg-[#b62424] text-white font-bold hover:bg-[#9a1a1a] transition-colors"
            >
              حذف
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Determine Title based on add vs edit
  const fallbackTitle = categoryTitle || "تحليل الدم";
  const modalTitle = type === "add" ? `سجل جديد ل${fallbackTitle}` : `تعديل سجل ${fallbackTitle}`;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 overflow-y-auto" dir={direction}>
      <div className="bg-white rounded-3xl w-full max-w-4xl p-8 relative shadow-xl my-8 font-cairo">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
             {/* Small icon from screenshot */}
             <div className="w-8 h-8 relative">
               <Image src="/health/تحاليل الدم.svg" alt="icon" fill className="object-contain" />
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

        {/* Form Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
          
          {/* Row 1 */}
          <div className="relative">
             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-5 h-5 text-gray-400" />
             </div>
             <select className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 text-gray-700 outline-none focus:border-[#4b2f1a] appearance-none" dir={direction}>
               <option disabled selected>{type === "edit" ? "مداح مهنا" : "اختر الخيل"}</option>
               <option>مداح مهنا</option>
               <option>خيار آخر</option>
             </select>
          </div>
          
          <div className="relative">
             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Calendar className="w-5 h-5 text-gray-400" />
             </div>
             <input 
               type="text" 
               placeholder={type === "edit" ? "18/9/2025" : "تاريخ سحب العينة"}
               defaultValue={type === "edit" ? "18/9/2025" : ""}
               className="w-full bg-white border border-gray-300 rounded-xl px-12 py-4 text-gray-700 outline-none focus:border-[#4b2f1a] text-right placeholder-gray-400"
             />
          </div>

          {/* Row 2 */}
          <div className="relative">
             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-5 h-5 text-gray-400" />
             </div>
             <select className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 text-gray-700 outline-none focus:border-[#4b2f1a] appearance-none" dir={direction}>
               <option disabled selected>اسم المختبر</option>
               <option>مختبر ألفا</option>
             </select>
          </div>

          <div className="relative">
             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-5 h-5 text-gray-400" />
             </div>
             <select className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 text-gray-700 outline-none focus:border-[#4b2f1a] appearance-none" dir={direction}>
               <option disabled selected>سبب سحب العينة</option>
               <option>فحص دوري</option>
             </select>
          </div>

          {/* Row 3 */}
          <div className="relative">
             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Phone className="w-5 h-5 text-gray-400" />
             </div>
             <input 
               type="text" 
               placeholder={type === "edit" ? "01010101010" : "رقم المتابعة"}
               defaultValue={type === "edit" ? "01010101010" : ""}
               className="w-full bg-white border border-gray-300 rounded-xl px-12 py-4 text-gray-700 outline-none focus:border-[#4b2f1a] text-right placeholder-gray-400"
               dir="ltr"
             />
          </div>
          
          <div className="relative">
             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Calendar className="w-5 h-5 text-gray-400" />
             </div>
             <input 
               type="text" 
               placeholder={type === "edit" ? "18/9/2026" : "أخطرنى فى"}
               defaultValue={type === "edit" ? "18/9/2026" : ""}
               className="w-full bg-white border border-gray-300 rounded-xl px-12 py-4 text-gray-700 outline-none focus:border-[#4b2f1a] text-right placeholder-gray-400"
             />
          </div>

        </div>
        
        {/* Full Width Row */}
        <div className="relative mb-8">
           <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <span className="font-bold text-gray-400">$</span>
           </div>
           <input 
             type="text" 
             placeholder={type === "edit" ? "200$" : "التكلفة"}
             defaultValue={type === "edit" ? "200$" : ""}
             className="w-full bg-white border border-gray-300 rounded-xl px-12 py-4 text-gray-700 outline-none focus:border-[#4b2f1a] text-right placeholder-gray-400"
           />
        </div>

        {/* Radio and Upload Section */}
        <div className="flex flex-col items-end gap-6 mb-12">
            
            <div className="flex items-center gap-4">
              <span className="text-[#2b2a3f] font-semibold">هل هو إيجابي ؟</span>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-gray-700">نعم</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isPositive ? 'border-[#3b2b20]' : 'border-gray-300'}`}>
                     {isPositive && <div className="w-2.5 h-2.5 bg-[#3b2b20] rounded-full" />}
                  </div>
                  <input type="radio" className="hidden" checked={isPositive} onChange={() => setIsPositive(true)} />
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-gray-700">لا</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${!isPositive ? 'border-[#3b2b20]' : 'border-gray-300'}`}>
                     {!isPositive && <div className="w-2.5 h-2.5 bg-[#3b2b20] rounded-full" />}
                  </div>
                  <input type="radio" className="hidden" checked={!isPositive} onChange={() => setIsPositive(false)} />
                </label>
              </div>
            </div>

            <div className="flex items-center gap-4">
               {fileName && (
                  <span className="text-gray-600 text-sm flex items-center gap-1">
                    <FileIcon className="w-4 h-4" />
                    {fileName}
                  </span>
               )}
               {!fileName && <span className="text-gray-400 text-sm">لم يتم اختيار ملف</span>}
               
               <button className="px-6 py-3 border border-[#3b2b20] text-[#3b2b20] rounded-xl font-bold bg-[#faf8f5] hover:bg-[#f3eee6] transition-colors">
                 اختر ملف
               </button>
               
               <span className="text-gray-400 text-xs">يرجى تحميل ملف بحجم أقل من 2 ميجا بايت</span>
            </div>
        </div>
        
        {/* Footer Actions */}
        <div className="flex items-center justify-start gap-4">
           <button 
             onClick={onClose}
             className="px-10 py-3.5 border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
           >
             إلغاء
           </button>
           <button 
             className="px-10 py-3.5 bg-[#3b2b20] text-white rounded-xl font-bold hover:bg-[#2e2119] transition-colors flex items-center gap-2"
           >
             حفظ
           </button>
        </div>

      </div>
    </div>
  );
};

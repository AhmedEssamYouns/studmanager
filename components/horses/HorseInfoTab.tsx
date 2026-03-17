"use client";

import { FC } from "react";
import { useLocale } from "@/lib/locale-context";

interface HorseInfoTabProps {
  horse?: any;
}

export const HorseInfoTab: FC<HorseInfoTabProps> = ({ horse }) => {
  const { direction } = useLocale();
  const isRTL = direction === "rtl";

  return (
    <div className={`mb-12 ${isRTL ? "text-right" : "text-left"}`}>
      {/* Container for Info */}
      <div className="bg-[#fdfbf7] rounded-3xl p-8 md:p-12 shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Column 1: Horse Info */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-bold text-[#2a2a2a] mb-2">{isRTL ? "معلومات الحصان" : "Horse Information"}</h3>
          
          <div className="flex flex-col gap-1">
            <span className="text-[#a08a6b] font-medium">{isRTL ? "الاسم :" : "Name :"}</span>
            <span className="text-black font-semibold">{isRTL ? "اسم الخيل" : horse?.nameEn || "Horse Name"}</span>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-[#a08a6b] font-medium">{isRTL ? "الاسم المعروف :" : "Known As :"}</span>
            <span className="text-black font-semibold">{isRTL ? "اسم الخيل" : "Known Name"}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[#a08a6b] font-medium">{isRTL ? "الرسن :" : "Breed :"}</span>
            <span className="text-black font-semibold">{isRTL ? "اسم الخيل" : "Breed Name"}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[#a08a6b] font-medium">{isRTL ? "حاليا في :" : "Currently In :"}</span>
            <span className="text-black font-semibold">{isRTL ? "مصر" : "Egypt"}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[#a08a6b] font-medium">{isRTL ? "الجنس :" : "Gender :"}</span>
            <span className="text-black font-semibold">{isRTL ? "ذكر" : "Male"}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[#a08a6b] font-medium">{isRTL ? "اللون :" : "Color :"}</span>
            <span className="text-black font-semibold">{isRTL ? "أسود" : "Black"}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[#a08a6b] font-medium">{isRTL ? "تاريخ الميلاد :" : "Birth Date :"}</span>
            <span className="text-black font-semibold">18/9/1999</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[#a08a6b] font-medium">{isRTL ? "ولد في :" : "Born In :"}</span>
            <span className="text-black font-semibold">{isRTL ? "مصر" : "Egypt"}</span>
          </div>
        </div>

        {/* Column 2: Registration Numbers */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-bold text-[#2a2a2a] mb-2">{isRTL ? "أرقام التسجيل" : "Registration Numbers"}</h3>
          
          <div className="flex flex-col gap-1">
            <span className="text-[#a08a6b] font-medium">{isRTL ? "أرقام التسجيل :" : "Registration No :"}</span>
            <span className="text-black font-semibold">123456789</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[#a08a6b] font-medium">{isRTL ? "رقم الشريحة :" : "Microchip No :"}</span>
            <span className="text-black font-semibold">12345678956468</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[#a08a6b] font-medium">{isRTL ? "رقم UELN :" : "UELN No :"}</span>
            <span className="text-black font-semibold">{isRTL ? "غير معروف" : "Unknown"}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[#a08a6b] font-medium">{isRTL ? "رقم تسجيل الاتحاد الدولي للفروسية :" : "FEI Registration :"}</span>
            <span className="text-black font-semibold">{isRTL ? "غير معروف" : "Unknown"}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[#a08a6b] font-medium">{isRTL ? "رقم تسجيل الرياضي المحلي :" : "Local Registration :"}</span>
            <span className="text-black font-semibold">{isRTL ? "غير معروف" : "Unknown"}</span>
          </div>
        </div>

        {/* Column 3: Breeder Information */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-bold text-[#2a2a2a] mb-2">{isRTL ? "معلومات المربي" : "Breeder Information"}</h3>
          
          <div className="flex flex-col gap-1">
            <span className="text-[#a08a6b] font-medium">{isRTL ? "اسم المربي :" : "Breeder Name :"}</span>
            <span className="text-black font-semibold">{isRTL ? "اسم المربي" : "Breeder Name"}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[#a08a6b] font-medium">{isRTL ? "البريد الإلكتروني :" : "Email :"}</span>
            <span className="text-black font-semibold">asdfgh@gmail.com</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[#a08a6b] font-medium">{isRTL ? "رقم الهاتف :" : "Phone Number :"}</span>
            <span className="text-black font-semibold">+201010101010</span>
          </div>
        </div>

        {/* Column 4: Owner Information */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-bold text-[#2a2a2a] mb-2">{isRTL ? "معلومات المالك الحالي" : "Current Owner Info"}</h3>
          
          <div className="flex flex-col gap-1">
            <span className="text-[#a08a6b] font-medium">{isRTL ? "اسم المالك :" : "Owner Name :"}</span>
            <span className="text-black font-semibold">{isRTL ? "اسم المربي" : "Owner Name"}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[#a08a6b] font-medium">{isRTL ? "البريد الإلكتروني :" : "Email :"}</span>
            <span className="text-black font-semibold">asdfgh@gmail.com</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[#a08a6b] font-medium">{isRTL ? "رقم الهاتف :" : "Phone Number :"}</span>
            <span className="text-black font-semibold">+201010101010</span>
          </div>
        </div>

      </div>
    </div>
  );
};

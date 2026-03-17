"use client";

import { useLocale } from "@/lib/locale-context";
import { Search, ChevronLeft, ChevronRight, Download, Trash2, Edit } from "lucide-react";
import { useState } from "react";
import { NutritionModals } from "./NutritionModals"; 

interface NutritionCategoryTableProps {
  categoryId: string;
}

interface ColumnConfig {
  key: string;
  label: string;
}

const CATEGORY_CONFIG: Record<string, { titleAr: string; titleEn: string; columns: ColumnConfig[] }> = {
  "feed-changes": {
    titleAr: "تغييرات الأعلاف",
    titleEn: "Feed Changes",
    columns: [
      { key: "horseName", label: "اسم الخيل" },
      { key: "feedType", label: "نوع العلف" },
      { key: "supplierName", label: "اسم المورد" },
      { key: "supplierNumber", label: "رقم المورد" },
      { key: "quantity", label: "الكمية / كجم" },
      { key: "date", label: "تاريخ التغيير" },
      { key: "cost", label: "التكلفة" },
    ]
  },
  "monthly-supplements": {
    titleAr: "المكملات الشهرية",
    titleEn: "Monthly Supplements",
    columns: [
      { key: "horseName", label: "اسم الخيل" },
      { key: "supplementName", label: "اسم المكمل" },
      { key: "supplierName", label: "المورد" },
      { key: "quantity", label: "الجرعة" },
      { key: "date", label: "تاريخ البدء" },
      { key: "cost", label: "التكلفة" },
    ]
  },
  "tournament-supplements": { 
    titleAr: "مكملات المهرجنات", titleEn: "Tournament Supplements", 
    columns: [
      { key: "horseName", label: "اسم الخيل" }, 
      { key: "supplementName", label: "اسم المكمل" },
      { key: "tournamentName", label: "المهرجان" }, 
      { key: "date", label: "تاريخ الاستخدام" }, 
      { key: "cost", label: "التكلفة" }
    ] 
  },
  "nutrition-assistant": { 
    titleAr: "مساعد التغذية", titleEn: "Nutrition Assistant", 
    columns: [
      { key: "horseName", label: "اسم الخيل" }, 
      { key: "assistantName", label: "المساعد" }, 
      { key: "planType", label: "نوع النظام" }, 
      { key: "date", label: "تاريخ النظام" },
      { key: "status", label: "الحالة" }
    ] 
  },
};

const DEFAULT_CONFIG = {
  titleAr: "سجل التغذية",
  titleEn: "Nutrition Record",
  columns: [
    { key: "horseName", label: "اسم الخيل" },
    { key: "date", label: "التاريخ" },
    { key: "cost", label: "التكلفة" },
  ]
};

const getMockData = (columns: ColumnConfig[]) => {
  return Array.from({ length: 8 }).map((_, i) => {
    const row: any = { id: i + 1 };
    
    columns.forEach(col => {
      switch(col.key) {
        case "horseName": row[col.key] = "اسم الخيل"; break;
        case "feedType": row[col.key] = "نوع العلف"; break;
        case "supplementName": row[col.key] = "اسم المكمل"; break;
        case "supplierName": row[col.key] = "اسم المورد"; break;
        case "supplierNumber": row[col.key] = "01010101010"; break;
        case "quantity": row[col.key] = `${90 - i}`; break; // Using descending numbers simulating the mockup
        case "date": row[col.key] = "18/9/2025"; break;
        case "cost": row[col.key] = "200$"; break;
        case "tournamentName": row[col.key] = "بطولة الإستعراض"; break;
        case "assistantName": row[col.key] = "أحمد خالد"; break;
        case "planType": row[col.key] = "نظام بطولات"; break;
        case "status": row[col.key] = "نشط"; break;
        default: row[col.key] = "بيانات";
      }
    });

    return row;
  });
};

export const NutritionCategoryTable = ({ categoryId }: NutritionCategoryTableProps) => {
  const { direction } = useLocale();
  const isRTL = direction === "rtl";
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState<{ isOpen: boolean; type: "add" | "edit" | "delete" | null; record: any }>({
    isOpen: false,
    type: null,
    record: null
  });

  const config = CATEGORY_CONFIG[categoryId] || DEFAULT_CONFIG;
  const columns = config.columns;
  const mockData = getMockData(columns);

  const openModal = (type: "add" | "edit" | "delete", record: any = null) => {
    setModalState({ isOpen: true, type, record });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null, record: null });
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm font-cairo" dir={direction}>
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-[#3b2b20]">{isRTL ? config.titleAr : config.titleEn}</h2>
        
        <div className="flex flex-1 w-full max-w-xl items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
             <input
                type="text"
                placeholder={isRTL ? "البحث" : "Search"}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#4b2f1a] transition-colors pr-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          
          {/* Add Record Button */}
          <button 
             onClick={() => openModal("add")}
             className="bg-[#3b2b20] text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-[#2e2119] transition-colors whitespace-nowrap"
          >
             <span className="text-lg leading-none">+</span>
             {isRTL ? "إضافة سجل جديد" : "Add New Record"}
          </button>
          
          {/* Action Icons */}
          <button className="p-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
            <Trash2 className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
            <Download className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="bg-[#4b2f1a] text-white text-sm">
              <th className="py-4 px-4 font-semibold text-right rounded-r-xl w-12">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 acccent-[#3b2b20]" />
              </th>
              {columns.map((col) => (
                <th key={col.key} className="py-4 px-4 font-semibold text-right">
                  {col.label}
                </th>
              ))}
              <th className="py-4 px-4 font-semibold text-center rounded-l-xl">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row, index) => (
              <tr 
                key={row.id} 
                className={`border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-[#fdfbf7]"
                }`}
              >
                <td className="py-4 px-4 text-right">
                   <input type="checkbox" className="w-4 h-4 rounded border-gray-300 acccent-[#3b2b20]" />
                </td>
                
                {columns.map((col) => (
                   <td key={col.key} className={`py-4 px-4 text-right ${col.key === "horseName" ? "text-[#3b2b20] font-medium" : "text-gray-600"}`}>
                      {row[col.key]}
                   </td>
                ))}
                
                <td className="py-4 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => openModal("edit", row)}
                      className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => openModal("delete", row)}
                      className="p-1.5 text-[#e53e3e] hover:bg-red-50 rounded-lg transition-colors border border-red-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-8 gap-2">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
        
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 rounded-full text-sm transition-colors ${
              currentPage === page 
                ? "bg-[#3b2b20] text-white" 
                : "text-gray-600 hover:bg-gray-50 bg-white border border-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
        
        <span className="text-gray-400 tracking-widest px-1">...</span>
        
        <button
          onClick={() => setCurrentPage(32)}
          className={`w-8 h-8 rounded-full text-sm transition-colors ${
            currentPage === 32
              ? "bg-[#3b2b20] text-white" 
              : "text-gray-600 hover:bg-gray-50 bg-white border border-gray-200"
          }`}
        >
          32
        </button>
        
        <button 
          onClick={() => setCurrentPage(prev => Math.min(32, prev + 1))}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      <NutritionModals 
        isOpen={modalState.isOpen} 
        type={modalState.type} 
        onClose={closeModal} 
        recordData={modalState.record}
        categoryTitle={isRTL ? config.titleAr : config.titleEn}
      />
    </div>
  );
};

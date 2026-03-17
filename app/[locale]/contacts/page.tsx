"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useLocale } from "@/lib/locale-context";
import { Search, ChevronLeft, ChevronRight, Download, Trash2, Edit, X, ChevronDown, Phone } from "lucide-react";
import { useState } from "react";

// Group color map
const GROUP_COLORS: Record<string, string> = {
  "الأصدقاء": "text-green-600",
  "العملاء": "text-blue-600",
  "المشروع": "text-purple-600",
  "الفريق": "text-orange-600",
};

const MOCK_CONTACTS = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  name: "محمد",
  phone: "01010101010",
  email: "mohammad@gmail.com",
  group: ["الأصدقاء", "العملاء", "المشروع", "الفريق"][i % 4],
}));

type ModalType = "add" | "edit" | "delete" | null;

export default function ContactsPage() {
  const { direction } = useLocale();
  const isRTL = direction === "rtl";
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState<{ isOpen: boolean; type: ModalType; record: any }>({ isOpen: false, type: null, record: null });

  const openModal = (type: ModalType, record: any = null) => setModalState({ isOpen: true, type, record });
  const closeModal = () => setModalState({ isOpen: false, type: null, record: null });

  return (
    <MainLayout>
      <div className={`p-3 sm:p-6 max-w-[1400px] mx-auto ${isRTL ? "text-right font-cairo" : "text-left"}`} dir={direction}>
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm">
          {/* Header */}
          <div className="flex flex-col gap-3 mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-[#3b2b20]">جهات الاتصال</h2>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="relative flex-1 min-w-[150px]">
                <input type="text" placeholder="البحث" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#4b2f1a] transition-colors pr-10" />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <button onClick={() => openModal("add")} className="bg-[#3b2b20] text-white px-3 sm:px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-1 sm:gap-2 hover:bg-[#2e2119] transition-colors whitespace-nowrap">
                <span className="text-lg leading-none">+</span> <span className="hidden sm:inline">إضافة جهة اتصال جديدة</span><span className="sm:hidden">إضافة</span>
              </button>
              <button className="p-2 sm:p-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"><Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" /></button>
              <button className="p-2 sm:p-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"><Download className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" /></button>
            </div>
          </div>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openModal("edit", row)} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => openModal("delete", row)} className="p-1.5 text-[#e53e3e] hover:bg-red-50 rounded-lg transition-colors border border-red-100"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center mt-8 gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50">
              {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
            {[1, 2, 3, 4, 5].map(p => (
              <button key={p} onClick={() => setCurrentPage(p)} className={`w-8 h-8 rounded-full text-sm ${currentPage === p ? "bg-[#3b2b20] text-white" : "text-gray-600 hover:bg-gray-50 border border-gray-200"}`}>{p}</button>
            ))}
            <span className="text-gray-400 px-1">...</span>
            <button onClick={() => setCurrentPage(32)} className={`w-8 h-8 rounded-full text-sm ${currentPage === 32 ? "bg-[#3b2b20] text-white" : "text-gray-600 hover:bg-gray-50 border border-gray-200"}`}>32</button>
            <button onClick={() => setCurrentPage(p => Math.min(32, p + 1))} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50">
              {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Modals */}
        {modalState.isOpen && modalState.type === "delete" && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[32px] w-full max-w-sm p-10 flex flex-col items-center shadow-xl">
              <div className="w-24 h-24 mb-6 text-[#c53b3b]"><Trash2 className="w-full h-full stroke-1" /></div>
              <h2 className="text-[#2b2a3f] text-3xl font-bold mb-3 font-cairo">حذف السجل؟</h2>
              <p className="text-gray-500 text-sm mb-10 font-medium">لن تتمكن من استعادة هذا السجل</p>
              <div className="flex gap-4 w-full">
                <button onClick={closeModal} className="flex-1 py-3.5 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-50">إلغاء</button>
                <button className="flex-1 py-3.5 rounded-xl bg-[#b62424] text-white font-bold hover:bg-[#9a1a1a]">حذف</button>
              </div>
            </div>
          </div>
        )}

        {modalState.isOpen && (modalState.type === "add" || modalState.type === "edit") && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl w-full max-w-3xl p-8 shadow-xl my-8 font-cairo">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-[#2b2a3f] text-2xl font-bold">
                  {modalState.type === "add" ? "اضافة جهة اتصال جديدة" : "تعديل المستخدم"}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><X className="w-6 h-6" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
                <input type="text" placeholder="اسم المستخدم" defaultValue={modalState.type === "edit" ? modalState.record?.name : ""} className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 text-gray-700 outline-none focus:border-[#4b2f1a] text-right placeholder-gray-400" />
                <div className="relative">
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"><Phone className="w-5 h-5 text-gray-400" /></div>
                  <input type="text" placeholder="رقم الهاتف" defaultValue={modalState.type === "edit" ? modalState.record?.phone : ""} className="w-full bg-white border border-gray-300 rounded-xl px-12 py-4 text-gray-700 outline-none focus:border-[#4b2f1a] text-right placeholder-gray-400" dir="ltr" />
                </div>
                <input type="text" placeholder="الحساب" defaultValue={modalState.type === "edit" ? modalState.record?.email : ""} className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 text-gray-700 outline-none focus:border-[#4b2f1a] text-right placeholder-gray-400" />
                <div className="relative">
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"><ChevronDown className="w-5 h-5 text-gray-400" /></div>
                  <select className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 text-gray-700 outline-none focus:border-[#4b2f1a] appearance-none" dir={direction}>
                    <option disabled selected>المجموعة</option>
                    <option>الأصدقاء</option><option>العملاء</option><option>المشروع</option><option>الفريق</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-start gap-4">
                <button onClick={closeModal} className="px-10 py-3.5 border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50">إلغاء</button>
                <button className="px-10 py-3.5 bg-[#3b2b20] text-white rounded-xl font-bold hover:bg-[#2e2119] flex items-center gap-2">حفظ</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

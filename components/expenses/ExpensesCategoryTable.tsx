"use client";

import { useLocale } from "@/lib/locale-context";
import { Search, ChevronLeft, ChevronRight, Download, Trash2, Edit } from "lucide-react";
import { useMemo, useState } from "react";
import { ExpensesModals } from "./ExpensesModals";

interface ExpensesCategoryTableProps {
    categoryId: string;
}

interface ColumnConfig {
    key: string;
    labelAr: string;
    labelEn: string;
}

interface CategoryConfig {
    titleAr: string;
    titleEn: string;
    columns: ColumnConfig[];
}

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
    "membership": {
        titleAr: "العضوية",
        titleEn: "Membership",
        columns: [
            { key: "facilityName", labelAr: "اسم المنشأة", labelEn: "Facility Name" },
            { key: "startDate", labelAr: "تاريخ البداية", labelEn: "Start Date" },
            { key: "endDate", labelAr: "تاريخ النهاية", labelEn: "End Date" },
            { key: "subscriptionDuration", labelAr: "مدة الاشتراك", labelEn: "Subscription Duration" },
            { key: "cost", labelAr: "التكلفة", labelEn: "Cost" },
        ],
    },

    "horse-equipment": {
        titleAr: "معدات الخيول",
        titleEn: "Horse Equipment",
        columns: [
            { key: "equipment", labelAr: "المعدة", labelEn: "Equipment" },
            { key: "date", labelAr: "التاريخ", labelEn: "Date" },
            { key: "cost", labelAr: "التكلفة", labelEn: "Cost" },
        ],
    },

    "transport": {
        titleAr: "النقل",
        titleEn: "Transport",
        columns: [
            { key: "horseName", labelAr: "الخيل", labelEn: "Horse" },
            { key: "transportMethod", labelAr: "وسيلة النقل", labelEn: "Transport Method" },
            { key: "date", labelAr: "التاريخ", labelEn: "Date" },
            { key: "from", labelAr: "من", labelEn: "From" },
            { key: "to", labelAr: "إلى", labelEn: "To" },
            { key: "cost", labelAr: "التكلفة", labelEn: "Cost" },
        ],
    },

    "labor": {
        titleAr: "العمالة",
        titleEn: "Labor",
        columns: [
            { key: "name", labelAr: "الاسم", labelEn: "Name" },
            { key: "jobTitle", labelAr: "الوظيفة", labelEn: "Job Title" },
            { key: "workStartDate", labelAr: "تاريخ بدء العمل", labelEn: "Work Start Date" },
            { key: "insuranceAmount", labelAr: "التأمينات", labelEn: "Insurance Amount" },
            { key: "insuranceType", labelAr: "نوع التأمين", labelEn: "Insurance Type" },
            { key: "salary", labelAr: "الراتب", labelEn: "Salary" },
            { key: "attachment", labelAr: "ملف مرفق", labelEn: "Attachment" },
        ],
    },

    "clinics": {
        titleAr: "العيادات",
        titleEn: "Clinics",
        columns: [
            { key: "procedure", labelAr: "الإجراء", labelEn: "Procedure" },
            { key: "procedureDetails", labelAr: "تفاصيل الإجراء", labelEn: "Procedure Details" },
            { key: "date", labelAr: "التاريخ", labelEn: "Date" },
            { key: "cost", labelAr: "التكلفة", labelEn: "Cost" },
        ],
    },

    "housing": {
        titleAr: "الإيواء",
        titleEn: "Housing",
        columns: [
            { key: "horseName", labelAr: "اسم الخيل", labelEn: "Horse Name" },
            { key: "ownerName", labelAr: "اسم المالك", labelEn: "Owner Name" },
            { key: "checkInDate", labelAr: "تاريخ الدخول", labelEn: "Check-in Date" },
            { key: "checkOutDate", labelAr: "تاريخ الخروج", labelEn: "Check-out Date" },
            { key: "cost", labelAr: "التكلفة", labelEn: "Cost" },
        ],
    },

    "other-expenses": {
    titleAr: "مصاريف اخرى",
        titleEn: "Other Expenses",
            columns: [
                { key: "procedure", labelAr: "الإجراء", labelEn: "Procedure" },
                { key: "date", labelAr: "التاريخ", labelEn: "Date" },
                { key: "cost", labelAr: "التكلفة", labelEn: "Cost" },
                { key: "notes", labelAr: "ملاحظات", labelEn: "Notes" },
            ],
  },

"purchase-operations": {
    titleAr: "عمليات الشراء",
        titleEn: "Purchase Operations",
            columns: [
                { key: "horseName", labelAr: "اسم الخيل", labelEn: "Horse Name" },
                { key: "ownerName", labelAr: "اسم المالك", labelEn: "Owner Name" },
                { key: "date", labelAr: "التاريخ", labelEn: "Date" },
                { key: "cost", labelAr: "التكلفة", labelEn: "Cost" },
            ],
  },

"nutrition": {
    titleAr: "التغذية",
        titleEn: "Nutrition",
            columns: [
                { key: "foodType", labelAr: "نوع الغذاء", labelEn: "Food Type" },
                { key: "date", labelAr: "التاريخ", labelEn: "Date" },
                { key: "cost", labelAr: "التكلفة", labelEn: "Cost" },
            ],
  },
};

const DEFAULT_CONFIG: CategoryConfig = {
    titleAr: "المصاريف",
    titleEn: "Expenses",
    columns: [
        { key: "date", labelAr: "التاريخ", labelEn: "Date" },
        { key: "cost", labelAr: "التكلفة", labelEn: "Cost" },
    ],
};

const getMockData = (categoryId: string) => {
    const commonDate = "18 مارس 2025";
    const commonCost = "200$";

    const dataMap: Record<string, any[]> = {
        membership: Array.from({ length: 10 }).map((_, i) => ({
            id: i + 1,
            facilityName: "اسم المنشأة",
            startDate: commonDate,
            endDate: commonDate,
            subscriptionDuration: i < 4 ? "شهر" : i === 6 ? "7 ايام" : "6 شهور",
            cost: commonCost,
        })),

        "horse-equipment": [
            { id: 1, equipment: "سرج", date: commonDate, cost: commonCost },
            { id: 2, equipment: "لجام", date: commonDate, cost: commonCost },
            { id: 3, equipment: "أدوات تدريب", date: commonDate, cost: commonCost },
            ...Array.from({ length: 7 }).map((_, i) => ({
                id: i + 4,
                equipment: commonDate,
                date: commonDate,
                cost: commonCost,
            })),
        ],

        transport: Array.from({ length: 10 }).map((_, i) => ({
            id: i + 1,
            horseName: "اسم الخيل",
            transportMethod: i === 1 ? "تريلا" : i === 2 ? "مقطورة فردية" : "شاحنة صغيرة",
            date: commonDate,
            from: "القاهرة",
            to: "الشرقية",
            cost: commonCost,
        })),

        labor: [
            { id: 1, name: "محمد", jobTitle: "الوظيفة", workStartDate: commonDate, insuranceAmount: "750 EGP", insuranceType: "طبي", salary: "5000 EGP", attachment: "اسم الملف.pdf" },
            { id: 2, name: "احمد", jobTitle: "الوظيفة", workStartDate: commonDate, insuranceAmount: "800 EGP", insuranceType: "طبي", salary: "5000 EGP", attachment: "اسم الملف.pdf" },
            { id: 3, name: "محمد", jobTitle: "الوظيفة", workStartDate: commonDate, insuranceAmount: "850 EGP", insuranceType: "اجتماعي", salary: "5000 EGP", attachment: "اسم الملف.pdf" },
            { id: 4, name: "احمد", jobTitle: "الوظيفة", workStartDate: commonDate, insuranceAmount: "900 EGP", insuranceType: "اجتماعي", salary: "5000 EGP", attachment: "اسم الملف.pdf" },
            { id: 5, name: "محمد", jobTitle: "الوظيفة", workStartDate: commonDate, insuranceAmount: "950 EGP", insuranceType: "اجتماعي", salary: "5000 EGP", attachment: "اسم الملف.pdf" },
            { id: 6, name: "احمد", jobTitle: "الوظيفة", workStartDate: commonDate, insuranceAmount: "1000 EGP", insuranceType: "طبي / اجتماعي", salary: "5000 EGP", attachment: "اسم الملف.pdf" },
            ...Array.from({ length: 4 }).map((_, i) => ({
                id: i + 7,
                name: i % 2 === 0 ? "محمد" : "احمد",
                jobTitle: "الوظيفة",
                workStartDate: commonDate,
                insuranceAmount: "750 EGP",
                insuranceType: "طبي",
                salary: "5000 EGP",
                attachment: "اسم الملف.pdf",
            })),
        ],

        clinics: [
            { id: 1, procedure: "أشعة", procedureDetails: "نوع الأشعة", date: "18 ابريل 2025", cost: commonCost },
            { id: 2, procedure: "تحليل دم", procedureDetails: "نوع التحليل", date: "18 ابريل 2025", cost: commonCost },
            { id: 3, procedure: "جرعة الديدان", procedureDetails: "نوع الجرعة", date: "18 ابريل 2025", cost: commonCost },
            { id: 4, procedure: "العناية بالحافر", procedureDetails: "نوع التقليم", date: "18 ابريل 2025", cost: commonCost },
            { id: 5, procedure: "إصابة", procedureDetails: "سبب الإصابة", date: "18 ابريل 2025", cost: commonCost },
            { id: 6, procedure: "رعاية بيطرية", procedureDetails: "نوع الرعاية", date: "18 ابريل 2025", cost: commonCost },
            { id: 7, procedure: "الوزن و الطول", procedureDetails: "-", date: "18 ابريل 2025", cost: commonCost },
            { id: 8, procedure: "الأدوية", procedureDetails: "نوع العلاج", date: "18 ابريل 2025", cost: commonCost },
            { id: 9, procedure: "الأشعة", procedureDetails: "نوع الأشعة", date: "18 ابريل 2025", cost: commonCost },
            { id: 10, procedure: "التطعيمات", procedureDetails: "نوع التطعيم", date: "18 ابريل 2025", cost: commonCost },
        ],

        housing: Array.from({ length: 10 }).map((_, i) => ({
            id: i + 1,
            horseName: "اسم الخيل",
            ownerName: "محمد",
            checkInDate: "18 مارس 2025",
            checkOutDate: "18 ابريل 2025",
            cost: commonCost,
        })),

        "other-expenses": [
            { id: 1, procedure: "فاتورة كهرباء", date: commonDate, cost: commonCost, notes: "شهر" },
            { id: 2, procedure: "صيانة معدات", date: commonDate, cost: commonCost, notes: "شهر" },
            { id: 3, procedure: "مستلزمات", date: commonDate, cost: commonCost, notes: "شهر" },
            { id: 4, procedure: "مستلزمات", date: commonDate, cost: commonCost, notes: "شهر" },
            { id: 5, procedure: "مستلزمات", date: commonDate, cost: commonCost, notes: "6 شهور" },
            { id: 6, procedure: "مستلزمات", date: commonDate, cost: commonCost, notes: "6 شهور" },
            { id: 7, procedure: "مستلزمات", date: commonDate, cost: commonCost, notes: "7 ايام" },
            { id: 8, procedure: "مستلزمات", date: commonDate, cost: commonCost, notes: "6 شهور" },
            { id: 9, procedure: "مستلزمات", date: commonDate, cost: commonCost, notes: "6 شهور" },
            { id: 10, procedure: "مستلزمات", date: commonDate, cost: commonCost, notes: "6 شهور" },
        ],

        "purchase-operations": Array.from({ length: 10 }).map((_, i) => ({
            id: i + 1,
            horseName: "اسم الخيل",
            ownerName: "محمد",
            date: commonDate,
            cost: commonCost,
        })),

        nutrition: [
            { id: 1, foodType: "علف", date: "18 ابريل 2025", cost: commonCost },
            { id: 2, foodType: "مكمل شهري", date: "18 ابريل 2025", cost: commonCost },
            ...Array.from({ length: 8 }).map((_, i) => ({
                id: i + 3,
                foodType: "مكمل مهرجانات",
                date: "18 ابريل 2025",
                cost: commonCost,
            })),
        ],
    };

    return dataMap[categoryId] || Array.from({ length: 8 }).map((_, i) => ({
        id: i + 1,
        date: commonDate,
        cost: commonCost,
    }));
};

export const ExpensesCategoryTable = ({ categoryId }: ExpensesCategoryTableProps) => {
    const { locale, direction } = useLocale();
    const isRTL = direction === "rtl";
    const [currentPage, setCurrentPage] = useState(1);
    const [modalState, setModalState] = useState<{ isOpen: boolean; type: "add" | "edit" | "delete" | null; record: any }>({
        isOpen: false,
        type: null,
        record: null,
    });

    const config = CATEGORY_CONFIG[categoryId] || DEFAULT_CONFIG;
    const mockData = useMemo(() => getMockData(categoryId), [categoryId]);

    const openModal = (type: "add" | "edit" | "delete", record: any = null) => {
        setModalState({ isOpen: true, type, record });
    };

    const closeModal = () => {
        setModalState({ isOpen: false, type: null, record: null });
    };

    const getCellValue = (row: any, key: string) => {
        if (key === "attachment") {
            return (
                <span className="inline-flex items-center gap-2 text-[#3b2b20]">
                    <Download className="w-4 h-4" />
                    {row[key]}
                </span>
            );
        }
        return row[key];
    };

    return (
        <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm font-cairo" dir={direction}>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                <h2 className="text-xl font-bold text-[#3b2b20] whitespace-nowrap">
                    {isRTL ? config.titleAr : config.titleEn}
                </h2>

                <div className="flex flex-col sm:flex-row flex-1 w-full lg:max-w-3xl items-stretch sm:items-center gap-3">
                    <div className="relative flex-1 min-w-0">
                        <input
                            type="text"
                            placeholder={locale === "ar" ? "البحث" : "Search"}
                            className={`w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#4b2f1a] transition-colors ${isRTL ? "pr-10 text-right" : "pl-10 text-left"}`}
                        />
                        <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 ${isRTL ? "right-3" : "left-3"}`} />
                    </div>

                    <button
                        onClick={() => openModal("add")}
                        className="bg-[#3b2b20] text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#2e2119] transition-colors whitespace-nowrap"
                    >
                        <span className="text-lg leading-none">+</span>
                        {locale === "ar" ? "إضافة سجل جديد" : "Add New Record"}
                    </button>

                    <div className="flex items-center gap-2">
                        <button className="p-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                            <Trash2 className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                            <Download className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-2xl">
                <table className="w-full min-w-[820px]">
                    <thead>
                        <tr className="bg-[#4b2410] text-white text-sm">
                            <th className={`py-4 px-4 font-semibold w-12 ${isRTL ? "text-right rounded-r-xl" : "text-left rounded-l-xl"}`}>
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-[#3b2b20]" />
                            </th>

                            {config.columns.map((col) => (
                                <th key={col.key} className={`py-4 px-4 font-semibold ${isRTL ? "text-right" : "text-left"}`}>
                                    {locale === "ar" ? col.labelAr : col.labelEn}
                                </th>
                            ))}

                            <th className={`py-4 px-4 font-semibold text-center ${isRTL ? "rounded-l-xl" : "rounded-r-xl"}`}>
                                {locale === "ar" ? "الإجراءات" : "Actions"}
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {mockData.map((row, index) => (
                            <tr
                                key={row.id}
                                className={`border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-[#fdfbf8]"}`}
                            >
                                <td className={`py-4 px-4 ${isRTL ? "text-right" : "text-left"}`}>
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-[#3b2b20]" />
                                </td>

                                {config.columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className={`py-4 px-4 whitespace-nowrap ${isRTL ? "text-right" : "text-left"} ${["horseName", "name", "facilityName", "equipment", "procedure", "foodType"].includes(col.key) ? "text-[#3b2b20] font-medium" : "text-gray-600"}`}
                                    >
                                        {getCellValue(row, col.key)}
                                    </td>
                                ))}

                                <td className="py-4 px-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => openModal("edit", row)}
                                            className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
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

            <div className="flex items-center justify-center mt-8 gap-2 flex-wrap">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                    {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>

                {[1, 2, 3, 4, 5].map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-full text-sm transition-colors ${currentPage === page
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
                    className={`w-8 h-8 rounded-full text-sm transition-colors ${currentPage === 32
                            ? "bg-[#3b2b20] text-white"
                            : "text-gray-600 hover:bg-gray-50 bg-white border border-gray-200"
                        }`}
                >
                    32
                </button>

                <button
                    onClick={() => setCurrentPage((prev) => Math.min(32, prev + 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                    {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
            </div>

            <ExpensesModals
                isOpen={modalState.isOpen}
                type={modalState.type}
                onClose={closeModal}
                recordData={modalState.record}
                categoryTitle={isRTL ? config.titleAr : config.titleEn}
            />
        </div>
    );
};
"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/lib/locale-context";
import ReproductionRecordsTable, {
  type RecordItem,
} from "@/components/reproduction/ReproductionRecordsTable";
import { Search } from "lucide-react";
import ReproductionRecordModal from "@/components/reproduction/modals/ReproductionRecordModal";

type SummaryCard = {
  titleAr: string;
  titleEn: string;
  value: string | number;
  sub?: { labelAr: string; labelEn: string; value: string | number }[];
};

const dummyHorse = {
  nameAr: "مداح مهنا",
  nameEn: "Maddah Muhanna",
  farmAr: "اسم المزرعة",
  farmEn: "Farm name",
  dob: "22/4/2015",
  bornInAr: "مصر",
  bornInEn: "Egypt",
  currentInAr: "مصر",
  currentInEn: "Egypt",
  imageUrl:
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=60",
};

const summaryCards: SummaryCard[] = [
  {
    titleAr: "عدد الأبناء",
    titleEn: "Offspring count",
    value: 5,
  },
  {
    titleAr: "آخر مرة تمت ولادته",
    titleEn: "Last birth",
    value: "مداح مهنا",
  },
  {
    titleAr: "عدد حالات الحمل الناجحة",
    titleEn: "Successful pregnancies",
    value: 5,
  },
  {
    titleAr: "خدمة التكاثر",
    titleEn: "Reproduction service",
    value: "",
    sub: [
      { labelAr: "جمع الأجنة", labelEn: "Embryo collection", value: 5 },
      { labelAr: "حمل", labelEn: "Pregnancy", value: 5 },
    ],
  },
  {
    titleAr: "نقل الأجنة",
    titleEn: "Embryo transfer",
    value: "0/0",
  },
  {
    titleAr: "عدد الأجنة الحالية",
    titleEn: "Current embryos",
    value: 5,
  },
];

// Table dummy JSON (matches screenshot columns)
const dummyRows: RecordItem[] = [
  {
    id: "1",
    horse: "مداح مهنا",
    dob: "22/4/2025",
    results: "نجح",
    location: "تم الحمل",
    price: "طبيعي",
  },
  {
    id: "2",
    horse: "مداح مهنا",
    dob: "22/4/2025",
    results: "فشل",
    location: "فشل في الإباضة",
    price: "طبيعي",
  },
  {
    id: "3",
    horse: "مداح مهنا",
    dob: "22/4/2025",
    results: "نجح",
    location: "تم الحمل",
    price: "طبيعي",
  },
  {
    id: "4",
    horse: "مداح مهنا",
    dob: "22/4/2025",
    results: "نجح",
    location: "تم الحمل",
    price: "طبيعي",
  },
  {
    id: "5",
    horse: "مداح مهنا",
    dob: "22/4/2025",
    results: "نجح",
    location: "تم الحمل",
    price: "طبيعي",
  },
];

export default function MaresOverviewTab() {
  const { locale, direction } = useLocale();
  const isRTL = direction === "rtl";

  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // NEW: keep rows in state (so add/edit updates the table)
  const [rows, setRows] = useState<RecordItem[]>(dummyRows);

  // NEW: modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingRow, setEditingRow] = useState<RecordItem | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.horse.toLowerCase().includes(q) ||
        (r.dob || "").toLowerCase().includes(q) ||
        (r.results || "").toLowerCase().includes(q) ||
        (r.location || "").toLowerCase().includes(q) ||
        (r.price || "").toLowerCase().includes(q),
    );
  }, [query, rows]);

  function toggleSelect(id: string) {
    setSelectedIds((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
    );
  }

  function toggleSelectAll() {
    if (selectedIds.length === filtered.length) setSelectedIds([]);
    else setSelectedIds(filtered.map((r) => r.id));
  }

  // NEW: open add
  function openAddModal() {
    setModalMode("add");
    setEditingRow(null);
    setModalOpen(true);
  }

  // NEW: open edit (with filled data)
  function openEditModal(row: RecordItem) {
    setModalMode("edit");
    setEditingRow(row);
    setModalOpen(true);
  }

  // NEW: submit handler (add/edit)
  function handleModalSubmit(data: RecordItem) {
    if (modalMode === "add") {
      setRows((cur) => [{ ...data, id: String(Date.now()) }, ...cur]);
    } else if (modalMode === "edit" && editingRow) {
      setRows((cur) => cur.map((r) => (r.id === editingRow.id ? data : r)));
    }
    setModalOpen(false);
    setEditingRow(null);
  }

  return (
    <div className="space-y-6">
      {/* Top card (search + info) */}
      <div className="rounded-2xl bg-white shadow-sm p-4 sm:p-6">
        <div
          className={`flex flex-col sm:flex-row sm:items-center gap-3 ${
            isRTL ? "sm:flex-row-reverse" : ""
          }`}
        >
          <button className="h-11 px-4 rounded-2xl bg-[#4b2f1a] text-white text-sm font-semibold flex items-center justify-center w-[300px] sm:w-auto">
            {locale === "ar" ? "رؤية الملف الشخصي" : "View profile"}
          </button>

          <div className="relative w-full">
            <span
              className={`absolute top-1/2 -translate-y-1/2 text-[#6f625b] ${
                isRTL ? "right-4" : "left-4"
              }`}
            >
              <Search className="h-4 w-4" />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`w-full h-11 rounded-2xl border border-[#ece2da] bg-white text-sm outline-none ${
                isRTL ? "pr-10 text-right" : "pl-10 text-left"
              }`}
              placeholder={locale === "ar" ? "اختر الفرس" : "Search mare"}
            />
          </div>
        </div>

        <div className="mt-6 flex gap-6 items-start">
          {/* image */}
          <div className="w-full lg:w-[220px]">
            <div className="w-full aspect-[2/2] rounded-2xl overflow-hidden bg-[#f3f1ef]">
              <img
                src={dummyHorse.imageUrl}
                alt="mare"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* details */}
          <div className={`${isRTL ? "text-right" : "text-left"}`}>
            <div className=" gap-y-3 gap-x-8 text-sm">
              <div className="flex gap-2 mb-5">
                <span className="font-bold text-[#2c2330]">
                  {locale === "ar" ? "الاسم" : "Name"} :
                </span>
                <span className="text-[#5f525a]">
                  {locale === "ar" ? dummyHorse.nameAr : dummyHorse.nameEn}
                </span>
              </div>

              <div className="flex gap-2 mb-5">
                <span className="font-bold text-[#2c2330]">
                  {locale === "ar" ? "المزرعة" : "Farm"} :
                </span>
                <span className="text-[#5f525a]">
                  {locale === "ar" ? dummyHorse.farmAr : dummyHorse.farmEn}
                </span>
              </div>

              <div className="flex gap-2 mb-5">
                <span className="font-bold text-[#2c2330]">
                  {locale === "ar" ? "تاريخ الميلاد" : "DOB"} :
                </span>
                <span className="text-[#5f525a]">{dummyHorse.dob}</span>
              </div>

              <div className="flex gap-2 mb-5">
                <span className="font-bold text-[#2c2330]">
                  {locale === "ar" ? "ولد في" : "Born in"} :
                </span>
                <span className="text-[#5f525a]">
                  {locale === "ar" ? dummyHorse.bornInAr : dummyHorse.bornInEn}
                </span>
              </div>

              <div className="flex gap-2 mb-5">
                <span className="font-bold text-[#2c2330]">
                  {locale === "ar" ? "حاليا في" : "Currently in"} :
                </span>
                <span className="text-[#5f525a]">
                  {locale === "ar"
                    ? dummyHorse.currentInAr
                    : dummyHorse.currentInEn}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {summaryCards.map((c, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-white shadow-sm p-5 border border-[#f2ece7] text-center"
          >
            <div className="text-sm font-bold text-[#2c2330]">
              {locale === "ar" ? c.titleAr : c.titleEn}
            </div>

            {c.sub ? (
              <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                {c.sub.map((s, i) => (
                  <div key={i}>
                    <div className="text-xs text-[#6f625b]">
                      {locale === "ar" ? s.labelAr : s.labelEn}
                    </div>
                    <div className="mt-1 text-xl font-extrabold text-[#2c2330]">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-3 text-3xl font-extrabold text-[#2c2330]">
                {c.value}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Section header + actions */}
      <div
        className={`flex items-center justify-between gap-3 flex-wrap ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={openAddModal}
            className="h-11 px-4 rounded-2xl bg-[#4b2f1a] text-white text-sm font-semibold"
          >
            {locale === "ar" ? "إضافة سجل جديد" : "Add record"}
          </button>

          <button
            disabled={selectedIds.length === 0}
            className={`h-11 px-4 rounded-2xl text-sm font-semibold ${
              selectedIds.length === 0
                ? "bg-[#e7e2de] text-[#9a8f88]"
                : "bg-[#d9534f] text-white"
            }`}
          >
            {locale === "ar" ? "حذف الكل" : "Delete all"}
          </button>
        </div>

        <div className="text-lg font-bold text-[#2c2330]">
          {locale === "ar" ? "سجل التناسل" : "Reproduction records"}
        </div>
      </div>

      {/* Table */}
      <ReproductionRecordsTable
        locale={locale}
        direction={direction}
        rows={filtered}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
        onToggleSelectAll={toggleSelectAll}
        onEdit={openEditModal}
        onDelete={() => {}}
      />

      {/* NEW: Modal */}
      <ReproductionRecordModal
        open={modalOpen}
        mode={modalMode}
        initialData={editingRow}
        onClose={() => {
          setModalOpen(false);
          setEditingRow(null);
        }}
        onSubmit={handleModalSubmit}
      />

      {/* pagination placeholder (responsive) */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <button className="h-9 w-9 rounded-full border bg-white">‹</button>
        <div className="h-9 w-9 rounded-full bg-[#4b2f1a] text-white flex items-center justify-center text-sm">
          1
        </div>
        <button className="h-9 w-9 rounded-full border bg-white">2</button>
        <button className="h-9 w-9 rounded-full border bg-white">3</button>
        <button className="h-9 w-9 rounded-full border bg-white">›</button>
      </div>
    </div>
  );
}

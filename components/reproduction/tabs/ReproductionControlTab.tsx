"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { Search } from "lucide-react";
import ReproductionControlTable, {
  type ReproductionControlRow,
} from "@/components/reproduction/tables/ReproductionControlTable";
import { FaDownload } from "react-icons/fa6";
import ReproductionControlModal from "@/components/reproduction/modals/ReproductionControlModal";

const dummyReproductionControlRows: ReproductionControlRow[] = Array.from({
  length: 10,
}).map((_, i) => ({
  id: String(i + 1),
  scheduled: i % 4 === 1 ? "لا" : "نعم",
  date: "6 مايو 2025",
  time: "10 صباحا",
  examMethod: "طريقة الفحص",
  doctor: "محمد احمد",
}));

export default function ReproductionControlTab() {
  const { locale, direction } = useLocale();
  const isRTL = direction === "rtl";

  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // NEW: keep rows in state (for add/edit)
  const [rows, setRows] = useState<ReproductionControlRow[]>(
    dummyReproductionControlRows,
  );

  // NEW: modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingRow, setEditingRow] = useState<ReproductionControlRow | null>(
    null,
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;

    return rows.filter((r) => {
      const haystack = [r.scheduled, r.date, r.time, r.examMethod, r.doctor]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
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

  // NEW
  function openAddModal() {
    setModalMode("add");
    setEditingRow(null);
    setModalOpen(true);
  }

  // NEW
  function openEditModal(row: ReproductionControlRow) {
    setModalMode("edit");
    setEditingRow(row);
    setModalOpen(true);
  }

  // NEW
  function handleModalSubmit(data: ReproductionControlRow) {
    if (modalMode === "add") {
      setRows((cur) => [{ ...data, id: String(Date.now()) }, ...cur]);
    } else if (modalMode === "edit" && editingRow) {
      setRows((cur) => cur.map((r) => (r.id === editingRow.id ? data : r)));
    }
    setModalOpen(false);
    setEditingRow(null);
  }

  return (
    <div className="space-y-4">
      {/* Top actions + search (responsive) */}
      <div
        className={`flex items-center justify-between gap-3 flex-wrap ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={openAddModal}
            className="h-11 px-4 rounded-2xl bg-[#4b2f1a] text-white text-sm font-semibold flex items-center gap-2"
          >
            <span className="text-lg leading-none">＋</span>
            {locale === "ar" ? "إضافة سجل جديد" : "Add new record"}
          </button>

          <button
            disabled={selectedIds.length === 0}
            className={`h-11 px-4 rounded-2xl text-sm font-semibold flex items-center gap-2 ${
              selectedIds.length === 0
                ? "bg-[#e7e2de] text-[#9a8f88]"
                : "bg-[#d9534f] text-white"
            }`}
          >
            {locale === "ar" ? "حذف" : "Delete"}
          </button>

          <button
            disabled={selectedIds.length === 0}
            className="h-11 px-4 rounded-2xl text-sm font-semibold flex items-center gap-2"
          >
            <FaDownload className="h-8 w-6" color="#4b2f1a" />
          </button>
        </div>

        <div className="relative w-full sm:w-[360px]">
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
            placeholder={locale === "ar" ? "البحث" : "Search"}
          />
        </div>
      </div>

      {/* Table */}
      <ReproductionControlTable
        locale={locale}
        direction={direction}
        rows={filtered}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
        onToggleSelectAll={toggleSelectAll}
        onEdit={openEditModal}
        onDelete={() => {}}
      />

      {/* NEW: Modal for add/edit */}
      <ReproductionControlModal
        open={modalOpen}
        mode={modalMode}
        initialData={editingRow}
        onClose={() => {
          setModalOpen(false);
          setEditingRow(null);
        }}
        onSubmit={handleModalSubmit}
      />

      {/* Pagination (responsive placeholder) */}
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

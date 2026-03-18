"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { Search } from "lucide-react";
import EmbryoTransferTable, {
  type EmbryoTransferRow,
} from "@/components/reproduction/tables/EmbryoTransferTable";
import EmbryoTransferModal from "@/components/reproduction/modals/EmbryoTransferModal";

const dummyEmbryoTransferRows: EmbryoTransferRow[] = Array.from({
  length: 10,
}).map((_, i) => ({
  id: String(i + 1),
  stallion: "مداح مهنا",
  futureMare: "كاليبوترا",
  collectionDate: "2025-04-22",
  tankName: "اسم الخزان",
  type: i % 3 === 0 ? "ذكر" : i % 3 === 1 ? "أنثى" : "غير معروف",
  forSale: i % 2 === 0 ? "نعم" : "لا",
  price: "200EGP",
  canister: [4, 3, 5, 10, 7][i % 5],
  color: "red",
}));

export default function EmbryoTransferTab() {
  const { locale, direction, t } = useLocale();
  const isRTL = direction === "rtl";

  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [rows, setRows] = useState<EmbryoTransferRow[]>(
    dummyEmbryoTransferRows,
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingRow, setEditingRow] = useState<EmbryoTransferRow | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;

    return rows.filter((r) => {
      const haystack = [
        r.stallion,
        r.futureMare,
        r.collectionDate,
        r.tankName,
        r.type,
        r.forSale,
        r.price,
        String(r.canister),
      ]
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

  function openAddModal() {
    setModalMode("add");
    setEditingRow(null);
    setModalOpen(true);
  }

  function openEditModal(row: EmbryoTransferRow) {
    setModalMode("edit");
    setEditingRow(row);
    setModalOpen(true);
  }

  function handleModalSubmit(data: EmbryoTransferRow) {
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
      {/* Top actions like screenshot (responsive) */}
      <div
        className={`flex items-center justify-between gap-3 flex-wrap ${isRTL ? "flex-row-reverse" : ""}`}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={openAddModal}
            className="h-11 px-4 rounded-2xl bg-[#4b2f1a] text-white text-sm font-semibold flex items-center gap-2"
          >
            <span className="text-lg leading-none">＋</span>
            {t("common.addNewRecord")}
          </button>

          <button
            disabled={selectedIds.length === 0}
            className={`h-11 px-4 rounded-2xl text-sm font-semibold flex items-center gap-2 ${
              selectedIds.length === 0
                ? "bg-[#e7e2de] text-[#9a8f88]"
                : "bg-[#d9534f] text-white"
            }`}
          >
            {t("common.delete")}
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
            placeholder={t("common.search")}
          />
        </div>
      </div>

      {/* Table */}
      <EmbryoTransferTable
        locale={locale}
        direction={direction}
        rows={filtered}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
        onToggleSelectAll={toggleSelectAll}
        onEdit={openEditModal}
        onDelete={() => {}}
      />

      {/* Modal for add/edit */}
      <EmbryoTransferModal
        open={modalOpen}
        mode={modalMode}
        initialData={editingRow}
        onClose={() => {
          setModalOpen(false);
          setEditingRow(null);
        }}
        onSubmit={handleModalSubmit}
      />

      {/* Pagination (responsive placeholder similar to UI) */}
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

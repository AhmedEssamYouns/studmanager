"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/lib/locale-context";
import DeleteConfirmModal from "../common/DeleteConfirmModal";
import { NaturalModal } from "./modals/NaturalModal";
import { FreshModal } from "./modals/FreshModal";
import { FrozenModal } from "./modals/FrozenModal";
import { VetModal } from "./modals/VetModal";
import ReproductionRecordsTable, {
  type RecordItem,
} from "./ReproductionRecordsTable";
import { dummyByType, type StallionType } from "./stallions/dummy";
import { StallionProfileCard } from "./stallions/StallionProfileCard";
import { StallionToolbar } from "./stallions/StallionToolbar";

function tagToType(tag: string): StallionType {
  if (tag === "الطلوق الطبيعية" || tag === "Natural semen") return "natural";
  if (tag === "سائل منوي حديث" || tag === "Fresh semen") return "fresh";
  if (tag === "الطلوق المجمدة" || tag === "Frozen semen") return "frozen";
  return "vet";
}

export default function StallionsTab() {
  const { locale, direction } = useLocale();

  const [query, setQuery] = useState("");
  const tags = [
    locale === "ar" ? "الطلوق الطبيعية" : "Natural semen",
    locale === "ar" ? "سائل منوي حديث" : "Fresh semen",
    locale === "ar" ? "الطلوق المجمدة" : "Frozen semen",
    locale === "ar" ? "الفحص البيطري" : "Vet check",
  ];
  const [activeTag, setActiveTag] = useState<string>("الطلوق الطبيعية");
  const activeType = tagToType(activeTag);

  // table data per tab (dummy json)
  const [itemsByType, setItemsByType] = useState(dummyByType);

  // selection + delete states
  const [toDelete, setToDelete] = useState<RecordItem | null>(null);
  const [confirmingMultiple, setConfirmingMultiple] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // form modals
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [editingRow, setEditingRow] = useState<RecordItem | null>(null);

  const currentItems = itemsByType[activeType];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return currentItems;
    return currentItems.filter(
      (it) =>
        it.horse.toLowerCase().includes(q) ||
        (it.location || "").toLowerCase().includes(q) ||
        (it.results || "").toLowerCase().includes(q) ||
        (it.price || "").toLowerCase().includes(q),
    );
  }, [currentItems, query]);

  function toggleSelect(id: string) {
    setSelectedIds((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
    );
  }

  function toggleSelectAll() {
    if (selectedIds.length === filtered.length) setSelectedIds([]);
    else setSelectedIds(filtered.map((r) => r.id));
  }

  function handleTagChange(tag: string) {
    setActiveTag(tag);
    setSelectedIds([]);
    setToDelete(null);
    setConfirmingMultiple(false);
    setQuery("");
  }

  function confirmDeleteSingle() {
    if (!toDelete) return;
    setItemsByType((cur) => ({
      ...cur,
      [activeType]: cur[activeType].filter((i) => i.id !== toDelete.id),
    }));
    setSelectedIds((cur) => cur.filter((id) => id !== toDelete.id));
    setToDelete(null);
  }

  function confirmDeleteMultiple() {
    if (selectedIds.length === 0) {
      setConfirmingMultiple(false);
      return;
    }
    setItemsByType((cur) => ({
      ...cur,
      [activeType]: cur[activeType].filter((i) => !selectedIds.includes(i.id)),
    }));
    setSelectedIds([]);
    setConfirmingMultiple(false);
  }

  function handleAddClick() {
    setFormMode("add");
    setEditingRow(null);
    setFormOpen(true);
  }

  function handleEdit(row: RecordItem) {
    setFormMode("edit");
    setEditingRow(row);
    setFormOpen(true);
  }

  function handleFormSubmit(data: Partial<RecordItem>) {
    if (formMode === "add") {
      const newItem: RecordItem = {
        id: `${activeType}-${Date.now()}`,
        horse: data.horse || (locale === "ar" ? "فرس جديد" : "New Horse"),
        dob: data.dob || "",
        results: (data as any).results || "",
        location: data.location || "",
        price: data.price || "",
      };

      setItemsByType((cur) => ({
        ...cur,
        [activeType]: [newItem, ...cur[activeType]],
      }));
    } else if (formMode === "edit" && editingRow) {
      setItemsByType((cur) => ({
        ...cur,
        [activeType]: cur[activeType].map((r) =>
          r.id === editingRow.id ? { ...r, ...data } : r,
        ),
      }));
    }

    setFormOpen(false);
    setEditingRow(null);
  }

  const modalOpen = !!toDelete || confirmingMultiple;
  const modalTitle = toDelete
    ? locale === "ar"
      ? "حذف العنصر؟"
      : "Delete item?"
    : locale === "ar"
      ? "حذف العناصر المحددة؟"
      : "Delete selected items?";

  const modalDesc = toDelete
    ? locale === "ar"
      ? "لن تتمكن من استعادة السجل"
      : "You won't be able to recover this record."
    : locale === "ar"
      ? "لن تتمكن من استعادة السجلات"
      : "You won't be able to recover these records.";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <StallionProfileCard
            locale={locale}
            direction={direction}
            query={query}
            onQueryChange={setQuery}
          />

          <StallionToolbar
            locale={locale}
            direction={direction}
            tags={tags}
            activeTag={activeTag}
            selectedCount={selectedIds.length}
            onAdd={handleAddClick}
            onDeleteSelected={() => setConfirmingMultiple(true)}
            onTagChange={handleTagChange}
          />

          <ReproductionRecordsTable
            locale={locale}
            direction={direction}
            rows={filtered}
            selectedIds={selectedIds}
            onToggleSelect={toggleSelect}
            onToggleSelectAll={toggleSelectAll}
            onEdit={handleEdit}
            onDelete={(row) => setToDelete(row)}
          />
        </div>
      </div>

      <DeleteConfirmModal
        open={modalOpen}
        title={modalTitle}
        description={modalDesc}
        onCancel={() => {
          setToDelete(null);
          setConfirmingMultiple(false);
        }}
        onConfirm={() => {
          if (toDelete) confirmDeleteSingle();
          else confirmDeleteMultiple();
        }}
      />

      {/* Form modals */}
      {activeType === "natural" && (
        <NaturalModal
          open={formOpen}
          mode={formMode}
          initialData={editingRow || undefined}
          onClose={() => setFormOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}
      {activeType === "fresh" && (
        <FreshModal
          open={formOpen}
          mode={formMode}
          initialData={editingRow || undefined}
          onClose={() => setFormOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}
      {activeType === "frozen" && (
        <FrozenModal
          open={formOpen}
          mode={formMode}
          initialData={editingRow || undefined}
          onClose={() => setFormOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}
      {activeType === "vet" && (
        <VetModal
          open={formOpen}
          mode={formMode}
          initialData={editingRow || undefined}
          onClose={() => setFormOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}

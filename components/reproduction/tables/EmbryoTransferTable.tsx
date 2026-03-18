"use client";

import { Edit, Trash2 } from "lucide-react";

export type EmbryoTransferRow = {
  id: string;
  stallion: string; // الفحل
  futureMare: string; // الفرسة المانحة
  collectionDate: string; // تاريخ التجميع
  tankName: string; // الخزان
  type: string; // النوع
  forSale: string; // للبيع
  price: string; // السعر
  canister: number | string; // الحاوية (Canister)
  color: "red" | "green" | "yellow"; // اللون (dot)
};

type Props = {
  locale: string;
  direction: "rtl" | "ltr";
  rows: EmbryoTransferRow[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onEdit: (row: EmbryoTransferRow) => void;
  onDelete: (row: EmbryoTransferRow) => void;
};

export default function EmbryoTransferTable({
  locale,
  direction,
  rows,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onEdit,
  onDelete,
}: Props) {
  const isRTL = direction === "rtl";
  const allSelected = rows.length > 0 && selectedIds.length === rows.length;

  const headers =
    locale === "ar"
      ? {
          stallion: "الفحل",
          futureMare: "الفرسة المانحة",
          collectionDate: "تاريخ التجميع",
          tankName: "الخزان",
          type: "النوع",
          forSale: "للبيع",
          price: "السعر",
          canister: "الحاوية (Canister)",
          color: "اللون",
          actions: "الإجراءات",
        }
      : {
          stallion: "Stallion",
          futureMare: "Donor mare",
          collectionDate: "Collection date",
          tankName: "Tank",
          type: "Type",
          forSale: "For sale",
          price: "Price",
          canister: "Canister",
          color: "Color",
          actions: "Actions",
        };

  function dotClass(c: EmbryoTransferRow["color"]) {
    if (c === "green") return "bg-green-500";
    if (c === "yellow") return "bg-yellow-500";
    return "bg-red-500";
  }

  return (
    <div className="overflow-auto bg-white rounded-2xl shadow-sm mt-4 border border-[#f2ece7]">
      <table className="min-w-[980px] w-full">
        <thead>
          <tr className="text-sm text-white bg-[#4b2f1a] w-full">
            <th className={`py-3 px-3 ${isRTL ? "text-right" : "text-left"}`}>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onToggleSelectAll}
                aria-label="select all"
              />
            </th>

            <th className={`py-3 px-3 ${isRTL ? "text-right" : "text-left"}`}>
              {headers.stallion}
            </th>
            <th className={`py-3 px-3 ${isRTL ? "text-right" : "text-left"}`}>
              {headers.futureMare}
            </th>
            <th className={`py-3 px-3 ${isRTL ? "text-right" : "text-left"}`}>
              {headers.collectionDate}
            </th>
            <th className={`py-3 px-3 ${isRTL ? "text-right" : "text-left"}`}>
              {headers.tankName}
            </th>
            <th className={`py-3 px-3 ${isRTL ? "text-right" : "text-left"}`}>
              {headers.type}
            </th>
            <th className={`py-3 px-3 ${isRTL ? "text-right" : "text-left"}`}>
              {headers.forSale}
            </th>
            <th className={`py-3 px-3 ${isRTL ? "text-right" : "text-left"}`}>
              {headers.price}
            </th>
            <th className={`py-3 px-3 ${isRTL ? "text-right" : "text-left"}`}>
              {headers.canister}
            </th>
            <th className={`py-3 px-3 ${isRTL ? "text-right" : "text-left"}`}>
              {headers.color}
            </th>
            <th className={`py-3 px-3 ${isRTL ? "text-right" : "text-left"}`}>
              {headers.actions}
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t last:border-b bg-white">
              <td className="py-3 px-3">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(row.id)}
                  onChange={() => onToggleSelect(row.id)}
                  aria-label={`select-${row.id}`}
                />
              </td>

              <td className="py-3 px-3 text-sm text-[#2c2330]">
                {row.stallion}
              </td>
              <td className="py-3 px-3 text-sm text-[#2c2330]">
                {row.futureMare}
              </td>
              <td className="py-3 px-3 text-sm text-[#2c2330]">
                {row.collectionDate}
              </td>
              <td className="py-3 px-3 text-sm text-[#2c2330]">
                {row.tankName}
              </td>
              <td className="py-3 px-3 text-sm text-[#2c2330]">{row.type}</td>
              <td className="py-3 px-3 text-sm text-[#2c2330]">
                {row.forSale}
              </td>
              <td className="py-3 px-3 text-sm text-[#2c2330]">{row.price}</td>
              <td className="py-3 px-3 text-sm text-[#2c2330]">
                {row.canister}
              </td>

              <td className="py-3 px-3">
                <div className="flex items-center justify-center">
                  <span
                    className={`inline-block h-3 w-3 rounded-full ${dotClass(
                      row.color,
                    )}`}
                    aria-label={`color-${row.color}`}
                  />
                </div>
              </td>

              <td
                className={`py-3 px-3 flex gap-2 justify-end ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <button
                  className="p-2 rounded-lg bg-white border border-[#e8e2dd]"
                  aria-label="edit"
                  onClick={() => onEdit(row)}
                >
                  <Edit className="h-4 w-4 text-[#6b584f]" />
                </button>
                <button
                  className="p-2 rounded-lg bg-white border border-[#e8e2dd]"
                  aria-label="delete"
                  onClick={() => onDelete(row)}
                >
                  <Trash2 className="h-4 w-4 text-[#d9534f]" />
                </button>
              </td>
            </tr>
          ))}

          {rows.length === 0 && (
            <tr>
              <td
                colSpan={11}
                className="py-8 text-center text-sm text-[#7a6b63]"
              >
                {locale === "ar" ? "لا توجد سجلات" : "No records found"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

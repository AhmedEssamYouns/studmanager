"use client";

import { Edit, Trash2 } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

export type EmbryoTransferRow = {
  id: string;
  stallion: string;
  futureMare: string;
  collectionDate: string;
  tankName: string;
  type: string;
  forSale: string;
  price: string;
  canister: number | string;
  color: "red" | "green" | "yellow";
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
  const { t } = useLocale();
  const isRTL = direction === "rtl";
  const allSelected = rows.length > 0 && selectedIds.length === rows.length;

  const headers = {
    stallion: t("reproduction.tables.embryoTransfer.headers.stallion"),
    futureMare: t("reproduction.tables.embryoTransfer.headers.futureMare"),
    collectionDate: t(
      "reproduction.tables.embryoTransfer.headers.collectionDate",
    ),
    tankName: t("reproduction.tables.embryoTransfer.headers.tankName"),
    type: t("reproduction.tables.embryoTransfer.headers.type"),
    forSale: t("reproduction.tables.embryoTransfer.headers.forSale"),
    price: t("common.price"),
    canister: t("reproduction.tables.embryoTransfer.headers.canister"),
    color: t("reproduction.tables.embryoTransfer.headers.color"),
    actions: t("common.actions"),
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
                aria-label={t("common.selectAll")}
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
                  aria-label={`${t("common.select")}-${row.id}`}
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
                    className={`inline-block h-3 w-3 rounded-full ${dotClass(row.color)}`}
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
                  aria-label={t("common.edit")}
                  onClick={() => onEdit(row)}
                >
                  <Edit className="h-4 w-4 text-[#6b584f]" />
                </button>
                <button
                  className="p-2 rounded-lg bg-white border border-[#e8e2dd]"
                  aria-label={t("common.delete")}
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
                {t("common.noRecordsFound")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

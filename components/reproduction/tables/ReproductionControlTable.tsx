"use client";

import { Edit, Trash2 } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

export type ReproductionControlRow = {
  id: string;
  scheduled: string; // مجدول (نعم/لا)
  date: string; // التاريخ
  time: string; // الوقت
  examMethod: string; // طريقة الفحص
  doctor: string; // الطبيب
};

type Props = {
  locale: string;
  direction: "rtl" | "ltr";
  rows: ReproductionControlRow[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onEdit: (row: ReproductionControlRow) => void;
  onDelete: (row: ReproductionControlRow) => void;
};

export default function ReproductionControlTable({
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
    scheduled: t("reproduction.tables.control.headers.scheduled"),
    date: t("common.date"),
    time: t("common.time"),
    examMethod: t("reproduction.tables.control.headers.examMethod"),
    doctor: t("reproduction.tables.control.headers.doctor"),
    actions: t("common.actions"),
  };

  return (
    <div className="overflow-auto bg-white rounded-2xl shadow-sm mt-4 border border-[#f2ece7]">
      <table className="min-w-[860px] w-full">
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
              {headers.scheduled}
            </th>
            <th className={`py-3 px-3 ${isRTL ? "text-right" : "text-left"}`}>
              {headers.date}
            </th>
            <th className={`py-3 px-3 ${isRTL ? "text-right" : "text-left"}`}>
              {headers.time}
            </th>
            <th className={`py-3 px-3 ${isRTL ? "text-right" : "text-left"}`}>
              {headers.examMethod}
            </th>
            <th className={`py-3 px-3 ${isRTL ? "text-right" : "text-left"}`}>
              {headers.doctor}
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
                {row.scheduled}
              </td>
              <td className="py-3 px-3 text-sm text-[#2c2330]">{row.date}</td>
              <td className="py-3 px-3 text-sm text-[#2c2330]">{row.time}</td>
              <td className="py-3 px-3 text-sm text-[#2c2330]">
                {row.examMethod}
              </td>
              <td className="py-3 px-3 text-sm text-[#2c2330]">{row.doctor}</td>

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
                colSpan={7}
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

"use client";

import { Edit, Trash2 } from "lucide-react";

export type RecordItem = {
  id: string;
  horse: string;
  dob?: string;
  results?: string;
  price?: string;
  location?: string;
};

type Props = {
  locale: string;
  direction: "rtl" | "ltr";
  rows: RecordItem[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onEdit: (row: RecordItem) => void;
  onDelete: (row: RecordItem) => void;
};

export default function ReproductionRecordsTable({
  locale,
  direction,
  rows,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onEdit,
  onDelete,
}: Props) {
  const allSelected = rows.length > 0 && selectedIds.length === rows.length;

  return (
    <div className="overflow-auto bg-white rounded-xl shadow-sm mt-4">
      <table className="min-w-full">
        <thead>
          <tr className="text-sm text-left text-[white] bg-[#4b2f1a] w-full">
            <th className="py-3 px-3 text-start">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onToggleSelectAll}
                aria-label="select all"
              />
            </th>
            <th className="py-3 px-3 text-start">
              {locale === "ar" ? "الفرس المستقبلية" : "Future Horse"}
            </th>
            <th className="py-3 px-3 text-start">
              {locale === "ar" ? "التاريخ" : "Date"}
            </th>
            <th className="py-3 px-3 text-start">
              {locale === "ar" ? "النتائج الأولية" : "Results"}
            </th>
            <th className="py-3 px-3 text-start">
              {locale === "ar" ? "السعر" : "Price"}
            </th>
            <th className="py-3 px-3 text-start">
              {locale === "ar" ? "المكان" : "Location"}
            </th>
            <th className="py-3 px-3 text-start">
              {locale === "ar" ? "الإجراءات" : "Actions"}
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t last:border-b">
              <td className="py-3 px-3">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(row.id)}
                  onChange={() => onToggleSelect(row.id)}
                  aria-label={`select-${row.id}`}
                />
              </td>

              <td className="py-3 px-3 text-sm">{row.horse}</td>
              <td className="py-3 px-3 text-sm">{row.dob || ""}</td>
              <td className="py-3 px-3 text-sm">
                {row.results || (locale === "ar" ? "النتائج الأولية" : "—")}
              </td>
              <td className="py-3 px-3 text-sm">{row.price || ""}</td>
              <td className="py-3 px-3 text-sm">{row.location || ""}</td>

              <td
                className={`py-3 px-3 flex gap-2 justify-end ${
                  direction === "rtl" ? "flex-row-reverse" : ""
                }`}
              >
                <button
                  className="p-2 rounded-lg bg-white border"
                  aria-label="edit"
                  onClick={() => onEdit(row)}
                >
                  <Edit className="h-4 w-4 text-[#6b584f]" />
                </button>
                <button
                  onClick={() => onDelete(row)}
                  className="p-2 rounded-lg bg-white border text-red-600"
                  aria-label="delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}

          {rows.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="py-6 text-center text-sm text-[#7a6b63]"
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

"use client";

import { Edit, Trash2 } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

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
  const { t } = useLocale();
  const allSelected = rows.length > 0 && selectedIds.length === rows.length;
  const isRTL = direction === "rtl";

  return (
    <div className="mt-4">
      <div
        className="w-full max-w-full overflow-x-auto overflow-y-hidden rounded-xl bg-white shadow-sm overscroll-x-contain"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <table className="w-full min-w-[820px]">
          <thead>
            <tr className="text-sm text-white bg-[#4b2f1a]">
              <th className="py-3 px-3 text-start whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleSelectAll}
                  aria-label="select all"
                />
              </th>
              <th className="py-3 px-3 text-start whitespace-nowrap">
                {locale === "ar" ? "الفرس المستقبلية" : "Future Horse"}
              </th>
              <th className="py-3 px-3 text-start whitespace-nowrap">
                {t("performance.date")}
              </th>
              <th className="py-3 px-3 text-start whitespace-nowrap">
                {locale === "ar" ? "النتائج الأولية" : "Results"}
              </th>
              <th className="py-3 px-3 text-start whitespace-nowrap">
                {t("performance.cost")}
              </th>
              <th className="py-3 px-3 text-start whitespace-nowrap">
                {locale === "ar" ? "المكان" : "Location"}
              </th>
              <th className="py-3 px-3 text-start whitespace-nowrap">
                {t("common.actions")}
              </th>
            </tr>
          </thead>

          <tbody className={isRTL ? "text-right" : "text-left"}>
            {rows.map((row) => (
              <tr key={row.id} className="border-t last:border-b">
                <td className="py-3 px-3 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(row.id)}
                    onChange={() => onToggleSelect(row.id)}
                    aria-label={`select-${row.id}`}
                  />
                </td>

                <td className="py-3 px-3 text-sm whitespace-nowrap">
                  {row.horse}
                </td>
                <td className="py-3 px-3 text-sm whitespace-nowrap">
                  {row.dob || ""}
                </td>
                <td className="py-3 px-3 text-sm whitespace-nowrap">
                  {row.results || (locale === "ar" ? "النتائج الأولية" : "—")}
                </td>
                <td className="py-3 px-3 text-sm whitespace-nowrap">
                  {row.price || ""}
                </td>
                <td className="py-3 px-3 text-sm whitespace-nowrap">
                  {row.location || ""}
                </td>

                <td
                  className={`py-3 px-3 whitespace-nowrap ${isRTL ? "text-left" : "text-right"}`}
                >
                  <div
                    className={`flex gap-2 ${isRTL ? "justify-start flex-row-reverse" : "justify-end"}`}
                  >
                    <button
                      className="p-2 rounded-lg bg-white border"
                      aria-label={t("common.edit")}
                      onClick={() => onEdit(row)}
                    >
                      <Edit className="h-4 w-4 text-[#6b584f]" />
                    </button>
                    <button
                      onClick={() => onDelete(row)}
                      className="p-2 rounded-lg bg-white border text-red-600"
                      aria-label={t("common.delete")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="py-6 text-center text-sm text-[#7a6b63] whitespace-nowrap"
                >
                  {locale === "ar" ? "لا توجد سجلات" : "No records found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden mt-2 text-xs text-[#7a6b63]">
        {locale === "ar"
          ? "اسحب يمين/يسار لعرض الجدول بالكامل"
          : "Swipe left/right to view the full table"}
      </div>
    </div>
  );
}

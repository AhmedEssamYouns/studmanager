"use client";

import { useEffect, useMemo, useState } from "react";
import { FormModal } from "@/components/common/FormModal";
import { useLocale } from "@/lib/locale-context";
import type { RecordItem } from "@/components/reproduction/ReproductionRecordsTable";
import { ChevronDown } from "lucide-react";

type Props = {
  open: boolean;
  mode: "add" | "edit";
  initialData?: RecordItem | null;
  onClose: () => void;
  onSubmit: (data: RecordItem) => void;
};

export default function ReproductionRecordModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const { locale, direction } = useLocale();
  const isRTL = direction === "rtl";

  const stallionOptions = useMemo(
    () => [
      { value: "", label: "" },
      { value: "مداح مهنا", label: locale === "ar" ? "مداح مهنا" : "Maddah" },
      { value: "فحل ٢", label: locale === "ar" ? "فحل ٢" : "Stallion 2" },
    ],
    [locale],
  );

  const inseminationTypeOptions = useMemo(
    () => [
      { value: "", label: "" },
      { value: "طبيعي", label: locale === "ar" ? "طبيعي" : "Natural" },
      {
        value: "سائل منوي حديث",
        label: locale === "ar" ? "سائل منوي حديث" : "Fresh semen",
      },
      {
        value: "سائل منوي مجمد",
        label: locale === "ar" ? "سائل منوي مجمد" : "Frozen semen",
      },
    ],
    [locale],
  );

  const resultOptions = useMemo(
    () => [
      { value: "", label: "" },
      { value: "نجح", label: locale === "ar" ? "نجح" : "Success" },
      { value: "فشل", label: locale === "ar" ? "فشل" : "Failed" },
    ],
    [locale],
  );

  const [stallion, setStallion] = useState("");
  const [date, setDate] = useState("");
  const [inseminationType, setInseminationType] = useState("");
  const [result, setResult] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialData) {
      setStallion(initialData.horse || "");
      setDate(initialData.dob || "");
      setInseminationType(initialData.price || "");
      setResult(initialData.results || "");
      setNotes(initialData.location || "");
    } else {
      setStallion("");
      setDate("");
      setInseminationType("");
      setResult("");
      setNotes("");
    }
  }, [open, mode, initialData]);

  function submit(e: React.FormEvent) {
    e.preventDefault();

    const payload: RecordItem = {
      id: initialData?.id || String(Date.now()),
      horse: stallion,
      dob: date,
      price: inseminationType,
      results: result,
      location: notes,
    };

    onSubmit(payload);
  }

  const showDateLabel = !date;
  const showStallionLabel = !stallion;
  const showInseminationTypeLabel = !inseminationType;
  const showResultLabel = !result;
  const showNotesLabel = !notes;

  const fieldClass =
    "w-full h-16 rounded-2xl border-2 border-gray-300 bg-white px-6 focus:outline-none focus:ring-0";

  // Make select arrow ourselves
  const selectClass = `${fieldClass} pr-12 appearance-none`;

  // Hide native date indicators (WebKit) so no icon shows
  const dateInputClass =
    `${fieldClass} ` +
    "[&::-webkit-calendar-picker-indicator]:opacity-0 " +
    "[&::-webkit-calendar-picker-indicator]:hidden " +
    "[&::-webkit-calendar-picker-indicator]:cursor-pointer " +
    "[&::-webkit-inner-spin-button]:hidden " +
    "[&::-webkit-clear-button]:hidden";

  const arrowSideClass = isRTL ? "left-5" : "right-5";

  return (
    <FormModal
      isOpen={open}
      title={
        mode === "add"
          ? locale === "ar"
            ? "إضافة سجل جديد"
            : "Add record"
          : locale === "ar"
            ? "تعديل السجل"
            : "Edit record"
      }
      onClose={onClose}
      onSubmit={submit}
      submitText={locale === "ar" ? "حفظ" : "Save"}
      cancelText={locale === "ar" ? "إلغاء" : "Cancel"}
    >
      <div className={isRTL ? "text-right" : "text-left"}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* date (no icon) */}
          <div className="relative">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={dateInputClass}
              aria-label={locale === "ar" ? "التاريخ" : "Date"}
            />
            {showDateLabel && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${
                  isRTL ? "right-6" : "left-6"
                }`}
              >
                {locale === "ar" ? "التاريخ" : "Date"}
              </span>
            )}
          </div>

          {/* stallion name (with arrow icon) */}
          <div className="relative">
            <select
              value={stallion}
              onChange={(e) => setStallion(e.target.value)}
              className={selectClass}
              aria-label={locale === "ar" ? "اسم الفحل" : "Stallion name"}
            >
              {stallionOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            <ChevronDown
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${arrowSideClass} h-5 w-5 text-gray-600`}
            />

            {showStallionLabel && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${
                  isRTL ? "right-6" : "left-6"
                }`}
              >
                {locale === "ar" ? "اسم الفحل" : "Stallion name"}
              </span>
            )}
          </div>

          {/* result (with arrow icon) */}
          <div className="relative">
            <select
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className={selectClass}
              aria-label={locale === "ar" ? "النتيجة" : "Result"}
            >
              {resultOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            <ChevronDown
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${arrowSideClass} h-5 w-5 text-gray-600`}
            />

            {showResultLabel && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${
                  isRTL ? "right-6" : "left-6"
                }`}
              >
                {locale === "ar" ? "النتيجة" : "Result"}
              </span>
            )}
          </div>

          {/* insemination type (with arrow icon) */}
          <div className="relative">
            <select
              value={inseminationType}
              onChange={(e) => setInseminationType(e.target.value)}
              className={selectClass}
              aria-label={locale === "ar" ? "نوع التلقيح" : "Insemination type"}
            >
              {inseminationTypeOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            <ChevronDown
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${arrowSideClass} h-5 w-5 text-gray-600`}
            />

            {showInseminationTypeLabel && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${
                  isRTL ? "right-6" : "left-6"
                }`}
              >
                {locale === "ar" ? "نوع التلقيح" : "Insemination type"}
              </span>
            )}
          </div>
        </div>

        {/* notes (full width) */}
        <div className="mt-6 relative">
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={fieldClass}
            aria-label={locale === "ar" ? "ملاحظات" : "Notes"}
          />
          {showNotesLabel && (
            <span
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${
                isRTL ? "right-6" : "left-6"
              }`}
            >
              {locale === "ar" ? "ملاحظات" : "Notes"}
            </span>
          )}
        </div>
      </div>
    </FormModal>
  );
}

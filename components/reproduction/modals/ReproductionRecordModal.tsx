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
  const { locale, direction, t } = useLocale();
  const isRTL = direction === "rtl";

  const stallionOptions = useMemo(
    () => [
      { value: "", label: "" },
      {
        value: "مداح مهنا",
        label: t("reproduction.modals.record.stallionOpt1"),
      },
      { value: "فحل ٢", label: t("reproduction.modals.record.stallionOpt2") },
    ],
    [t],
  );

  const inseminationTypeOptions = useMemo(
    () => [
      { value: "", label: "" },
      {
        value: "طبيعي",
        label: t("reproduction.modals.record.insemination.natural"),
      },
      {
        value: "سائل منوي حديث",
        label: t("reproduction.modals.record.insemination.fresh"),
      },
      {
        value: "سائل منوي مجمد",
        label: t("reproduction.modals.record.insemination.frozen"),
      },
    ],
    [t],
  );

  const resultOptions = useMemo(
    () => [
      { value: "", label: "" },
      { value: "نجح", label: t("reproduction.modals.record.result.success") },
      { value: "فشل", label: t("reproduction.modals.record.result.failed") },
    ],
    [t],
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

  const show = {
    date: !date,
    stallion: !stallion,
    inseminationType: !inseminationType,
    result: !result,
    notes: !notes,
  };

  const fieldClass =
    "w-full h-16 rounded-2xl border-2 border-gray-300 bg-white px-6 focus:outline-none focus:ring-0";

  const selectClass = `${fieldClass} pr-12 appearance-none`;

  const dateInputClass =
    `${fieldClass} ` +
    "[&::-webkit-calendar-picker-indicator]:opacity-0 " +
    "[&::-webkit-calendar-picker-indicator]:hidden " +
    "[&::-webkit-calendar-picker-indicator]:cursor-pointer " +
    "[&::-webkit-inner-spin-button]:hidden " +
    "[&::-webkit-clear-button]:hidden";

  const arrowSideClass = isRTL ? "left-5" : "right-5";
  const labelSideClass = isRTL ? "right-6" : "left-6";

  return (
    <FormModal
      isOpen={open}
      title={mode === "add" ? t("common.addNewRecord") : t("common.editRecord")}
      onClose={onClose}
      onSubmit={submit}
      submitText={t("common.save")}
      cancelText={t("common.cancel")}
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
              aria-label={t("common.date")}
            />
            {show.date && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {t("common.date")}
              </span>
            )}
          </div>

          {/* stallion name */}
          <div className="relative">
            <select
              value={stallion}
              onChange={(e) => setStallion(e.target.value)}
              className={selectClass}
              aria-label={t("reproduction.modals.record.fields.stallionName")}
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

            {show.stallion && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {t("reproduction.modals.record.fields.stallionName")}
              </span>
            )}
          </div>

          {/* result */}
          <div className="relative">
            <select
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className={selectClass}
              aria-label={t("reproduction.modals.record.fields.result")}
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

            {show.result && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {t("reproduction.modals.record.fields.result")}
              </span>
            )}
          </div>

          {/* insemination type */}
          <div className="relative">
            <select
              value={inseminationType}
              onChange={(e) => setInseminationType(e.target.value)}
              className={selectClass}
              aria-label={t(
                "reproduction.modals.record.fields.inseminationType",
              )}
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

            {show.inseminationType && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {t("reproduction.modals.record.fields.inseminationType")}
              </span>
            )}
          </div>
        </div>

        {/* notes */}
        <div className="mt-6 relative">
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={fieldClass}
            aria-label={t("common.notes")}
          />
          {show.notes && (
            <span
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
            >
              {t("common.notes")}
            </span>
          )}
        </div>
      </div>
    </FormModal>
  );
}

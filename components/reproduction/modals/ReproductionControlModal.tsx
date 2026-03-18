"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { FormModal } from "@/components/common/FormModal";
import { ChevronDown } from "lucide-react";
import type { ReproductionControlRow } from "@/components/reproduction/tables/ReproductionControlTable";

type Props = {
  open: boolean;
  mode: "add" | "edit";
  initialData?: ReproductionControlRow | null;
  onClose: () => void;
  onSubmit: (data: ReproductionControlRow) => void;
};

export default function ReproductionControlModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const { locale, direction } = useLocale();
  const isRTL = direction === "rtl";

  // dropdown options (dummy)
  const examMethodOptions = useMemo(
    () => [
      { value: "", label: "" },
      {
        value: "طريقة الفحص",
        label: locale === "ar" ? "طريقة الفحص" : "Exam method",
      },
      { value: "سونار", label: locale === "ar" ? "سونار" : "Ultrasound" },
      {
        value: "فحص يدوي",
        label: locale === "ar" ? "فحص يدوي" : "Manual exam",
      },
    ],
    [locale],
  );

  const doctorOptions = useMemo(
    () => [
      { value: "", label: "" },
      {
        value: "محمد احمد",
        label: locale === "ar" ? "محمد احمد" : "Mohamed Ahmed",
      },
      { value: "د. أحمد", label: locale === "ar" ? "د. أحمد" : "Dr. Ahmed" },
    ],
    [locale],
  );

  const genitalServiceOptions = useMemo(
    () => [
      { value: "", label: "" },
      { value: "خدمة 1", label: locale === "ar" ? "خدمة 1" : "Service 1" },
      { value: "خدمة 2", label: locale === "ar" ? "خدمة 2" : "Service 2" },
    ],
    [locale],
  );

  // local state (matches screenshot fields; row gets mapped from these)
  const [date, setDate] = useState(""); // input type date
  const [time, setTime] = useState(""); // input type time
  const [examMethod, setExamMethod] = useState("");
  const [doctor, setDoctor] = useState("");

  const [lo, setLo] = useState("");
  const [ro, setRo] = useState("");
  const [uterus, setUterus] = useState("");
  const [vagina, setVagina] = useState("");
  const [cervix, setCervix] = useState("");
  const [edema, setEdema] = useState("");

  const [notes, setNotes] = useState("");
  const [genitalService, setGenitalService] = useState("");
  const [price, setPrice] = useState("");

  // scheduled exists in table row; keep it simple as نعم/لا
  const [scheduled, setScheduled] = useState<"نعم" | "لا">("نعم");

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialData) {
      // initialData only has scheduled/date/time/examMethod/doctor today.
      // We'll fill what we can, rest stays empty.
      setScheduled((initialData.scheduled as any) || "نعم");
      setExamMethod(initialData.examMethod || "");
      setDoctor(initialData.doctor || "");

      // If your row.date/time are not ISO, keep them as-is in inputs if possible.
      // These inputs require "YYYY-MM-DD" and "HH:MM" to show value.
      // We'll best-effort parse later when you store ISO; for now:
      setDate("");
      setTime("");

      setLo("");
      setRo("");
      setUterus("");
      setVagina("");
      setCervix("");
      setEdema("");
      setNotes("");
      setGenitalService("");
      setPrice("");
    } else {
      setScheduled("نعم");
      setDate("");
      setTime("");
      setExamMethod("");
      setDoctor("");
      setLo("");
      setRo("");
      setUterus("");
      setVagina("");
      setCervix("");
      setEdema("");
      setNotes("");
      setGenitalService("");
      setPrice("");
    }
  }, [open, mode, initialData]);

  function submit(e: React.FormEvent) {
    e.preventDefault();

    // Map modal fields back to the table row shape you currently have.
    // Keep date/time as readable strings if inputs are empty.
    const payload: ReproductionControlRow = {
      id: initialData?.id || String(Date.now()),
      scheduled,
      date: date
        ? date
        : initialData?.date ||
          (locale === "ar" ? "6 مايو 2025" : "May 6, 2025"),
      time: time
        ? time
        : initialData?.time || (locale === "ar" ? "10 صباحا" : "10 AM"),
      examMethod,
      doctor,
    };

    onSubmit(payload);
  }

  const fieldClass =
    "w-full h-16 rounded-2xl border-2 border-gray-300 bg-white px-6 focus:outline-none focus:ring-0";
  const selectClass = `${fieldClass} pr-12 appearance-none`;

  const dateInputClass =
    `${fieldClass} ` +
    "[&::-webkit-calendar-picker-indicator]:opacity-0 " +
    "[&::-webkit-calendar-picker-indicator]:hidden " +
    "[&::-webkit-inner-spin-button]:hidden " +
    "[&::-webkit-clear-button]:hidden";

  const timeInputClass =
    `${fieldClass} ` +
    "[&::-webkit-calendar-picker-indicator]:opacity-0 " +
    "[&::-webkit-calendar-picker-indicator]:hidden";

  const arrowSideClass = isRTL ? "left-5" : "right-5";
  const labelSideClass = isRTL ? "right-6" : "left-6";

  const show = {
    date: !date,
    time: !time,
    examMethod: !examMethod,
    doctor: !doctor,
    lo: !lo,
    ro: !ro,
    vagina: !vagina,
    uterus: !uterus,
    edema: !edema,
    cervix: !cervix,
    notes: !notes,
    genitalService: !genitalService,
    price: !price,
  };

  return (
    <FormModal
      isOpen={open}
      title={
        mode === "add"
          ? locale === "ar"
            ? "إضافة سجل جديد"
            : "Add new record"
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
        {/* Row 1: time + date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="relative">
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={timeInputClass}
              aria-label={locale === "ar" ? "الوقت" : "Time"}
            />
            {show.time && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {locale === "ar" ? "الوقت" : "Time"}
              </span>
            )}
          </div>

          <div className="relative">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={dateInputClass}
              aria-label={locale === "ar" ? "التاريخ" : "Date"}
            />
            {show.date && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {locale === "ar" ? "التاريخ" : "Date"}
              </span>
            )}
          </div>

          {/* Row 2: doctor + exam method */}
          <div className="relative">
            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className={selectClass}
              aria-label={locale === "ar" ? "الطبيب البيطري" : "Veterinarian"}
            >
              {doctorOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${arrowSideClass} h-5 w-5 text-gray-600`}
            />
            {show.doctor && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {locale === "ar" ? "الطبيب البيطري" : "Veterinarian"}
              </span>
            )}
          </div>

          <div className="relative">
            <select
              value={examMethod}
              onChange={(e) => setExamMethod(e.target.value)}
              className={selectClass}
              aria-label={locale === "ar" ? "طريقة الفحص" : "Exam method"}
            >
              {examMethodOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${arrowSideClass} h-5 w-5 text-gray-600`}
            />
            {show.examMethod && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {locale === "ar" ? "طريقة الفحص" : "Exam method"}
              </span>
            )}
          </div>

          {/* Row 3: LO/RO */}
          <div className="relative">
            <input
              value={lo}
              onChange={(e) => setLo(e.target.value)}
              className={fieldClass}
              aria-label="LO"
            />
            {show.lo && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                LO
              </span>
            )}
          </div>

          <div className="relative">
            <input
              value={ro}
              onChange={(e) => setRo(e.target.value)}
              className={fieldClass}
              aria-label="RO"
            />
            {show.ro && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                RO
              </span>
            )}
          </div>

          {/* Row 4: Uterus / Vagina */}
          <div className="relative">
            <input
              value={uterus}
              onChange={(e) => setUterus(e.target.value)}
              className={fieldClass}
              aria-label={locale === "ar" ? "الرحم (Uterus)" : "Uterus"}
            />
            {show.uterus && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {locale === "ar" ? "الرحم (Uterus)" : "Uterus"}
              </span>
            )}
          </div>

          <div className="relative">
            <input
              value={vagina}
              onChange={(e) => setVagina(e.target.value)}
              className={fieldClass}
              aria-label={locale === "ar" ? "المهبل (Vagina)" : "Vagina"}
            />
            {show.vagina && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {locale === "ar" ? "المهبل (Vagina)" : "Vagina"}
              </span>
            )}
          </div>

          {/* Row 5: Edema / Cervix */}
          <div className="relative">
            <input
              value={edema}
              onChange={(e) => setEdema(e.target.value)}
              className={fieldClass}
              aria-label={locale === "ar" ? "الوذمة (Edema)" : "Edema"}
            />
            {show.edema && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {locale === "ar" ? "الوذمة (Edema)" : "Edema"}
              </span>
            )}
          </div>

          <div className="relative">
            <input
              value={cervix}
              onChange={(e) => setCervix(e.target.value)}
              className={fieldClass}
              aria-label={locale === "ar" ? "عنق الرحم (Cervix)" : "Cervix"}
            />
            {show.cervix && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {locale === "ar" ? "عنق الرحم (Cervix)" : "Cervix"}
              </span>
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="mt-6 relative">
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={fieldClass}
            aria-label={locale === "ar" ? "ملاحظات" : "Notes"}
          />
          {show.notes && (
            <span
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
            >
              {locale === "ar" ? "ملاحظات" : "Notes"}
            </span>
          )}
        </div>

        {/* Genital service select + help text */}
        <div className="mt-6 relative">
          <select
            value={genitalService}
            onChange={(e) => setGenitalService(e.target.value)}
            className={selectClass}
            aria-label={
              locale === "ar" ? "اختر خدمة تناسلية" : "Choose genital service"
            }
          >
            {genitalServiceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${arrowSideClass} h-5 w-5 text-gray-600`}
          />
          {show.genitalService && (
            <span
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
            >
              {locale === "ar" ? "اختر خدمة تناسلية" : "Choose genital service"}
            </span>
          )}

          <div
            className={`mt-2 text-xs text-gray-500 ${isRTL ? "text-right" : "text-left"}`}
          >
            {locale === "ar"
              ? "(ملاحظة: يرجى اختيار خدمة تناسلية لتحديد فحص الحمل بشكل صحيح)"
              : "(Note: please choose a genital service to determine pregnancy check correctly)"}
          </div>
        </div>

        {/* Price */}
        <div className="mt-6 relative">
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={fieldClass}
            aria-label={locale === "ar" ? "السعر" : "Price"}
          />
          {show.price && (
            <span
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
            >
              {locale === "ar" ? "السعر" : "Price"}
            </span>
          )}
        </div>
      </div>
    </FormModal>
  );
}

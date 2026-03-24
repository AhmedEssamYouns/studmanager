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
  const { locale, direction, t } = useLocale();
  const isRTL = direction === "rtl";

  const examMethodOptions = useMemo(
    () => [
      { value: "", label: "" },
      {
        value: "طريقة الفحص",
        label: t("reproduction.modals.control.examMethod.opt1"),
      },
      {
        value: "سونار",
        label: t("reproduction.modals.control.examMethod.ultrasound"),
      },
      {
        value: "فحص يدوي",
        label: t("reproduction.modals.control.examMethod.manual"),
      },
    ],
    [t],
  );

  const doctorOptions = useMemo(
    () => [
      { value: "", label: "" },
      {
        value: "محمد احمد",
        label: t("reproduction.modals.control.doctor.opt1"),
      },
      { value: "د. أحمد", label: t("reproduction.modals.control.doctor.opt2") },
    ],
    [t],
  );

  const genitalServiceOptions = useMemo(
    () => [
      { value: "", label: "" },
      {
        value: "خدمة 1",
        label: t("reproduction.modals.control.genitalService.service1"),
      },
      {
        value: "خدمة 2",
        label: t("reproduction.modals.control.genitalService.service2"),
      },
    ],
    [t],
  );

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
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

  const [scheduled, setScheduled] = useState<"نعم" | "لا">("نعم");

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialData) {
      setScheduled((initialData.scheduled as any) || "نعم");
      setExamMethod(initialData.examMethod || "");
      setDoctor(initialData.doctor || "");

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
      title={mode === "add" ? t("common.addNewRecord") : t("common.editRecord")}
      onClose={onClose}
      onSubmit={submit}
      submitText={t("common.save")}
      cancelText={t("common.cancel")}
    >
      <div className={isRTL ? "text-right" : "text-left"}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="relative">
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={timeInputClass}
              aria-label={t("common.time")}
            />
            {show.time && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {t("common.time")}
              </span>
            )}
          </div>

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

          <div className="relative">
            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className={selectClass}
              aria-label={t("reproduction.modals.control.fields.veterinarian")}
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
                {t("reproduction.modals.control.fields.veterinarian")}
              </span>
            )}
          </div>

          <div className="relative">
            <select
              value={examMethod}
              onChange={(e) => setExamMethod(e.target.value)}
              className={selectClass}
              aria-label={t("reproduction.modals.control.fields.examMethod")}
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
                {t("reproduction.modals.control.fields.examMethod")}
              </span>
            )}
          </div>

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

          <div className="relative">
            <input
              value={uterus}
              onChange={(e) => setUterus(e.target.value)}
              className={fieldClass}
              aria-label={t("reproduction.modals.control.fields.uterus")}
            />
            {show.uterus && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {t("reproduction.modals.control.fields.uterus")}
              </span>
            )}
          </div>

          <div className="relative">
            <input
              value={vagina}
              onChange={(e) => setVagina(e.target.value)}
              className={fieldClass}
              aria-label={t("reproduction.modals.control.fields.vagina")}
            />
            {show.vagina && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {t("reproduction.modals.control.fields.vagina")}
              </span>
            )}
          </div>

          <div className="relative">
            <input
              value={edema}
              onChange={(e) => setEdema(e.target.value)}
              className={fieldClass}
              aria-label={t("reproduction.modals.control.fields.edema")}
            />
            {show.edema && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {t("reproduction.modals.control.fields.edema")}
              </span>
            )}
          </div>

          <div className="relative">
            <input
              value={cervix}
              onChange={(e) => setCervix(e.target.value)}
              className={fieldClass}
              aria-label={t("reproduction.modals.control.fields.cervix")}
            />
            {show.cervix && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {t("reproduction.modals.control.fields.cervix")}
              </span>
            )}
          </div>
        </div>

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

        <div className="mt-6 relative">
          <select
            value={genitalService}
            onChange={(e) => setGenitalService(e.target.value)}
            className={selectClass}
            aria-label={t("reproduction.modals.control.fields.genitalService")}
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
              {t("reproduction.modals.control.fields.genitalService")}
            </span>
          )}

          <div
            className={`mt-2 text-xs text-gray-500 ${isRTL ? "text-right" : "text-left"}`}
          >
            {t("reproduction.modals.control.genitalServiceHint")}
          </div>
        </div>

        <div className="mt-6 relative">
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={fieldClass}
            aria-label={t("common.price")}
          />
          {show.price && (
            <span
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
            >
              {t("common.price")}
            </span>
          )}
        </div>
      </div>
    </FormModal>
  );
}

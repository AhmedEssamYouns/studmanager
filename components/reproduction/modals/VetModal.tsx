"use client";

import { useEffect, useState } from "react";
import { FormModal } from "@/components/common/FormModal";
import { useLocale } from "@/lib/locale-context";
import { ImageUpload } from "@/components/common/ImageUpload";

import { FiCalendar, FiChevronDown, FiMapPin } from "react-icons/fi";
import { HiOutlineBanknotes } from "react-icons/hi2";

interface Props {
  open: boolean;
  mode: "add" | "edit";
  initialData?: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function VetModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const { locale, direction } = useLocale();
  const isRTL = direction === "rtl";

  const [doctor, setDoctor] = useState("");
  const [examType, setExamType] = useState("");
  const [result, setResult] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [isPositive, setIsPositive] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | undefined>(undefined);

  // options (replace with real data)
  const doctorOptions = [
    { value: "", label: locale === "ar" ? "" : "" },
    { value: "d-1", label: locale === "ar" ? "طبيب ١" : "Doctor 1" },
    { value: "d-2", label: locale === "ar" ? "طبيب ٢" : "Doctor 2" },
  ];
  const examTypeOptions = [
    { value: "", label: locale === "ar" ? "" : "" },
    { value: "blood", label: locale === "ar" ? "تحليل دم" : "Blood test" },
    { value: "ultra", label: locale === "ar" ? "سونار" : "Ultrasound" },
  ];

  useEffect(() => {
    if (initialData) {
      setDoctor(initialData.doctor || "");
      setExamType(initialData.examType || "");
      setResult(initialData.result || "");
      setDate(initialData.dob || "");
      setPrice(initialData.price || "");
      setLocation(initialData.location || "");
      setIsPositive(initialData.isPositive ?? null);
      setFilePreview(initialData._preview);
    } else {
      setDoctor("");
      setExamType("");
      setResult("");
      setDate("");
      setPrice("");
      setLocation("");
      setIsPositive(null);
      setFile(null);
      setFilePreview(undefined);
    }
  }, [initialData, open]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      doctor,
      examType,
      result,
      dob: date,
      price,
      location,
      isPositive,
      file,
      _preview: filePreview,
    });
  }

  // inside labels only when empty
  const showDoctorLabel = !doctor;
  const showExamTypeLabel = !examType;
  const showResultLabel = !result;
  const showDateLabel = !date;
  const showPriceLabel = !price;
  const showLocationLabel = !location;

  const fieldClass =
    "w-full h-16 rounded-2xl border-2 border-gray-300 bg-white px-6 focus:outline-none focus:ring-0";

  return (
    <FormModal
      isOpen={open}
      title={
        mode === "add"
          ? locale === "ar"
            ? "الفحص البيطري"
            : "Vet check"
          : locale === "ar"
            ? "تعديل"
            : "Edit"
      }
      onClose={onClose}
      onSubmit={submit}
      submitText={locale === "ar" ? "حفظ" : "Save"}
      cancelText={locale === "ar" ? "إلغاء" : "Cancel"}
    >
      <div className={isRTL ? "text-right" : "text-left"}>
        {/* layout as screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* row 1 left: التاريخ */}
          <div className="relative">
            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gray-600">
              <FiCalendar size={22} />
            </span>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`${fieldClass} pl-14`}
              aria-label={locale === "ar" ? "التاريخ" : "Date"}
            />

            {showDateLabel && (
              <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-base text-gray-700">
                {locale === "ar" ? "التاريخ" : "Date"}
              </span>
            )}

            {/* hide native date icon */}
            <style jsx>{`
              input[type="date"]::-webkit-calendar-picker-indicator {
                opacity: 0;
                display: none;
                -webkit-appearance: none;
              }
              input[type="date"]::-webkit-inner-spin-button {
                display: none;
                -webkit-appearance: none;
              }
              input[type="date"]::-webkit-clear-button {
                display: none;
                -webkit-appearance: none;
              }
            `}</style>
          </div>

          {/* row 1 right: الطبيب (select) */}
          <div className="relative">
            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className={`${fieldClass} pr-16 appearance-none`}
              aria-label={locale === "ar" ? "الطبيب" : "Doctor"}
            >
              {doctorOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <span className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-gray-700">
              <FiChevronDown size={22} />
            </span>

            {showDoctorLabel && (
              <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-base text-gray-700">
                {locale === "ar" ? "الطبيب" : "Doctor"}
              </span>
            )}
          </div>

          {/* row 2 left: نتيجة الفحص */}
          <div className="relative">
            <input
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className={fieldClass}
              aria-label={locale === "ar" ? "نتيجة الفحص" : "Exam result"}
            />

            {showResultLabel && (
              <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-base text-gray-400">
                {locale === "ar" ? "نتيجة الفحص" : "Exam result"}
              </span>
            )}
          </div>

          {/* row 2 right: نوع الفحص (select) */}
          <div className="relative">
            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className={`${fieldClass} pr-16 appearance-none`}
              aria-label={locale === "ar" ? "نوع الفحص" : "Exam type"}
            >
              {examTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <span className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-gray-700">
              <FiChevronDown size={22} />
            </span>

            {showExamTypeLabel && (
              <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-base text-gray-700">
                {locale === "ar" ? "نوع الفحص" : "Exam type"}
              </span>
            )}
          </div>

          {/* row 3 left: المكان */}
          <div className="relative">
            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gray-700">
              <FiMapPin size={22} />
            </span>

            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`${fieldClass} pl-14`}
              aria-label={locale === "ar" ? "المكان" : "Location"}
            />

            {showLocationLabel && (
              <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-base text-gray-700">
                {locale === "ar" ? "المكان" : "Location"}
              </span>
            )}
          </div>

          {/* row 3 right: السعر */}
          <div className="relative">
            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gray-600">
              <HiOutlineBanknotes size={24} />
            </span>

            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`${fieldClass} pl-14`}
              aria-label={locale === "ar" ? "السعر" : "Price"}
            />

            {showPriceLabel && (
              <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-base text-gray-700">
                {locale === "ar" ? "السعر" : "Price"}
              </span>
            )}
          </div>
        </div>

        {/* radio row (under fields, aligned to the right in RTL like screenshot) */}
        <div className="mt-8 flex items-center justify-start gap-8">
          <div className="text-base text-gray-700 text-start">
            {locale === "ar" ? "هل هو إيجابي؟" : "Is it positive?"}
          </div>

          <label className="inline-flex items-center gap-3">
            <input
              type="radio"
              name="positive"
              checked={isPositive === "yes"}
              onChange={() => setIsPositive("yes")}
              className="h-5 w-5"
            />
            <span className="text-base">{locale === "ar" ? "نعم" : "Yes"}</span>
          </label>

          <label className="inline-flex items-center gap-3">
            <input
              type="radio"
              name="positive"
              checked={isPositive === "no"}
              onChange={() => setIsPositive("no")}
              className="h-5 w-5"
            />
            <span className="text-base">{locale === "ar" ? "لا" : "No"}</span>
          </label>
        </div>
      </div>
      {/* upload row (right aligned like screenshot) */}
      {/* <div className="mt-8 flex justify-end"> */}
      <div className="w-full">
        <ImageUpload
          previewImage={filePreview}
          onImageSelected={(f, preview) => {
            setFile(f);
            setFilePreview(preview);
          }}
          label={locale === "ar" ? "اختر ملف" : "Choose file"}
        />
      </div>
      {/* </div> */}
    </FormModal>
  );
}

"use client";

import { useEffect, useState } from "react";
import { FormModal } from "@/components/common/FormModal";
import { useLocale } from "@/lib/locale-context";

import { FiCalendar, FiChevronDown, FiMapPin } from "react-icons/fi";
import { HiOutlineBanknotes } from "react-icons/hi2";

interface Props {
  open: boolean;
  mode: "add" | "edit";
  initialData?: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function FrozenModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const { locale, direction } = useLocale();
  const isRTL = direction === "rtl";

  const [horse, setHorse] = useState("");
  const [executor, setExecutor] = useState("");
  const [results, setResults] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [qty, setQty] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | undefined>(undefined);

  // options (replace with real data)
  const horseOptions = [
    { value: "", label: locale === "ar" ? "" : "" },
    { value: "h-a", label: locale === "ar" ? "فرس أ" : "Horse A" },
    { value: "h-b", label: locale === "ar" ? "فرس ب" : "Horse B" },
  ];
  const executorOptions = [
    { value: "", label: locale === "ar" ? "" : "" },
    { value: "e-a", label: locale === "ar" ? "منفذ ١" : "Executor 1" },
    { value: "e-b", label: locale === "ar" ? "منفذ ٢" : "Executor 2" },
  ];

  useEffect(() => {
    if (initialData) {
      setHorse(initialData.horse || "");
      setExecutor(initialData.executor || "");
      setResults(initialData.results || "");
      setDate(initialData.dob || "");
      setPrice(initialData.price || "");
      setLocation(initialData.location || "");
      setQty(initialData.qty || "");
      setFilePreview(initialData._preview);
    } else {
      setHorse("");
      setExecutor("");
      setResults("");
      setDate("");
      setPrice("");
      setLocation("");
      setQty("");
      setFile(null);
      setFilePreview(undefined);
    }
  }, [initialData, open]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      horse,
      executor,
      results,
      dob: date,
      price,
      location,
      qty,
      file,
      _preview: filePreview,
    });
  }

  // inside labels only when empty
  const showHorseLabel = !horse;
  const showExecutorLabel = !executor;
  const showResultsLabel = !results;
  const showDateLabel = !date;
  const showPriceLabel = !price;
  const showLocationLabel = !location;
  const showQtyLabel = !qty;

  const fieldClass =
    "w-full h-16 rounded-2xl border-2 border-gray-300 bg-white px-6 focus:outline-none focus:ring-0";

  return (
    <FormModal
      isOpen={open}
      title={
        mode === "add"
          ? locale === "ar"
            ? "إضافة طلوق مجمدة"
            : "Add frozen semen"
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
        {/* exact layout as screenshot */}
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

          {/* row 1 right: الفرسة المستقبلية (select) */}
          <div className="relative">
            <select
              value={horse}
              onChange={(e) => setHorse(e.target.value)}
              className={`${fieldClass} pr-16 appearance-none`}
              aria-label={locale === "ar" ? "الفرسة المستقبلية" : "Future mare"}
            >
              {horseOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <span className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-gray-700">
              <FiChevronDown size={22} />
            </span>

            {showHorseLabel && (
              <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-base text-gray-700">
                {locale === "ar" ? "الفرسة المستقبلية" : "Future mare"}
              </span>
            )}
          </div>

          {/* row 2 left: النتائج الأولية */}
          <div className="relative">
            <input
              value={results}
              onChange={(e) => setResults(e.target.value)}
              className={fieldClass}
              aria-label={
                locale === "ar" ? "النتائج الأولية" : "Initial results"
              }
            />

            {showResultsLabel && (
              <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-base text-gray-400">
                {locale === "ar" ? "النتائج الأولية" : "Initial results"}
              </span>
            )}
          </div>

          {/* row 2 right: المنفذ (select) */}
          <div className="relative">
            <select
              value={executor}
              onChange={(e) => setExecutor(e.target.value)}
              className={`${fieldClass} pr-16 appearance-none`}
              aria-label={locale === "ar" ? "المنفذ" : "Executor"}
            >
              {executorOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <span className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-gray-700">
              <FiChevronDown size={22} />
            </span>

            {showExecutorLabel && (
              <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-base text-gray-700">
                {locale === "ar" ? "المنفذ" : "Executor"}
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

          {/* row 4 full width: الكمية / مل (select with chevron) */}
          <div className="relative sm:col-span-2">
            <select
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className={`${fieldClass} pr-16 appearance-none`}
              aria-label={locale === "ar" ? "الكمية / مل" : "Quantity / ml"}
            >
              {/* keep empty option so inside label shows */}
              <option value="">{locale === "ar" ? "" : ""}</option>
              <option value="5">5 ml</option>
              <option value="10">10 ml</option>
              <option value="15">15 ml</option>
              <option value="20">20 ml</option>
            </select>

            <span className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-gray-700">
              <FiChevronDown size={22} />
            </span>

            {showQtyLabel && (
              <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-base text-gray-700">
                {locale === "ar" ? "الكمية / مل" : "Quantity / ml"}
              </span>
            )}
          </div>
        </div>
      </div>
    </FormModal>
  );
}

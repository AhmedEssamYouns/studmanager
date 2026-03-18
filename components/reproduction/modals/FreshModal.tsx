"use client";

import { useEffect, useMemo, useState } from "react";
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

export function FreshModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const { direction, t } = useLocale();
  const isRTL = direction === "rtl";

  const [horse, setHorse] = useState("");
  const [executor, setExecutor] = useState("");
  const [results, setResults] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | undefined>(undefined);

  const horseOptions = useMemo(
    () => [
      { value: "", label: "" },
      { value: "h-a", label: t("reproduction.modals.shared.horse.optA") },
      { value: "h-b", label: t("reproduction.modals.shared.horse.optB") },
    ],
    [t],
  );

  const executorOptions = useMemo(
    () => [
      { value: "", label: "" },
      { value: "e-a", label: t("reproduction.modals.shared.executor.opt1") },
      { value: "e-b", label: t("reproduction.modals.shared.executor.opt2") },
    ],
    [t],
  );

  useEffect(() => {
    if (initialData) {
      setHorse(initialData.horse || "");
      setExecutor(initialData.executor || "");
      setResults(initialData.results || "");
      setDate(initialData.dob || "");
      setPrice(initialData.price || "");
      setLocation(initialData.location || "");
      setFilePreview(initialData._preview);
    } else {
      setHorse("");
      setExecutor("");
      setResults("");
      setDate("");
      setPrice("");
      setLocation("");
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
      file,
      _preview: filePreview,
    });
  }

  const showHorseLabel = !horse;
  const showExecutorLabel = !executor;
  const showResultsLabel = !results;
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
          ? t("reproduction.modals.fresh.titleAdd")
          : t("reproduction.modals.fresh.titleEdit")
      }
      onClose={onClose}
      onSubmit={submit}
      submitText={t("common.save")}
      cancelText={t("common.cancel")}
    >
      <div className={isRTL ? "text-right" : "text-left"}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="relative">
            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gray-600">
              <FiCalendar size={22} />
            </span>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`${fieldClass} pl-14`}
              aria-label={t("common.date")}
            />

            {showDateLabel && (
              <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-base text-gray-700">
                {t("common.date")}
              </span>
            )}

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

          <div className="relative">
            <select
              value={horse}
              onChange={(e) => setHorse(e.target.value)}
              className={`${fieldClass} pr-16 appearance-none`}
              aria-label={t("reproduction.modals.fresh.fields.futureMare")}
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
                {t("reproduction.modals.fresh.fields.futureMare")}
              </span>
            )}
          </div>

          <div className="relative">
            <input
              value={results}
              onChange={(e) => setResults(e.target.value)}
              className={fieldClass}
              aria-label={t("reproduction.modals.shared.fields.initialResults")}
            />

            {showResultsLabel && (
              <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-base text-gray-400">
                {t("reproduction.modals.shared.fields.initialResults")}
              </span>
            )}
          </div>

          <div className="relative">
            <select
              value={executor}
              onChange={(e) => setExecutor(e.target.value)}
              className={`${fieldClass} pr-16 appearance-none`}
              aria-label={t("reproduction.modals.shared.fields.executor")}
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
                {t("reproduction.modals.shared.fields.executor")}
              </span>
            )}
          </div>

          <div className="relative">
            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gray-700">
              <FiMapPin size={22} />
            </span>

            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`${fieldClass} pl-14`}
              aria-label={t("common.location")}
            />

            {showLocationLabel && (
              <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-base text-gray-700">
                {t("common.location")}
              </span>
            )}
          </div>

          <div className="relative">
            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gray-600">
              <HiOutlineBanknotes size={24} />
            </span>

            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`${fieldClass} pl-14`}
              aria-label={t("common.price")}
            />

            {showPriceLabel && (
              <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-base text-gray-700">
                {t("common.price")}
              </span>
            )}
          </div>
        </div>
      </div>
    </FormModal>
  );
}

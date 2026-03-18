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

export function NaturalModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const { direction, t } = useLocale();
  const isRTL = direction === "rtl";

  const [selectedHorse, setSelectedHorse] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | undefined>(undefined);

  const horseOptions = useMemo(
    () => [
      { value: "", label: t("reproduction.modals.natural.horse.select") },
      { value: "frs-a", label: t("reproduction.modals.natural.horse.optA") },
      { value: "frs-b", label: t("reproduction.modals.natural.horse.optB") },
      { value: "frs-c", label: t("reproduction.modals.natural.horse.optC") },
    ],
    [t],
  );

  useEffect(() => {
    if (initialData) {
      setSelectedHorse(initialData.horse || "");
      setDate(initialData.dob || "");
      setResults(initialData.results || "");
      setPrice(initialData.price || "");
      setLocation(initialData.location || "");
      setFilePreview(initialData._preview);
    } else {
      setSelectedHorse("");
      setDate("");
      setResults("");
      setPrice("");
      setLocation("");
      setFile(null);
      setFilePreview(undefined);
    }
  }, [initialData, open]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      horse: selectedHorse,
      dob: date,
      results,
      price,
      location,
      file,
      _preview: filePreview,
    });
  }

  const showDateLabel = !date;
  const showHorseLabel = !selectedHorse;
  const showPriceLabel = !price;
  const showResultsLabel = !results;
  const showLocationLabel = !location;

  return (
    <FormModal
      isOpen={open}
      title={
        mode === "add"
          ? t("reproduction.modals.natural.titleAdd")
          : t("reproduction.modals.natural.titleEdit")
      }
      onClose={onClose}
      onSubmit={submit}
      submitText={t("common.save")}
      cancelText={t("common.cancel")}
    >
      <div className={isRTL ? "text-right" : "text-left"}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* date */}
          <div className="relative">
            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gray-600">
              <FiCalendar size={22} />
            </span>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-16 rounded-2xl border-2 border-gray-300 bg-white px-6 pl-14 focus:outline-none focus:ring-0"
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

          {/* future mare */}
          <div className="relative">
            <select
              value={selectedHorse}
              onChange={(e) => setSelectedHorse(e.target.value)}
              className="w-full h-16 rounded-2xl border-2 border-gray-300 bg-white px-6 pr-16 appearance-none focus:outline-none focus:ring-0"
              aria-label={t("reproduction.modals.natural.fields.futureMare")}
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
                {t("reproduction.modals.natural.fields.futureMare")}
              </span>
            )}
          </div>

          {/* price */}
          <div className="relative">
            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gray-600">
              <HiOutlineBanknotes size={24} />
            </span>

            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-16 rounded-2xl border-2 border-gray-300 bg-white px-6 pl-14 focus:outline-none focus:ring-0"
              aria-label={t("common.price")}
            />

            {showPriceLabel && (
              <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-base text-gray-700">
                {t("common.price")}
              </span>
            )}
          </div>

          {/* initial results */}
          <div className="relative">
            <input
              value={results}
              onChange={(e) => setResults(e.target.value)}
              className="w-full h-16 rounded-2xl border-2 border-gray-300 bg-white px-6 focus:outline-none focus:ring-0"
              aria-label={t(
                "reproduction.modals.natural.fields.initialResults",
              )}
            />

            {showResultsLabel && (
              <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-base text-gray-400">
                {t("reproduction.modals.natural.fields.initialResults")}
              </span>
            )}
          </div>

          {/* location */}
          <div className="relative sm:col-span-2">
            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gray-700">
              <FiMapPin size={22} />
            </span>

            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-16 rounded-2xl border-2 border-gray-300 bg-white px-6 pl-14 focus:outline-none focus:ring-0"
              aria-label={t("common.location")}
            />

            {showLocationLabel && (
              <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-base text-gray-700">
                {t("common.location")}
              </span>
            )}
          </div>
        </div>
      </div>
    </FormModal>
  );
}

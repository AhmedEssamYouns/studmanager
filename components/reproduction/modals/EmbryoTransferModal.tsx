"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { FormModal } from "@/components/common/FormModal";
import { ChevronDown } from "lucide-react";
import type { EmbryoTransferRow } from "@/components/reproduction/tables/EmbryoTransferTable";

type Props = {
  open: boolean;
  mode: "add" | "edit";
  initialData?: EmbryoTransferRow | null;
  onClose: () => void;
  onSubmit: (data: EmbryoTransferRow) => void;
};

export default function EmbryoTransferModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const { locale, direction } = useLocale();
  const isRTL = direction === "rtl";

  const donorMareOptions = useMemo(
    () => [
      { value: "", label: "" },
      {
        value: "كاليبوترا",
        label: locale === "ar" ? "كاليبوترا" : "Calypotra",
      },
      { value: "فرسة ٢", label: locale === "ar" ? "فرسة ٢" : "Mare 2" },
    ],
    [locale],
  );

  const stallionOptions = useMemo(
    () => [
      { value: "", label: "" },
      { value: "مداح مهنا", label: locale === "ar" ? "مداح مهنا" : "Maddah" },
      { value: "فحل ٢", label: locale === "ar" ? "فحل ٢" : "Stallion 2" },
    ],
    [locale],
  );

  const tankOptions = useMemo(
    () => [
      { value: "", label: "" },
      { value: "اسم الخزان", label: locale === "ar" ? "اسم الخزان" : "Tank A" },
      { value: "خزان ٢", label: locale === "ar" ? "خزان ٢" : "Tank B" },
    ],
    [locale],
  );

  const typeOptions = useMemo(
    () => [
      { value: "", label: "" },
      { value: "ذكر", label: locale === "ar" ? "ذكر" : "Male" },
      { value: "أنثى", label: locale === "ar" ? "أنثى" : "Female" },
      { value: "غير معروف", label: locale === "ar" ? "غير معروف" : "Unknown" },
    ],
    [locale],
  );

  const forSaleOptions = useMemo(
    () => [
      { value: "", label: "" },
      { value: "نعم", label: locale === "ar" ? "نعم" : "Yes" },
      { value: "لا", label: locale === "ar" ? "لا" : "No" },
      {
        value: "غير محدد",
        label: locale === "ar" ? "غير محدد" : "Unspecified",
      },
    ],
    [locale],
  );

  const canisterOptions = useMemo(
    () => [
      { value: "", label: "" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5", label: "5" },
      { value: "7", label: "7" },
      { value: "10", label: "10" },
    ],
    [],
  );

  const [stallion, setStallion] = useState("");
  const [futureMare, setFutureMare] = useState("");
  const [collectionDate, setCollectionDate] = useState("");
  const [tankName, setTankName] = useState("");
  const [type, setType] = useState("");
  const [forSale, setForSale] = useState("");
  const [price, setPrice] = useState("");
  const [canister, setCanister] = useState("");
  const [color, setColor] = useState<EmbryoTransferRow["color"]>("red");

  // NEW: color select options
  const colorOptions = useMemo(
    () => [
      { value: "", label: "" },
      { value: "red", label: locale === "ar" ? "أحمر" : "Red" },
      { value: "green", label: locale === "ar" ? "أخضر" : "Green" },
      { value: "yellow", label: locale === "ar" ? "أصفر" : "Yellow" },
    ],
    [locale],
  );

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialData) {
      setStallion(initialData.stallion || "");
      setFutureMare(initialData.futureMare || "");
      setCollectionDate(initialData.collectionDate || "");
      setTankName(initialData.tankName || "");
      setType(initialData.type || "");
      setForSale(initialData.forSale || "");
      setPrice(initialData.price || "");
      setCanister(String(initialData.canister ?? ""));
      setColor(initialData.color || "red");
    } else {
      setStallion("");
      setFutureMare("");
      setCollectionDate("");
      setTankName("");
      setType("");
      setForSale("");
      setPrice("");
      setCanister("");
      setColor("red");
    }
  }, [open, mode, initialData]);

  function submit(e: React.FormEvent) {
    e.preventDefault();

    const payload: EmbryoTransferRow = {
      id: initialData?.id || String(Date.now()),
      stallion,
      futureMare,
      collectionDate,
      tankName,
      type,
      forSale,
      price,
      canister: canister ? Number(canister) : "",
      color,
    };

    onSubmit(payload);
  }

  const fieldClass =
    "w-full h-16 rounded-2xl border-2 border-gray-300 bg-white px-6 focus:outline-none focus:ring-0";
  const selectClass = `${fieldClass} pr-12 appearance-none`;

  // Hide native date indicator
  const dateInputClass =
    `${fieldClass} ` +
    "[&::-webkit-calendar-picker-indicator]:opacity-0 " +
    "[&::-webkit-calendar-picker-indicator]:hidden " +
    "[&::-webkit-inner-spin-button]:hidden " +
    "[&::-webkit-clear-button]:hidden";

  const arrowSideClass = isRTL ? "left-5" : "right-5";
  const labelSideClass = isRTL ? "right-6" : "left-6";

  const show = {
    stallion: !stallion,
    futureMare: !futureMare,
    collectionDate: !collectionDate,
    tankName: !tankName,
    canister: !canister,
    type: !type,
    forSale: !forSale,
    price: !price,
    // NEW
    color: !color,
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
        {/* row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="relative">
            <select
              value={futureMare}
              onChange={(e) => setFutureMare(e.target.value)}
              className={selectClass}
              aria-label={locale === "ar" ? "اسم الفرسة المانحة" : "Donor mare"}
            >
              {donorMareOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${arrowSideClass} h-5 w-5 text-gray-600`}
            />
            {show.futureMare && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {locale === "ar" ? "اسم الفرسة المانحة" : "Donor mare name"}
              </span>
            )}
          </div>

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
            {show.stallion && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {locale === "ar" ? "اسم الفحل" : "Stallion name"}
              </span>
            )}
          </div>

          {/* row 2 */}
          <div className="relative">
            <select
              value={tankName}
              onChange={(e) => setTankName(e.target.value)}
              className={selectClass}
              aria-label={locale === "ar" ? "الخزان" : "Tank"}
            >
              {tankOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${arrowSideClass} h-5 w-5 text-gray-600`}
            />
            {show.tankName && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {locale === "ar" ? "الخزان" : "Tank"}
              </span>
            )}
          </div>

          <div className="relative">
            <input
              type="date"
              value={collectionDate}
              onChange={(e) => setCollectionDate(e.target.value)}
              className={dateInputClass}
              aria-label={locale === "ar" ? "تاريخ التجميع" : "Collection date"}
            />
            {show.collectionDate && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {locale === "ar" ? "تاريخ التجميع" : "Collection date"}
              </span>
            )}
          </div>
        </div>

        {/* row 3: color (select) + canister */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          {/* color as selection */}
          <div className="relative">
            <select
              value={color}
              onChange={(e) =>
                setColor(e.target.value as EmbryoTransferRow["color"])
              }
              className={selectClass}
              aria-label={locale === "ar" ? "اللون" : "Color"}
            >
              {colorOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            <ChevronDown
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${arrowSideClass} h-5 w-5 text-gray-600`}
            />

            {/* small color dot inside the field */}
            {!!color && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${
                  isRTL ? "left-14" : "right-14"
                } h-3.5 w-3.5 rounded-full ${
                  color === "red"
                    ? "bg-red-600"
                    : color === "green"
                      ? "bg-green-600"
                      : "bg-yellow-500"
                }`}
              />
            )}

            {show.color && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {locale === "ar" ? "اللون" : "Color"}
              </span>
            )}
          </div>

          {/* canister */}
          <div className="relative">
            <select
              value={canister}
              onChange={(e) => setCanister(e.target.value)}
              className={selectClass}
              aria-label={locale === "ar" ? "الحاوية" : "Canister"}
            >
              {canisterOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${arrowSideClass} h-5 w-5 text-gray-600`}
            />
            {show.canister && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {locale === "ar" ? "الحاوية" : "Canister"}
              </span>
            )}
          </div>
        </div>

        {/* row 4 */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="relative">
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

          <div className="relative">
            <select
              value={forSale}
              onChange={(e) => setForSale(e.target.value)}
              className={selectClass}
              aria-label={locale === "ar" ? "للبيع" : "For sale"}
            >
              {forSaleOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${arrowSideClass} h-5 w-5 text-gray-600`}
            />
            {show.forSale && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {locale === "ar" ? "للبيع" : "For sale"}
              </span>
            )}
          </div>

          <div className="relative">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={selectClass}
              aria-label={locale === "ar" ? "النوع" : "Type"}
            >
              {typeOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${arrowSideClass} h-5 w-5 text-gray-600`}
            />
            {show.type && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {locale === "ar" ? "النوع" : "Type"}
              </span>
            )}
          </div>
        </div>
      </div>
    </FormModal>
  );
}

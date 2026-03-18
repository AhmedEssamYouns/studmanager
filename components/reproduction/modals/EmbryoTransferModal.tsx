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
  const { direction, t } = useLocale();
  const isRTL = direction === "rtl";

  const donorMareOptions = useMemo(
    () => [
      { value: "", label: "" },
      {
        value: "كاليبوترا",
        label: t("reproduction.modals.embryoTransfer.donorMare.opt1"),
      },
      {
        value: "فرسة ٢",
        label: t("reproduction.modals.embryoTransfer.donorMare.opt2"),
      },
    ],
    [t],
  );

  const stallionOptions = useMemo(
    () => [
      { value: "", label: "" },
      {
        value: "مداح مهنا",
        label: t("reproduction.modals.embryoTransfer.stallion.opt1"),
      },
      {
        value: "فحل ٢",
        label: t("reproduction.modals.embryoTransfer.stallion.opt2"),
      },
    ],
    [t],
  );

  const tankOptions = useMemo(
    () => [
      { value: "", label: "" },
      {
        value: "اسم الخزان",
        label: t("reproduction.modals.embryoTransfer.tank.opt1"),
      },
      {
        value: "خزان ٢",
        label: t("reproduction.modals.embryoTransfer.tank.opt2"),
      },
    ],
    [t],
  );

  const typeOptions = useMemo(
    () => [
      { value: "", label: "" },
      {
        value: "ذكر",
        label: t("reproduction.modals.embryoTransfer.type.male"),
      },
      {
        value: "أنثى",
        label: t("reproduction.modals.embryoTransfer.type.female"),
      },
      {
        value: "غير معروف",
        label: t("reproduction.modals.embryoTransfer.type.unknown"),
      },
    ],
    [t],
  );

  const forSaleOptions = useMemo(
    () => [
      { value: "", label: "" },
      { value: "نعم", label: t("common.yes") },
      { value: "لا", label: t("common.no") },
      {
        value: "غير محدد",
        label: t("reproduction.modals.embryoTransfer.forSale.unspecified"),
      },
    ],
    [t],
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

  const colorOptions = useMemo(
    () => [
      { value: "", label: "" },
      {
        value: "red",
        label: t("reproduction.modals.embryoTransfer.color.red"),
      },
      {
        value: "green",
        label: t("reproduction.modals.embryoTransfer.color.green"),
      },
      {
        value: "yellow",
        label: t("reproduction.modals.embryoTransfer.color.yellow"),
      },
    ],
    [t],
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
    color: !color,
  };

  return (
    <FormModal
      isOpen={open}
      title={
        mode === "add"
          ? t("reproduction.modals.embryoTransfer.titleAdd")
          : t("reproduction.modals.embryoTransfer.titleEdit")
      }
      onClose={onClose}
      onSubmit={submit}
      submitText={t("common.save")}
      cancelText={t("common.cancel")}
    >
      <div className={isRTL ? "text-right" : "text-left"}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="relative">
            <select
              value={futureMare}
              onChange={(e) => setFutureMare(e.target.value)}
              className={selectClass}
              aria-label={t(
                "reproduction.modals.embryoTransfer.fields.donorMareName",
              )}
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
                {t("reproduction.modals.embryoTransfer.fields.donorMareName")}
              </span>
            )}
          </div>

          <div className="relative">
            <select
              value={stallion}
              onChange={(e) => setStallion(e.target.value)}
              className={selectClass}
              aria-label={t(
                "reproduction.modals.embryoTransfer.fields.stallionName",
              )}
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
                {t("reproduction.modals.embryoTransfer.fields.stallionName")}
              </span>
            )}
          </div>

          <div className="relative">
            <select
              value={tankName}
              onChange={(e) => setTankName(e.target.value)}
              className={selectClass}
              aria-label={t("reproduction.modals.embryoTransfer.fields.tank")}
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
                {t("reproduction.modals.embryoTransfer.fields.tank")}
              </span>
            )}
          </div>

          <div className="relative">
            <input
              type="date"
              value={collectionDate}
              onChange={(e) => setCollectionDate(e.target.value)}
              className={dateInputClass}
              aria-label={t(
                "reproduction.modals.embryoTransfer.fields.collectionDate",
              )}
            />
            {show.collectionDate && (
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-base text-gray-700 ${labelSideClass}`}
              >
                {t("reproduction.modals.embryoTransfer.fields.collectionDate")}
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          <div className="relative">
            <select
              value={color}
              onChange={(e) =>
                setColor(e.target.value as EmbryoTransferRow["color"])
              }
              className={selectClass}
              aria-label={t("reproduction.modals.embryoTransfer.fields.color")}
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
                {t("reproduction.modals.embryoTransfer.fields.color")}
              </span>
            )}
          </div>

          <div className="relative">
            <select
              value={canister}
              onChange={(e) => setCanister(e.target.value)}
              className={selectClass}
              aria-label={t(
                "reproduction.modals.embryoTransfer.fields.canister",
              )}
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
                {t("reproduction.modals.embryoTransfer.fields.canister")}
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="relative">
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

          <div className="relative">
            <select
              value={forSale}
              onChange={(e) => setForSale(e.target.value)}
              className={selectClass}
              aria-label={t(
                "reproduction.modals.embryoTransfer.fields.forSale",
              )}
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
                {t("reproduction.modals.embryoTransfer.fields.forSale")}
              </span>
            )}
          </div>

          <div className="relative">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={selectClass}
              aria-label={t("reproduction.modals.embryoTransfer.fields.type")}
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
                {t("reproduction.modals.embryoTransfer.fields.type")}
              </span>
            )}
          </div>
        </div>
      </div>
    </FormModal>
  );
}

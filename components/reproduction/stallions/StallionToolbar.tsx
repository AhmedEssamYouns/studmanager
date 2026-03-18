"use client";

import type { FC } from "react";

type Props = {
  locale: string;
  direction: "rtl" | "ltr";
  tags: string[];
  activeTag: string;
  selectedCount: number;
  onAdd: () => void;
  onDeleteSelected: () => void;
  onTagChange: (tag: string) => void;
};

export const StallionToolbar: FC<Props> = ({
  locale,
  direction,
  tags,
  activeTag,
  selectedCount,
  onAdd,
  onDeleteSelected,
  onTagChange,
}) => {
  const isRTL = direction === "rtl";

  return (
    <div
      className={`mt-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 ${
        isRTL ? "lg:flex-row-reverse" : ""
      }`}
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          className="h-11 px-4 rounded-2xl bg-[#4b2f1a] text-white font-bold w-full sm:w-auto"
          onClick={onAdd}
        >
          {locale === "ar" ? "إضافة سجل جديد" : "Add Record"}
        </button>

        <button
          disabled={selectedCount === 0}
          onClick={onDeleteSelected}
          className={`h-11 px-4 rounded-2xl text-white font-bold transition w-full sm:w-auto ${
            selectedCount === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#c2463a]"
          }`}
        >
          {locale === "ar" ? "حذف" : "Delete"}
        </button>
      </div>

      <div
        className={`flex gap-3 flex-wrap ${isRTL ? "justify-start" : "justify-end"} w-full lg:w-auto`}
      >
        {tags.map((b) => (
          <button
            key={b}
            onClick={() => onTagChange(b)}
            className={`px-4 py-2 rounded-full text-sm border ${
              activeTag === b
                ? "bg-[#fff6e7] border-[#bfae87]"
                : "bg-white border-[#e8e2dd]"
            }`}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
};

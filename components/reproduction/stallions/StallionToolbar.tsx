"use client";

import type { FC } from "react";
import { useLocale } from "@/lib/locale-context";

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
  direction,
  tags,
  activeTag,
  selectedCount,
  onAdd,
  onDeleteSelected,
  onTagChange,
}) => {
  const { t } = useLocale();
  const isRTL = direction === "rtl";

  return (
    <div className="mt-4 space-y-3 w-full max-w-full overflow-x-hidden">
      {/* Buttons: stack on mobile, row on >=sm */}
      <div
        className={`flex flex-col sm:flex-row gap-3 w-full ${
          isRTL ? "sm:flex-row-reverse" : ""
        }`}
      >
        <button
          className="h-11 px-4 rounded-2xl bg-[#4b2f1a] text-white font-bold w-full sm:w-auto"
          onClick={onAdd}
        >
          {t("common.addNewRecord")}
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
          {t("common.delete")}
        </button>
      </div>

      {/* Tags:
          - Mobile: horizontal scroll (no wrap) to avoid overflow
          - Desktop: wrap as before
      */}
      <div className="w-full">
        <div
          className={`flex gap-2 overflow-x-auto whitespace-nowrap py-1 sm:hidden ${
            isRTL ? "justify-start" : "justify-start"
          }`}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {tags.map((b) => (
            <button
              key={b}
              onClick={() => onTagChange(b)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm border ${
                activeTag === b
                  ? "bg-[#fff6e7] border-[#bfae87]"
                  : "bg-white border-[#e8e2dd]"
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        <div
          className={`hidden sm:flex gap-3 flex-wrap ${
            isRTL ? "justify-start" : "justify-end"
          } w-full`}
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
    </div>
  );
};

"use client";

import type { FC } from "react";

type Props = {
  locale: string;
  direction: "rtl" | "ltr";
  query: string;
  onQueryChange: (v: string) => void;
};

export const StallionProfileCard: FC<Props> = ({
  locale,
  direction,
  query,
  onQueryChange,
}) => {
  const isRTL = direction === "rtl";

  return (
    <div className="mt-4 p-4 sm:p-6 rounded-xl bg-white shadow-sm">
      <div
        className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 ${
          isRTL ? "sm:flex-row-reverse" : ""
        }`}
      >
        <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#4b2f1a] text-white rounded-[14px] px-4 py-3 shadow-sm">
          <span className="text-sm font-medium">
            {locale === "ar" ? "رؤية الملف الشخصي" : "View profile"}
          </span>
        </button>

        <div className="flex-1">
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={locale === "ar" ? "ابحث" : "Search"}
            className={`h-11 w-full rounded-2xl border border-[#ece2da] bg-white text-sm text-[#2c2330] outline-none px-4 ${
              isRTL ? "text-right" : "text-left"
            }`}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-full sm:w-44 h-44 rounded-[12px] overflow-hidden bg-gray-100 flex-shrink-0 shadow-inner">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfquc1pFNFujzgkuv6_xka95bqkKHoR4jE5w&s"
              alt="horse"
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className={`text-sm text-[#2c2330] ${isRTL ? "text-right" : "text-left"}`}
          >
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold">
                {locale === "ar" ? "الاسم" : "Name"}:
              </h3>
              <span className="font-medium">مداح محنا</span>
            </div>

            <div className="mt-3 space-y-2 text-sm text-[#6b5960]">
              <div>
                <span className="font-semibold">
                  {locale === "ar" ? "المزرعة" : "Farm"}:
                </span>{" "}
                اسم المزرعة
              </div>
              <div>
                <span className="font-semibold">
                  {locale === "ar" ? "تاريخ الميلاد" : "DOB"}:
                </span>{" "}
                22/4/2015
              </div>
              <div>
                <span className="font-semibold">
                  {locale === "ar" ? "ولد في" : "Born in"}:
                </span>{" "}
                مصر
              </div>
              <div>
                <span className="font-semibold">
                  {locale === "ar" ? "حاليا في" : "Currently in"}:
                </span>{" "}
                مصر
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1" />
      </div>
    </div>
  );
};

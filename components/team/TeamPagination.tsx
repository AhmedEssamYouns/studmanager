'use client';

import { ChevronIcon } from '@/components/layout/AppIcons';

export function TeamPagination() {
  return (
    <div className="flex items-center justify-center gap-3 pt-3 text-[#4b2f1a]">
      <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#b6aa9f]">
        <ChevronIcon className="h-5 w-5" />
      </button>
      {[1, 2, 3, 4, 5].map((page) => (
        <button
          key={page}
          className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold ${
            page === 1 ? 'border-[#4b2f1a] bg-[#4b2f1a] text-white' : 'border-[#4b2f1a] text-[#4b2f1a]'
          }`}
        >
          {page}
        </button>
      ))}
      <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4b2f1a] text-sm font-semibold">
        ...
      </button>
      <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4b2f1a] text-sm font-semibold">
        32
      </button>
      <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#b6aa9f]">
        <ChevronIcon className="h-5 w-5 rotate-180" />
      </button>
    </div>
  );
}

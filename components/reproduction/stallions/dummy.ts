import type { RecordItem } from "../ReproductionRecordsTable";

export type StallionType = "natural" | "fresh" | "frozen" | "vet";

// Dummy JSON data per tab
export const dummyByType: Record<StallionType, RecordItem[]> = {
  natural: Array.from({ length: 6 }).map((_, i) => ({
    id: `n-${i + 1}`,
    horse: i % 2 === 0 ? "الفارس" : `Horse ${i + 1}`,
    dob: "22/4/2015",
    results: "النتائج الأولية",
    location: "مصر",
    price: "200EGP",
  })),
  fresh: Array.from({ length: 5 }).map((_, i) => ({
    id: `f-${i + 1}`,
    horse: i % 2 === 0 ? "فرسة" : `Mare ${i + 1}`,
    dob: "10/1/2020",
    results: "النتائج الأولية",
    location: "القاهرة",
    price: "350EGP",
  })),
  frozen: Array.from({ length: 4 }).map((_, i) => ({
    id: `fr-${i + 1}`,
    horse: i % 2 === 0 ? "فرسة مجمدة" : `Frozen Mare ${i + 1}`,
    dob: "01/12/2019",
    results: "النتائج الأولية",
    location: "الجيزة",
    price: "500EGP",
  })),
  vet: Array.from({ length: 3 }).map((_, i) => ({
    id: `v-${i + 1}`,
    horse: i % 2 === 0 ? "حالة بيطرية" : `Vet Case ${i + 1}`,
    dob: "03/03/2021",
    results: "النتائج الأولية",
    location: "الإسكندرية",
    price: "150EGP",
  })),
};

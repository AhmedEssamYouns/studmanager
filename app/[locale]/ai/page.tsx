"use client";

import { useState, useMemo } from "react";
import { useLocale } from "@/lib/locale-context";
import { MainLayout } from "@/components/layout/MainLayout";
import { ArrowLeft, ArrowRight, Menu, X } from "lucide-react";
import { LottieAnimation } from "@/components/common/LottieAnimation";
import aiAnimation from "@/public/brand/Ai (1).json";
import { useRouter } from "next/navigation";

export default function AIChatPage() {
  const { direction, locale } = useLocale();
  const router = useRouter();
  const isRTL = direction === "rtl";

  const [message, setMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock chat history
  const history = [
    { id: 1, title: "تغذية الخيل", time: "اليوم" },
    { id: 2, title: "تغذية الخيل", time: "الأمس" },
    { id: 3, title: "تغذية الخيل", time: "الأمس" },
    { id: 4, title: "تغذية الخيل", time: "الأمس" },
    { id: 5, title: "تغذية الخيل", time: "الأمس" },
    { id: 6, title: "تغذية الخيل", time: "الأمس" },
    { id: 7, title: "تغذية الخيل", time: "مارس" },
    { id: 8, title: "تغذية الخيل", time: "مارس" },
    { id: 9, title: "تغذية الخيل", time: "مارس" },
    { id: 10, title: "تغذية الخيل", time: "مارس" },
    { id: 11, title: "تغذية الخيل", time: "مارس" },
    { id: 12, title: "تغذية الخيل", time: "الـ30 يوما الماضية" },
  ];

  const groupedHistory = useMemo(() => {
    const groups: Record<string, typeof history> = {};
    history.forEach((item) => {
      const timeKey = item.time;
      if (!groups[timeKey]) groups[timeKey] = [];
      groups[timeKey].push(item);
    });
    return groups;
  }, []);

  return (
    <MainLayout>
      <div className={`flex h-[calc(100vh-140px)] w-full overflow-hidden rounded-[32px] bg-[#f8f5f2] shadow-sm ${isRTL ? "font-cairo" : ""}`} dir={direction}>
        {/* Sidebar (Chat History) - First in DOM to be on left in LTR and right in RTL */}
        <aside
          className={`fixed inset-y-0 z-50 w-72 transform bg-white p-6 shadow-xl transition-all duration-300 ease-in-out md:relative md:inset-0 md:translate-x-0 md:shadow-none ${
            isSidebarOpen ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full"
          } ${isRTL ? "right-0 border-l" : "left-0 border-r"}`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-lg">{isRTL ? "السجل" : "History"}</h3>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-full md:hidden">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-8 scrollbar-hide">
              {Object.entries(groupedHistory).map(([time, items]) => (
                <div key={time} className="space-y-4">
                  <h4 className={`text-xs font-bold text-gray-400 uppercase tracking-wider ${isRTL ? "text-right" : "text-left"}`}>
                    {time}
                  </h4>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className={`p-3 rounded-xl hover:bg-[#f8f5f2] cursor-pointer transition-colors text-sm font-bold text-[#2b2330] ${isRTL ? "text-right" : "text-left"}`}
                      >
                        {item.title}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Chat Area */}
        <div className="relative flex flex-1 flex-col overflow-hidden bg-[#f8f5f2]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6">
            <button
               onClick={() => router.push(`/${locale}/dashboard`)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors"
            >
              <div className="rounded-full border-2 border-black p-0.5">
                {isRTL ? <ArrowRight size={20} className="text-black" /> : <ArrowLeft size={20} className="text-black" />}
              </div>
            </button>

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors md:hidden"
            >
              <Menu size={20} className="text-gray-700" />
            </button>
          </div>

          {/* Empty State / Center Content */}
          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 mb-4 flex items-center justify-center">
               <LottieAnimation
                animationData={aiAnimation}
                className="w-full h-full scale-[1.3]"
              />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#6b5e57] opacity-80 z-10">
              StudManager AI
            </h2>
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-8">
            <div className="mx-auto flex w-full max-w-4xl items-center gap-4">
              <button className="h-14 w-32 md:w-40 rounded-[28px] bg-[#4b3b2f] p-4 text-white hover:bg-[#3f3128] transition-all font-bold text-lg shadow-lg flex items-center justify-center">
                {isRTL ? "إرسال" : "Send"}
              </button>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isRTL ? "اسأل..." : "Ask..."}
                  className={`h-14 w-full rounded-[28px] border border-gray-200 bg-white px-8 py-4 text-lg outline-none focus:border-[#4b3b2f] transition-all shadow-sm ${isRTL ? "text-right" : "text-left"}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </MainLayout>
  );
}

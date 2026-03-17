"use client";

import { FC, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useLocale } from "@/lib/locale-context";

interface HorseVideosTabProps {
  horse?: any;
}

const DUMMY_VIDEOS = [
  { id: 1, title: "Maddah Mehana", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { id: 2, title: "Training Session", url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ" },
  { id: 3, title: "Championship Run", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { id: 4, title: "Morning Gallop", url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ" },
];

export const HorseVideosTab: FC<HorseVideosTabProps> = () => {
  const { direction } = useLocale();
  const isRTL = direction === "rtl";
  const [isMounted, setIsMounted] = useState(false);

  // Prevents hydration errors with react-player by ensuring rendering happens only on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Type cast to avoid TS errors with react-player types being flaky
  const Player: any = ReactPlayer;

  return (
    <div className={`mb-12 ${isRTL ? "text-right" : "text-left"}`}>
      <h2 className="text-2xl font-bold text-[#2a2a2a] mb-6">
        {isRTL ? "الفيديوهات" : "Videos"}
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {DUMMY_VIDEOS.map((video) => (
          <div key={video.id} className="relative w-full rounded-2xl overflow-hidden shadow-sm bg-black aspect-video flex flex-col">
            <div className="flex-1 relative">
              {isMounted && (
                <Player
                  url={video.url}
                  width="100%"
                  height="100%"
                  controls={true}
                  light={true} // use light mode to show video thumbnail natively from YouTube
                  playing
                  className="absolute top-0 left-0"
                />
              )}
            </div>
            <div className="bg-[#fdfbf7] p-4 border-t border-gray-200">
               <h3 className="text-[#2a2a2a] text-lg font-medium">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

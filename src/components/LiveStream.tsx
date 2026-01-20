import { Radio, Users, Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import { db } from "../firbase";
import { collection, doc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";

type LiveDoc = {
  isLive?: boolean;
  videoId?: string;
};

export function LiveStream() {
  const [isLive, setIsLive] = useState(false);
  // const [channelId, setChannelId] = useState("");
  const channelId = "UCHKhsOrX6epnjBN1GOmQV7w";

  useEffect(() => {
    const ref = doc(db, "live", "current");

    const unsub = onSnapshot(ref, (snap) => {
      const data = snap.data();
      setIsLive(!!data?.isLive);
    });

    return () => unsub();
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Radio className="w-4 h-4" />
            실시간 예배
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">언제 어디서나 함께하세요</h2>
          <p className="text-xl text-white/90">온라인으로 실시간 예배에 참여하실 수 있습니다</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Video Player */}
          <div className="relative aspect-video bg-black/30 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20">
            {isLive ? (
              <>
                {/* YouTube Embed */}
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`}
                  title="YouTube Live"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />

                {/* Live Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-2 bg-red-500 px-3 py-1.5 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-xs font-semibold">LIVE</span>
                  </div>
                </div>

                {/* Viewer Count (일단은 임시 숫자) */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">실시간 시청 중</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto">
                      <Radio className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold text-lg">예배시간이 아닙니다.</p>
                      <p className="text-sm text-white/80">
                        주일 오후 2:30 / 그 외 예배시간은 유튜브 채널에서 확인
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Info Cards */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="font-semibold text-xl mb-2">유튜브 라이브</h3>
              <p className="text-white/80 mb-4">
                교회 유튜브 채널에서 실시간 예배에 참여하실 수 있습니다.
              </p>
              <a
                href="https://www.youtube.com/@as_smc"
                target="_blank"
                className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors w-full"
              >
                유튜브에서 보기
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">온라인 교제</h4>
                  <p className="text-sm text-white/80">
                    실시간 채팅을 통해 함께 예배하는 성도님들과 교제하실 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h4 className="font-semibold mb-3">예배 시간</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/80">주일 대예배</span>
                  <span className="font-medium">오전 11:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">수요 예배</span>
                  <span className="font-medium">오후 7:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

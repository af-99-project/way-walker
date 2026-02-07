import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { db } from "@/firbase";
import { collection, getDocs } from "firebase/firestore";

type CleaningData = {
  thisMonth?: string;
  nextMonth?: string;
};

export function CleaningSection() {
  const [cleaningData, setCleaningData] = useState<CleaningData | null>(null);

  useEffect(() => {
    const fetchCleaningData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cleaning"));
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data() as CleaningData;
          setCleaningData(docData);
        }
      } catch (error) {
        console.error("청소 데이터 가져오기 오류:", error);
      }
    };

    fetchCleaningData();
  }, []);

  const fallbackData: CleaningData = {
    thisMonth: "이번 달 청소 섬김 일정이 준비 중입니다.",
    nextMonth: "다음 달 청소 섬김 일정이 준비 중입니다.",
  };

  const data = cleaningData ?? fallbackData;

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-emerald-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="bg-green-100 inline-flex items-center gap-2 bg-emerald-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            청소 섬김
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">정리 섬김 마을</h2>
          <p className="text-xl text-gray-600">함께 섬기는 귀한 손길을 기억합니다</p>
        </div>

        <div className="text-center grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">이번 달</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{data.thisMonth}</p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">다음 달</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{data.nextMonth}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

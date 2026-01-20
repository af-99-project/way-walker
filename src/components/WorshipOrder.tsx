import { Music, Clock } from 'lucide-react';
import React, {useState, useEffect} from 'react';
import { db } from "../firbase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export function WorshipOrder() {
  const worshipOrder = [
    { time: '11:00', title: '전주', content: '경배와 찬양팀', icon: '🎵' },
    { time: '11:05', title: '찬송', content: '23장 만 입이 내게 있으면', icon: '🎼' },
    { time: '11:10', title: '기도', content: '인도자', icon: '🙏' },
    { time: '11:15', title: '성경봉독', content: '요한복음 3:16', icon: '📖' },
    { time: '11:20', title: '찬양', content: '주님의 사랑', icon: '🎶' },
    { time: '11:30', title: '설교', content: '하나님의 사랑 / 김은혜 목사', icon: '✝️' },
    { time: '12:10', title: '헌금', content: '364장 내 기도하는 그 시간', icon: '💝' },
    { time: '12:15', title: '광고', content: '교회 소식', icon: '📢' },
    { time: '12:20', title: '축도', content: '김은혜 목사', icon: '🕊️' },
  ];
  const [worshipData, setWorshipData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "worship_info"), orderBy("id"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWorshipData(data);
console.log(data,'data');

      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Music className="w-4 h-4" />
            예배 순서
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">주일 대예배</h2>
          <p className="text-xl text-gray-600">오전 11:00 - 오후 12:30</p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-[60px] md:left-[80px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200" />

          {/* Worship Items */}
          <div className="space-y-4">
            {worshipData.map((item, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className="flex gap-4 md:gap-6">
                  {/* Time */}
                  <div className="flex items-center gap-2 w-[60px] md:w-[80px] flex-shrink-0">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-500">{item.time}</span>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-[55px] md:left-[75px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-blue-400 rounded-full z-10 group-hover:border-blue-600 group-hover:scale-125 transition-all" />

                  {/* Content Card */}
                  <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-blue-200 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{worshipOrder[index].icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

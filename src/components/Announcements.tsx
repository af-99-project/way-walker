import { Bell, ChevronRight } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { db } from '@/firbase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import AOS from "aos";
import "aos/dist/aos.css";


type Props = {
  elementRef?: React.RefObject<HTMLElement>;
};

export function Announcements({ elementRef }: Props) {
  const fallbackAnnouncements = [
    {
      category: '예배',
      title: '이번 주 수요예배',
      description: '수요예배가 오후 7시에 있습니다. 많은 참여 바랍니다.',
      date: '1월 22일',
      color: 'blue'
    },
    {
      category: '행사',
      title: '새가족 환영회',
      description: '예배 후 2층 교육관에서 새가족 환영회가 진행됩니다.',
      date: '1월 19일',
      color: 'green'
    },
    {
      category: '모임',
      title: '청년부 성경공부',
      description: '매주 금요일 저녁 8시에 청년부 성경공부 모임이 있습니다.',
      date: '매주 금요일',
      color: 'purple'
    },
    {
      category: '봉사',
      title: '애찬 준비',
      description: '다음 주일 애찬(점심식사)이 준비되어 있습니다.',
      date: '1월 26일',
      color: 'orange'
    },
    {
      category: '교육',
      title: '구역예배 인도자 교육',
      description: '토요일 오전 10시에 구역예배 인도자 교육이 있습니다.',
      date: '1월 25일',
      color: 'pink'
    },
  ];

  const colorMap = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    orange: 'bg-orange-100 text-orange-700',
    pink: 'bg-pink-100 text-pink-700',
  };

  const [announcements, setAnnouncements] = useState(fallbackAnnouncements);

  const palette = useMemo(
    () => ['blue', 'green', 'purple', 'orange', 'pink'] as const,
    []
  );

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const q = query(collection(db, 'ads'), orderBy('id'));
        const snapshot = await getDocs(q);
        const dataList = snapshot.docs.map((docSnap, index) => {
          const data = docSnap.data();
          return {
            category: '공지',
            title: data.title ?? '공지',
            description: data.content ?? '',
            date: '',
            color: palette[index % palette.length],
          };
        });

        if (dataList.length > 0) {
          setAnnouncements(dataList);
        }
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
    AOS.init();
  }, [palette]);

  return (
    <section ref={elementRef} className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Bell className="w-4 h-4" />
            교회 소식
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">주요 공지사항</h2>
          <p className="text-xl text-gray-600">이번 주에 함께할 소중한 시간들</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-blue-200"
              data-aos="fade-up"
            >
              <div className="flex items-start justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colorMap[item.color as keyof typeof colorMap]}`}>
                  {item.category}
                </span>
                {item.date && <span className="text-sm text-gray-500">{item.date}</span>}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-gray-600 mb-4 whitespace-pre-wrap word-break">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

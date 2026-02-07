import { Bell, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { db } from "@/firbase";
import { query, collection, getDocs, orderBy } from "firebase/firestore";

export function Announcements() {
  const [adData, setAdData] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const q = query(collection(db, "ads"), orderBy("id"));
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAdData(data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
  
      fetchData();
    }, []);

  const colorMap = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    orange: 'bg-orange-100 text-orange-700',
    pink: 'bg-pink-100 text-pink-700',
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
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
          {adData.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-blue-200"
            >
             {/*  <div className="flex items-start justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colorMap[item.color as keyof typeof colorMap]}`}>
                  {item.length}
                </span>
                <span className="text-sm text-gray-500">{item.date}</span>
              </div> */}
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

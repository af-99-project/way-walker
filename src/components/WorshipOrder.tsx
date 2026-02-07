import { Music, Clock } from "lucide-react";
import React, { useState, useEffect } from "react";
import { db } from "../firbase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import AOS from "aos";
import "aos/dist/aos.css";

export function WorshipOrder() {
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
        console.log(data, "data");
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
    AOS.init();
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
          <div className="absolute left-[10px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200" />

          {/* Worship Items */}
          <ul className="space-y-4">
            {worshipData.map((item, index) => (
              <li key={index} className="relative group pl-[30px]" data-aos="fade-up">
                <div className="flex gap-4 md:gap-6">
                  {/* Timeline Dot */}
                  <div className="absolute left-[5px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-blue-400 rounded-full z-10 group-hover:border-blue-600 group-hover:scale-125 transition-all" />

                  {/* Content Card */}
                  <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-blue-200 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

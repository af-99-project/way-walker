import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "@/firbase";
import { query, orderBy } from "firebase/firestore";
import AOS from "aos";
import "aos/dist/aos.css";

export default function PrayerLead() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchPrayerSchedule = async () => {
      const qSnapshot = await getDocs(
        query(collection(db, "prayerSchedule"), orderBy("id"))
      );

      const today = new Date();
      today.setHours(0, 0, 0, 0); // 오늘 00:00 기준

      const data = qSnapshot.docs
        .map((doc) => doc.data())
        .filter((item) => {
          const date = new Date(item.prayerDate);
          return date >= today; // 오늘 이후만
        });

      setList(data);
    };

    fetchPrayerSchedule();
    AOS.init();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}월 ${String(date.getDate()).padStart(2, "0")}일`;
  };

  return (
    <section className="prayerLeadWrap">
      <h3>대표기도</h3>
      <ul>
        {list.slice(0, 3).map((item, idx) => (
          <li key={idx} data-aos="fade-up">
            <span>{formatDate(item.prayerDate)}</span>{" "}
            {item.representative} 청년
          </li>
        ))}
      </ul>
    </section>
  );
}






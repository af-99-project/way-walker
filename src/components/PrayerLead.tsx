import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "@/firbase";
import { query, orderBy } from "firebase/firestore";

export default function PrayerLead() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchPrayerSchedule = async () => {
      const qSnapshot = await getDocs(
        query(collection(db, "prayerSchedule"), orderBy("id"))
      );

      const data = qSnapshot.docs.map((doc) => doc.data());
      setList(data);
    };

    fetchPrayerSchedule();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}월 ${String(date.getDate()).padStart(2, "0")}일`;
  };


  return (
    <div className="prayerLeadWrap">
      <h3>대표기도</h3>
      <ul>
        {list.slice(0, 3).map((item, idx) => (
          <li key={idx}>
            <span>{formatDate(item.prayerDate)}</span>{" "}
            {item.representative} 청년
          </li>
        ))}
      </ul>
    </div>
  );
}

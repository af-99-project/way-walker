import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "@/firbase";
import { query, orderBy } from "firebase/firestore";
import AOS from "aos";
import "aos/dist/aos.css";

export default function LeaderList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const qSnapshot = await getDocs(
          query(collection(db, "member"), orderBy("id"))
        );
        const dataList = qSnapshot.docs.map((docSnap) => ({
          docId: docSnap.id,
          id: docSnap.data().id,
          name: docSnap.data().name,
        }));
        setList(dataList);
      } catch (error) {
        console.error("데이터 불러오기 오류:", error);
      }
    };

    fetchData();
    AOS.init();
  }, []);

  return (
    <section className="Leader_Wrap">
      <h3>섬김이</h3>
      <ul>
        {list.map((item, idx) => (
          <li key={idx} data-aos="fade-up">
            <span className="name">{item.name}</span>
            <span className="role">청년</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
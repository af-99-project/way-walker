import React, { useEffect, useState } from "react";
import { db } from "@/firbase";
import { collection, getDocs } from "firebase/firestore";

export default function Cleaning() {
  const [cleaningData, setCleaningData] = useState(null);

  const fetchCleaningData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "cleaning"));
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0];
        const data = { id: docData.id, ...docData.data() };
        setCleaningData(data);
        setFormData(data);
      }
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
    }
  };

  useEffect(() => {
    fetchCleaningData();
  }, []);

  return (
    <div className="cleaningWrap">
      <p>
        <strong>이번달</strong> 정리 섬김 마을 <br /> <span>{cleaningData?.thisMonth ?? "-"}</span>
      </p>
      <p>
        <strong>다음달</strong> 정리 섬김 마을 <br /> <span>{cleaningData?.nextMonth ?? "-"}</span>
      </p>
    </div>
  );
}

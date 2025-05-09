import React, { useEffect, useState } from "react";
import { db } from "@/firbase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function WayWalkerCard() {
  const [memberData, setMemberData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "member"), orderBy("id"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMemberData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="wayWalker-card">
      <span className="title">임원</span>
      <div>
        {memberData.map((item) => (
          <span key={item.id}>{item.name}</span>
        ))}
      </div>
    </div>
  );
}

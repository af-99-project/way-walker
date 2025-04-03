import React, { useEffect, useState } from "react";
import { db } from "../firbase";
import { collection, getDocs } from "firebase/firestore";

export default function WayWalkerCard() {
  const arr = ["이경린", "명노엘", "정태우", "이경린", "명노엘", "정태우"];
  const [memberData, setMemberData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "member"));
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

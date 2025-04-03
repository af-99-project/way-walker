import React, { useState, useEffect } from "react";
import { db } from "../firbase";
import { collection, getDocs } from "firebase/firestore";

export default function Ad({ elementRef }) {
  const [adData, setAdData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ads"));
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

  return (
    <div className="notice-container" ref={elementRef}>
      <div className="notice-header">
        <span className="megaphone-icon">
          <img src="/src/assets/loudspeaker.svg" alt="mainLogo" />
        </span>
        <h1>광고</h1>
      </div>

      {adData.map((item) => (
        <div key={item.id} className="notice-section">
          <h2>{item.title}</h2>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}

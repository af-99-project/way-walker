import React, { useState, useEffect } from "react";
import { db } from "../../firbase";
import { query, collection, getDocs, orderBy } from "firebase/firestore";

export default function Ad({ elementRef }) {
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

  return (
    <div className="notice-container" ref={elementRef}>
      <div className="notice-header">
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

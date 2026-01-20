import React, { useState, useEffect } from "react";
import { db } from "@/firbase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import AOS from "aos";
import "aos/dist/aos.css";

function Table({ elementRef }) {
  const [worshipData, setWorshipData] = useState([]);
  
  useEffect(() => {
    AOS.init();

    const fetchData = async () => {
      try {
        const q = query(collection(db, "worship_info"), orderBy("id"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWorshipData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="tableWrap" ref={elementRef}>
      <h3>예배순서</h3>
      <ul>
        {worshipData.map((item) => (
          <li data-aos="fade-up" key={item.id}>
            <div className="txtWrap">
              <strong>{item.title}</strong>
              <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Table;

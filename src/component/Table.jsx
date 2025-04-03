import React, { useState, useEffect } from "react";
import {db} from "../firbase"
import { collection, getDocs } from "firebase/firestore"; 


function Table({elementRef}) {
    const [worshipData, setWorshipData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "worship_info"));
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
          <li key={item.id}>
            <strong>{item.title}</strong>
            <p dangerouslySetInnerHTML={{ __html: item.content }}>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Table;

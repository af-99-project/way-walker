import React, { useState, useEffect } from "react";
import {db} from "../firbase"
import { collection, getDocs } from "firebase/firestore"; 

function TeamInfo() {

    const [teamInfoData, setteamInfoData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "team"));
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setteamInfoData(data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <div className="teamInfo-container">
      <div class="teamInfo-header">
        <h1 class="teamInfo-title">마을 소개</h1>
        <p class="teamInfo-subtitle">
          함께 웃고 울고 모임의 시간이 설레이는
          <br /> 마을을 소개합니다!
        </p>
      </div>
      <ul>
      {teamInfoData.map((item) => (
         <li key={item.id} className="teamInfo-card">
              <h4 className="teamInfo-type">{item.villageName}</h4>
              <div className="teamInfo-members">
                <span>{item.chief}</span>,{item.members}
              </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamInfo;

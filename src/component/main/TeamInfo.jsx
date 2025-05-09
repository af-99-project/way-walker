import React, { useState, useEffect } from "react";
import { db } from "@/firbase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import TeamCard from "@/component/main/TeamCard";

function TeamInfo({ elementRef }) {
  const [teamInfoData, setTeamInfoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "team"), orderBy("id"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeamInfoData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="teamInfo-container" ref={elementRef}>
      <div className="teamInfo-header">
        <h1 className="teamInfo-title">마을 소개</h1>
        <p className="teamInfo-subtitle">
          함께 웃고 울고 모임의 시간이 설레이는
          <br /> 마을을 소개합니다!
        </p>
      </div>
      <ul>
        {teamInfoData.map((item) => (
          <TeamCard item={item} />
        ))}
      </ul>
    </div>
  );
}

export default TeamInfo;

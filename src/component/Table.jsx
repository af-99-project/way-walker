import React, { useState, useEffect } from "react";
import {db} from "../firbase"
import { collection, getDocs } from "firebase/firestore"; 


function Table() {
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
    <div className="tableWrap">
      <h3>예배순서</h3>
      <ul>
      {worshipData.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong>
            <p dangerouslySetInnerHTML={{ __html: item.content }}>
            </p>
          </li>
        ))}
        {/* <li>
          <strong>경배와 찬양</strong>
          <p>
            내 모든 삶의 행동 주안에/승리하였네
            <br />
            내 안에 부어주소서
            <br />
            나의 가장 낮은 마음
            <br />
            주님 마음 내게 주소서
            <br />
            나는 주님께 속한 자
          </p>
        </li>
        <li>
          <strong>사도신경</strong>
          <p>다함께</p>
        </li>
        <li>
          <strong>대표기도</strong>
          <p>
            <em>행복한</em> 명복음 청년
          </p>
        </li>
        <li>
          <strong>말씀</strong>
          <p>
            <em>요한계시록 3장 14-22절</em><br />
            <em>이루는</em> 정진아 목사님
          </p>
        </li>
        <li>
          <strong>광고</strong>
          <p>
            <em>지키는</em> 김지후 청년
          </p>
        </li>
        <li>
          <strong>축도</strong>
          <p>
            <em>이루는</em> 정진아 목사님
          </p>
        </li> */}
      </ul>
    </div>
  );
}

export default Table;

import React, { useEffect, useState } from "react";
import { db } from "../firbase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function PrayerShare() {
  const [prayerData, setPrayerData] = useState(null);

  const fetchPrayerData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "prayerTopics"));
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0];
        const data = { id: docData.id, ...docData.data() };
        setPrayerData(data);
      }
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
    }
  };

  useEffect(() => {
    fetchPrayerData();
  }, []);

  console.log(prayerData);

  return (
    <div className="prayerShareWrap">
      <h3>기도제목 나눔</h3>
      {prayerData && (
        <div className="main_prayer">
          <h4>{prayerData.title}</h4>
          <p>{prayerData.description}</p>
        </div>
      )}

      {prayerData && (
        <dl>
          <dt>
            개인
            <br />
            기도제목
          </dt>
          <dd>
            <strong className="person">{prayerData.blessingTitle}</strong>
            <p>{prayerData.blessingContent}</p>
          </dd>
        </dl>
      )}
      {prayerData && (
        <div className="account_wrap">
          <p>{prayerData.account}</p>
          <p>{prayerData.account2}</p>
        </div>
      )}
    </div>
  );
}

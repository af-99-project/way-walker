import { db } from "@/firbase";
import { doc, getDoc, updateDoc } from "firebase/firestore";;
import "@/styles/Admin.css";
import { useEffect, useState } from "react";

const Live = () => {
  const [isLive, setIsLive] = useState(false);

  const liveRef = doc(db, "live", "current");

  useEffect(() => {
    const fetchLive = async () => {
      const liveRef = doc(db, "live", "current");
      const snap = await getDoc(liveRef);

      if (snap.exists()) {
        setIsLive(!!snap.data().isLive);
      }
    };

    fetchLive();
  }, []);

  const toggleLive = async () => {
    const liveRef = doc(db, "live", "current");

    try {
      await updateDoc(liveRef, { isLive: !isLive });
      setIsLive(!isLive);
    } catch (err) {
      console.error("Live 상태 변경 오류:", err);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <div className="list-section">
          <h3 className="ad-title">실시간 예배 상태</h3>

          <p className="ad-content">
            현재 상태:
            <strong style={{ marginLeft: 8 }}>
              {isLive ? "LIVE ON 🔴" : "LIVE OFF ⚫"}
            </strong>
          </p>

          <div className="button-group">
            <button
              className="primary-button"
              onClick={toggleLive}
            >
              {isLive ? "라이브 종료" : "라이브 시작"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Live;
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { db, collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "../../firbase"; // Firebase 연결
import "../admincss/AdAdmin.css";

const AnalyticsAdmin = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventText, setEventText] = useState("");
  const [events, setEvents] = useState([]);
  const [editEventId, setEditEventId] = useState(null); // 🔹 수정할 이벤트 ID

  // 🔹 Firestore에서 이벤트 불러오기
  const fetchEvents = async () => {
    try {
      const snapshot = await getDocs(collection(db, "calendarEvents"));
      const eventData = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        date: docSnap.data().date,
        text: docSnap.data().text,
      }));
      setEvents(eventData);
    } catch (error) {
      console.error("이벤트 불러오기 오류:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // 🔹 이벤트 추가 & 수정
  const handleSaveEvent = async () => {
    if (!eventText.trim()) {
      alert("이벤트 내용을 입력하세요!");
      return;
    }

    try {
      if (editEventId) {
        // 🔹 수정 로직
        await updateDoc(doc(db, "calendarEvents", editEventId), {
          text: eventText.trim(),
        });
        alert("이벤트가 수정되었습니다!");
        setEditEventId(null);
      } else {
        // 🔹 새 이벤트 추가
        await addDoc(collection(db, "calendarEvents"), {
          date: selectedDate.toISOString().split("T")[0], // YYYY-MM-DD 형식
          text: eventText.trim(),
        });
        alert("이벤트가 추가되었습니다!");
      }
      setEventText("");
      fetchEvents();
    } catch (error) {
      console.error("이벤트 저장 오류:", error);
    }
  };

  // 🔹 이벤트 삭제
  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteDoc(doc(db, "calendarEvents", eventId));
      alert("이벤트가 삭제되었습니다!");
      fetchEvents();
    } catch (error) {
      console.error("이벤트 삭제 오류:", error);
    }
  };

  // 🔹 이벤트 수정 버튼 클릭 시
  const handleEditEvent = (event) => {
    setEventText(event.text);
    setEditEventId(event.id);
    setSelectedDate(new Date(event.date));
  };

  return (
    <div className="admin-container">
      {/* 캘린더 */}
      <Calendar onChange={setSelectedDate} value={selectedDate} />

      {/* 이벤트 추가 & 수정 섹션 */}
      <div className="form-section">
        <h3>
          {selectedDate.toDateString()} 이벤트 {editEventId ? "수정" : "추가"}
        </h3>
        <input
          type="text"
          value={eventText}
          onChange={(e) => setEventText(e.target.value)}
          placeholder="이벤트 내용을 입력하세요"
          className="input-field"
        />
        <div className="button-group">
          <button onClick={handleSaveEvent} className="primary-button">
            {editEventId ? "수정하기" : "추가하기"}
          </button>
          {editEventId && (
            <button
              onClick={() => {
                setEditEventId(null);
                setEventText("");
              }}
              className="secondary-button"
            >
              취소
            </button>
          )}
        </div>
      </div>

      {/* 등록된 이벤트 리스트 */}
      <div className="list-section">
        <h3>등록된 이벤트</h3>
        {events.length > 0 ? (
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                📅 {event.date}: {event.text}
                <div className="button-group">
                  <button onClick={() => handleEditEvent(event)} className="secondary-button">
                    수정
                  </button>
                  <button onClick={() => handleDeleteEvent(event.id)} className="delete-button">
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>등록된 이벤트가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default AnalyticsAdmin;

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { db, collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "@/firbase"; // Firebase 연결
import "@/styles/Admin.css";

const AnalyticsAdmin = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventText, setEventText] = useState("");
  const [allEvents, setAllEvents] = useState([]); // 🔹 전체 이벤트 저장
  const [filteredEvents, setFilteredEvents] = useState([]); // 🔹 선택한 날짜의 이벤트 저장
  const [editEventId, setEditEventId] = useState(null); // 🔹 수정할 이벤트 ID

  // 🔹 Firestore에서 모든 이벤트 가져오기
  const fetchEvents = async () => {
    try {
      const snapshot = await getDocs(collection(db, "calendarEvents"));
      const eventData = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        date: docSnap.data().date,
        text: docSnap.data().text,
      }));
      setAllEvents(eventData);
    } catch (error) {
      console.error("이벤트 불러오기 오류:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // 🔹 선택한 날짜에 맞는 이벤트 필터링
  useEffect(() => {
    const formattedDate = formatDateToLocal(selectedDate); // ✅ 한국 시간 변환 적용
    const filtered = allEvents.filter((event) => event.date === formattedDate);
    setFilteredEvents(filtered);
  }, [selectedDate, allEvents]);

  // 🔹 날짜를 YYYY-MM-DD 형식으로 변환하는 함수 (로컬 시간 기준)
  const formatDateToLocal = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 🔹 이벤트 추가 & 수정 함수 수정
  // 🔹 Firestore에 저장할 날짜도 KST 변환 적용
  const handleSaveEvent = async () => {
    if (!eventText.trim()) {
      alert("이벤트 내용을 입력하세요!");
      return;
    }

    try {
      const formattedDate = formatDateToLocal(selectedDate); // ✅ 한국 시간 변환 적용

      if (editEventId) {
        await updateDoc(doc(db, "calendarEvents", editEventId), {
          text: eventText.trim(),
        });
        alert("이벤트가 수정되었습니다!");
        setEditEventId(null);
      } else {
        await addDoc(collection(db, "calendarEvents"), {
          date: formattedDate, // ✅ 한국 시간 변환 적용
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
  // 🔹 Firestore에서 가져온 날짜를 한국 시간(KST) 기준으로 변환하는 함수
  const parseDateToKST = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // ✅ 시간 설정 없이 날짜만 변환 (UTC 영향 제거)
  };
  // 🔹 이벤트 수정 버튼 클릭 시 (날짜 밀림 문제 해결)
  const handleEditEvent = (event) => {
    setEventText(event.text);
    setEditEventId(event.id);
    setSelectedDate(parseDateToKST(event.date)); // ✅ 한국 시간 기준으로 변환
  };

  return (
    <div className="admin-container">
      {/* 캘린더 */}
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileContent={({ date, view }) => {
          if (view === "month") {
            const formattedDate = formatDateToLocal(date);
            const eventsForDate = allEvents.filter((event) => event.date === formattedDate);

            return (
              <div className="calendar-event-container">
                {eventsForDate.slice(0, 3).map((event, index) => (
                  <div key={index} className="event-block">
                    {event.text}
                  </div>
                ))}
                {eventsForDate.length > 3 && (
                  <div className="event-more">+{eventsForDate.length - 3}개 더보기</div>
                )}
              </div>
            );
          }
        }}
      />

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

      {/* 선택한 날짜의 등록된 이벤트 리스트 */}
      <div className="list-section">
        <h3>{selectedDate.toDateString()}의 이벤트</h3>
        {filteredEvents.length > 0 ? (
          <ul>
            {filteredEvents.map((event) => (
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
          <p>이 날짜에는 등록된 이벤트가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default AnalyticsAdmin;

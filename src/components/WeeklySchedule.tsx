import React, { useEffect, useState, useRef } from "react";
import Calendar from "react-calendar";
import { db, collection, getDocs } from "../firbase";
import moment from "moment";
import "react-calendar/dist/Calendar.css";

export function WeeklySchedule() {
  const elementRef = useRef(null);
  const [value, setValue] = useState(new Date());
  const [allEvents, setAllEvents] = useState([]);

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

  const selectedDateEvents = allEvents.filter(
    (event) => event.date === moment(value).format("YYYY-MM-DD")
  );

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            일정
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">교회 일정</h2>
          <p className="text-xl text-gray-600">함께 모여 하나님을 예배하고 교제하는 시간</p>
          <div className="calendarWrap" ref={elementRef}>
            <Calendar
              locale="ko-KR"
              calendarType="gregory"
              onChange={setValue}
              value={value}
              tileClassName={({ date, view }) => {
                if (view === "month") {
                  const formatted = moment(date).format("YYYY-MM-DD");
                  const hasEvent = allEvents.some((event) => event.date === formatted);
                  const day = date.getDay(); // 0 = 일요일, 6 = 토요일

                  if (hasEvent) {
                    return "calendar-has-event";
                  }

                  if (day === 0) return "calendar-sunday";
                  if (day === 6) return "calendar-saturday";
                  return "calendar-no-event";
                }
              }}
              formatDay={(locale, date) => moment(date).format("D")} // 일 제거 숫자만 보이게
            />
            <div className="scheduleData">
              <h3>{moment(value).format("YYYY년 MM월 DD일")}</h3>
              {selectedDateEvents.length > 0 ? (
                <ul>
                  {selectedDateEvents.map((event) => (
                    <li key={event.id}>{event.text}</li>
                  ))}
                </ul>
              ) : (
                <p>일정이 없숨당</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

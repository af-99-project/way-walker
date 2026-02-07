import React, { useEffect, useState, useRef } from "react";
import Calendar from "react-calendar";
import { db, collection, getDocs } from "../firbase";
import moment from "moment";
import "react-calendar/dist/Calendar.css";

type Props = {
  elementRef?: React.RefObject<HTMLElement>;
};

export function WeeklySchedule({ elementRef }: Props) {
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
    <section ref={elementRef} className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            일정
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">교회 일정</h2>
          <p className="text-xl text-gray-600">함께 모여 하나님을 예배하고 교제하는 시간</p>
          <div className="calendarWrap">
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
            <div className="scheduleData relative my-5 p-4 bg-white rounded-[20px] shadow-[0_4px_8px_rgba(0,0,0,0.05)] text-center before:content-[''] before:absolute before:top-[-20px] before:left-[25%] before:w-[2px] before:h-[20px] before:bg-[#dbdee4] after:content-[''] after:absolute after:top-[-20px] after:right-[25%] after:w-[2px] after:h-[20px] after:bg-[#dbdee4]">
              <h3 className="text-[20px] font-semibold mb-3">
                {moment(value).format("YYYY년 MM월 DD일")}
              </h3>

              {selectedDateEvents.length > 0 ? (
                <ul className="list-none p-0 m-0">
                  {selectedDateEvents.map((event) => (
                    <li
                      key={event.id}
                      className="p-3 mb-2 border border-[#e5e7eb] rounded-lg bg-[#f9fafb] transition-colors duration-200 hover:bg-[#f3f4f6]"
                    >
                      {event.text}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#6b5a44] italic">일정이 없숨당</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

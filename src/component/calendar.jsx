import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { db, collection, getDocs } from "../firbase";
import moment from "moment";
import 'react-calendar/dist/Calendar.css';

function CalendarTab({ elementRef }) {
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

  const selectedDateEvents = allEvents.filter(event => 
    event.date === moment(value).format("YYYY-MM-DD") 
  );

  return (
    <div ref={elementRef}>
      <Calendar onChange={setValue} value={value} />
      <div>
        <h3>{moment(value).format("YYYY년 MM월 DD일")}</h3>
        {selectedDateEvents.length > 0 ? (
          <ul>
            {selectedDateEvents.map(event => (
              <li key={event.id}>{event.text}</li> 
            ))}
          </ul>
        ) : (
          <p>일정이 없숨당</p>
        )}
      </div>
    </div>
  );
}

export default CalendarTab;
import React, { useEffect } from "react";
import { useState } from "react";
import Calendar from "react-calendar";

function CalendarTab() {
  const [value, onChange] = useState(new Date());
  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <div>
      <Calendar onChange={onChange} value={value} />
      <p>test이거는 로보토가 나와야해요 그래ㅑ여</p>
    </div>
  );
}

export default CalendarTab;

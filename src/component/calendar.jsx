import React, { useEffect } from "react";
import { useState } from "react";
import Calendar from "react-calendar";

function CalendarTab({elementRef}) {
  const [value, onChange] = useState(new Date());
  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <div ref={elementRef}>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

export default CalendarTab;

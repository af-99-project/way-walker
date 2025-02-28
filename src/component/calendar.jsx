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
    </div>
  );
}

export default CalendarTab;

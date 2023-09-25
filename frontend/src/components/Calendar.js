import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

export default function CalendarGfg() {
  const [dateState, setDateState] = useState(new Date());
  const changeDate = (e) => {
    setDateState(e);
  };
  return (
    <>
      <h4>Attendance Calendar</h4>
      <Calendar value={dateState} onChange={changeDate} />
      <p >
        Current selected date is{" "}
        <b>{moment(dateState).format("Do MMMM YY")}</b>
      </p>
    </>
  );
}

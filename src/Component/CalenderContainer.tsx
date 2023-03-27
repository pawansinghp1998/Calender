import React from "react";
import Calender from "./CalenderScreen";
import { useState } from "react";
import "./CalenderContainer.css";
const moment = require("moment");

const CalenderContainer = () => {
  let date = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(date.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(date.getFullYear());
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<number>(0);

  const handleDateInput = (value: string) => {
    if (moment(value, "YYYY/MM/DD", true).isValid()) {
      setCurrentMonth(+value.substring(5, 7) - 1);
      setCurrentYear(+value.substring(0, 4));
      setCurrentDate(+value.substring(8, 10));
      setErrorMessage("");
    } else {
      if (value.length > 0) setErrorMessage("Please Enter a Valid Date");
      else {
        setErrorMessage("");
      }
    }
  };
  return (
    <div className="calender-container">
      <div className="input-box">
        <input
          placeholder="YYYY/MM/DD"
          onChange={(e) => handleDateInput(e.target.value)}
        />
        {errorMessage.length > 0 && (
          <div className="err-msg">{errorMessage}</div>
        )}
      </div>
      <Calender
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        currentYear={currentYear}
        setCurrentYear={setCurrentYear}
        currentDate={currentDate}
      />
    </div>
  );
};

export default CalenderContainer;

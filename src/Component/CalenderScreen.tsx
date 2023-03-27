import React from "react";
import "./Calender.css";
import { useEffect } from "react";
import { ICalenderScreen } from "./types";
import { month } from "./constants";
const Calender = (props: ICalenderScreen) => {
  const {
    currentYear,
    setCurrentYear,
    currentMonth,
    setCurrentMonth,
    currentDate,
  } = props;
  let date = new Date();
  let firstDayMonth = new Date(currentYear, currentMonth, 1).getDay();
  let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let lastDayOfMonth = new Date(
    currentYear,
    currentMonth,
    lastDateOfMonth
  ).getDay();
  let lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();

  const renderCurrentMonthDays = () => {
    let listTag = [];
    for (let i = 1; i <= lastDateOfMonth; i++) {
      let isToday =
        (i === date.getDate() &&
          currentMonth === new Date().getMonth() &&
          currentYear === new Date().getFullYear()) ||
        currentDate === i
          ? "active"
          : "";
      listTag.push(<li className={isToday} key={i}>{`${i}`}</li>);
    }
    return listTag;
  };

  const renderLastMonthDays = () => {
    let listTag = [];
    for (let i = firstDayMonth; i > 0; i--) {
      listTag.push(
        <li className="inactive" key={i}>{`${lastDateOfLastMonth - i + 1}`}</li>
      );
    }
    return listTag;
  };

  const renderNextMonthDays = () => {
    let listTag = [];
    for (let i = lastDayOfMonth; i < 6; i++) {
      listTag.push(
        <li className="inactive" key={i}>{`${i - lastDayOfMonth + 1}`}</li>
      );
    }
    return listTag;
  };

  useEffect(() => {
    if (currentMonth - 1 < 0 || currentMonth + 1 > 11) {
      date = new Date(currentYear, currentMonth);
      setCurrentYear(date.getFullYear());
      setCurrentMonth(date.getMonth());
    }
  }, [currentMonth]);

  const handleBackward = () => {
    setCurrentMonth(currentMonth - 1);
  };

  const handleForward = () => {
    setCurrentMonth(currentMonth + 1);
  };

  return (
    <div className="wrapper">
      <header>
        <div className="icons">
          <span onClick={() => handleBackward()}>{`<`}</span>
        </div>
        <p className="current-date">{`${month[currentMonth]}  ${currentYear}`}</p>
        <div className="icons">
          <span onClick={() => handleForward()}>{`>`}</span>
        </div>
      </header>
      <div className="calender">
        <ul className="weeks">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul className="days">
          {renderLastMonthDays()}
          {renderCurrentMonthDays()}
          {renderNextMonthDays()}
        </ul>
      </div>
    </div>
  );
};

export default Calender;

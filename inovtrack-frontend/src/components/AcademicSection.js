import React, { useState } from "react";
import Calendar from "react-calendar";
import "./AcademicSection.css";
import "react-calendar/dist/Calendar.css";

const AcademicSection = () => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); // State to track calendar visibility
  const [date, setDate] = useState(new Date());

  // Define holiday dates
  const holidays = [
    new Date(2024, 0, 26), // Republic Day - Jan 26, 2024
    new Date(2024, 8, 15), // Independence Day - Sep 15, 2024
    new Date(2024, 10, 14), // Diwali - Nov 14, 2024
  ];

  // Function to check if a date is a holiday
  const isHoliday = (date) =>
    holidays.some(
      (holiday) =>
        holiday.getDate() === date.getDate() &&
        holiday.getMonth() === date.getMonth() &&
        holiday.getFullYear() === date.getFullYear()
    );

  return (
    <div className="academic-section">
  <h2>Academic Information</h2>
  <div className="info-field">Semester: III</div>
  <div className="info-field">CGPA: 9.00</div>
  <div className="info-field">Year: II</div>
  <div className="info-field">SAP ID: 64</div>

  {/* Centered Buttons */}
  <div className="button-container">
    {/* Semester Results Button */}
    <button className="sem-result-button">View Semester Results</button>

    {/* Toggle Calendar Button */}
    <button
      className="sem-result-button"
      onClick={() => setIsCalendarVisible((prev) => !prev)}
    >
      {isCalendarVisible ? "Close Calendar" : "View Calendar"}
    </button>
  </div>

  {/* Conditional Rendering of Calendar */}
  {isCalendarVisible && (
    <div className="calendar-container">
      <h3>Academic Calendar</h3>
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date, view }) =>
          view === "month" && isHoliday(date) ? "holiday" : null
        }
      />
    </div>
  )}
</div>

  );
};

export default AcademicSection;

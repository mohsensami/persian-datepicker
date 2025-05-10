import React, { useState, useEffect } from "react";
import {
  toJalaali,
  toGregorian,
  jalaaliMonthLength,
  isValidJalaaliDate,
} from "jalaali-js";
import "./PersianDatePicker.css";

interface PersianDatePickerProps {
  value?: Date | string | null;
  onChange: (date: Date) => void;
  className?: string;
  placeholder?: string;
  inputClass?: string;
  calendarClass?: string;
  disabled?: boolean;
  minDate?: Date | string;
  maxDate?: Date | string;
  showTodayButton?: boolean;
  todayButtonText?: string;
}

const PersianDatePicker: React.FC<PersianDatePickerProps> = ({
  value,
  onChange,
  className = "",
  placeholder = "تاریخ را انتخاب کنید",
  inputClass = "",
  calendarClass = "",
  disabled = false,
  minDate,
  maxDate,
  showTodayButton = true,
  todayButtonText = "امروز",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [inputValue, setInputValue] = useState<string>("");

  // Parse initial value
  useEffect(() => {
    if (value) {
      const date = typeof value === "string" ? new Date(value) : value;
      if (!isNaN(date.getTime())) {
        setCurrentDate(date);
        setInputValue(formatJalaaliDate(date));
      }
    }
  }, [value]);

  const toggleCalendar = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const formatJalaaliDate = (date: Date): string => {
    if (!date || isNaN(date.getTime())) return "";
    const { jy, jm, jd } = toJalaali(date);
    return `${jy}/${jm < 10 ? "0" + jm : jm}/${jd < 10 ? "0" + jd : jd}`;
  };

  const handleDateClick = (day: number, month: number, year: number) => {
    const gregorianDate = toGregorian(year, month, day);
    const selectedDate = new Date(
      gregorianDate.gy,
      gregorianDate.gm - 1,
      gregorianDate.gd
    );

    setCurrentDate(selectedDate);
    setInputValue(formatJalaaliDate(selectedDate));
    onChange(selectedDate);
    setIsOpen(false);
  };

  const goToPreviousMonth = () => {
    const { jy, jm } = toJalaali(currentDate);
    const newMonth = jm === 1 ? 12 : jm - 1;
    const newYear = jm === 1 ? jy - 1 : jy;
    const newDate = toGregorian(newYear, newMonth, 1);
    setCurrentDate(new Date(newDate.gy, newDate.gm - 1, newDate.gd));
  };

  const goToNextMonth = () => {
    const { jy, jm } = toJalaali(currentDate);
    const newMonth = jm === 12 ? 1 : jm + 1;
    const newYear = jm === 12 ? jy + 1 : jy;
    const newDate = toGregorian(newYear, newMonth, 1);
    setCurrentDate(new Date(newDate.gy, newDate.gm - 1, newDate.gd));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setInputValue(formatJalaaliDate(today));
    onChange(today);
    setIsOpen(false);
  };

  const isDateDisabled = (
    day: number,
    month: number,
    year: number
  ): boolean => {
    const date = toGregorian(year, month, day);
    const gregDate = new Date(date.gy, date.gm - 1, date.gd);

    if (minDate) {
      const min = typeof minDate === "string" ? new Date(minDate) : minDate;
      if (gregDate < min) return true;
    }

    if (maxDate) {
      const max = typeof maxDate === "string" ? new Date(maxDate) : maxDate;
      if (gregDate > max) return true;
    }

    return false;
  };

  const renderCalendar = () => {
    const { jy: year, jm: month } = toJalaali(currentDate);
    const daysInMonth = jalaaliMonthLength(year, month);
    const firstDay = toGregorian(year, month, 1);
    const firstDayDate = new Date(firstDay.gy, firstDay.gm - 1, firstDay.gd);
    const startingDayOfWeek = firstDayDate.getDay();
    const persianStartingDay = (startingDayOfWeek + 1) % 7;

    const days: JSX.Element[] = [];
    let dayCounter = 1;

    const monthNames = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];

    for (let i = 0; i < 6; i++) {
      const week: JSX.Element[] = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < persianStartingDay) || dayCounter > daysInMonth) {
          week.push(<td key={`empty-${i}-${j}`} className="empty"></td>);
        } else {
          const isDisabled = isDateDisabled(dayCounter, month, year);
          const isSelected =
            value &&
            formatJalaaliDate(
              typeof value === "string" ? new Date(value) : value
            ) ===
              `${year}/${month < 10 ? "0" + month : month}/${
                dayCounter < 10 ? "0" + dayCounter : dayCounter
              }`;

          week.push(
            <td
              key={`day-${dayCounter}`}
              className={`day ${isDisabled ? "disabled" : ""} ${
                isSelected ? "selected" : ""
              }`}
              onClick={() =>
                !isDisabled && handleDateClick(dayCounter, month, year)
              }
            >
              {dayCounter}
            </td>
          );
          dayCounter++;
        }
      }
      days.push(<tr key={`week-${i}`}>{week}</tr>);
      if (dayCounter > daysInMonth) break;
    }

    return (
      <div className={`calendar ${calendarClass}`}>
        <div className="calendar-header">
          <button type="button" onClick={goToPreviousMonth}>
            &#10094;
          </button>
          <span>
            {monthNames[month - 1]} {year}
          </span>
          <button type="button" onClick={goToNextMonth}>
            &#10095;
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ش</th>
              <th>ی</th>
              <th>د</th>
              <th>س</th>
              <th>چ</th>
              <th>پ</th>
              <th>ج</th>
            </tr>
          </thead>
          <tbody>{days}</tbody>
        </table>
        {showTodayButton && (
          <div className="today-button-container">
            <button type="button" onClick={goToToday} className="today-button">
              {todayButtonText}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`persian-date-picker ${className}`}>
      <input
        type="text"
        value={inputValue}
        readOnly
        onClick={toggleCalendar}
        className={`date-input ${inputClass}`}
        placeholder={placeholder}
        disabled={disabled}
      />
      {isOpen && (
        <>
          <div className="calendar-backdrop" onClick={() => setIsOpen(false)} />
          {renderCalendar()}
        </>
      )}
    </div>
  );
};

export default PersianDatePicker;

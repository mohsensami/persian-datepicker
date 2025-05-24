import React, { useState, useEffect, useRef } from "react";
import { toJalaali, toGregorian, jalaaliMonthLength } from "jalaali-js";
import "./PersianDatePicker.css";

function toPersianNumber(value: number | string): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return value.toString().replace(/\d/g, (d) => persianDigits[parseInt(d)]);
}

interface PersianDatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  calendarClassName?: string;
  todayButtonText?: string;
}

const persianMonthNames = [
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

const persianWeekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

function formatJalaali(date: Date | null): string {
  if (!date || isNaN(date.getTime())) return "";
  const localDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    12,
    0,
    0
  );
  const { jy, jm, jd } = toJalaali(localDate);
  return `${toPersianNumber(jy)}/${toPersianNumber(
    jm.toString().padStart(2, "0")
  )}/${toPersianNumber(jd.toString().padStart(2, "0"))}`;
}

function clampDate(date: Date, min?: Date, max?: Date): Date {
  if (min && date < min) return min;
  if (max && date > max) return max;
  return date;
}

const PersianDatePicker: React.FC<PersianDatePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = "تاریخ را انتخاب کنید",
  disabled = false,
  className = "",
  inputClassName = "",
  calendarClassName = "",
  todayButtonText = "امروز",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(() => value || new Date());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) setViewDate(value);
  }, [value]);

  // Close calendar on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest(".pdp-calendar")
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  const { jy, jm } = toJalaali(viewDate);
  const daysInMonth = jalaaliMonthLength(jy, jm);
  const firstDay = new Date(
    toGregorian(jy, jm, 1).gy,
    toGregorian(jy, jm, 1).gm - 1,
    1
  );
  const startDayOfWeek = (firstDay.getDay() + 1) % 7; // Persian week starts on Saturday

  function isDisabled(day: number): boolean {
    const g = toGregorian(jy, jm, day);
    const d = new Date(g.gy, g.gm - 1, g.gd);
    if (minDate && d < minDate) return true;
    if (maxDate && d > maxDate) return true;
    return false;
  }

  function handleDayClick(day: number) {
    if (isDisabled(day)) return;
    const g = toGregorian(jy, jm, day);
    const d = new Date(g.gy, g.gm - 1, g.gd, 12, 0, 0);
    onChange(clampDate(d, minDate, maxDate));
    setIsOpen(false);
  }

  function handlePrevMonth() {
    let newMonth = jm - 1;
    let newYear = jy;
    if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }
    const g = toGregorian(newYear, newMonth, 1);
    setViewDate(new Date(g.gy, g.gm - 1, g.gd));
  }

  function handleNextMonth() {
    let newMonth = jm + 1;
    let newYear = jy;
    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    }
    const g = toGregorian(newYear, newMonth, 1);
    setViewDate(new Date(g.gy, g.gm - 1, g.gd));
  }

  function handleToday() {
    const today = new Date();
    const noonToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      12,
      0,
      0
    );
    onChange(clampDate(noonToday, minDate, maxDate));
    setIsOpen(false);
  }

  function isSelected(day: number): boolean {
    if (!value) return false;
    const g = toGregorian(jy, jm, day);
    const selectedDate = new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate(),
      12,
      0,
      0
    );
    const compareDate = new Date(g.gy, g.gm - 1, g.gd, 12, 0, 0);
    return selectedDate.getTime() === compareDate.getTime();
  }

  // Calendar grid
  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = Array(startDayOfWeek).fill(null);
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  return (
    <div className={`pdp-root ${className}`}>
      <input
        ref={inputRef}
        type="text"
        className={`pdp-input ${inputClassName}`}
        value={formatJalaali(value)}
        onClick={() => !disabled && setIsOpen((o) => !o)}
        placeholder={placeholder}
        readOnly
        disabled={disabled}
      />
      {isOpen && (
        <div className={`pdp-calendar ${calendarClassName}`}>
          <div className="pdp-header">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="pdp-nav-button"
              aria-label="ماه قبل"
            >
              &#10094;
            </button>
            <span className="pdp-month-year">
              {persianMonthNames[jm - 1]} {toPersianNumber(jy)}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="pdp-nav-button"
              aria-label="ماه بعد"
            >
              &#10095;
            </button>
          </div>
          <table>
            <thead>
              <tr>
                {persianWeekDays.map((d) => (
                  <th key={d}>{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, i) => (
                <tr key={i}>
                  {week.map((day, j) =>
                    day ? (
                      <td
                        key={j}
                        onClick={() => handleDayClick(day)}
                        aria-disabled={isDisabled(day)}
                        style={{
                          background: isSelected(day) ? "#1976d2" : undefined,
                          color: isSelected(day) ? "#fff" : undefined,
                        }}
                      >
                        {toPersianNumber(day)}
                      </td>
                    ) : (
                      <td key={j} />
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 12, textAlign: "center" }}>
            <button
              type="button"
              onClick={handleToday}
              className="pdp-today-button"
            >
              {todayButtonText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersianDatePicker;

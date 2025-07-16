import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import calenderImage from "../../public/Assets/calender-vector.svg"; // Adjust path as needed

const LabeledDatePicker = ({
  label,
  name,
  value,
  register,
  onChange,
  required ,
  placeholder = "",
  showDay ,
  showMonth ,
  showYear ,
}) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const datePickerRef = useRef(null);
  const hiddenDateInputRef = useRef(null);
  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  // Parse initial value
  useEffect(() => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        setDay(String(date.getDate()).padStart(2, "0"));
        setMonth(String(date.getMonth() + 1).padStart(2, "0"));
        setYear(String(date.getFullYear()));
      }
    }
  }, [value]);

  // Date change notifier
  useEffect(() => {
    if ((showDay ? day : true) && (showMonth ? month : true) && (showYear ? year : true)) {
      const dateStr = `${showYear ? year : "0000"}-${showMonth ? month.padStart(2, "0") : "01"}-${showDay ? day.padStart(2, "0") : "01"}`;
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        onChange?.({ target: { name, value: dateStr } });
      }
    }
  }, [day, month, year]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handlers
  const handleDayChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 2) val = val.slice(0, 2);
    if (val === "" || (parseInt(val) >= 1 && parseInt(val) <= 31)) {
      setDay(val);
      // Auto-focus month if 2 digits entered and showMonth is true
      if (val.length === 2 && showMonth && monthRef.current) {
        monthRef.current.focus();
      }
    }
  };

  const handleMonthChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 2) val = val.slice(0, 2);
    // Allow leading zero, but only up to 2 digits
    if (val === "" || (val.length === 1 && parseInt(val) >= 0 && parseInt(val) <= 1) || (val.length === 2 && parseInt(val) >= 1 && parseInt(val) <= 12)) {
      setMonth(val);
      // Auto-focus year if 2 digits entered and showYear is true
      if (val.length === 2 && showYear && yearRef.current) {
        yearRef.current.focus();
      }
    }
  };

  const handleYearChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 4) val = val.slice(0, 4);
    setYear(val);
  };

  // Handle Enter key to jump to next input
  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter" && nextRef && nextRef.current) {
      nextRef.current.focus();
      e.preventDefault();
    }
  };

  // Handler for native date picker
  const handleNativeDateChange = (e) => {
    const val = e.target.value;
    if (val) {
      const [yyyy, mm, dd] = val.split("-");
      setDay(dd);
      setMonth(mm);
      setYear(yyyy);
    }
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const selectDate = (selectedDay) => {
    setDay(String(selectedDay).padStart(2, "0"));
    setMonth(String(currentMonth + 1).padStart(2, "0"));
    setYear(String(currentYear));
    setShowDatePicker(false);
  };

  const navigateMonth = (direction) => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const renderCalendar = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const isSelected = parseInt(day) === d &&
        parseInt(month) === currentMonth + 1 &&
        parseInt(year) === currentYear;

      days.push(
        <button
          key={d}
          onClick={() => selectDate(d)}
          className={`w-8 h-8 text-sm rounded flex items-center justify-center transition 
            ${isSelected ? "bg-blue-500 text-white" : "hover:bg-blue-100 text-gray-700"}`}
        >
          {d}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="flex flex-col space-y-1.5 w-full">
      <label htmlFor={name} className="text-sm font-source-sans font-semibold">
        {label} {required && <span className="text-red-700">*</span>}
      </label>

      <div className="relative w-full"> {/* Ensure relative container is full width */}
        <div className="flex w-full items-center space-x-2"> {/* Already w-full */}
          {showDay && (
            <>
              <div className="flex flex-col items-center w-full"> {/* Make input full width */}
                <input
                  ref={dayRef}
                  type="text"
                  placeholder="DD"
                  value={day}
                  onChange={handleDayChange}
                  maxLength={2}
                  className="w-full border border-greyforoutline font-source-sans rounded-md p-2 text-center focus:outline-none focus:ring-2 focus:ring-primary"
                  onKeyDown={(e) => handleKeyDown(e, monthRef)}
                />
              </div>
              
            </>
          )}

          {showMonth && (
            <>
              <div className="flex flex-col items-center w-full"> {/* Make input full width */}
                <input
                  ref={monthRef}
                  type="text"
                  placeholder="MM"
                  value={month}
                  onChange={handleMonthChange}
                  maxLength={2}
                  className="w-full border border-greyforoutline font-source-sans rounded-md p-2 text-center focus:outline-none focus:ring-2 focus:ring-primary"
                  onKeyDown={(e) => handleKeyDown(e, yearRef)}
                />
              </div>
              
            </>
          )}

          {showYear && (
            <div className="flex flex-col items-center w-full"> {/* Make input full width */}
              <input
                ref={yearRef}
                type="text"
                placeholder="YYYY"
                value={year}
                onChange={handleYearChange}
                maxLength={4}
                className="w-full border border-greyforoutline font-source-sans rounded-md p-2 text-center focus:outline-none focus:ring-2 focus:ring-primary"
                onKeyDown={(e) => handleKeyDown(e, null)}
              />
            </div>
          )}

          {/* Calendar Icon */}
          {showDay && showMonth && showYear && (
            <>
              <button
                type="button"
                onClick={() => hiddenDateInputRef.current && hiddenDateInputRef.current.showPicker && hiddenDateInputRef.current.showPicker()}
                className="text-xl px-2 pb-1 text-gray-500 hover:text-blue-600"
              >
                <Image src={calenderImage} alt="Calendar Icon" className="w-12 h-5" />
              </button>
              <input
                ref={hiddenDateInputRef}
                type="date"
                style={{ display: "none" }}
                onChange={handleNativeDateChange}
                value={
                  showYear && showMonth && showDay && year && month && day
                    ? `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
                    : ""
                }
                min="1900-01-01"
                max="2100-12-31"
              />
            </>
          )}
        </div>

        {/* Calendar Popup */}
        {showDatePicker && (
          <div
            ref={datePickerRef}
            className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10 w-80"
          >
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => navigateMonth("prev")}
                className="text-lg px-2 hover:bg-gray-100 rounded"
              >
                ‹
              </button>
              <span className="font-semibold text-gray-700">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <button
                onClick={() => navigateMonth("next")}
                className="text-lg px-2 hover:bg-gray-100 rounded"
              >
                ›
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <div
                  key={d}
                  className="w-8 h-8 text-xs text-gray-500 flex items-center justify-center font-semibold"
                >
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {renderCalendar()}
            </div>
          </div>
        )}
      </div>

      {/* Hidden input */}
      <input
        type="hidden"
        name={name}
        value={
          (showDay ? day : "01") &&
          (showMonth ? month : "01") &&
          (showYear ? year : "0000")
            ? `${showYear ? year : "0000"}-${showMonth ? month.padStart(2, "0") : "01"}-${showDay ? day.padStart(2, "0") : "01"}`
            : ""
        }
        {...(register ? register(name) : {})}
      />
    </div>
  );
};

export default LabeledDatePicker;

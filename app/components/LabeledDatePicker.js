// components/LabeledDatePicker.jsx
'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import calenderImage from '../../public/Assets/calender-vector.svg';

const LabeledDatePicker = ({
  label,
  name,
  value,
  defaultValue,
  register,
  setValue,
  onChange,
  required = false,
  showDay,
  showMonth,
  showYear,
}) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const datePickerRef = useRef(null);
  const hiddenDateInputRef = useRef(null);
  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  // --- Sync internal state from `value` or `defaultValue` ---
  // This runs every time value/defaultValue changes (e.g., on form switch)
  useEffect(() => {
    const valueToUse = value !== undefined ? value : defaultValue;
    if (valueToUse) {
      const date = new Date(valueToUse);
      if (!isNaN(date.getTime())) {
        if (showDay) setDay(String(date.getDate()).padStart(2, '0'));
        if (showMonth) setMonth(String(date.getMonth() + 1).padStart(2, '0'));
        if (showYear) setYear(String(date.getFullYear()));
        // Sync calendar view
        setCurrentMonth(date.getMonth());
        setCurrentYear(date.getFullYear());
      }
    } else {
      // Clear if no value provided
      if (showDay) setDay('');
      if (showMonth) setMonth('');
      if (showYear) setYear('');
    }
  }, [value, defaultValue, showDay, showMonth, showYear]);

  // --- Update hidden field and notify parent ---
  const updateDateValue = (d, m, y) => {
    const hasDay = showDay && d;
    const hasMonth = showMonth && m;
    const hasYear = showYear && y;

    if (hasDay || hasMonth || hasYear) {
      const finalDay = hasDay ? d : '01';
      const finalMonth = hasMonth ? m : '01';
      const finalYear = hasYear ? y : new Date().getFullYear();

      const dateStr = `${finalYear}-${finalMonth.padStart(2, '0')}-${finalDay.padStart(2, '0')}`;
      const date = new Date(dateStr);

      // Validate date (e.g., Feb 30 → invalid)
      if (
        !isNaN(date.getTime()) &&
        date.getFullYear() === parseInt(finalYear) &&
        date.getMonth() + 1 === parseInt(finalMonth) &&
        date.getDate() === parseInt(finalDay)
      ) {
        // Notify React Hook Form
        if (setValue) setValue(name, dateStr);
        if (onChange) onChange({ target: { name, value: dateStr } });
        return;
      }
    }

    // Invalid or incomplete → clear
    if (setValue) setValue(name, '');
    if (onChange) onChange({ target: { name, value: '' } });
  };

  // --- Input handlers ---
  const handleDayChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    if (val === '' || (parseInt(val) >= 1 && parseInt(val) <= 31)) {
      setDay(val);
      updateDateValue(val, month, year);
      if (val.length === 2 && showMonth && monthRef.current) {
        monthRef.current.focus();
      }
    }
  };

  const handleMonthChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    if (val === '' || (parseInt(val) >= 1 && parseInt(val) <= 12)) {
      setMonth(val);
      updateDateValue(day, val, year);
      if (val.length === 2 && showYear && yearRef.current) {
        yearRef.current.focus();
      }
    }
  };

  const handleYearChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setYear(val);
    updateDateValue(day, month, val);
  };

  // --- Keyboard navigation ---
  const handleKeyDown = (e, nextRef) => {
    if (e.key === 'Enter' && nextRef?.current) {
      nextRef.current.focus();
      e.preventDefault();
    }
  };

  // --- Native date picker sync ---
  const handleNativeDateChange = (e) => {
    const val = e.target.value;
    if (val) {
      const [yyyy, mm, dd] = val.split('-');
      setDay(dd);
      setMonth(mm);
      setYear(yyyy);
      updateDateValue(dd, mm, yyyy);
    }
  };

  // --- Calendar functions ---
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const selectDate = (selectedDay) => {
    const d = String(selectedDay).padStart(2, '0');
    const m = String(currentMonth + 1).padStart(2, '0');
    const y = String(currentYear);
    setDay(d);
    setMonth(m);
    setYear(y);
    updateDateValue(d, m, y);
    setShowDatePicker(false);
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
      setCurrentYear((prev) => (currentMonth === 0 ? prev - 1 : prev));
    } else {
      setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
      setCurrentYear((prev) => (currentMonth === 11 ? prev + 1 : prev));
    }
  };

  const renderCalendar = () => {
    const days = [];
    const totalDays = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

    // Empty placeholders for days before 1st
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    // Day buttons
    for (let d = 1; d <= totalDays; d++) {
      const isSelected =
        day === String(d).padStart(2, '0') &&
        month === String(currentMonth + 1).padStart(2, '0') &&
        year === String(currentYear);

      days.push(
        <button
          key={d}
          type="button"
          onClick={() => selectDate(d)}
          className={`w-8 h-8 text-sm rounded transition flex items-center justify-center
            ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-blue-100 text-gray-700'}`}
        >
          {d}
        </button>
      );
    }

    return days;
  };

  // --- Close on outside click ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- Final value for hidden input ---
  const finalValue = (() => {
    const hasDay = showDay && day;
    const hasMonth = showMonth && month;
    const hasYear = showYear && year;

    if (hasDay || hasMonth || hasYear) {
      const d = hasDay ? day : '01';
      const m = hasMonth ? month : '01';
      const y = hasYear ? year : new Date().getFullYear();

      const dateStr = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
      const date = new Date(dateStr);

      if (
        !isNaN(date.getTime()) &&
        date.getFullYear() === parseInt(y) &&
        date.getMonth() + 1 === parseInt(m) &&
        date.getDate() === parseInt(d)
      ) {
        return dateStr;
      }
    }
    return '';
  })();

  return (
    <div className="flex flex-col space-y-1.5 w-full">
      <label htmlFor={name} className="text-sm font-source-sans font-semibold">
        {label} {required && <span className="text-redimportant">*</span>}
      </label>

      <div className="relative w-full">
        <div className="flex w-full items-center space-x-2">
          {showDay && (
            <div className="flex flex-col items-center w-full">
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
          )}
          {showMonth && (
            <div className="flex flex-col items-center w-full">
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
          )}
          {showYear && (
            <div className="flex flex-col items-center w-full">
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

          {/* Calendar Button */}
          {showDay && showMonth && showYear && (
            <>
              <button
                type="button"
                onClick={() => hiddenDateInputRef.current?.showPicker?.()}
                className="text-xl px-2 pb-1 text-gray-500 hover:text-blue-600"
              >
                <Image src={calenderImage} alt="Calendar Icon" className="w-12 h-5" />
              </button>
              <input
                ref={hiddenDateInputRef}
                type="date"
                style={{ display: 'none' }}
                onChange={handleNativeDateChange}
                value={day && month && year ? `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}` : ''}
                min="1900-01-01"
                max="2100-12-31"
              />
            </>
          )}
        </div>

        {/* Calendar Popup */}
        {showDatePicker && (
          <div ref={datePickerRef} className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10 w-80">
            <div className="flex items-center justify-between mb-3">
              <button type="button" onClick={() => navigateMonth('prev')} className="text-lg px-2 hover:bg-gray-100 rounded">
                ‹
              </button>
              <span className="font-semibold text-gray-700">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <button type="button" onClick={() => navigateMonth('next')} className="text-lg px-2 hover:bg-gray-100 rounded">
                ›
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2 text-xs font-semibold text-gray-500">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div key={day} className="w-8 h-8 flex items-center justify-center">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
          </div>
        )}
      </div>

      {/* Hidden input for form registration */}
      <input
        type="hidden"
        name={name}
        value={finalValue}
        {...(register ? register(name) : {})}
      />
    </div>
  );
};

export default LabeledDatePicker;
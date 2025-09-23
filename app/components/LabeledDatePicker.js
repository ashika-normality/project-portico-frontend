'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import calendarImage from '../../public/Assets/calendar.png';

const LabeledDatePicker = ({
  label,
  name,
  value,
  defaultValue,
  register,
  setValue,
  onChange,
  required = false,
  disabled = false,
  minDate,
  maxDate,
}) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState('days'); // 'days', 'months', 'years'
  const [error, setError] = useState('');


  const datePickerRef = useRef(null);
  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  useEffect(() => {
    const val = value || defaultValue;
    if (val) {
      const d = new Date(val);
      if (!isNaN(d)) {
        setDay(String(d.getDate()).padStart(2, '0'));
        setMonth(String(d.getMonth() + 1).padStart(2, '0'));
        setYear(String(d.getFullYear()));
        setCurrentMonth(d.getMonth());
        setCurrentYear(d.getFullYear());
      }
    }
  }, [value, defaultValue]);

  const validateDate = (d, m, y) => {
    setError('');
    if (!d || !m || !y) return true;

    const dayNum = parseInt(d, 10);
    const monthNum = parseInt(m, 10);
    const yearNum = parseInt(y, 10);

    if (monthNum < 1 || monthNum > 12) {
      setError('Invalid month');
      return false;
    }

    const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
    if (dayNum < 1 || dayNum > daysInMonth) {
      setError('Invalid day');
      return false;
    }

    const dateObj = new Date(`${yearNum}-${String(monthNum).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`);

    if (maxDate && dateObj > maxDate) {
      setError('Date cannot be in the future');
      return false;
    }

    if (minDate && dateObj < minDate) {
      setError('Expiry dates cannot be before issued date');
      return false;
    }

    setError('');
    return true;
  };

  const updateDateValue = (d, m, y) => {
    if (!d && !m && !y) {
      if (setValue) setValue(name, '');
      if (onChange) onChange({ target: { name, value: '' } });
      return;
    }

    if (!validateDate(d, m, y)) {
      if (setValue) setValue(name, '');
      if (onChange) onChange({ target: { name, value: '' } });
      return;
    }

    const finalDay = d || '01';
    const finalMonth = m || '01';
    const finalYear = y || new Date().getFullYear();

    const dateStr = `${finalYear}-${finalMonth.padStart(2, '0')}-${finalDay.padStart(2, '0')}`;
    if (setValue) setValue(name, dateStr);
    if (onChange) onChange({ target: { name, value: dateStr } });
  };


  const handleDayChange = (e) => {
    if (disabled) return;
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setDay(val);
    updateDateValue(val, month, year);
    if (val.length === 2) monthRef.current?.focus();
  };

  const handleMonthChange = (e) => {
    if (disabled) return;
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setMonth(val);
    updateDateValue(day, val, year);
    if (val.length === 2) yearRef.current?.focus();
  };

  const handleYearChange = (e) => {
    if (disabled) return;
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setYear(val);
    updateDateValue(day, month, val);
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === 'Enter' && nextRef?.current) {
      nextRef.current.focus();
      e.preventDefault();
    }
  };

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const selectDate = (d) => {
    const dStr = String(d).padStart(2, '0');
    const mStr = String(currentMonth + 1).padStart(2, '0');
    const yStr = String(currentYear);
    setDay(dStr);
    setMonth(mStr);
    setYear(yStr);
    setShowDatePicker(false);
    setViewMode('days');
    updateDateValue(dStr, mStr, yStr);
  };

  const selectMonth = (m) => {
    setCurrentMonth(m);
    setViewMode('days');
  };

  const navigateMonth = (dir) => {
  setCurrentMonth((prev) => {
    let newMonth = dir === 'prev' ? prev - 1 : prev + 1;

    if (newMonth < 0) {
      newMonth = 11;
      setCurrentYear((y) => y - 1);
    } else if (newMonth > 11) {
      newMonth = 0;
      setCurrentYear((y) => y + 1);
    }

    return newMonth;
  });
};

  const selectYear = (y) => {
    setCurrentYear(y);
    setViewMode('months');
  };

  const navigateYear = (dir) => {
    setCurrentYear(prev => dir === 'prev' ? prev - 1 : prev + 1);
  };

  const navigateYearRange = (dir) => {
    setCurrentYear(prev => dir === 'prev' ? prev - 12 : prev + 12);
  };

  const renderDaysGrid = () => {
    const days = [];
    const totalDays = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

    // Day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
      days.push(
        <div key={`header-${day}`} className="text-xs font-semibold text-gray-500 text-center py-1">
          {day}
        </div>
      );
    });

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

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
          className={`w-8 h-8 text-sm rounded flex items-center justify-center
            ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-blue-100 text-gray-700'}`}
        >
          {d}
        </button>
      );
    }
    return days;
  };

  const renderMonthsGrid = () => {
    const months = [];

    for (let i = 0; i < 12; i++) {
      const isSelected = currentMonth === i && year === String(currentYear);

      months.push(
        <button
          key={i}
          type="button"
          onClick={() => selectMonth(i)}
          className={`p-2 text-sm rounded flex items-center justify-center
            ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-blue-100 text-gray-700'}`}
        >
          {monthNames[i].substring(0, 3)}
        </button>
      );
    }

    return (
      <div className="grid grid-cols-3 gap-2">
        {months}
      </div>
    );
  };

  const renderYearsGrid = () => {
    const years = [];
    const startYear = Math.floor(currentYear / 10) * 10 - 1; // Show 12 years: 1 before and 10 after the decade

    for (let i = 0; i < 12; i++) {
      const y = startYear + i;
      const isSelected = year === String(y);

      years.push(
        <button
          key={y}
          type="button"
          onClick={() => selectYear(y)}
          className={`p-2 text-sm rounded flex items-center justify-center
            ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-blue-100 text-gray-700'}`}
        >
          {y}
        </button>
      );
    }

    return (
      <div className="grid grid-cols-3 gap-2">
        {years}
      </div>
    );
  };

  const handleClickOutside = (e) => {
    if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
      setShowDatePicker(false);
      setViewMode('days');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const inputClass = `border rounded-md p-2 text-center focus:outline-none focus:ring-2 focus:ring-primary ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''
    }`;

  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-semibold mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative flex items-center gap-5"> {/* Increased gap from 2 to 3 */}
        <input
          type="text"
          placeholder="DD"
          maxLength={2}
          value={day}
          onChange={handleDayChange}
          onKeyDown={(e) => handleKeyDown(e, monthRef)}
          disabled={disabled}
          ref={dayRef}
          className={`w-16 ${inputClass}`}
        />
        <span className="text-gray-400">/</span> {/* Separator */}
        <input
          type="text"
          placeholder="MM"
          maxLength={2}
          value={month}
          onChange={handleMonthChange}
          onKeyDown={(e) => handleKeyDown(e, yearRef)}
          disabled={disabled}
          ref={monthRef}
          className={`w-16 ${inputClass}`}
        />
        <span className="text-gray-400">/</span> {/* Separator */}
        <input
          type="text"
          placeholder="YYYY"
          maxLength={4}
          value={year}
          onChange={handleYearChange}
          onKeyDown={(e) => handleKeyDown(e, null)}
          disabled={disabled}
          ref={yearRef}
          className={`w-20 ${inputClass}`}
        />

        <button
          type="button"
          onClick={() => !disabled && setShowDatePicker(!showDatePicker)}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            }`}
        >
          <Image src={calendarImage} alt="Calendar" width={20} height={20} unoptimized />
        </button>

        {showDatePicker && !disabled && (
          <div
            ref={datePickerRef}
            className="absolute top-full left-0 mt-2 bg-white border rounded shadow-lg p-4 z-50 w-72"
          >
            {/* Header with navigation based on view mode */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                {viewMode === 'years' ? (
                  <button
                    type="button"
                    onClick={() => navigateYearRange('prev')}
                    className="px-2 py-1 rounded hover:bg-gray-200"
                  >
                    &lt;&lt;
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => viewMode === 'days' ? navigateMonth('prev') : navigateYear('prev')}
                    className="px-2 py-1 rounded hover:bg-gray-200"
                  >
                    &lt;
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode('days')}
                  className={`px-2 py-1 text-sm rounded ${viewMode === 'days' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
                    }`}
                >
                  {monthNames[currentMonth].substring(0, 3)}
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('years')}
                  className={`px-2 py-1 text-sm rounded ${viewMode === 'years' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
                    }`}
                >
                  {currentYear}
                </button>
              </div>

              <div className="flex gap-2">
                {viewMode === 'years' ? (
                  <button
                    type="button"
                    onClick={() => navigateYearRange('next')}
                    className="px-2 py-1 rounded hover:bg-gray-200"
                  >
                    &gt;&gt;
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => viewMode === 'days' ? navigateMonth('next') : navigateYear('next')}
                    className="px-2 py-1 rounded hover:bg-gray-200"
                  >
                    &gt;
                  </button>
                )}
              </div>
            </div>

            {/* Content based on view mode */}
            <div className="min-h-[200px] flex items-center justify-center">
              {viewMode === 'days' && (
                <div className="w-full">
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                      <div key={index} className="text-xs font-semibold text-gray-500 text-center">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {renderDaysGrid()}
                  </div>
                </div>
              )}

              {viewMode === 'months' && renderMonthsGrid()}

              {viewMode === 'years' && renderYearsGrid()}
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}


      {/* Hidden input for form registration */}
      <input
        type="hidden"
        name={name}
        value={day && month && year ? `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}` : ''}
        {...(register ? register(name) : {})}
      />
    </div>
  );
};

export default LabeledDatePicker;
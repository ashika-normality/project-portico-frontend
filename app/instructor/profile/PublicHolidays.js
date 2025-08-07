'use client'
import { useState, useEffect, useMemo } from 'react';

function HolidayComponent({ enableDay, date, holidayName, onToggle  }) {
  return (
    <div className="flex space-x-2 w-full rounded-sm bg-mildorange p-4">
      <div className="flex items-center" onClick={onToggle}>
        <input
          type="checkbox"
          checked={enableDay}
          readOnly
          className="form-checkbox rounded-sm mr-2 hover:cursor-pointer outline-none checked:focus:outline-none focus:outline-none focus:ring-0 hover:bg-primary checked:bg-primary checked:hover:bg-primary checked:focus:bg-primary"
          style={{ zoom: '120%' }}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-base">{holidayName || 'D-Day'}</span>
        <span className="text-xs text-greyfortext">{date || '13-06-2001'}</span>
      </div>
    </div>
  );
}

function PublicHolidays({ publicHolidays, offDates = [], onToggleHoliday }) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const [currentMonth, setCurrentMonth] = useState(new Date(currentYear, today.getMonth())); // restrict to current year

  const goToPrevMonth = () => {
    setCurrentMonth(prev => {
      const prevMonth = new Date(prev);
      if (prevMonth.getMonth() > 0) {
        prevMonth.setMonth(prevMonth.getMonth() - 1);
      }
      return prevMonth;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => {
      const nextMonth = new Date(prev);
      if (nextMonth.getMonth() < 11) {
        nextMonth.setMonth(nextMonth.getMonth() + 1);
      }
      return nextMonth;
    });
  };

  const holidaysInMonth = useMemo(() => {
    if (!Array.isArray(publicHolidays)) return [];

    return publicHolidays.filter(holiday => {
      if (!holiday || !holiday.date) return false;

      const holidayDate = new Date(holiday.date);
      return (
        holidayDate.getMonth() === currentMonth.getMonth() &&
        holidayDate.getFullYear() === currentMonth.getFullYear()
      );
    });
  }, [publicHolidays, currentMonth]);

  const formattedMonth = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  // Button disable logic
  const isFirstMonth = currentMonth.getMonth() === 0;
  const isLastMonth = currentMonth.getMonth() === 11;

  return (
    <div className="flex flex-col md:flex-row w-full bg-white rounded-xl shadow-equal p-4 space-y-8 md:space-y-0 md:space-x-12">
      <div className="w-full flex flex-col space-y-6">
        <div className="w-full flex flex-col space-y-1">
          <h1 className="text-primary text-lg font-bold font-raleway">Public Holidays</h1>
          <span className="text-greyfortext text-sm">
            Select public holidays when you won&apos;t be available
          </span>
        </div>

        <div className="flex flex-col justify-center items-center space-y-4">
          {/* Month Navigation */}
          <div className="w-full flex items-center justify-between">
            <button
              onClick={goToPrevMonth}
              className={`text-primary hover:text-primary-dark ${isFirstMonth ? 'opacity-30 cursor-not-allowed' : ''}`}
              disabled={isFirstMonth}
              aria-label="Previous"
            >
              ←
            </button>
            <span className="text-sm font-semibold text-gray-800">{formattedMonth}</span>
            <button
              onClick={goToNextMonth}
              className={`text-primary hover:text-primary-dark ${isLastMonth ? 'opacity-30 cursor-not-allowed' : ''}`}
              disabled={isLastMonth}
              aria-label="Next"
            >
              →
            </button>
          </div>

          {/* Holiday List */}
          <div className="w-full flex flex-col space-y-3">
            {holidaysInMonth.length > 0 ? (
                            holidaysInMonth.map((holiday) => {
                const formattedDate = new Date(holiday.date).toLocaleDateString('en-GB');
                const isSelected = offDates.some(
                    (d) => d.toDateString() === new Date(holiday.date).toDateString()
                );
                return (
                    <HolidayComponent
                    key={holiday.date}
                    enableDay={isSelected}
                    date={formattedDate}
                    holidayName={holiday.localName}
                    onToggle={() => onToggleHoliday(holiday.date)}
                    />
                );
                })

            ) : (
              <span className="text-sm text-greyfortext italic">
                No public holidays in {formattedMonth}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicHolidays;

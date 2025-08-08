'use client'
import { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function HolidayComponent({ enableDay, date, holidayName, onToggleHoliday, dateObject }) {
    return (
        <div className="flex space-x-2 w-full rounded-sm bg-mildorange p-4">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={enableDay}
                    onChange={() => onToggleHoliday(dateObject)}
                    className="form-checkbox rounded-xs mr-2 hover:cursor-pointer outline-none checked:focus:outline-none focus:outline-none focus:ring-0 hover:bg-primary checked:bg-primary checked:hover:bg-primary checked:focus:bg-primary"
                    style={{ zoom: "120%" }}
                />
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-base">{holidayName || "D-Day"}</span>
                <span className="text-xs text-greyfortext">{date || "13-06-2001"}</span>
            </div>
        </div>
    )
}

function PublicHolidays({ publicHolidays, onToggleHoliday, offDates }) {
    const today = new Date();
    const initialYear = today.getFullYear();
    const [currentMonth, setCurrentMonth] = useState(new Date(initialYear, today.getMonth()));

    const currentYear = currentMonth.getFullYear();
    const currentMonthIndex = currentMonth.getMonth();

    const prevMonthDate = new Date(currentYear, currentMonthIndex - 1, 1);
    const nextMonthDate = new Date(currentYear, currentMonthIndex + 1, 1);

    const isPrevDisabled = prevMonthDate.getFullYear() !== initialYear;
    const isNextDisabled = nextMonthDate.getFullYear() !== initialYear;

    const holidaysInMonth = publicHolidays?.filter(holiday => {
        if (!holiday || !holiday.date) return false;
        const holidayDate = new Date(holiday.date);
        if (isNaN(holidayDate.getTime())) return false;
        return (
            holidayDate.getMonth() === currentMonthIndex &&
            holidayDate.getFullYear() === currentYear
        );
    }) || [];

    const goToPrevMonth = () => {
        if (isPrevDisabled) return;
        setCurrentMonth(prev => {
            const d = new Date(prev);
            d.setMonth(prev.getMonth() - 1);
            return d;
        });
    };

    const goToNextMonth = () => {
        if (isNextDisabled) return;
        setCurrentMonth(prev => {
            const d = new Date(prev);
            d.setMonth(prev.getMonth() + 1);
            return d;
        });
    };

    const formattedMonth = currentMonth.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    });

    // Helper function to check if a date is in offDates
    const isDateOff = (dateToCheck) => {
        if (!offDates || !Array.isArray(offDates)) return false;
        
        return offDates.some(offDate => {
            const offDateObj = new Date(offDate);
            return (
                offDateObj instanceof Date &&
                !isNaN(offDateObj.getTime()) &&
                offDateObj.toDateString() === dateToCheck.toDateString()
            );
        });
    };

    return (
        <div className="flex flex-col md:flex-row w-full bg-white rounded-xl shadow-equal p-4 space-y-8 md:space-y-0 md:space-x-12">
            <div className="w-full flex flex-col space-y-6">
                <div className="w-full flex flex-col space-y-2">
                    <div className='flex justify-between items-center'>
                        <h1 className="w-full flex-grow text-primary text-lg font-bold font-raleway">Public Holidays</h1>
                        <div className="w-full flex items-center justify-between">
                            <button
                                onClick={goToPrevMonth}
                                disabled={isPrevDisabled}
                                className={`p-1 rounded-sm focus:outline-none ${isPrevDisabled ? 'opacity-30 cursor-not-allowed' : 'text-white bg-primary hover:text-primary-dark cursor-pointer'}`}
                                aria-label="Previous month"
                            >
                                <IoIosArrowBack />
                            </button>
                            <span className="text-sm font-semibold text-gray-800">{formattedMonth}</span>
                            <button
                                onClick={goToNextMonth}
                                disabled={isNextDisabled}
                                className={`p-1 rounded-sm focus:outline-none ${isNextDisabled ? 'opacity-30 cursor-not-allowed' : 'text-white bg-primary hover:text-primary-dark cursor-pointer'}`}
                                aria-label="Next month"
                            >
                                <IoIosArrowForward />
                            </button>
                        </div>
                    </div>
                    <span className="text-greyfortext text-sm">
                        Select public holidays when you won&apos;t be available
                    </span>
                </div>

                <div className="flex flex-col justify-center items-center space-y-4">
                    <div className="w-full flex flex-col space-y-3">
                        {holidaysInMonth.length > 0 ? (
                            holidaysInMonth.map((holiday, index) => {
                                const holidayDateObj = new Date(holiday.date);
                                let date = "Invalid Date";
                                if (!isNaN(holidayDateObj.getTime())) {
                                    date = holidayDateObj.toLocaleDateString('en-GB');
                                } else {
                                    console.warn("Invalid date format for holiday:", holiday);
                                }
                                
                                // Check if this holiday is selected as off date
                                const isSelected = isDateOff(holidayDateObj);

                                return (
                                    <HolidayComponent
                                        key={`${holiday.date}-${index}`}
                                        onToggleHoliday={onToggleHoliday}
                                        enableDay={isSelected}
                                        date={date}
                                        dateObject={holidayDateObj}
                                        holidayName={holiday.localName || holiday.name || "Unnamed Holiday"}
                                    />
                                );
                            })
                        ) : (
                            <span className="text-sm text-greyfortext italic">No public holidays in {formattedMonth}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PublicHolidays;
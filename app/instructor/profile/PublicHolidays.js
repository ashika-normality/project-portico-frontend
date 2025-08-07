'use client'
import { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function HolidayComponent({ enableDay, date, holidayName }) {
    // Note: The checkbox is now purely presentational as enableDay is not tied to state here.
    // If you want interactive checkboxes, you'll need to manage their state (e.g., via props or internal state).
    return (
        <div className="flex space-x-2 w-full rounded-sm bg-mildorange p-4">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={enableDay}
                    // Added 'disabled' to make it clear it's not interactive in this version
                    // Remove or conditionally apply 'disabled' if interactivity is added
                    disabled 
                    className="form-checkbox rounded-xs mr-2 hover:cursor-pointer outline-none checked:focus:outline-none focus:outline-none focus:ring-0 hover:bg-primary checked:bg-primary checked:hover:bg-primary checked:focus:bg-primary"
                    style={{ zoom: "120%" }}
                />
            </div>
            <div className="flex flex-col">
                {/* Improved fallback rendering */}
                <span className="text-sm font-base">{holidayName || "D-Day"}</span>
                <span className="text-xs text-greyfortext">{date || "13-06-2001"}</span>
            </div>
        </div>
    )
}

function PublicHolidays({ publicHolidays }) {
    // State to track selected month (as a Date object)
    const today = new Date();
    const initialYear = today.getFullYear();
    const [currentMonth, setCurrentMonth] = useState(new Date(initialYear, today.getMonth())); // Initialize with current month of initial year

    // Get the month and year of the current selected month
    const currentYear = currentMonth.getFullYear();
    const currentMonthIndex = currentMonth.getMonth(); // 0-11

    // Calculate previous and next month for disable logic
    const prevMonthDate = new Date(currentYear, currentMonthIndex - 1, 1);
    const nextMonthDate = new Date(currentYear, currentMonthIndex + 1, 1);

    // Check if prev/next month is within the same year
    const isPrevDisabled = prevMonthDate.getFullYear() !== initialYear;
    const isNextDisabled = nextMonthDate.getFullYear() !== initialYear;

    // Filter public holidays that match the selected month
    const holidaysInMonth = publicHolidays?.filter(holiday => {
        if (!holiday || !holiday.date) return false; // Add safety check
        const holidayDate = new Date(holiday.date);
        
        // Ensure the holiday date is valid
        if (isNaN(holidayDate.getTime())) return false;
        return (
            holidayDate.getMonth() === currentMonthIndex &&
            holidayDate.getFullYear() === currentYear
        );
    }) || [];

    // Handle going to previous month
    const goToPrevMonth = () => {
        if (isPrevDisabled) return; // Guard clause
        setCurrentMonth(prev => {
            const d = new Date(prev);
            d.setMonth(prev.getMonth() - 1);
            return d;
        });
    };

    // Handle going to next month
    const goToNextMonth = () => {
        if (isNextDisabled) return; // Guard clause
        setCurrentMonth(prev => {
            const d = new Date(prev);
            d.setMonth(prev.getMonth() + 1);
            return d;
        });
    };

    // Format month name for display (e.g., "June 2025")
    const formattedMonth = currentMonth.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    });

    const navButtonStyle = `p-1 rounded-sm focus:outline-none ${isPrevDisabled ? 'opacity-30 cursor-not-allowed' : 'text-white bg-primary hover:text-primary-dark cursor-pointer'}`;

    return (
        <div className="flex flex-col md:flex-row w-full bg-white rounded-xl shadow-equal p-4 space-y-8 md:space-y-0 md:space-x-12">
            <div className="w-full flex flex-col space-y-6">
                {/* Header */}
                <div className="w-full flex flex-col space-y-2">
                    <div className='flex justify-between items-center'>
                        <h1 className="w-full flex-grow text-primary text-lg font-bold font-raleway">Public Holidays</h1>
                        {/* Month Navigation */}
                        <div className="w-full flex items-center justify-between">
                            <button
                                onClick={goToPrevMonth}
                                disabled={isPrevDisabled}
                                className={navButtonStyle}
                                aria-label="Previous month"
                            >
                                <IoIosArrowBack />
                            </button>
                            <span className="text-sm font-semibold text-gray-800">{formattedMonth}</span>
                            <button
                                onClick={goToNextMonth}
                                disabled={isNextDisabled}
                                className={navButtonStyle}
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

                {/* Calendar & Holiday List */}
                <div className="flex flex-col justify-center items-center space-y-4">
                    
                    {/* Holiday List */}
                    <div className="w-full flex flex-col space-y-3">
                        {holidaysInMonth.length > 0 ? (
                            holidaysInMonth.map((holiday, index) => {
                                // Safety check for date parsing
                                const holidayDateObj = new Date(holiday.date);
                                let date = "Invalid Date";
                                if (!isNaN(holidayDateObj.getTime())) {
                                    date = holidayDateObj.toLocaleDateString('en-GB'); // Format: DD-MM-YYYY
                                } else {
                                    console.warn("Invalid date format for holiday:", holiday);
                                }
                                return (
                                    <HolidayComponent
                                        key={`${holiday.date}-${index}`} // Better key using unique date
                                        enableDay={false} // You can manage this via state later if needed
                                        date={date}
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
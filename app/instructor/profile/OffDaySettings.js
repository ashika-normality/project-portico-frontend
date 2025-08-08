// app/components/OffDaySettings.jsx (or your component file path)
'use client';

import { useState, useEffect, useCallback } from "react";
import { useAppContext } from "@/app/components/AppContext";
import Image from "next/image";
import { Calendar } from "@/app/components/ui/calendar"; // Ensure correct path
import calenderVector from "@/public/Assets/calender-vector.svg"; // Ensure correct path
import { IoClose } from "react-icons/io5";
import PublicHolidays from "./PublicHolidays";
import toast, { Toaster } from "react-hot-toast";

function OffDaySettings({profile}) {

     const { selectedCountry } = useAppContext(); // Get the selected country ISO2 code

    // Use an array to store off dates as Date objects for easier handling with the Calendar component
    const [offDates, setOffDates] = useState([]); 
    const [selectedDate, setSelectedDate] = useState(null); // For temporary selection/highlighting
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [publicHolidays, setPublicHolidays] = useState([]); // State for public holidays
    const [isHolidaysLoading, setIsHolidaysLoading] = useState(false); // Optional: loading state
    const [holidaysError, setHolidaysError] = useState(null); // Optional: error state

   
    // --- Fetch Public Holidays ---
    useEffect(() => {
        // Ensure selectedCountry is available and API key exists
        const API_KEY = process.env.NEXT_PUBLIC_HOLIDAYS_API_KEY;
        console.log("API Key:", API_KEY); // Debugging line to check if API key is set
        if (!API_KEY) {
            console.warn("NEXT_PUBLIC_HOLIDAYS_API_KEY is not set. Skipping public holidays fetch.");
            setPublicHolidays([]); // Ensure holidays list is empty
            return;
        }

        // Use selectedCountry from context. If it's not set, we might not fetch yet or use a default.
        // Let's assume we wait for a valid country selection.
        const countryIso2 = selectedCountry?selectedCountry:profile.user.address.country; // Get the ISO2 code from the context
        if (!countryIso2) {
             // If no country is selected in context yet, don't fetch
             console.log("No country selected in context yet. Waiting to fetch holidays.");
             setPublicHolidays([]); // Ensure holidays list is empty
             return;
        }


        const currentYear = new Date().getFullYear(); // Get the current year correctly as a number

        const fetchPublicHolidays = async () => {
            setIsHolidaysLoading(true);
            setHolidaysError(null);
            try {
                // Corrected API URL construction
                const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${currentYear}/${countryIso2}`);

                if (!response.ok) {
                    if (response.status === 429) {
                         throw new Error(`Rate limit exceeded (429). Please wait before trying again.`);
                    }
                    throw new Error(`API request failed with status ${response.status}`);
                }

                const data = await response.json();
                console.log(`Fetched Public Holidays for ${countryIso2} ${currentYear}:`, data);

                // Assuming the API returns an array of holiday objects
                // Extract date strings (e.g., "2024-01-01") for easy comparison
                // Adjust 'date' key if the API uses a different field name
                //const holidayDates = data.map(holiday => holiday.date);
                setPublicHolidays(data);

            } catch (error) {
                console.error("Error fetching public holidays:", error);
                setHolidaysError(error.message);
                // Optionally, set an error state to display a message to the user
                setPublicHolidays([]); // Ensure holidays list is empty on error
            } finally {
                 setIsHolidaysLoading(false);
            }
        };

        fetchPublicHolidays();
    }, []); // Refetch if the selected country changes.
                             // It will also run on mount and if selectedCountry becomes valid.
    // --- End Fetch Public Holidays ---

    // Handle date click on the calendar
    const handleSelectDate = useCallback((date) => {

        console.log("Selected date:", date);
        // Check if the clicked date is in the future and not already an off date
        if (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const isPastDate = date < today;
            const isAlreadyOff = offDates.some(offDate => offDate.toDateString() === date.toDateString());

            if (!isPastDate) {
                if (isAlreadyOff) {
                     // If it's already an off day, remove it
                    setOffDates(prev => prev.filter(d => d.toDateString() !== date.toDateString()));
                } else {
                    // If it's a new future date, select it for confirmation
                    setSelectedDate(date);
                    setShowConfirmation(true);
                }
            } else {
                 // Optionally, provide feedback for past dates
                 toast.error("Cannot select a past date.");
                 console.log("Cannot select a past date.");
            }
        }
    }, [offDates]); // Depend on offDates to check if a date is already selected

    const handleConfirmation = useCallback(() => {
        if (selectedDate) {
            
            // Add the confirmed date to the offDates array
            setOffDates(prev => [...prev, selectedDate]);
            setShowConfirmation(false);
            setSelectedDate(null);
            
        }
    }, [selectedDate]);

    const handleCloseConfirmation = useCallback(() => {
        setShowConfirmation(false);
        setSelectedDate(null);
    }, []);

    // Determine dates to highlight as selected (confirmed off days + temporarily selected date)
    // Combine offDates and selectedDate for the Calendar's selected prop
    const selectedDatesForCalendar = selectedDate 
        ? [...offDates, selectedDate] 
        : offDates;

    // Function to determine if a date should be styled as an off day (moderate red)
    // This will be used by the Calendar component's modifiers
    const isOffDay = useCallback((date) => {
        // Check if the date is in the confirmed offDates list (and not the temporarily selected one)
        return offDates.some(offDate => offDate.toDateString() === date.toDateString());
    }, [offDates]);

    // Function to determine if a date is disabled (only past dates)
    const isDateDisabled = useCallback((date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        // Disable only past dates
        return date < today;
    }, []);

    // Function to remove an off date
    const handleRemoveOffDate = useCallback((dateStringToRemove) => {
        setOffDates(prev => 
            prev.filter(date => date.toDateString() !== dateStringToRemove)
        );
    }, []);

    return (
        <div className="flex flex-col md:flex-row w-full space-y-8 md:space-y-0 md:space-x-6">
            <Toaster />
            <div className="flex flex-col md:flex-row w-full md:w-5/9 bg-white rounded-xl shadow-equal p-8 space-y-8 md:space-y-0 md:space-x-12">
                <div className="w-full flex flex-col space-y-6">
                    <div className="w-full flex flex-col space-y-1">
                        <h1 className="text-primary text-lg font-bold font-raleway">Off Days</h1>
                        <span className="text-greyfortext text-sm">
                           Select specific dates when you&apos;re not available.
                        </span>
                    </div>
                    
                    {/* Calendar */}
                    {/* Pass the array of selected dates and the modifier function */}
                    <div>
                        <Calendar
                            mode="single" // Mode is still single for selection logic, but we manage the array
                            //selected={//selectedDatesForCalendar} // Pass array of dates
                            onSelect={handleSelectDate} // Handle selection
                            disabled={isDateDisabled} // Only disable past dates
                            // Use modifiers to apply custom styling for off days
                            modifiers={{ offDay: isOffDay }} 
                            // Define the style for the 'offDay' modifier
                            modifiersStyles={{ 
                                
                                offDay: { 
                            
                                    backgroundColor: '#fca5a5', // Tailwind red-300 as inline style example
                                    color: '#ff0000', // Ensure text is readable
                                    borderRadius: '0.375rem', // Tailwind rounded-md
                                    margin: '0.125rem', // Tailwind space-x-1
                                } 
                            }}
                            aria-label="Select off days"
                        />
                         {/* Optional: Add a note about the red color meaning */}
                         {offDates.length > 0 && (
                             <p className="mt-2 text-xs text-gray-500">
                                 <span className="inline-block w-3 h-3 bg-red-300 border border-gray-300 mr-1"></span>
                                 Red dates are your currently selected off days.
                             </p>
                         )}
                    </div>

                    {/* Selected Off Days List */}
                    {offDates.length > 0 && (
                        <div className="mt-6">
                            
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {/* Sort dates for display */}
                                {[...offDates]
                                    .sort((a, b) => a - b) 
                                    .map((date) => {
                                    const formattedDate = date.toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    });
                                    
                                    return (
                                        <div key={date.toDateString()} className="flex items-center justify-between p-4 bg-mildorange rounded-sm">
                                            <div>
                                                {/* <span className="text-sm font-medium">{dayOfWeek}</span> */}
                                                <span className=" text-tonedblack ml-2">{formattedDate}</span>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveOffDate(date.toDateString())}
                                                className="text-tonedblack hover:text-red-700 text-sm font-medium"
                                                aria-label={`Remove ${formattedDate} from off days`}
                                            >
                                                <IoClose className="w-6 h-6" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
                 {/* Confirmation Modal */}
                    {showConfirmation && selectedDate && (
                        <DateConfirmationPopup 
                            date={selectedDate}
                            handleClose={handleCloseConfirmation}
                            handleConfirmation={handleConfirmation}
                        />
                    )}

            </div>

           
            <div className="w-full md:w-4/9">
                {isHolidaysLoading ? (
                    <div className="bg-white rounded-xl shadow-equal p-6 flex flex-col items-center justify-center space-y-4">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
                    <p className="text-sm text-greyfortext">Loading public holidays...</p>
                    </div>
                ) : holidaysError ? (
                    <div className="bg-white rounded-xl shadow-equal p-6">
                    <p className="text-sm text-red-600">Error: {holidaysError}</p>
                    </div>
                ) : publicHolidays.length > 0 ? (
                    <PublicHolidays publicHolidays={publicHolidays} 
                        offDates={offDates}
                        onToggleHoliday={handleSelectDate}
                    />
                ) : (
                    <div className="bg-white rounded-xl shadow-equal p-6">
                    <p className="text-sm text-greyfortext">No public holidays found for this country.</p>
                    </div>
                )}
                </div>
        </div>
    );
}

export default OffDaySettings;

// --- DateConfirmationPopup remains largely the same ---
const DateConfirmationPopup = ({ date, handleClose, handleConfirmation }) => {
    const formattedDate = date.toLocaleDateString();
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') {
            handleClose();
        }
    }, [handleClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        
        const confirmButton = document.querySelector('[data-confirm-button]');
        if (confirmButton) {
            confirmButton.focus();
        }
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const handleBackdropClick = useCallback((e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    }, [handleClose]);

    return (
        <div 
            className="fixed inset-0 z-[99] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirmation-title"
            aria-describedby="confirmation-description"
        >
            <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h2 id="confirmation-title" className="text-xl text-primary font-bold mb-4">
                    Confirm Selected Date
                </h2>
                
                <div className="border border-primary rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <Image 
                                src={calenderVector} 
                                alt="" 
                                className="w-8 h-8"
                                role="presentation"
                            />    
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-black">
                                Selected Date
                            </h3>
                            <div className="mt-2">
                                <div className="text-lg font-semibold text-primary">
                                    {formattedDate}
                                </div>
                                <div className="text-sm text-greyfortext">
                                    {dayOfWeek}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <p id="confirmation-description" className="text-sm text-greyfortext">
                        Are you sure you want to mark <strong>{formattedDate}</strong> as an off day?
                        This date will be unavailable for scheduling.
                    </p>
                </div>

                <div className="flex justify-end space-x-3">
                    <button 
                        onClick={handleClose} 
                        className="px-4 py-2 text-sm font-medium text-red-500 bg-red-200 rounded hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                        aria-label="Cancel date selection"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleConfirmation} 
                        data-confirm-button
                        className="px-4 py-2 text-sm font-medium text-white rounded bg-primary hover:bg-footerorange focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
                        aria-label={`Confirm ${formattedDate} as off day`}
                    >
                        Confirm Date
                    </button>
                </div>
            </div>
        </div>
    );
};
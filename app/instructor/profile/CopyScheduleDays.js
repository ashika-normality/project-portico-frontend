import { IoClose } from "react-icons/io5";
import { useState } from 'react';

function CopyScheduleDays({ onClose, onCopy, currentDay }) {
    const [selectedDays, setSelectedDays] = useState([]);
    
    const daysOfWeek = [
        { id: 'MON', name: 'Monday' },
        { id: 'TUE', name: 'Tuesday' },
        { id: 'WED', name: 'Wednesday' },
        { id: 'THU', name: 'Thursday' },
        { id: 'FRI', name: 'Friday' },
        { id: 'SAT', name: 'Saturday' },
        { id: 'SUN', name: 'Sunday' },
    ];

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
        } else if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleDayToggle = (dayId) => {
        // Prevent toggling the current day
        if (dayId === currentDay) return;
        
        setSelectedDays(prev => 
            prev.includes(dayId)
                ? prev.filter(id => id !== dayId)
                : [...prev, dayId]
        );
    };

    const handleSelectAll = () => {
        // Select all days except the current day
        const availableDays = daysOfWeek
            .filter(day => day.id !== currentDay)
            .map(day => day.id);
            
        setSelectedDays(selectedDays.length === availableDays.length ? [] : availableDays);
    };

    const handleSubmit = () => {
        if (onCopy) {
            onCopy(selectedDays);
        }
        onClose();
    };

    // Check if a day is the current day
    const isCurrentDay = (dayId) => dayId === currentDay;

    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onKeyDown={handleKeyDown}
            tabIndex={-1}
        >
            <div
                className="bg-white p-6 rounded-lg w-full max-w-sm max-h-[95vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg text-primary font-semibold">Copy Schedule to</h2>
                    <button
                        onClick={onClose}
                        className="cursor-pointer text-gray-500 hover:text-gray-700"
                        aria-label="Close popup"
                    >
                        <IoClose size={30} />
                    </button>
                </div>
                
                <div className="mb-4">
                    <button
                        type="button"
                        onClick={handleSelectAll}
                        className="text-sm text-primary hover:underline"
                    >
                        {selectedDays.length === daysOfWeek.filter(day => day.id !== currentDay).length ? 'Deselect All' : 'Select All'}
                    </button>
                </div>

                <div className="space-y-3">
                    {daysOfWeek.map((day) => (
                        <div key={day.id} className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                id={`dayToCopy${day.id}`}
                                checked={selectedDays.includes(day.id)}
                                onChange={() => handleDayToggle(day.id)}
                                disabled={isCurrentDay(day.id)}
                                className={`form-checkbox rounded-xs h-5 w-5 focus:ring-primary ${
                                    isCurrentDay(day.id) 
                                        ? 'outline-footerorange opacity-50 cursor-not-allowed' 
                                        : 'text-primary'
                                }`}
                            />
                            <label 
                                htmlFor={`dayToCopy${day.id}`} 
                                className={`cursor-pointer ${
                                    isCurrentDay(day.id) 
                                        ? 'text-tonedblack opacity-50 cursor-not-allowed' 
                                        : 'text-tonedblack'
                                }`}
                            >
                                {day.name} {isCurrentDay(day.id)}
                            </label>
                        </div>
                    ))}
                </div>

                <div className="flex w-full flex-col gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={selectedDays.length === 0}
                        className={`px-4 py-2 rounded-md ${
                            selectedDays.length === 0
                                ? 'bg-primary opacity-50 text-white cursor-not-allowed'
                                : 'bg-primary text-white hover:bg-primary-overlay'
                        }`}
                    >
                        Copy Schedule
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CopyScheduleDays;
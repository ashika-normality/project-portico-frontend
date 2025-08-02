import { useState } from 'react';
import DailySessionSingle from "./DailySessionSingle";

function DailyAvailability({ day, dayIndex, sessions, enabled, register, setValue }) {
     const handleToggleEnabled = (e) => {
    setValue(`availability.${dayIndex}.enabled`, e.target.checked);
  };

  // Handle session add/remove: 
  const addSession = () => {
    const newSessions = [...sessions, { label: "", startTime: "", endTime: "" }];
    setValue(`availability.${dayIndex}.sessions`, newSessions);
  };

  const removeSession = (indexToRemove) => {
    if (sessions.length <= 1) return; // keep at least one
    const newSessions = sessions.filter((_, i) => i !== indexToRemove);
    setValue(`availability.${dayIndex}.sessions`, newSessions);
  };

  return (
    <div className='border-b border-greyforline py-4'>
        <div className="flex flex-col items-start md:flex-row w-full space-y-4 md:space-y-0 space-x-4">
        <div className="flex w-1/9 items-center space-x-2 md:mt-8">   
            <input
                type="checkbox"
                {...register(`availability.${dayIndex}.enabled`)}
                checked={enabled}
                onChange={handleToggleEnabled}
            />
            <label forhtml={`availability.${dayIndex}.enabled`}>
                {day}       
            </label>
        </div>

        <div className='w-full flex flex-col flex-grow space-y-4'>
            {sessions.map((session, i) => (
            <DailySessionSingle
                key={i}
                dayIndex={dayIndex}
                sessionIndex={i}
                register={register}
                removeSession={() => removeSession(i)}
                onAddSession={addSession}
            />
        ))}
        </div>

        
        </div>
    </div>
  );
}

export default DailyAvailability;
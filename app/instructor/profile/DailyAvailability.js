import { useState } from 'react';
import DailySessionSingle from "./DailySessionSingle";

function DailyAvailability({ day }) {
    const [sessions, setSessions] = useState([{ id: 1 }]); // Start with one session

    const addSession = () => {
        const newSession = { id: Date.now() }; // Using timestamp as unique id
        setSessions(prev => [...prev, newSession]);
    };

    const removeSession = (sessionId) => {
        if (sessions.length > 1) { // Keep at least one session
            setSessions(prev => prev.filter(session => session.id !== sessionId));
        }
    };

    // const duplicateSession = (sessionId) => {
    //     const newSession = { id: Date.now() };
    //     setSessions(prev => [...prev, newSession]);
    // };

    return (
        <div className='pb-5 border-b border-greyforline'>
            <div className="flex flex-col items-start md:flex-row w-full space-y-4 md:space-y-0 space-x-4">
                <div className="flex items-center md:mt-8">
                    <input
                        type="checkbox"
                        name="daySelection"
                        id="daySelection"
                        value={day}
                        className="mr-2"
                    />
                    <label htmlFor="daySelection" className="uppercase">
                        {day ? day.slice(0, 3) : ""}
                    </label>
                </div>
                <div className="w-full pt-5 flex flex-col flex-grow space-y-4">
                    {sessions.map((session, index) => (
                        <DailySessionSingle
                            key={session.id}
                            sessionId={session.id}
                            sessionIndex={index}
                            day={day}
                            onAddSession={addSession}
                            onRemoveSession={removeSession}
                            //onDuplicateSession={duplicateSession}
                            canRemove={sessions.length > 1}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DailyAvailability;
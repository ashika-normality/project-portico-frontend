import LabeledInput from "@/app/components/LabeledInput";
import LabeledSelect from "@/app/components/LabeledSelect";
import { useFormContext } from "react-hook-form";

function ClassSettings({availability}) {
    return (
        <div className="w-full">
            <h1 className="text-primary text-lg font-bold font-raleway">Class Duration Settings</h1>
            <div className="w-full mt-4 flex flex-col space-y-3">
                    <div>
                        <LabeledSelect
                            name='minimumDuration'
                            label='Minimum Duration'
                            options={[
                                { label: "1 Hour", value: "1" },
                                { label: "2 Hours", value: "2" },
                                { label: "3 Hours", value: "3" },
                                { label: "4 Hours", value: "4" },
                                { label: "5 Hours", value: "5" },
                                { label: "6 Hours", value: "6" },
                                { label: "7 Hours", value: "7" },
                                { label: "8 Hours", value: "8" },
                                { label: "9 Hours", value: "9" },
                                { label: "10 Hours", value: "10" },
                            ]}
                        />
                    </div>
                    <div>
                        <LabeledSelect
                            name='maximumDuration'
                            label='Maximum Duration'
                            options={[
                                { label: "1 Hour", value: "1" },
                                { label: "2 Hours", value: "2" },
                                { label: "3 Hours", value: "3" },
                                { label: "4 Hours", value: "4" },
                                { label: "5 Hours", value: "5" },
                                { label: "6 Hours", value: "6" },
                                { label: "7 Hours", value: "7" },
                                { label: "8 Hours", value: "8" },
                                { label: "9 Hours", value: "9" },
                                { label: "10 Hours", value: "10" },
                            ]}
                        />
                    </div>
                    <div>
                        <LabeledSelect
                            name='bookingBlockDuration'
                            label='Booking Block Duration'
                            options={[
                               {label: '10 minutes', value: '10'},
                               {label: '15 minutes', value: '15'},
                               {label: '20 minutes', value: '20'},
                               {label: '25 minutes', value: '25'},
                               {label: '30 minutes', value: '30'},
                               {label: '35 minutes', value: '35'},
                               {label: '40 minutes', value: '40'},
                               {label: '45 minutes', value: '45'},
                               {label: '50 minutes', value: '50'},
                               {label: '55 minutes', value: '55'},
                               {label: '60 minutes', value: '60'},
                            ]}
                        />
                    </div>
                    <div>
                        <LabeledSelect
                            name='breakBetweenClass'
                            label='Break Between Classes'
                            options={[
                               {label: '10 minutes', value: '10'},
                               {label: '15 minutes', value: '15'},
                               {label: '20 minutes', value: '20'},
                               {label: '25 minutes', value: '25'},
                               {label: '30 minutes', value: '30'},
                               {label: '35 minutes', value: '35'},
                               {label: '40 minutes', value: '40'},
                               {label: '45 minutes', value: '45'},
                               {label: '50 minutes', value: '50'},
                               {label: '55 minutes', value: '55'},
                               {label: '60 minutes', value: '60'},
                            ]}
                        />
                    </div>
            </div>
        </div>
    );
}

function BreakSetting({availability}) {
    // const { watch } = useFormContext();
    // const availability = watch("availability") || [];

    // Utility to convert time string (e.g. "08:00") to minutes
    function timeStrToMinutes(str) {
        if (!str) return null;
        const [h, m] = str.split(":").map(Number);
        return isNaN(h) || isNaN(m) ? null : h * 60 + m;
    }

    // Utility to convert minutes to time string (e.g. 480 -> "08:00")
    function minutesToTimeStr(mins) {
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
    }

    // Get break timings based on actual session times for a given day
    function getBreakTimingsForDay(day) {
        // Skip if day is not enabled or no sessions
        if (!day?.enabled || !Array.isArray(day.sessions)) return null;

        const validSessions = day.sessions
            .map(s => ({
                start: timeStrToMinutes(s.startTime),
                end: timeStrToMinutes(s.endTime)
            }))
            .filter(s => s.start !== null && s.end !== null && s.start < s.end);

        // If no valid sessions, no breaks to show
        if (validSessions.length === 0) return null;

        // Sort by start time
        validSessions.sort((a, b) => a.start - b.start);

        // Determine working window: from first session start to last session end
        const workStart = validSessions[0].start;
        const workEnd = Math.max(...validSessions.map(s => s.end));

        // Now calculate gaps between sessions within that window
        const breaks = [];
        let currentEnd = workStart;

        for (const session of validSessions) {
            if (session.start > currentEnd) {
                breaks.push({ start: currentEnd, end: session.start });
            }
            currentEnd = Math.max(currentEnd, session.end);
        }

        // Convert to time strings
        return breaks.map(b => ({
            start: minutesToTimeStr(b.start),
            end: minutesToTimeStr(b.end)
        }));
    }

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <div className="w-full">
            <h1 className="text-primary text-lg font-bold font-raleway">Break Timings</h1>
            <div className="mt-3 md:mt-6">
                {availability.length === 0 ? (
                    <span className="text-gray-500">No availability data.</span>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {availability.map((day, idx) => {
                            const breaks = getBreakTimingsForDay(day);

                            // Only render if the day is enabled and has sessions
                            if (!day?.enabled || breaks === null) {
                                return null; // Skip disabled or empty days
                            }

                            return (
                                <div
                                    key={idx}
                                    className="flex justify-between bg-footerorange text-[14px] rounded-lg p-4"
                                >
                                    <h2 className="font-semibold text-tonedblack mb-2">{days[idx]}</h2>
                                    {breaks.length === 0 ? (
                                        <span className="text-tonedblack text-sm">No breaks</span>
                                    ) : (
                                        <ul className="list-none pl-0 space-y-1">
                                            {breaks.map((b, i) => (
                                                <li key={i} className="text-tonedblack">
                                                    {b.start} – {b.end}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            );
                        })}

                        {/* Optional: Show message if no enabled days */}
                        {availability.every(day => !day?.enabled || getBreakTimingsForDay(day) === null) && (
                            <span className="text-gray-500 col-span-1 md:col-span-2">
                                No enabled days with valid sessions.
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

function ClassSettingsMain({}) {

    const { watch } = useFormContext();
    const availability = watch("availability") || [];

    return (
        <div className="flex flex-col md:flex-row w-full bg-white rounded-xl shadow-equal p-8 space-y-8 space-x-6">
            <div className="md:w-2/5">
                <ClassSettings />
            </div>
            <div className="md:w-3/5">
                <BreakSetting availability={availability} />
            </div>
        </div>
    );
}

export default ClassSettingsMain;
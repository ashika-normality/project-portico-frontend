import LabeledInput from "@/app/components/LabeledInput";
import LabeledSelect from "@/app/components/LabeledSelect";
import { useFormContext } from "react-hook-form";

function ClassSettings({}) {
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

function BreakSetting({ availability }) {
    // Utility to convert time string (e.g. "08:00") to minutes
    function timeStrToMinutes(str) {
        const [h, m] = str.split(":").map(Number);
        return h * 60 + m;
    }

    // Utility to convert minutes to time string (e.g. 480 -> "08:00")
    function minutesToTimeStr(mins) {
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
    }

    function getBreakTimingsForDay(day) {
        const WORK_START = 480;
        const WORK_END = 1080;
        let sessions = [];
        if (day?.enabled && Array.isArray(day.sessions)) {
            for (const session of day.sessions) {
                if (session.startTime && session.endTime) {
                    sessions.push({
                        start: timeStrToMinutes(session.startTime),
                        end: timeStrToMinutes(session.endTime)
                    });
                }
            }
        }
        sessions.sort((a, b) => a.start - b.start);
        let breaks = [];
        let prevEnd = WORK_START;
        for (const s of sessions) {
            if (s.start > prevEnd) {
                breaks.push({ start: prevEnd, end: s.start });
            }
            prevEnd = Math.max(prevEnd, s.end);
        }
        if (prevEnd < WORK_END) {
            breaks.push({ start: prevEnd, end: WORK_END });
        }
        return breaks.map(b => ({
            start: minutesToTimeStr(b.start),
            end: minutesToTimeStr(b.end)
        }));
    }

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <div className="w-full">
            <h1 className="text-primary text-lg font-bold font-raleway">Break Timings</h1>
            <div className="mt-4">
                {availability.length === 0 ? (
                    <span className="text-gray-500">No availability data.</span>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {availability.map((day, idx) => {
                            const breaks = getBreakTimingsForDay(day);
                            return (
                                <div key={idx} className="mb-2 flex justify-start md:justify-between items-start bg-footerorange text-sm rounded-lg p-4">
                                    <h2 className="font-semibold text-tonedblack mb-1">{days[idx]}: </h2>
                                    {breaks.length === 0 ? (
                                        <span className="text-tonedblack">No breaks found (sessions cover all working hours or not enabled).</span>
                                    ) : (
                                        <ul className="list-none pl-4">
                                            {breaks.map((b, i) => (
                                                <li key={i} className="pb-2 text-tonedblack">{b.start} - {b.end}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            );
                        })}
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
        <div className="flex flex-col md:flex-row w-full bg-white rounded-xl shadow-equal p-8 space-y-8 space-x-12">
            <ClassSettings />
            <BreakSetting availability={availability} />
        </div>
    );
}

export default ClassSettingsMain;
import LabeledInput from "@/app/components/LabeledInput";
import LabeledSelect from "@/app/components/LabeledSelect";
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

function BreakSetting({}) {
    return(
        <div className="w-full">
            <h1 className="text-primary text-lg font-bold font-raleway">Break Timings</h1>

        </div>
    )
}

function ClassSettingsMain({}) {
    return (
        <div className="flex flex-col md:flex-row w-full bg-white rounded-xl shadow-equal p-8 space-y-8 space-x-12">
            <ClassSettings />
            <BreakSetting />
        </div>
    );
}

export default ClassSettingsMain;
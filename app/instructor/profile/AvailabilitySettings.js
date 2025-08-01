import { useState, useEffect } from "react";
import LabeledDatePicker from "@/app/components/LabeledDatePicker";
import LabeledInput from "@/app/components/LabeledInput";
import LabeledSelect from "@/app/components/LabeledSelect";
import { useFormContext } from "react-hook-form";
import PrimaryButton from "@/app/components/PrimaryButton";
import MildOrangeButton from "@/app/components/MildOrangeButton";
import DailySessionSingle from "./DailySessionSingle";
import DailyAvailability from "./DailyAvailability";

function AvailabilitySettings({profile}) {
    const { register, setValue, watch } = useFormContext();
    return(
        <div className="flex flex-col w-full bg-white rounded-xl shadow-equal p-8 space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="flex-grow text-primary text-lg font-bold font-raleway">Availability</h1>
                <div>
                    <MildOrangeButton text={'Goto Calender View'} bgColor={'primary'} textColor={'white'}/>
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row space-y-3 space-x-3">
                <DailyAvailability day={"monday"}/>
            </div>
        </div>
    )
}

export default AvailabilitySettings;
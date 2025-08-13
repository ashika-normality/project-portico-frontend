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
    const availability = watch("availability") || [];

    const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    const handleClose = () => {
        setShowCopyDay(false);
    };

    return(
        <div className="flex flex-col w-full bg-white rounded-xl shadow-equal p-8 space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="flex-grow text-primary text-lg font-bold font-raleway">Availability</h1>
                <div>
                    <MildOrangeButton text={'Go to Calender View'} bgColor={'primary'} textColor={'white'}/>
                </div>
            </div>
            <div className="w-full flex flex-col space-y-3 space-x-3">
                {days.map((day, index) => (
                    <DailyAvailability
                        key={day}
                        day={day}
                        dayIndex={index}
                        
                        // pass down register/setValue and existing sessions if any
                        sessions={availability[index]?.sessions || [{ label: "", startTime: "", endTime: "" }]}
                        enabled={availability[index]?.enabled || false}
                        register={register}
                        setValue={setValue}
                    />
                ))}
            </div>
            
        </div>
    )
}

export default AvailabilitySettings;
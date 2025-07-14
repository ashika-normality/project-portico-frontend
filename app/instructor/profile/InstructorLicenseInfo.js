import { useState, useEffect } from "react";

import LabeledDatePicker from "@/app/components/LabeledDatePicker";
import LabeledInput from "@/app/components/LabeledInput";
import LabeledSelect from "@/app/components/LabeledSelect";
import LabeledFileUpload from "@/app/components/LabeledFileUpload";
import { useAppContext } from "@/app/components/AppContext";
import { useFormContext } from "react-hook-form";

function InstructorLicenseInfo() {
    const { states, fetchStates, selectedCountry } = useAppContext();
    const [instructorLicenseNumber, setInstructorLicenseNumber] = useState("");
    const [instructorLicenseExpiry, setInstructorLicenseExpiry] = useState("");
    const [instructorLicenseStateIssued, setInstructorLicenseStateIssued] = useState("");
    const [instructorLicenseConditions, setInstructorLicenseConditions] = useState("");
    const { register, setValue, watch } = useFormContext();

    useEffect(() => {
        if (selectedCountry) {
            fetchStates(selectedCountry);
        }
    }, [selectedCountry, fetchStates]);

    return (
        <div className="flex flex-col w-full bg-white rounded-xl shadow-equal p-8 space-y-4">
            <h1 className="text-tonedblack text-lg font-bold font-raleway">Instructor License Information</h1>
            <div className="w-full flex space-x-3">
                <div className="w-1/2">
                    <LabeledInput
                        label="License Number"
                        name="instructorLicenseNumber"
                        value={instructorLicenseNumber}
                        onChange={e => setInstructorLicenseNumber(e.target.value)}
                        required={true}
                        register={register}
                        {...register("instructorLicenseNumber", { required: true })}
                    />
                </div>
                <div className="w-1/2">
                <LabeledDatePicker
                        label={"Expiry"}
                        name="instructorLicenseExpiry"
                        register = {register}
                        showDay={true}
                        showMonth={true}
                        showYear={true}
                        required={true}
                        {...register("instructorLicenseExpiry", { required: true })}
                    />
                </div>
            </div>
            <div className="w-full flex space-x-3">
                <div className="w-1/2">
                    <LabeledSelect
                        label="State Issued"
                        name="instructorLicenseStateIssued"
                        value={instructorLicenseStateIssued}
                        onChange={e => setInstructorLicenseStateIssued(e.target.value)}
                        options={states.map(s => ({ value: s.iso2, label: s.name }))}
                        required={false}
                        setValue={setValue}
                        register={register}
                        placeholder="Select State"
                        {...register("instructorLicenseStateIssued")}
                    />
                </div>
                <div className="w-1/2">
                    <LabeledInput
                        label="Conditions (If applicable)"
                        name="instructorLicenseConditions"
                        value={instructorLicenseConditions}
                        onChange={e => setInstructorLicenseConditions(e.target.value)}
                        required={false}
                        register={register}
                        {...register("instructorLicenseConditions")}
                    />
                </div>
            </div>
        </div>
    );
}

export default InstructorLicenseInfo;
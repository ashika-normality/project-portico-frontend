import { useState } from "react";


import LabeledDatePicker from "@/app/components/LabeledDatePicker";
import LabeledInput from "@/app/components/LabeledInput";
import LabeledSelect from "@/app/components/LabeledSelect";
import LabeledFileUpload from "@/app/components/LabeledFileUpload";

function InstructorLicenseInfo() {
    const [instructorLicenseNumber, setInstructorLicenseNumber] = useState("");
    const [instructorLicenseExpiry, setInstructorLicenseExpiry] = useState("");
    const [instructorLicenseStateIssued, setInstructorLicenseStateIssued] = useState("");
    const [instructorLicenseConditions, setInstructorLicenseConditions] = useState("");


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
                    />
                </div>
                <div className="w-1/2">
                    <LabeledDatePicker
                        label="Expiry"
                        name="instructorLicenseExpiry"
                        value={instructorLicenseExpiry}
                        onChange={e => setInstructorLicenseExpiry(e.target.value)}
                        showDay={true}
                        showMonth={true}
                        showYear={true}
                        required={true}
                    />
                </div>
            </div>
            <div className="w-full flex space-x-3">
                <div className="w-1/2">
                    <LabeledInput
                        label="State Issued"
                        name="instructorLicenseStateIssued"
                        value={instructorLicenseStateIssued}
                        onChange={e => setInstructorLicenseStateIssued(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="w-1/2">
                    <LabeledInput
                        label="Conditions (If applicable)"
                        name="instructorLicenseConditions"
                        value={instructorLicenseConditions}
                        onChange={e => setInstructorLicenseConditions(e.target.value)}
                        required={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default InstructorLicenseInfo;
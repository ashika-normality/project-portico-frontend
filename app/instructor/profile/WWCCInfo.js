import { useState } from "react";
import LabeledDatePicker from "@/app/components/LabeledDatePicker";
import LabeledInput from "@/app/components/LabeledInput";
import LabeledSelect from "@/app/components/LabeledSelect";

function WWCCInfo() {
    const [wwccNumber, setWwccNumber] = useState("");
    const [wwccExpiry, setWwccExpiry] = useState("");
    const [wwccStateIssued, setWwccStateIssued] = useState("");
    const [wwccType, setWwccType] = useState("");

    const stateOptions = [
        { value: "NSW", label: "New South Wales" },
        { value: "VIC", label: "Victoria" },
        { value: "QLD", label: "Queensland" },
        { value: "WA", label: "Western Australia" },
        { value: "SA", label: "South Australia" },
        { value: "TAS", label: "Tasmania" },
        { value: "ACT", label: "Australian Capital Territory" },
        { value: "NT", label: "Northern Territory" },
    ];

    const typeOptions = [
        { value: "employee", label: "Employee" },
        { value: "volunteer", label: "Volunteer" },
        { value: "self-employed", label: "Self-Employed" },
    ];

    return (
        <div className="flex flex-col w-full bg-white rounded-xl shadow-equal p-8 space-y-4">
            <h1 className="text-tonedblack text-lg font-bold font-raleway">WWCC Information</h1>
            <div className="w-full flex space-x-3">
                <div className="w-1/2">
                    <LabeledInput
                        label="WWCC Number"
                        name="wwccNumber"
                        value={wwccNumber}
                        onChange={e => setWwccNumber(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="w-1/2">
                    <LabeledDatePicker
                        label="Expiry"
                        name="wwccExpiry"
                        value={wwccExpiry}
                        onChange={e => setWwccExpiry(e.target.value)}
                        showDay={true}
                        showMonth={true}
                        showYear={true}
                        required={true}
                    />
                </div>
            </div>
            <div className="w-full flex space-x-3">
                <div className="w-1/2">
                    <LabeledSelect
                        label="State of Issue"
                        name="wwccStateIssued"
                        value={wwccStateIssued}
                        onChange={e => setWwccStateIssued(e.target.value)}
                        options={stateOptions}
                        required={true}
                        setValue={() => {}}
                    />
                </div>
                <div className="w-1/2">
                    <LabeledSelect
                        label="Type"
                        name="wwccType"
                        value={wwccType}
                        onChange={e => setWwccType(e.target.value)}
                        options={typeOptions}
                        required={true}
                        setValue={() => {}}
                    />
                </div>
            </div>
        </div>
    );
}

export default WWCCInfo; 
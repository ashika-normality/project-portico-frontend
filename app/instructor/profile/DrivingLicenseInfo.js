import { useState } from "react";

import { PiUploadFill } from "react-icons/pi";

import LabeledDatePicker from "@/app/components/LabeledDatePicker";
import LabeledInput from "@/app/components/LabeledInput";
import LabeledSelect from "@/app/components/LabeledSelect";
import LabeledFileUpload from "@/app/components/LabeledFileUpload";

function DrivingLicenseInfo() {
    const [licenseNumber, setLicenseNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cardStockNumber, setCardStockNumber] = useState("");
    const [stateIssued, setStateIssued] = useState("");
    const [licensePhoto, setLicensePhoto] = useState(null);



    function handlePhotoChange(e) {
        setLicensePhoto(e.target.files[0]);
    }

    return (
        <div className="flex flex-col w-full bg-white rounded-xl shadow-equal p-8 space-y-4">
            <h1 className="text-tonedblack text-lg font-bold font-raleway">Driving License Information</h1>
            <div className="w-full flex space-x-3">
                <div className="w-1/2">
                    <LabeledInput
                        label="License Number"
                        name="licenseNumber"
                        value={licenseNumber}
                        onChange={e => setLicenseNumber(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="w-1/2">
                    <LabeledDatePicker
                        label="Expiry"
                        name="expiry"
                        value={expiry}
                        onChange={e => setExpiry(e.target.value)}
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
                        label="Card Stock Number"
                        name="cardStockNumber"
                        value={cardStockNumber}
                        onChange={e => setCardStockNumber(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="w-1/2">
                    <LabeledInput
                        label="State Issued"
                        name="stateIssued"
                        value={stateIssued}
                        onChange={e => setStateIssued(e.target.value)}
                        required={true}
                    />
                </div>
            </div>
            <div className="w-full flex space-x-3">
                    <LabeledFileUpload
                        label=""
                        icon={<PiUploadFill className="w-6 h-6 text-primary" />}
                        name="licensePhoto"
                        onChange={handlePhotoChange}
                        required={true}
                        accept="image/*"
                        decription="Upload a copy of your driving license."
                    />
            </div>
        </div>
    );
}

export default DrivingLicenseInfo;
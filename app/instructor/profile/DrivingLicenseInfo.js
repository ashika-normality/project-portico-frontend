import { useState } from "react";

import { PiUploadFill } from "react-icons/pi";

import LabeledDatePicker from "@/app/components/LabeledDatePicker";
import LabeledInput from "@/app/components/LabeledInput";
import LabeledSelect from "@/app/components/LabeledSelect";
import LabeledFileUpload from "@/app/components/LabeledFileUpload";
import Image from "next/image";
import { useAppContext } from "@/app/components/AppContext";

import { useFormContext } from "react-hook-form";

function DrivingLicenseInfo() {
    const { states } = useAppContext();
    const [licensePhoto, setLicensePhoto] = useState(null);

    const { register, setValue, watch } = useFormContext();

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
                        required={true}
                        register={register}
                    />
                </div>
                <div className="w-1/2">
                <LabeledDatePicker
                        label={"Expiry"}
                        name="expiry"
                        register={register}
                        showDay={true}
                        showMonth={true}
                        showYear={true}
                        required={true}
                        {...register("expiry", { required: true })}
                    />
                </div>
            </div>
            <div className="w-full flex space-x-3">
                <div className="w-1/2">
                    <LabeledInput
                        label="Card Stock Number"
                        name="cardStockNumber"
                        required={true}
                        register={register}
                    />
                </div>
                <div className="w-1/2">
                    <LabeledSelect
                        label="State Issued"
                        name="stateIssued"
                        required={true}
                        options={states.map(s => ({ value: s.iso2, label: s.name }))}
                        placeholder="Select State"
                        register={register}
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
                        decription={licensePhoto?`Change Driving License Photo`:"Upload a copy of your driving license."}
                    />
            </div>
            {licensePhoto && (
                <div className="w-full flex justify-center mt-2">
                    <img
                        src={URL.createObjectURL(licensePhoto)}
                        alt="License Preview"
                        className=" max-h-40 rounded shadow border"
                    />
                </div>
            )}
        </div>
    );
}

export default DrivingLicenseInfo;
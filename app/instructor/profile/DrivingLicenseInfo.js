import { useEffect, useState } from "react";

import { PiUploadFill } from "react-icons/pi";

import LabeledDatePicker from "@/app/components/LabeledDatePicker";
import LabeledInput from "@/app/components/LabeledInput";
import LabeledSelect from "@/app/components/LabeledSelect";
import LabeledFileUpload from "@/app/components/LabeledFileUpload";
import Image from "next/image";
import { useAppContext } from "@/app/components/AppContext";

import { useFormContext } from "react-hook-form";

function DrivingLicenseInfo({profile}) {


    useEffect(() => {
        if (profile.drivingLicenseExpiry) {
            const expiryDate = new Date(profile.drivingLicenseExpiry);
            if (!isNaN(expiryDate.getTime())) {
                setValue("drivingLicenseExpiry", expiryDate.toISOString().split("T")[0]);
            }
        }

        setValue('stateIssued', profile.stateIssued);
    }, [profile]);

    const { states } = useAppContext();
    const [licensePhoto, setLicensePhoto] = useState(null);

    const { register, setValue, watch } = useFormContext();

    const expiry = watch('drivingLicenseExpiry')
    const stateIssued = watch('stateIssued') || profile?.stateIssued || ""; 

    function handlePhotoChange(e) {
        setLicensePhoto(e.target.files[0]);
    }

    return (
        <div className="flex flex-col w-full bg-white rounded-xl shadow-equal p-8 space-y-4">
            <h1 className="text-tonedblack text-lg font-bold font-raleway">Driving License Information</h1>
            <div className="w-full flex flex-col md:flex-row space-y-3 space-x-3">
                <div className="w-full md:w-1/2">
                    <LabeledInput
                        label="License Number"
                        name="licenseNumber"
                        required={true}
                        register={register}
                        setValue={setValue}
                        defaultValue={profile.drivingLicenseNumber}
                    />
                </div>
                <div className="w-full md:w-1/2">
                <LabeledDatePicker
                        label={"Expiry"}
                        name="drivingLicenseExpiry"
                        register={register}
                        setValue={setValue}
                        // ✅ Critical: Pass value from watch() OR profile
                        value={expiry || profile?.drivingLicenseExpiry || ""}
                        showDay={true}
                        showMonth={true}
                        showYear={true}
                        required={true}
                        //{...register("expiry", { required: true })}
                    />
                </div>
            </div>
            <div className="w-full flex space-x-3">
                <div className="w-1/2">
                    <LabeledInput
                        label="Card Stock Number"
                        name="cardStockNumber"
                        defaultValue={profile.cardStockNumber || ""}
                        required={true}
                        register={register}
                        setValue={setValue}
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
                        setValue={setValue}
                        onChange={e => setValue("stateIssued", e.target.value)}
                        value={stateIssued}
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
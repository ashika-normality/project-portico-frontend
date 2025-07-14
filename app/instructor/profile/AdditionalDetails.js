import { useState, useEffect } from "react";
import LabeledDatePicker from "@/app/components/LabeledDatePicker";
import LabeledInput from "@/app/components/LabeledInput";
import LabeledSelect from "@/app/components/LabeledSelect";
import { useFormContext } from "react-hook-form";

function AdditionalDetails() {
    const { register, setValue, watch } = useFormContext();
    const [experienceDate, setExperienceDate] = useState("");
    // Remove local totalExperience state
    // const [totalExperience, setTotalExperience] = useState("");

    // Calculate years of experience when experienceDate changes
    function calculateExperience(dateStr) {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-").map(Number);
        if (!year || !month) return "";
        const now = new Date();
        let years = now.getFullYear() - year;
        if (now.getMonth() + 1 < month) years -= 1;
        return years >= 0 ? years.toString() : "0";
    }

    function handleExperienceDateChange(e) {
        const value = e.target.value;
        setExperienceDate(value);
        setValue("experienceDate", value);
        // setValue("totalExperience", calculateExperience(value));
    }

    const watchedExperienceDate = watch("experienceDate") || "";
    const totalExperience = watch("totalExperience") || "";

    useEffect(() => {
        if (watchedExperienceDate) {
            setValue("totalExperience", calculateExperience(watchedExperienceDate));
        } else {
            setValue("totalExperience", "");
        }
    }, [watchedExperienceDate, setValue]);

    return (
        <div className="flex flex-col w-full bg-white rounded-xl shadow-equal p-8 space-y-4">
            <h1 className="text-tonedblack text-lg font-bold font-raleway">Additional Details</h1>
            <div className="w-full flex space-x-3">
                <div className="w-1/2">
                    <LabeledDatePicker
                        label="Instructor Since"
                        name="experienceDate"
                        required={true}
                        showMonth={true}
                        showYear={true}
                        value={experienceDate}
                        onChange={handleExperienceDateChange}
                        register={register}
                        {...register("experienceDate", { required: true })}
                    />
                </div>
                <div className="w-1/2">
                    <LabeledInput
                        label="Total Years of Experience"
                        name="totalExperience"
                        type="text"
                        value={totalExperience}
                        required={false}
                        disabled={true}
                        register={register}
                        {...register("totalExperience")}
                    />
                </div>
            </div>
            <div className="w-full flex space-x-3">
                <LabeledSelect
                    label="Business Type"
                    name="businessType"
                    setValue={setValue}
                    register={register}
                    options={[
                        { value: "individual", label: "Individual" },
                        { value: "company", label: "Company" },
                    ]}
                    required={true}
                    
                />
                <LabeledInput
                    label="Business/Trading Name"
                    name="businessName"
                    type="text"
                    required={false}
                    register={register}
                    {...register("businessName")}
                />
            </div>
            <div className="w-full flex space-x-3">
                <LabeledInput
                    label="Australia Business Number(ABN)"
                    name="abn"
                    type="text"
                    required={true}
                    register={register}
                    {...register("abn", { required: true })}
                />
                <LabeledSelect
                    label="Languages"
                    name="languages"
                    setValue={setValue}
                    value={watch("languages") || ""}
                    register={register}
                    onChange={(e) => {
                        setValue("languages", e.target.value);
                    }}
                    options={[
                        { value: "english", label: "English" },
                        { value: "arabic", label: "Arabic" },
                        { value: "chinese", label: "Chinese" },
                        { value: "croatian", label: "Croatian" },
                        { value: "greek", label: "Greek" },
                        { value: "korean", label: "Korean" },
                        { value: "japanese", label: "Japanese" },
                        { value: "serbian", label: "Serbian" },
                        { value: "spanish", label: "Spanish" },
                        { value: "turkish", label: "Turkish" },
                        { value: "vietnamese", label: "Vietnamese" },
                        { value: "german", label: "German" },
                        { value: "italian", label: "Italian" },
                    ]}
                
                />
            </div>
        </div>
    );
}

export default AdditionalDetails;
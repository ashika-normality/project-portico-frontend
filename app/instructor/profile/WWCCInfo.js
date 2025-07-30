import { useEffect } from "react";
import LabeledDatePicker from "@/app/components/LabeledDatePicker";
import LabeledInput from "@/app/components/LabeledInput";
import LabeledSelect from "@/app/components/LabeledSelect";
import { useAppContext } from "@/app/components/AppContext";
import { useFormContext } from "react-hook-form";

function WWCCInfo({profile}) {
    const { states, fetchStates, selectedCountry } = useAppContext();
    const { register, setValue, watch } = useFormContext();

    const typeOptions = [
        { value: "employee", label: "Employee" },
        { value: "volunteer", label: "Volunteer" },
        { value: "self-employed", label: "Self-Employed" },
    ];

    useEffect(() => {
        if (selectedCountry) {
            fetchStates(selectedCountry);
        }
    }, [selectedCountry, fetchStates]);

    const wwccStateIssuedValue = watch("wwccStateIssued");
    const wwccTypeValue = watch("wwccType");
    const WWCCExpiry = watch("WWCCExpiry");

    return (
        <div className="flex flex-col w-full bg-white rounded-xl shadow-equal p-8 space-y-4">
            <h1 className="text-tonedblack text-lg font-bold font-raleway">WWCC Information</h1>
            <div className="w-full flex flex-col md:flex-row space-y-3 space-x-3">
                <div className="w-full md:w-1/2">
                    <LabeledInput
                        label="WWCC Number"
                        name="wwccNumber"
                        required={true}
                        register={register}
                        setValue={setValue}
                        defaultValue={profile.wwccNumber}
                    />
                </div>
                <div className="w-full md:w-1/2">
                <LabeledDatePicker
                        label={"Expiry"}
                        name="WWCCExpiry"
                        register={register}
                        setValue={setValue}
                        value={WWCCExpiry || profile.WWCCExpiry || ""}
                        showDay={true}
                        showMonth={true}
                        showYear={true}
                        required={true}
                        {...register("WWCCExpiry", { required: true })}
                    />
                </div>
            </div>
            <div className="w-full flex space-x-3">
                <div className="w-1/2">
                    <LabeledSelect
                        label="State Issued"
                        name="wwccStateIssued"
                        options={states.map(s => ({ value: s.iso2, label: s.name }))}
                        required={false}
                        register={register}
                        value={wwccStateIssuedValue}
                        setValue={setValue}
                        onChange={e => setValue("wwccStateIssued", e.target.value)}
                        placeholder="Select State"
                    />
                </div>
                <div className="w-1/2">
                    <LabeledSelect
                        label="Type"
                        name="wwccType"
                        options={typeOptions}
                        required={false}
                        register={register}
                        value={wwccTypeValue}
                        setValue={setValue}
                        onChange={e => setValue("wwccType", e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}

export default WWCCInfo; 
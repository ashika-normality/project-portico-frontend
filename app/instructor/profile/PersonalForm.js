import LabeledDatePicker from "@/app/components/LabeledDatePicker";
import LabeledInput from "@/app/components/LabeledInput";
import LabeledSelect from "@/app/components/LabeledSelect";
import { useAppContext } from "@/app/components/AppContext";
import { useState, useEffect } from "react";
import LabeledTextbox from "@/app/components/LabeledTextbox";
import { useFormContext } from "react-hook-form";

const PersonalForm = () => {
    const { countries, states, cities, fetchStates, fetchCities, selectedCountry, setSelectedCountry, selectedState, setSelectedState, selectedCity, setSelectedCity } = useAppContext();
    const { register, setValue, watch } = useFormContext();

    // Sync react-hook-form values with context state for selects
    // useEffect(() => {
    //     fetchStates(selectedCountry || "AU");
    //     setSelectedState("");
    //     setSelectedCity("");
    //     setValue("country", selectedCountry || "AU");
    // }, [selectedCountry]);

    useEffect(() => {
        fetchCities(selectedCountry || "AU", selectedState);
        setSelectedCity("");
        setValue("state", selectedState);
    }, [selectedCountry, selectedState]);

    useEffect(() => {
        setValue("city", selectedCity);
    }, [selectedCity]);

    // --- Country code logic for phone number ---
    const mobile = watch("mobile") || "";
    useEffect(() => {
        fetchStates(selectedCountry || "AU");
        setSelectedState("");
        setSelectedCity("");
        setValue("country", selectedCountry || "AU");
        // Use AU as default for phone code if not selected
        const country = countries.find(c => c.iso2 === (selectedCountry || "AU"));
        if (country && country.phonecode) {
            const code = `+${country.phonecode}`;
            if (!mobile.startsWith(code)) {
                setValue("mobile", code);
            }
        }
    }, [selectedCountry, countries]);
    // --- End country code logic ---

    const gender = watch("gender") || "";

    return(
        <div className="flex flex-col w-full bg-white rounded-xl shadow-equal p-8 space-y-4">
            <div className="flex flex-col md:flex-row space-y-2 space-x-3">
                <LabeledInput
                    label="First Name"
                    name="firstName"
                    type="text"
                    required={true}
                    register = {register}
                />
                <LabeledInput
                    label={"Last Name"}
                    name="lastName"
                    type="text"
                    required={true}
                    register = {register}
                    {...register("lastName", { required: true })}
                />
            </div> 
            <div className="flex flex-col md:flex-row space-y-2 space-x-3">  
                <LabeledInput
                    label={"Email Address"}
                    name="email"
                    type="email"
                    required={true}
                    register = {register}
                    {...register("email", { required: true })}
                />
                
                <LabeledSelect
                    label={"Gender"}
                    name={"gender"}
                    register = {register}
                    setValue={setValue}
                    value={gender}
                    onChange={e => {
                        setValue("gender", e.target.value); // keep form state in sync
                      }}
                    options={[
                        {value: "male", label:"Male"},
                        {value: "female", label:"Female"},
                        {value: "not_to_say", label:"Prefer not to say"}
                    ]}
                    // {...register("gender")}
                />
            </div>
            <div className="flex flex-col md:flex-row space-y-2 space-x-3">
                <div className="w-full md:w-1/2">
                    <LabeledInput
                        label={"Mobile"}
                        name="mobile"
                        register = {register}
                        type="tel"
                        required={true}
                        value={mobile}
                        onChange={e => setValue("mobile", e.target.value)}
                        // Optionally, you can add a prefix visually here
                        placeholder={(() => {
                            const country = countries.find(c => c.iso2 === (selectedCountry || "AU"));
                            return country && country.phonecode ? `+${country.phonecode} Enter phone number` : "Enter phone number";
                        })()}
                    />
                </div>
                <div className="w-full md:w-1/2">
                    <LabeledDatePicker
                        label={"Date of Birth"}
                        name="dob"
                        register = {register}
                        showDay={true}
                        showMonth={true}
                        showYear={true}
                        required={true}
                        {...register("dob", { required: true })}
                    />
                </div>
            </div>
            <LabeledInput 
                label={"Address Line 1"}
                name="address1"
                register = {register}
                type="text"
                required={true}
                placeholder={"Street Address"}
                {...register("address1", { required: true })}
            />
            <LabeledInput 
                label={"Address Line 2"}
                name="address2"
                type="text"
                register = {register}
                required={false}
                placeholder={"Apartment, Suite, Unit, Building, Floor"}
                {...register("address2")}
            />
            <div className="full flex justify-between items-center space-x-4">
                <div className="w-1/2">
                <LabeledInput 
                    label={"Postcode"}
                    name="postcode"
                    register = {register}
                    type="text"
                    required={true}
                    {...register("postcode", { required: true })}
                />
                </div>
                <div className="w-1/2">
                <LabeledSelect
                    label={"Country"}
                    name="country"
                    register = {register}
                    options={countries.map(c => ({ value: c.iso2, label: c.name }))}
                    value={selectedCountry || "AU"}
                    setValue={setValue}
                    onChange={e => {
                        setSelectedCountry(e.target.value);
                        setValue("country", e.target.value); // keep form state in sync
                      }}
                    required={true}
                    placeholder="Select Country"
                />
                </div>
            </div>
            <div className="full flex justify-between items-center space-x-4">
                <div className="w-1/2">
                <LabeledSelect
                    label={"State"}
                    name="state"
                    register = {register}
                    options={states.map(s => ({ value: s.iso2, label: s.name }))}
                    value={selectedState}
                    setValue={setValue}
                    onChange={e => {
                        setSelectedState(e.target.value);
                        setValue("state", e.target.value); // keep form state in sync
                      }}
                    required={true}
                    placeholder="Select State"
                />
                </div>
                <div className="w-1/2">
                <LabeledSelect
                    label={"City/Suburb"}
                    name="city"
                    register = {register}
                    options={cities.map(city => ({ value: city.name, label: city.name }))}
                    value={selectedCity}
                    setValue={setValue}
                    onChange={e => {
                        setSelectedCity(e.target.value);
                        setValue("city", e.target.value); // keep form state in sync
                      }}
                    required={true}
                    placeholder="Select City"
                />
                </div>
            </div>
            <LabeledTextbox
                label={"About Me"}
                name="aboutMe"
                register = {register}
                required={false}
                rows={3}
                {...register("aboutMe")}
            />
        </div>
        
    )
}

export default PersonalForm;
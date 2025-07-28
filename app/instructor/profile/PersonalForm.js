import LabeledDatePicker from "@/app/components/LabeledDatePicker";
import LabeledInput from "@/app/components/LabeledInput";
import LabeledSelect from "@/app/components/LabeledSelect";
import { useAppContext } from "@/app/components/AppContext";
import { useState, useEffect } from "react";
import LabeledTextbox from "@/app/components/LabeledTextbox";
import { useFormContext } from "react-hook-form";

const PersonalForm = ({profile}) => {
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
        if (!profile?.user) return; // Guard clause if profile is not yet loaded

        const profileCountry = profile.user.address?.country || "AU";
        const profileState = profile.user.address?.state || "";
        const profileCity = profile.user.address?.city || "";

        // 1. Set the context state for all location fields
        setSelectedCountry(profileCountry);
        setSelectedState(profileState);
        setSelectedCity(profileCity);

        // 2. Set the react-hook-form values for all location fields
        setValue("country", profileCountry);
        setValue("state", profileState);
        setValue("city", profileCity);
        
        // 3. Fetch the dropdown options based on the profile data
        fetchStates(profileCountry);
        if (profileState) {
            fetchCities(profileCountry, profileState);
        }

        // 4. Handle mobile country code
        const countryData = countries.find(c => c.iso2 === profileCountry);
        if (countryData?.phonecode) {
            const code = `+${countryData.phonecode}`;
            const currentMobile = watch("mobile") || profile.user.mobile || "";
            if (!currentMobile.match(/^\+\d+/)) {
                setValue("mobile", code + currentMobile);
            }
        }

    }, [profile, countries]);
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
                    register={register}
                    setValue={setValue}
                    defaultValue={profile.user.firstName}
                />

            </div> 
            <div className="flex flex-col md:flex-row space-y-2 space-x-3">
                <LabeledInput
                    label={"Last Name"}
                    name="lastName"
                    type="text"
                    required={true}
                    register = {register}
                    setValue={setValue}
                    defaultValue={profile.user.lastName}
                    
                />
                <LabeledInput
                    label={"Nick Name"}
                    name="nickName"
                    type="text"
                    required={false}
                    register = {register}
                    setValue={setValue}
                    defaultValue={profile.user.nickName}
                    
                />
            </div> 
            <div className="flex flex-col md:flex-row space-y-2 space-x-3">  
                <LabeledInput
                    label={"Email Address"}
                    name="email"
                    type="email"
                    required={true}
                    register = {register}
                    setValue={setValue}
                    defaultValue={profile.user.email}
                />
                
                <LabeledSelect
                    label={"Gender"}
                    name={"gender"}
                    value={watch("gender") || profile?.user?.gender || ""}
                    onChange={(e) => setValue("gender", e.target.value, { shouldValidate: true })}
                    required={true}
                    options={[
                        {value: "male", label:"Male"},
                        {value: "female", label:"Female"},
                        {value: "not_to_say", label:"Prefer not to say"}
                    ]}
                />
                {console.log(profile?.user?.gender)}
            </div>
            <div className="flex flex-col md:flex-row space-y-2 space-x-3">
                <div className="w-full md:w-1/2">
                    <LabeledInput
                        label={"Mobile"}
                        name="mobile"
                        type="tel"
                        required={true}
                        register={register}
                        setValue={setValue}
                        defaultValue={(() => {
                        // Get profile mobile (might not have country code)
                        const profileMobile = profile?.user?.mobile || "";
                        
                        // Get current country code
                        const country = countries.find(c => c.iso2 === (selectedCountry || "AU"));
                        const countryCode = country?.phonecode ? `+${country.phonecode}` : '';
                        
                        // If profile mobile already has a country code, use as-is
                        if (profileMobile && profileMobile.match(/^\+\d+/)) {
                            return profileMobile;
                        }
                        
                        // Otherwise prepend current country code
                        return countryCode + profileMobile.replace(/^\+\d+/, '');
                        })()}
                        onChange={(e) => {
                        const country = countries.find(c => c.iso2 === (selectedCountry || "AU"));
                        const countryCode = country?.phonecode ? `+${country.phonecode}` : '';
                        
                        // Prevent deleting country code if it exists
                        if (countryCode && !e.target.value.startsWith(countryCode)) {
                            // But allow if they're typing a different valid country code
                            if (!e.target.value.match(/^\+\d+/)) {
                            setValue("mobile", countryCode + e.target.value.replace(/^\+\d+/, ''));
                            return;
                            }
                        }
                        
                        setValue("mobile", e.target.value);
                        }}
                        placeholder={(() => {
                        const country = countries.find(c => c.iso2 === (selectedCountry || "AU"));
                        return country?.phonecode ? `+${country.phonecode} Enter phone number` : "Enter phone number";
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
                setValue={setValue}
                defaultValue={profile.user.address.line1}
                //{...register("address1", { required: true })}
            />
            <LabeledInput 
                label={"Address Line 2"}
                name="address2"
                type="text"
                register = {register}
                required={false}
                placeholder={"Apartment, Suite, Unit, Building, Floor"}
                //{...register("address2")}
                setValue={setValue}
                defaultValue={profile.user.address.line2}
            />
            <div className="full flex justify-between items-center space-x-4">
                <div className="w-1/2">
                <LabeledInput 
                    label={"Postcode"}
                    name="postcode"
                    register = {register}
                    type="text"
                    required={true}
                    setValue={setValue}
                    defaultValue={profile.user.address.line1}
                    //{...register("postcode", { required: true })}
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
                setValue={setValue}
                defaultValue={profile.bio}
                //{...register("aboutMe")}
            />
        </div>
        
    )
}

export default PersonalForm;
import LabeledDatePicker from "@/app/components/LabeledDatePicker";
import LabeledInput from "@/app/components/LabeledInput";
import LabeledSelect from "@/app/components/LabeledSelect";
import { useAppContext } from "@/app/components/AppContext";
import { useState, useEffect } from "react";
import LabeledTextbox from "@/app/components/LabeledTextbox";
import { useFormContext } from "react-hook-form";

const PersonalForm = () => {
    const { countries, states, cities, fetchStates, fetchCities } = useAppContext();
    const [selectedCountry, setSelectedCountry] = useState("AU");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const { register, setValue, watch } = useFormContext();

    // Sync react-hook-form values with local state for selects
    useEffect(() => {
        fetchStates(selectedCountry);
        setSelectedState("");
        setSelectedCity("");
        setValue("country", selectedCountry);
    }, [selectedCountry]);

    useEffect(() => {
        fetchCities(selectedCountry, selectedState);
        setSelectedCity("");
        setValue("state", selectedState);
    }, [selectedCountry, selectedState]);

    useEffect(() => {
        setValue("city", selectedCity);
    }, [selectedCity]);

    // Watch for form value changes (optional, for debugging)
    // const formValues = watch();

    return(
        <div className="flex flex-col w-full bg-white rounded-xl shadow-equal p-8 space-y-4">
            <div className="flex space-x-3">
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
            <div className="flex space-x-3">  
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
                    onChange={e => {
                        setSelectedCountry(e.target.value);
                        setValue("country", e.target.value); // keep form state in sync
                      }}
                    options={[
                        {value: "male", label:"Male"},
                        {value: "female", label:"Female"},
                        {value: "not_to_say", label:"Prefer not to say"}
                    ]}
                    {...register("gender")}
                />
            </div>
            <div className="flex space-x-3">
                <div className="w-full md:w-3/5">
                    <LabeledInput
                        label={"Mobile"}
                        name="mobile"
                        register = {register}
                        type="tel"
                        required={true}
                        
                    />
                </div>
                <div className="w-full md:w-2/5">
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
                    value={selectedCountry}
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
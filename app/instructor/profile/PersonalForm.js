import { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import LabeledDatePicker from "@/app/components/LabeledDatePicker";
import LabeledInput from "@/app/components/LabeledInput";
import LabeledSelect from "@/app/components/LabeledSelect";
import LabeledTextbox from "@/app/components/LabeledTextbox";
import { useAppContext } from "@/app/components/AppContext";

const PersonalForm = ({ profile }) => {
  const {
    countries,
    states,
    cities,
    fetchStates,
    fetchCities,
    selectedCountry,
    setSelectedCountry,
    selectedState,
    setSelectedState,
    selectedCity,
    setSelectedCity,
  } = useAppContext();

  const { register, setValue, watch } = useFormContext();

  const isInitialLoad = useRef(true);

  // Initialize form from profile
  useEffect(() => {
    if (!profile?.user) return;

    const country = profile.user.address?.country || "AU";
    const state = profile.user.address?.state || "";
    const city = profile.user.address?.city || "";

    // Update selected and form state
    setSelectedCountry(country);
    setValue("country", country);

    fetchStates(country).then(() => {
        setSelectedState(state);
        setValue("state", state);

        fetchCities(country, state).then(() => {
        setSelectedCity(city);
        setValue("city", city);
        });
    });

    // Set mobile code
    const countryData = countries.find((c) => c.iso2 === country);
    const code = countryData?.phonecode ? `+${countryData.phonecode}` : "";
    const currentMobile = watch("mobile") || profile.user.mobile || "";
    if (!currentMobile.match(/^\+\d+/)) {
        setValue("mobile", code + currentMobile);
    }

    // Set DOB
    if (profile.user.dob) {
        const dobDate = new Date(profile.user.dob);
        if (!isNaN(dobDate.getTime())) {
        setValue("dob", dobDate.toISOString().split("T")[0]);
        }
    }

    isInitialLoad.current = false;
    }, [profile, countries]);


  // When selectedCountry changes
  useEffect(() => {
    if (isInitialLoad.current) return;
    if (!selectedCountry) return;

    setSelectedState("");
    setSelectedCity("");
    setValue("state", "");
    setValue("city", "");

    fetchStates(selectedCountry);
  }, [selectedCountry]);

  // When selectedState changes
  useEffect(() => {
    if (isInitialLoad.current) return;
    if (!selectedCountry || !selectedState) return;

    setSelectedCity("");
    setValue("city", "");

    fetchCities(selectedCountry, selectedState);
  }, [selectedState]);

  // Watch gender
  const gender = watch("gender") || "";

  return (
    <div className="flex flex-col w-full bg-white rounded-xl shadow-equal p-8 space-y-4">
      {/* First & Last Name */}
      <div className="flex flex-col md:flex-row space-y-2 space-x-3">
        <LabeledInput label="First Name" name="firstName" type="text" required register={register} setValue={setValue} defaultValue={profile.user.firstName} />
        <LabeledInput label="Last Name" name="lastName" type="text" required register={register} setValue={setValue} defaultValue={profile.user.lastName} />
      </div>

      {/* Nickname */}
      <div className="flex flex-col md:flex-row space-y-2 space-x-3">
        <LabeledInput label="Nick Name" name="nickName" type="text" register={register} setValue={setValue} defaultValue={profile.user.nickName} />
      </div>

      {/* Email & Gender */}
      <div className="flex flex-col md:flex-row space-y-2 space-x-3">
        <LabeledInput label="Email Address" name="email" type="email" required register={register} setValue={setValue} defaultValue={profile.user.email} />
        <LabeledSelect
          label="Gender"
          name="gender"
          value={gender}
          onChange={(e) => setValue("gender", e.target.value, { shouldValidate: true })}
          required
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "not_to_say", label: "Prefer not to say" },
          ]}
        />
      </div>

      {/* Mobile & DOB */}
      <div className="flex flex-col md:flex-row space-y-2 space-x-3">
        <div className="w-full md:w-1/2">
          <LabeledInput
            label="Mobile"
            name="mobile"
            type="tel"
            required
            register={register}
            setValue={setValue}
            defaultValue={(() => {
              const mobile = profile?.user?.mobile || "";
              const code = countries.find((c) => c.iso2 === selectedCountry)?.phonecode || "61";
              return mobile.startsWith("+") ? mobile : `+${code}${mobile}`;
            })()}
            onChange={(e) => {
              const code = countries.find((c) => c.iso2 === selectedCountry)?.phonecode || "61";
              const val = e.target.value;
              if (!val.startsWith(`+${code}`)) {
                if (!val.match(/^\+\d+/)) {
                  setValue("mobile", `+${code}${val}`);
                  return;
                }
              }
              setValue("mobile", val);
            }}
          />
        </div>
        <div className="w-full md:w-1/2">
          <LabeledDatePicker
            label="Date of Birth"
            name="dob"
            register={register}
            setValue={setValue}
            value={watch("dob")}
            showDay
            showMonth
            showYear
            required
          />
        </div>
      </div>

      {/* Address Line 1 & 2 */}
      <LabeledInput
        label="Address Line 1"
        name="address1"
        type="text"
        register={register}
        setValue={setValue}
        required
        defaultValue={profile.user.address.line1}
      />
      <LabeledInput
        label="Address Line 2"
        name="address2"
        type="text"
        register={register}
        setValue={setValue}
        defaultValue={profile.user.address.line2}
      />

      {/* Postcode & Country */}
      <div className="full flex justify-between items-center space-x-4">
        <div className="w-1/2">
          <LabeledInput
            label="Postcode"
            name="postcode"
            register={register}
            type="text"
            required
            setValue={setValue}
            defaultValue={profile.user.address.postcode}
          />
        </div>
        <div className="w-1/2">
          <LabeledSelect
            label="Country"
            name="country"
            register={register}
            options={countries.map((c) => ({ value: c.iso2, label: c.name }))}
            value={selectedCountry}
            setValue={setValue}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedCountry(val);
              setValue("country", val);
            }}
            required
            placeholder="Select Country"
          />
        </div>
      </div>

      {/* State & City */}
      <div className="full flex justify-between items-center space-x-4">
        <div className="w-1/2">
          <LabeledSelect
            label="State"
            name="state"
            register={register}
            options={states.map((s) => ({ value: s.iso2, label: s.name }))}
            value={selectedState}
            setValue={setValue}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedState(val);
              setValue("state", val);
            }}
            required
            placeholder="Select State"
          />
        </div>
        <div className="w-1/2">
          <LabeledSelect
            label="City/Suburb"
            name="city"
            register={register}
            options={cities.map((c) => ({ value: c.name, label: c.name }))}
            value={selectedCity}
            setValue={setValue}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedCity(val);
              setValue("city", val);
            }}
            required
            placeholder="Select City"
          />
        </div>
      </div>

      {/* About Me */}
      <LabeledTextbox
        label="About Me"
        name="aboutMe"
        register={register}
        setValue={setValue}
        rows={3}
        defaultValue={profile.bio}
      />
    </div>
  );
};

export default PersonalForm;

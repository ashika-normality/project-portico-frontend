'use client'
import { useState, useEffect } from "react";
import LabeledFileUpload from "@/app/components/LabeledFileUpload";
import LabeledInput from "@/app/components/LabeledInput";
import LabeledSelect from "@/app/components/LabeledSelect";
import LabeledTextbox from "@/app/components/LabeledTextbox";
import PrimaryButton from "@/app/components/PrimaryButton";
import { MdCloudUpload } from "react-icons/md";
 

const SignupForm = () => {
    const API_KEY = process.env.NEXT_PUBLIC_COUNTRY_API_KEY; // <-- Replace with your real API key
    console.log(API_KEY);
  // State for options
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // State for selected values
  const [selectedCountry, setSelectedCountry] = useState("AU");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://api.countrystatecity.in/v1/countries", {
          headers: { "X-CSCAPI-KEY": API_KEY }
        });
        if (!res.ok) throw new Error("Failed to fetch countries");
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        setCountries([]);
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    const fetchStates = async () => {
      if (selectedCountry) {
        try {
          const res = await fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountry}/states`, {
            headers: { "X-CSCAPI-KEY": API_KEY }
          });
          if (!res.ok) throw new Error("Failed to fetch states");
          const data = await res.json();
          setStates(data);
        } catch (error) {
          setStates([]);
          setCities([]);
          console.error("Error fetching states:", error);
        }
      } else {
        setStates([]);
        setCities([]);
      }
      setSelectedState("");
      setSelectedCity("");
    };
    fetchStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  // Fetch cities when state changes
  useEffect(() => {
    const fetchCities = async () => {
      if (selectedCountry && selectedState) {
        try {
          const res = await fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountry}/states/${selectedState}/cities`, {
            headers: { "X-CSCAPI-KEY": API_KEY }
          });
          if (!res.ok) throw new Error("Failed to fetch cities");
          const data = await res.json();
          setCities(data);
        } catch (error) {
          setCities([]);
          console.error("Error fetching cities:", error);
        }
      } else {
        setCities([]);
      }
      setSelectedCity("");
    };
    fetchCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, selectedState]);

  return (
    <form className="flex flex-col space-y-4 w-full py-3 px-6">
      <div className="full flex justify-between items-center space-x-4">
        <LabeledInput 
          label={"First Name"}
          name="first_name"
          type="text"
          required={true}
        />
        <LabeledInput 
          label={"Last Name"}
          name="last_name"
          type="text"
          required={true}
        />
      </div>
      <div className="full flex justify-between items-center space-x-4">
        <LabeledInput 
          label={"Email Address"}
          name="email_address"
          type="email"
          required={true}
        />
        <LabeledInput 
          label={"Mobile"}
          name="mobile"
          type="text"
          required={true}
        />
      </div>
      <LabeledInput 
        label={"Address Line 1"}
        name="address_line_1"
        type="text"
        placeholder={"Street Address"}
        required={true}
      />
      <LabeledInput 
        label={"Address Line 2"}
        name="address_line_2"
        type="text"
        placeholder={"Apartment, Suite, Unit, Building, Floor, etc."}
        required={false}
      />
      <div className="full flex justify-between items-center space-x-4">
        <div className="w-4/10">
          <LabeledInput 
            label={"Postcode"}
            name="postcode"
            type="text"
            required={true}
          />
        </div>
        <div className="w-6/10">
          <LabeledSelect
            label={"Country"}
            name="country"
            options={countries.map(c => ({ value: c.iso2, label: c.name }))}
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
            required={true}
            placeholder="Select Country"
          />
        </div>
      </div>
      <div className="full flex justify-between items-center space-x-4">
        <div className="w-4/10">
          <LabeledSelect
            label={"State"}
            name="state"
            options={states.map(s => ({ value: s.iso2, label: s.name }))}
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
            required={true}
            placeholder="Select State"
          />
        </div>
        <div className="w-6/10">
          <LabeledSelect
            label={"City/Suburb"}
            name="city"
            options={cities.map(city => ({ value: city.name, label: city.name }))}
            value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
            required={true}
            placeholder="Select City"
          />
        </div>
      </div>
      <div className="full flex justify-between items-center space-x-4">
        <div className="w-4/10">
          <LabeledInput
            label={"Driving License Number"}
            name="driving_license_number"
            type="text"
            required={true}
          />
        </div>
        <div className="w-6/10">
          <LabeledInput
            label={"Instructor License Number"}
            name="instructor_license_number"
            type="text"
            required={true}
          />
        </div>
      </div>
      <div className="full flex justify-between items-center space-x-4">
        <div className="w-4/10">
          <LabeledInput
            label={"WWCC Number"}
            name="wwcc_number"
            type="text"
            required={true}
          />
        </div>
        <div className="w-6/10">
          <LabeledInput
            label={"Driving School Name"}
            name="driving_school_name"
            type="text"
            required={false}
          />
        </div>
      </div>
      <LabeledInput 
        label={"Website"}
        name="website"
        type="text"
        required={false}
      />
      <LabeledTextbox
        label={"Bio"}
        name="bio"
        required={false}
        rows={3}
      />
      <LabeledFileUpload
        label="Upload Photograph"
        icon={<MdCloudUpload size={40} />}
        name="photograph"
        required
        tooltip="Accepted formats: PDF, JPG, PNG. Max size: 5MB."
        accept=".pdf,.jpg,.jpeg,.png"
      />
      <div className="flex items-center space-x-2 pt-2 pb-4">
        <input type="checkbox" id="terms" name="terms" className="mr-2" required />
        <label htmlFor="terms" className="text-sm font-source-sans">
          By signing up you agree to our <a href="/terms" className="text-primary hover:underline">Terms and conditions</a> and <a href="/terms" className="text-primary hover:underline">Privacy policy*</a>
        </label>
      </div>
      <PrimaryButton
        text="Sign Up"
        type="submit"
      />
    </form>
  );
};

export default SignupForm; 
'use client'
import { useState, useEffect } from "react";
import LabeledFileUpload from "@/app/components/LabeledFileUpload";
import LabeledInput from "@/app/components/LabeledInput";
import LabeledSelect from "@/app/components/LabeledSelect";
import LabeledTextbox from "@/app/components/LabeledTextbox";
import PrimaryButton from "@/app/components/PrimaryButton";
import { MdCloudUpload } from "react-icons/md";
import axiosInstance from '@/app/utils/axiosInterceptor';
import { Toaster, toast } from "react-hot-toast";
import { useAppContext } from "@/app/components/AppContext";


const SignupForm = () => {
    const API_KEY = process.env.NEXT_PUBLIC_COUNTRY_API_KEY; // <-- Replace with your real API key
  const { countries, states, cities, fetchStates, fetchCities } = useAppContext();
  const [selectedCountry, setSelectedCountry] = useState("AU");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetchStates(selectedCountry);
    setSelectedState("");
    setSelectedCity("");
  }, [selectedCountry]);

  useEffect(() => {
    fetchCities(selectedCountry, selectedState);
    setSelectedCity("");
  }, [selectedCountry, selectedState]);

  const [formStatus, setFormStatus] = useState({ loading: false, error: '', success: '' });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, error: '', success: '' });
    // Collect form data
    const formData = {
      firstName: e.target.first_name.value,
      lastName: e.target.last_name.value,
      email: e.target.email_address.value,
      mobile: e.target.mobile.value,
      address: {
        line1: e.target.address_line_1.value,
        line2: e.target.address_line_2.value,
        city: e.target.city.value,
        state: e.target.state.value,
        country: e.target.country.value,
        postcode: e.target.postcode.value,
      },
      drivingLicenseNumber: e.target.driving_license_number.value,
      instructorLicenseNumber: e.target.instructor_license_number.value,
      wwccNumber: e.target.wwcc_number.value,
      drivingSchoolName: e.target.driving_school_name.value,
      website: e.target.website.value,
      bio: e.target.bio.value,
      // photographUrl: handle file upload separately if needed
    };
    try {
      const response = await axiosInstance.post(
        'http://localhost:7002/api/auth/register-instructor',
        formData
      );
      setFormStatus({ loading: false, error: '', success: response.data.message });
      toast.success("Signup successful.");
    } catch (error) {
      setFormStatus({ loading: false, error: error.response?.data?.message || 'Signup failed', success: '' });
      toast.error(error.response?.data?.message || 'Signup failed. Please try again later.');
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  return (
    
    <form className="flex flex-col space-y-4 w-full py-3 px-6" onSubmit={handleSubmit}>
      <Toaster />
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
        label={photoPreview?"Change Image":"Upload Image"}
        icon={<MdCloudUpload size={40} />}
        name="photograph"
        required
        tooltip="Accepted formats: PDF, JPG, PNG. Max size: 5MB."
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handlePhotoChange}
        decription="Click to Upload or Drag and Drop Files here"
      />
      {photoPreview && (
        <div className="mt-2 flex justify-center">
          <img src={photoPreview} alt="Photograph Preview" className="max-h-40 rounded shadow" />
        </div>
      )}
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
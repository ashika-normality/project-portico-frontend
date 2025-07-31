'use client'
import { useState, useEffect } from "react";
import LabeledFileUpload from "@/app/components/LabeledFileUpload";
import LabeledInput from "@/app/components/LabeledInput";
import LabeledSelect from "@/app/components/LabeledSelect";
import LabeledTextbox from "@/app/components/LabeledTextbox";
import PrimaryButton from "@/app/components/PrimaryButton";

import { MdCloudUpload } from "react-icons/md";
import { BsPersonVcardFill } from "react-icons/bs";
import { RiInfoCardFill } from "react-icons/ri";



import axiosInstance from '@/app/utils/axiosInterceptor';
import { Toaster, toast } from "react-hot-toast";
import { useAppContext } from "@/app/components/AppContext";
import { useRouter } from "next/navigation";
import OtpForm from "../login/OtpForm";

import SpinnerComponent from "@/app/components/SpinnerComponent";
import ImageUploadButton from "@/app/components/ImageUploadButton";
import PopUpImageUpload from "@/app/components/PopUpImageUpload";



const ListTooltip = ({ items, renderItem }) => {
  return (
    <ul className="list-disc font-light text-[12px] pl-3 py-1">
      {items.map((item, index) => (
        <li key={index} className="font-source-sans">
          {(item)}
        </li>
      ))}
    </ul>
  ); 
}


const SignupForm = () => {
  const router = useRouter();
  const API_KEY = process.env.NEXT_PUBLIC_COUNTRY_API_KEY;
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

  // FIXED: Initial loading should be false, not true
  const [formStatus, setFormStatus] = useState({ loading: false, error: '', success: '' });
  const [validationErrors, setValidationErrors] = useState({});

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [step, setStep] = useState(1); // 1: form, 2: otp
  const [otp, setOtp] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");

  const [showDrivingLicenseUpload, setShowDrivingLicenseUpload] = useState(false);
  const [drivingLicense, setDrivingLicense] = useState({
    front: null,
    back: null,
    frontPreview: null,
    backPreview: null,
  });

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile) => {
    return true
  };

  const validatePostcode = (postcode, country) => {
    if (country === 'AU') {
      return /^\d{4}$/.test(postcode);
    }
    return postcode.length >= 3 && postcode.length <= 10;
  };

  const validateLicenseNumber = (licenseNumber) => {
    return /^[A-Z0-9]{3,}$/.test(licenseNumber);
  };

  const validateWWCC = (wwccNumber) => {
    return /^[A-Z0-9]{6,}$/.test(wwccNumber);
  };

  const validateWebsite = (website) => {
    if (!website) return true;
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlRegex.test(website);
  };

  const validateFileSize = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    return file.size <= maxSize;
  };

  const validateFileType = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    return allowedTypes.includes(file.type);
  };

  const validateForm = (formData) => {
    const errors = {};

    // Required field validations
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.givenName.trim()) errors.givenName = "Given name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.mobile.trim()) errors.mobile = "Mobile number is required";
    if (!formData.address.line1.trim()) errors.addressLine1 = "Address line 1 is required";
    if (!formData.address.postcode.trim()) errors.postcode = "Postcode is required";
    if (!formData.address.country.trim()) errors.country = "Country is required";
    if (!formData.address.state.trim()) errors.state = "State is required";
    if (!formData.address.city.trim()) errors.city = "City is required";
    if (!formData.drivingLicenseNumber.trim()) errors.drivingLicenseNumber = "Driving license number is required";
    if (!formData.instructorLicenseNumber.trim()) errors.instructorLicenseNumber = "Instructor license number is required";
    if (!formData.wwccNumber.trim()) errors.wwccNumber = "WWCC number is required";

    // Format validations
    if (formData.email && !validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (formData.mobile && !validateMobile(formData.mobile)) {
      errors.mobile = "Please enter a valid Australian mobile number";
    }

    if (formData.address.postcode && !validatePostcode(formData.address.postcode, formData.address.country)) {
      errors.postcode = "Please enter a valid postcode";
    }

    if (formData.drivingLicenseNumber && !validateLicenseNumber(formData.drivingLicenseNumber)) {
      errors.drivingLicenseNumber = "Please enter a valid driving license number";
    }

    if (formData.instructorLicenseNumber && !validateLicenseNumber(formData.instructorLicenseNumber)) {
      errors.instructorLicenseNumber = "Please enter a valid instructor license number";
    }

    if (formData.wwccNumber && !validateWWCC(formData.wwccNumber)) {
      errors.wwccNumber = "Please enter a valid WWCC number";
    }

    if (formData.website && !validateWebsite(formData.website)) {
      errors.website = "Please enter a valid website URL";
    }

    // File validations
    if (!photoFile) {
      errors.photograph = "Photograph is required";
    } else {
      if (!validateFileType(photoFile)) {
        errors.photograph = "Please upload a valid file (PDF, JPG, PNG only)";
      }
      if (!validateFileSize(photoFile)) {
        errors.photograph = "File size must be less than 5MB";
      }
    }

    return errors;
  };

  const handleLicenseUploadComplete = (images) => {
    setDrivingLicense({
      front: images.licenseFront,
      back: images.licenseBack
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, error: '', success: '' });
    setValidationErrors({});

    // Collect form data
    const formData = {
      firstName: e.target.first_name.value,
      lastName: e.target.last_name.value,
      nickName: e.target.nickName.value,
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
    };

    // Create FormData and append all fields
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'address') {
       submitData.append("addressLine1", formData.address.line1);
        submitData.append("addressLine2", formData.address.line2);
        submitData.append("city", formData.address.city);
        submitData.append("state", formData.address.state);
        submitData.append("country", formData.address.country);
        submitData.append("postcode", formData.address.postcode);
      } else {
        submitData.append(key, formData[key]);
      }
    });

    // Add photograph
    if (photoFile) {
      submitData.append('profileImage', photoFile);
    }

    // Add driving license front and back images
    if (drivingLicense.front) {
      submitData.append('drivingLicenseFront', drivingLicense.front);
    }
    if (drivingLicense.back) {
      submitData.append('drivingLicenseBack', drivingLicense.back);
    }

    try {
      const response = await axiosInstance.post(
        '/auth/register-instructor-initiate',
        submitData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setPendingEmail(formData.email);
      toast.success(response.data.message + " CODE: " + response.data.data.otp);
      setTimeout(() => setStep(2), 100);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed. Please try again later.');
      setFormStatus({ loading: false, error: error.response?.data?.message || 'Signup failed', success: '' });
    } finally {
      setFormStatus({ loading: false, error: '', success: '' });
    }
  };

  // OTP step handler
  const handleOtpChange = (e) => setOtp(e.target.value);
  const handleOtpBack = () => setStep(1);
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, error: '', success: '' });
    try {
      const response = await axiosInstance.post(
        '/auth/register-instructor-verify',
        { email: pendingEmail, otp }
      );
      setFormStatus({ loading: false, error: '', success: response.data.message });
      toast.success(formStatus.success || "OTP verified successfully! Redirecting to login...");
      setTimeout(() => {
        router.push('/instructor/login');
      }, 100);
    } catch (error) {
      setFormStatus({ loading: false, error: error.response?.data?.message || 'OTP verification failed', success: '' });
      toast.error(error.response?.data?.message || 'OTP verification failed. Please try again.');
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    
    // Clear previous photo validation errors
    if (validationErrors.photograph) {
      setValidationErrors(prev => ({ ...prev, photograph: '' }));
    }
    
    if (file) {
      // Validate file immediately
      if (!validateFileType(file)) {
        setValidationErrors(prev => ({ ...prev, photograph: 'Please upload a valid file (PDF, JPG, PNG only)' }));
        setPhotoPreview(null);
        return;
      }
      
      if (!validateFileSize(file)) {
        setValidationErrors(prev => ({ ...prev, photograph: 'File size must be less than 5MB' }));
        setPhotoPreview(null);
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  const handleInputChange = (fieldName) => {
    // Clear validation error when user starts typing
    if (validationErrors[fieldName]) {
      setValidationErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  return (
    <div className="w-full">
      <Toaster toastOptions={{ duration: 12000 }}/>
      
      {/* IMPROVED SPINNER OVERLAY - Only shows during loading with background blur */}
      {formStatus.loading && (
        <SpinnerComponent text={step===1?"Sending OTP":"Verifying OTP..."}/>
      )}

      {step === 1 ? (
        <form className="flex flex-col space-y-4 w-full py-3 px-6" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="w-full">
              <LabeledInput 
                label={"First Name"}
                name="first_name"
                type="text"
                required={true}
                onChange={() => handleInputChange('firstName')}
              />
              {validationErrors.firstName && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.firstName}</p>
              )}
            </div>
            
          </div>
          
          <div className="w-full flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2">
              <LabeledInput 
                label={"Last Name"}
                name="last_name"
                type="text"
                required={true}
                onChange={() => handleInputChange('lastName')}
              />
              {validationErrors.lastName && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.lastName}</p>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <LabeledInput
                label={"Nickname"}
                name="nickName"
                type="text"
                required={false}
              />        
            </div>
          </div>
          
          <div className="full flex justify-between items-center space-x-4">
            <div className="w-1/2">
              <LabeledInput 
                label={"Email Address"}
                name="email_address"
                type="email"
                required={true}
                onChange={() => handleInputChange('email')}
              />
              {validationErrors.email && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
              )}
            </div>
            <div className="w-1/2">
              <LabeledInput 
                label={"Mobile"}
                name="mobile"
                type="text"
                required={true}
                placeholder="0412 345 678"
                onChange={() => handleInputChange('mobile')}
              />
              {validationErrors.mobile && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.mobile}</p>
              )}
            </div>
          </div>
          
          <div>
            <LabeledInput 
              label={"Address Line 1"}
              name="address_line_1"
              type="text"
              placeholder={"Street Address"}
              required={true}
              onChange={() => handleInputChange('addressLine1')}
            />
            {validationErrors.addressLine1 && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.addressLine1}</p>
            )}
          </div>
          
          <LabeledInput 
            label={"Address Line 2"}
            name="address_line_2"
            type="text"
            placeholder={"Apartment, Suite, Unit, Building, Floor, etc."}
            required={false}
            onChange={() => handleInputChange('addressLine2')}
          />
          
          <div className="full flex justify-between items-center space-x-4">
            <div className="w-4/10">
              <LabeledInput 
                label={"Postcode"}
                name="postcode"
                type="text"
                required={true}
                style={{ textTransform: 'uppercase' }}
                onChange={() => handleInputChange('postcode')}
              />
              {validationErrors.postcode && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.postcode}</p>
              )}
            </div>
            <div className="w-6/10">
              <LabeledSelect
                label={"Country"}
                name="country"
                options={countries.map(c => ({ value: c.iso2, label: c.name }))}
                value={selectedCountry}
                onChange={e => {
                  setSelectedCountry(e.target.value);
                  handleInputChange('country');
                }}
                required={true}
                placeholder="Select Country"
              />
              {validationErrors.country && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.country}</p>
              )}
            </div>
          </div>
          
          <div className="full flex justify-between items-center space-x-4">
            <div className="w-4/10">
              <LabeledSelect
                label={"State"}
                name="state"
                options={states.map(s => ({ value: s.iso2, label: s.name }))}
                value={selectedState}
                onChange={e => {
                  setSelectedState(e.target.value);
                  handleInputChange('state');
                }}
                required={true}
                placeholder="Select State"
              />
              {validationErrors.state && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.state}</p>
              )}
            </div>
            <div className="w-6/10">
              <LabeledSelect
                label={"City/Suburb"}
                name="city"
                options={cities.map(city => ({ value: city.name, label: city.name }))}
                value={selectedCity}
                onChange={e => {
                  setSelectedCity(e.target.value);
                  handleInputChange('city');
                }}
                required={true}
                placeholder="Select City"
              />
              {validationErrors.city && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.city}</p>
              )}
            </div>
          </div>
          
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
            <div className="w-full flex flex-col space-y-2 rounded-lg">
              <div className="w-full">
                <LabeledInput
                  label={"Driving License Number"}
                  name="driving_license_number"
                  type="text"
                  required={true}
                  style={{ textTransform: 'uppercase' }}
                  onChange={() => handleInputChange('drivingLicenseNumber')}
                />
                {validationErrors.drivingLicenseNumber && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.drivingLicenseNumber}</p>
                )}
              </div>
              <div className="w-full">
                <ImageUploadButton 
                  required={true}
                  title={(drivingLicense.front && drivingLicense.back)?`Edit Driving License`:"Upload Driving License"}
                  name={"driverLicenseImage"} 
                  label={"Driving License"}
                  icon={<BsPersonVcardFill size={30} />}
                  description={(drivingLicense.front && drivingLicense.back)?`Added ${drivingLicense.front.name}, ${drivingLicense.back.name}`:""}
                  onClick={() => setShowDrivingLicenseUpload(true)}
                />
              </div>
            </div>
            <div className="w-full flex flex-col space-y-2 rounded-lg">
              <div className="w-full">
                <LabeledInput
                  label={"Instructor License Number"}
                  name="instructor_license_number"
                  type="text"
                  required={true}
                  style={{ textTransform: 'uppercase' }}
                  onChange={() => handleInputChange('instructorLicenseNumber')}
                />
                {validationErrors.instructorLicenseNumber && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.instructorLicenseNumber}</p>
                )}
              </div>
              <div className="w-full">
                <ImageUploadButton 
                  required={true}
                  title={"Upload Instructor License"}
                  name={"instructorLicenseImage"} 
                  label={"Instructor License"}
                  icon={<RiInfoCardFill size={30} />}
                  description={""}
                />
              </div>
            </div>
          </div>
          
          <div className="w-full flex justify-between items-center space-x-4">
            <div className="w-4/10">
              <LabeledInput
                label={"WWCC Number"}
                name="wwcc_number"
                type="text"
                required={true}
                style={{ textTransform: 'uppercase' }}
                onChange={() => handleInputChange('wwccNumber')}
              />
              {validationErrors.wwccNumber && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.wwccNumber}</p>
              )}
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
          
          <div>
            <LabeledInput 
              label={"Website"}
              name="website"
              type="text"
              required={false}
              placeholder="https://example.com"
              onChange={() => handleInputChange('website')}
            />
            {validationErrors.website && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.website}</p>
            )}
          </div>
          
          <LabeledTextbox
            label={"Bio"}
            name="bio"
            required={false}
            rows={3}
          />
          
          <div className="w-full flex justify-between items-center space-x-4">
            <div className="w-full">
              <ImageUploadButton 
                required={true}
                tooltip={<ListTooltip items={["Dimensions: 300x300 pixels (Minimum) – Square format preferred",
                  "Aspect Ratio: 1:1 (Square)",
                  "File Format: JPEG (.jpg) or PNG (.png)",
                  "File Size: Max 2MB",
                  "Background: Plain white or light-colored background (Recommended)",
                  "Clarity: High resolution, well-lit, and front-facing",
                  "No Filters: Avoid heavy edits or filters"
                 ]} />}
                name={"profileImage"} label={"Profile Image"}
                title={"Upload Image"}
                icon={<MdCloudUpload size={40} />}
                description={""}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 pt-2 pb-4">
            <input type="checkbox" id="terms" name="terms" className="mr-2" required />
            <label htmlFor="terms" className="text-sm font-source-sans">
              By signing up you agree to our <a href="/terms" className="text-primary hover:underline">Terms and conditions</a> and <a href="/terms" className="text-primary hover:underline">Privacy policy*</a>
            </label>
          </div>
          
          <PrimaryButton
            text={formStatus.loading ? "Signing Up..." : "Sign Up"}
            type="submit"
            disabled={formStatus.loading}
          />
        </form>
      ) : (
        <div className="p-2">
          <OtpForm
            identifier={pendingEmail}
            value={otp}
            onChange={handleOtpChange}
            onSubmit={handleOtpSubmit}
            onBack={handleOtpBack}
            loading={formStatus.loading}
            error={formStatus.error}
        />
        </div>
      )}

      {showDrivingLicenseUpload && (
        <PopUpImageUpload 
          onClose={() => {setShowDrivingLicenseUpload(false)}}
          title={"Upload Driving License"}
          onUploadComplete={handleLicenseUploadComplete}
          imageRequirements={{
            format: "JPEG, PNG, PDF",
            maxSize: "5MB",
          }}  
        />
      )}
    </div>
  );
};

export default SignupForm;
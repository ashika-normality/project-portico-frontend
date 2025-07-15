'use client'
import Image from "next/image";
import { useState } from "react";
import PersonalForm from "./PersonalForm";
import {FormProvider, useForm}  from "react-hook-form";

import vehicleRoad from "../../../public/Assets/car-vector.png";
import instructorPerson from "../../../public/Assets/person-instructor.svg";
import personButton from "../../../public/Assets/person-button.svg";
import licenseVector from "../../../public/Assets/license-vector.svg";
import calenderVector from "../../../public/Assets/calender-vector.svg";

import PrimaryButton from "@/app/components/PrimaryButton";
import MildOrangeButton from "@/app/components/MildOrangeButton";
import AdditionalDetails from "./AdditionalDetails";
import DrivingLicenseInfo from "./DrivingLicenseInfo";
import VehicleInformation from "./VehicleInformation";
import InstructorLicenseInfo from "./InstructorLicenseInfo";
import WWCCInfo from "./WWCCInfo";


const Profile = () => {
    const methods = useForm();

    const [activeTab, setActiveTab] = useState('personalDetails');  
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setDropdownOpen(false); // close dropdown on select
    };

    // Add onSubmit handler
    const onSubmit = (data) => {
        console.log("✅ Form submitted successfully:");
        console.log('Form Data:', data);
    };

    const onError = (errors) => {
      console.log('Form Errors:', errors);
    };

  return (
    <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit(onSubmit, onError)} className="w-full h-full flex flex-col justify-center items-center bg-gray-100">
    <div className="w-full justify-center items-center px-4 md:px-16 py-4">
        <div className="flex justify-around items-center w-full bg-white rounded-portico-main shadow-equal px-2 md:px-8">
            <div className="flex justify-start items-center space-x-5 py-4 md:py-8">
                <Image src={instructorPerson} alt="Instructor Profile" className="w-8 object-fit" />
                <div>
                    <h1 className="text-primary text-xl font-bold font-raleway">Instructor Profile</h1>
                    <p className="text-greydarker font-source-sans text-sm">Complete your profile to get started!</p>
                </div>
            </div>
            <Image src={vehicleRoad} alt="Vehicle vector" className="hidden md:block"/>
            <div className="">
                <PrimaryButton
                    text="Save Changes"
                    type={"submit"}
                    
                />
            </div>
        </div>
        <div className="flex flex-col md:flex-row mt-4 md:mt-8">
            {/* Mobile Dropdown Menu */}
            <div className="w-full md:w-1/4">
                <div className="md:hidden w-full mb-4">
                    <button
                        className="w-full flex justify-between items-center bg-white rounded-xl shadow-equal p-4 text-left font-semibold border border-gray-200"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        type="button"
                    >
                        {activeTab === 'personalDetails' && (
                            <span className="flex items-center"><img src={personButton.src} alt="Person Icon" className="w-5 h-5 mr-2" />Personal Details</span>
                        )}
                        {activeTab === 'vehicleLicense' && (
                            <span className="flex items-center"><img src={licenseVector.src} alt="License Icon" className="w-5 h-5 mr-2" />Vehicle & License</span>
                        )}
                        {activeTab === 'pricingAvailability' && (
                            <span className="flex items-center"><img src={calenderVector.src} alt="Calender Icon" className="w-5 h-5 mr-2" />Pricing & Availability</span>
                        )}
                        <svg className={`w-4 h-4 ml-2 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {dropdownOpen && (
                        <div className="absolute z-20 w-full bg-white rounded-xl shadow-equal mt-2 border border-gray-200">
                            <button
                                className="w-full flex items-center px-4 py-3 hover:bg-gray-100 text-left"
                                onClick={() => handleTabChange('personalDetails')}
                                type="button"
                            >
                                <img src={personButton.src} alt="Person Icon" className="w-5 h-5 mr-2" />Personal Details
                            </button>
                            <button
                                className="w-full flex items-center px-4 py-3 hover:bg-gray-100 text-left"
                                onClick={() => handleTabChange('vehicleLicense')}
                                type="button"
                            >
                                <img src={licenseVector.src} alt="License Icon" className="w-5 h-5 mr-2" />Vehicle & License
                            </button>
                            <button
                                className="w-full flex items-center px-4 py-3 hover:bg-gray-100 text-left"
                                onClick={() => handleTabChange('pricingAvailability')}
                                type="button"
                            >
                                <img src={calenderVector.src} alt="Calender Icon" className="w-5 h-5 mr-2" />Pricing & Availability
                            </button>
                        </div>
                    )}
                </div>
                {/* Desktop Sidebar Menu */}
                <div className="hidden md:flex flex-col bg-white justify-start rounded-xl shadow-equal items-start p-4 w-full space-y-2">
                    <MildOrangeButton
                        text="Personal Details"
                        onClick={() => {handleTabChange('personalDetails')}}
                        bgColor={activeTab === 'personalDetails' ? 'footerorange' : ''}
                        icon={personButton}
                        altIcon="Person Icon"
                    />
                    <MildOrangeButton
                        text="Vehicle & License"
                        onClick={() => {handleTabChange('vehicleLicense')}}
                        bgColor={activeTab === 'vehicleLicense' ? 'footerorange' : ''}
                        icon={licenseVector}
                        altIcon="License Icon"
                    />
                    <MildOrangeButton
                        text="Pricing & Availability"
                        onClick={() => {handleTabChange('pricingAvailability')}}
                        bgColor={activeTab === 'pricingAvailability' ? 'footerorange' : ''}
                        icon={calenderVector}
                        altIcon="Calender Icon"
                    />
                </div>
            </div>
            
                {activeTab === 'personalDetails' && (
                    <div className="w-full pb-24 md:pl-8 space-y-6">
                        <PersonalForm />
                        <AdditionalDetails />
                    </div>
                )}
                {activeTab === 'vehicleLicense' && (
                    <div className="w-full pb-24 md:pl-8 space-y-6">
                        <DrivingLicenseInfo />
                        <VehicleInformation />
                        <InstructorLicenseInfo />
                        <WWCCInfo />
                    </div>
                )}
            <div>
            </div>
        </div>
    </div>
    </form>
    </FormProvider>  
);
}

export default Profile;
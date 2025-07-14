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
    const handleTabChange = (tab) => {
        setActiveTab(tab);
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
        <div className="flex mt-4 md:mt-8">
            <div className="w-full md:w-1/4">
                <div className="flex flex-col bg-white justify-start rounded-xl shadow-equal items-start p-4 w-full space-y-2">
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
                    <div className="w-full pb-24 pl-4 md:pl-8 space-y-6">
                        <PersonalForm />
                        <AdditionalDetails />
                    </div>
                )}
                {activeTab === 'vehicleLicense' && (
                    <div className="w-full pb-24 pl-4 md:pl-8 space-y-6">
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
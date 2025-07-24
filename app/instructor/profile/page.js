'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import PersonalForm from "./PersonalForm";
import {FormProvider, useForm}  from "react-hook-form";
import { useAppContext } from "@/app/components/AppContext";
import { useRouter } from "next/navigation";

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
import { Toaster } from "react-hot-toast";
import SpinnerComponent from "@/app/components/SpinnerComponent";
import axiosInstance from "@/app/utils/axiosInterceptor";

const Profile = () => {
    const methods = useForm();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('personalDetails');  
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { setProfile, setProfileLoading } = useAppContext();

    useEffect(() => {
    const token = localStorage.getItem('accessToken');
    
    const getUser = async () => {
        try {
            const response = await axiosInstance.get('/instructor-profile/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;    
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    };
    
    const fetchUserData = async () => {
        const user = await getUser();
        console.log("User Data:", user);
        
        if (user && user.data) {
            console.log("User response data:", user.data);
            // setProfile(user.data); // Uncomment this when ready
            setProfile(user.data);
            setProfileLoading(false);
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
        setLoading(false);
    };
    
    // Only fetch if token exists
    if (token) {
        fetchUserData();
    } else {
        setIsAuthorized(false);
        setLoading(false);
    }
}, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setDropdownOpen(false);
    };

    const onSubmit = (data) => {
        console.log("✅ Form submitted successfully:");
        console.log('Form Data:', data);
    };

    const onError = (errors) => {
        console.log('Form Errors:', errors);
    };

    if (loading) {
        return (
            <SpinnerComponent text={"Loading..."} />
        );
    }

    if (!isAuthorized) {
        return (
            <div className="w-full h-full py-16 flex justify-center items-center bg-gray-100">
                <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
                    <h1 className="text-2xl font-bold text-primary mb-4">Unauthorized Access</h1>
                    <p className="text-greyfortext mb-6">You don&apos;t have permission to view this page. Please log in.</p>
                    <PrimaryButton onClick={() => router.push('/instructor/login')} text="Go to Login"/>

                </div>
            </div>
        );
    }

    return (
        <FormProvider {...methods}>
            <Toaster />
            <form onSubmit={methods.handleSubmit(onSubmit, onError)} className="w-full h-full flex flex-col justify-center items-center bg-gray-100">
                <div className="w-full justify-center items-center px-4 md:px-16 py-4">
                    <div className="flex justify-around items-center w-full bg-white rounded-portico-main shadow-equal px-2 md:px-8">
                        <div className="flex justify-start items-center space-x-5 px-4 py-4 md:py-8">
                            <Image src={instructorPerson} alt="Instructor Profile" className="w-6 md:w-8 object-fit" />
                            <div>
                                <h1 className="text-primary text-base md:text-xl font-bold font-raleway">Instructor Profile</h1>
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
                            <div className="md:hidden w-full mb-4 relative">
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
                                    <div className="absolute z-20 w-full box-border p-4 bg-white rounded-xl shadow-small mt-1 border border-gray-200">
                                        <MildOrangeButton
                                            text="Personal Details"
                                            onClick={() => {handleTabChange('personalDetails')}}
                                            icon={personButton}
                                            altIcon="Person Icon"
                                        />
                                        <MildOrangeButton
                                            text="Vehicle & License"
                                            onClick={() => {handleTabChange('vehicleLicense')}}
                                            icon={licenseVector}
                                            altIcon="License Icon"
                                        />
                                        <MildOrangeButton
                                            text="Pricing & Availability"
                                            onClick={() => {handleTabChange('pricingAvailability')}}
                                            icon={calenderVector}
                                            altIcon="Calender Icon"
                                        />
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
                                <InstructorLicenseInfo />
                                <WWCCInfo />
                                <VehicleInformation />
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </FormProvider>  
    );
}

export default Profile;
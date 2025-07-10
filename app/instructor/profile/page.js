'use client'
import Image from "next/image";
import ProfileForm from "./ProfileForm";
import {FormProvider, useForm}  from "react-hook-form";

import vehicleRoad from "../../../public/Assets/car-vector.png";
import instructorPerson from "../../../public/Assets/person-instructor.svg";
import PrimaryButton from "@/app/components/PrimaryButton";
import MildOrangeButton from "@/app/components/MildOrangeButton";

const Profile = () => {
    const methods = useForm();
  return (
    <FormProvider {...methods}>
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
                    onClick={() => {}}
                />
            </div>
        </div>
        <div className="flex">
            <div>
                <MildOrangeButton
                    text="Personal Details"
                    onClick={() => {}}
                />
                <MildOrangeButton
                    text="Vehicle & License"
                    onClick={() => {}}
                />
                <MildOrangeButton
                    text="Pricing & Availability"
                    onClick={() => {}}
                />
            </div>
            <div className="w-full px-4 md:px-8">
                <ProfileForm />
            </div>
            <div>
            </div>
        </div>
    </div>
    </FormProvider>  
);
}

export default Profile;
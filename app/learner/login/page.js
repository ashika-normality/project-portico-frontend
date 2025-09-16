'use client'; 
// login page for learner
import Image from "next/image";
import carImage from "../../../public/Assets/login-car.webp"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

import LearnerLoginForm from "./LearnerLoginForm";
import axiosInstance from "@/app/utils/axiosInterceptor";

const LearnerLogin = () => {
    const router = useRouter();

    useEffect(() => {
        // Redirect if already logged in
        const token = (typeof window !== "undefined" ? localStorage.getItem("accessToken") : null);
        if (token) {
            axiosInstance.post("/auth/verify-token", {}, {
                headers: { 'x-access-token': token }
            })
            .then((res) => {
                if (res.status === 200) {
                    router.push("/learner/profile");
                }
            })
            .catch(() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            });
        }
    }, []);

    return (
        <div className="flex w-full justify-center items-center py-4">
            <Toaster />
            <div className="flex mx-4 md:mx-16 w-full bg-white rounded-portico-main shadow-forbox">
                
                {/* Image section */}
                <div className="w-2/5 hidden md:block">
                    <Image
                        src={carImage}
                        alt="Car Image"
                        className="object-cover"
                    />
                </div>

                {/* Form section */}
                <div className="w-full md:w-3/5 flex items-start justify-center py-10">
                    <div className="w-3/4 mx-auto">
                        <LearnerLoginForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LearnerLogin;

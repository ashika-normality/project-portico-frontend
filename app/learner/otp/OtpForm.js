"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import LabeledInput from "@/app/components/LabeledInput";
import PrimaryButton from "@/app/components/PrimaryButton";
import SpinnerComponent from "@/app/components/SpinnerComponent";
import otpSideImage from "../../../public/Assets/login-learner-image.avif"; 
import axiosInstance from "@/app/utils/axiosInterceptor";

const OtpForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // Get email from sessionStorage on mount
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("emailForOtp");
    if (!storedEmail) {
      router.push("/learner/login"); 
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  const handleChange = (e) => setOtp(e.target.value);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!/^\d{6}$/.test(otp)) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/verify-otp", {
        identifier: email,
        otp,
      });

      if (response.data.accessToken && response.data.refreshToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }

      toast.success(response.data.message || "OTP verified successfully!");
      sessionStorage.removeItem("emailForOtp"); // clear email after login

      setTimeout(() => {
        router.push("/learner/profile");
      }, 2000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to verify OTP.");
    } finally {
      setLoading(false);
    }
  };


  const handleResend = async () => {
    setResendLoading(true);
    try {
      await axiosInstance.post("/auth/resend-otp", { identifier: email });
      toast.success("OTP resent successfully!"); // do NOT show OTP in toast
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] bg-gray-100 px-4">
      <Toaster />
      <div className="flex w-full max-w-5xl shadow-lg rounded-xl overflow-hidden bg-white min-h-[550px]">
        <div className="hidden md:flex md:w-2/5">
          <Image
            src={otpSideImage}
            alt="OTP Image"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-primary mb-9 mt-0">
            One Time Password
          </h1>
          <p className="text-lg font-medium mb-1">Login with code</p>
          <p className="text-sm text-gray-500 mb-6">
            Please enter the code we've sent to your email address
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleVerify}>
            <LabeledInput
              label=""
              name="otp"
              type="text"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={handleChange}
              maxLength={6}
            />

            <PrimaryButton
              text={loading ? "Verifying..." : "Login as Learner"}
              type="submit"
              disabled={loading}
            />

            <p className="text-center text-gray-500 text-sm mt-2">
              Didn't get the code?{" "}
              <span
                className="text-primary cursor-pointer hover:underline"
                onClick={handleResend}
              >
                {resendLoading ? "Resending..." : "Resend"}
              </span>
            </p>
          </form>
        </div>
      </div>

      {resendLoading && <SpinnerComponent text="Resending OTP..." />}
    </div>
  );
};

export default OtpForm;

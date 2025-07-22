"use client";
import { useState } from "react";
import LabeledInput from "../../components/LabeledInput";
import PrimaryButton from "../../components/PrimaryButton";
import  MildOrangeButton  from "../../components/MildOrangeButton";
import TextInTheMiddle from "@/app/components/TextInTheMiddle";
import axiosInstance from "../../utils/axiosInterceptor";
import toast, { Toaster } from "react-hot-toast";
import googleIcon from "../../../public/Assets/google-icon.svg";
import facebookIcon from "../../../public/Assets/fb-black.svg";

import { useRouter } from "next/navigation";
import SpinnerComponent from "@/app/components/SpinnerComponent";

function EmailPhoneForm({ value, onChange, onSubmit, loading, error }) {

  

  return (
    <>
    <div className="py-3 text-primary w-2/3 text-2xl md:text-3xl font-raleway font-bold">
      <p>Instructor Login</p>
    </div>
    <form className="flex flex-col gap-4 my-8" onSubmit={onSubmit}>
      <LabeledInput
        label="Email"
        name="email_phone"
        type="text"
        placeholder="jondoe@example.com"
        value={value}
        onChange={onChange}
        required
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
      <PrimaryButton text={loading ? "Sending..." : "Continue"} type="submit" disabled={loading} />
      <div className="pt-4">
        <TextInTheMiddle text="or continue with" color="greyforline"/>
      </div>
        <div className="flex gap-6 mt-2">
            <MildOrangeButton icon={googleIcon} altIcon="Google Icon" text="Google" bgColor='mildorange' alignment={'center'}/>
            <MildOrangeButton icon={facebookIcon} altIcon="Facebook Icon" text="Facebook" bgColor='mildorange' alignment={'center'}/>
        </div>
        <div>
          <p className="text-sm font-raleway mt-6 text-center">
            Don&apos;t have an account? <a href="signup" className="text-primary font-semibold hover:underline cursor-pointer">Sign Up</a>
          </p>
        </div>
    </form>
    </>
  );
}

function OtpForm({ identifier, value, onChange, onSubmit, onBack, loading, error }) {
  const [resendLoading, setResendLoading] = useState(false);

  const handleResend = async (e) => {
    e.preventDefault();
    setResendLoading(true);
    try {
      await axiosInstance.post("/otp/resend-otp", { identifier });
      toast.success("OTP resent successfully! Please check your email or phone.");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <>
    <div className="py-3 text-primary w-2/3 text-xl md:text-3xl font-raleway font-bold">
      <p>One Time Password</p>
    </div>
    <form className="flex flex-col gap-4 my-8" onSubmit={onSubmit}>
      <LabeledInput
        label={`Please enter the code we've sent to your email address or mobile number`}
        name="otp"
        type="text"
        placeholder="Enter the 6-digit code"
        value={value}
        onChange={onChange}
        required
        maxLength={6}
      />
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <PrimaryButton text={loading ? "Verifying..." : "Login"} type="submit" className="flex-1" disabled={loading} />
      </div>
      <span className="text-greyfortext text-center font-sm">Didn&apos;t get the code?
        <a className="hover:underline text-primary ml-1 cursor-pointer" onClick={handleResend}>
          {resendLoading ? "Resending..." : "Resend Code"}
        </a>
      </span>
    </form>
    </>
  );
}

const LoginForm = () => {
  const [step, setStep] = useState(1);
  const [emailPhone, setEmailPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  // Handle email/phone input change
  const handleEmailPhoneChange = (e) => {
    setEmailPhone(e.target.value);
    setError("");
  };

  // Handle OTP input change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setError("");
  };

  // Handle continue (send OTP)
  const handleContinue = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateEmail(emailPhone) && !validatePhone(emailPhone)) {
      toast.error("Please enter a valid email address or mobile number.");
      setError("Please enter a valid email address or mobile number.");
      setLoading(false);
      return;
    }

    try {
      await axiosInstance.post("/otp/send-otp", { identifier: emailPhone });
      setStep(2);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to send OTP. Please try again."
      );
      toast.error(err?.response?.data?.message)
    } finally {
      setLoading(false);
    }
  };

  // Handle login (verify OTP)
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.post("/otp/verify-otp", {
        identifier: emailPhone,
        otp,
      });
      // Save tokens, redirect, etc.
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      // You can redirect or show success here
      setError("");
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        // Redirect to instructor dashboard or home page
        
        router.push("/instructor/profile");
      }, 100);
      setLoading(false);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to verify OTP. Please try again."
      );
      toast.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle back to email/phone form
  const handleBack = () => {
    setStep(1);
    setOtp("");
    setError("");
  };

  return (
    <div>
      {loading && <SpinnerComponent text={step===1?`Sending OTP...`:`Verifying OTP...`} />}
      <Toaster />
      {step === 1 ? (
        <EmailPhoneForm
          value={emailPhone}
          onChange={handleEmailPhoneChange}
          onSubmit={handleContinue}
          loading={loading}
          error={error}
        />
      ) : (
        <OtpForm
          identifier={emailPhone}
          value={otp} 
          onChange={handleOtpChange}
          onSubmit={handleLogin}
          onBack={handleBack}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^(\+61|0)[4-5]\d{8}$/.test(phone.replace(/\s+/g, ''));

export default LoginForm;
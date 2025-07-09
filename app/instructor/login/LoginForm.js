"use client";
import { useState } from "react";
import LabeledInput from "../../components/LabeledInput";
import PrimaryButton from "../../components/PrimaryButton";
import axiosInstance from "../../utils/axiosInterceptor";
import toast, { Toaster } from "react-hot-toast";

function EmailPhoneForm({ value, onChange, onSubmit, loading, error }) {
  return (
    <form className="flex flex-col gap-4 my-8" onSubmit={onSubmit}>
      <LabeledInput
        label="Email or Phone Number"
        name="email_phone"
        type="text"
        placeholder="Enter your Email or Phone number"
        value={value}
        onChange={onChange}
        required
      />
      <PrimaryButton text={loading ? "Sending..." : "Continue"} type="submit" disabled={loading} />
    </form>
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
    <form className="flex flex-col gap-4 my-8" onSubmit={onSubmit}>
      <LabeledInput
        label={`Enter the 6-digit code sent to ${identifier}`}
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
  );
}

const LoginForm = () => {
  const [step, setStep] = useState(1);
  const [emailPhone, setEmailPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      // Save token, redirect, etc.
      localStorage.setItem("accessToken", res.data.token);
      // You can redirect or show success here
      setError("");
      toast.success("Login successful! Redirecting...");
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

export default LoginForm; 
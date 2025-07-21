import { useState } from "react";
import LabeledInput from "../../components/LabeledInput";
import PrimaryButton from "../../components/PrimaryButton";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInterceptor";

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
        <PrimaryButton text={loading ? "Verifying..." : "Verify"} type="submit" className="flex-1" disabled={loading} />
      </div>
      <span className="text-greyfortext text-center font-sm">Didn&apos;t get the code?
        <a className="hover:underline text-primary ml-1 cursor-pointer" onClick={handleResend}>
          {resendLoading ? "Resending..." : "Resend Code"}
        </a>
      </span>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </form>
    </>
  );
}

export default OtpForm; 
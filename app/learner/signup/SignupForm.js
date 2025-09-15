'use client'
import { useState } from "react";
import LabeledInput from "@/app/components/LabeledInput";
import PrimaryButton from "@/app/components/PrimaryButton";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axiosInterceptor";

const SignupForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      firstName: e.target.first_name.value,
      lastName: e.target.last_name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      terms: e.target.terms.checked,
    };

    if (!formData.terms) {
      toast.error("You must accept the terms and conditions.");
      setLoading(false);
      return;
    }

    try {
      // Temporary mock until backend is ready
      console.log("Learner signup data:", formData);

      // Example API call (replace endpoint later)
      // await axiosInstance.post("/auth/register-learner", formData);

      toast.success("Signup successful!");
      router.push("/learner/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Toaster toastOptions={{ duration: 4000 }} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-full py-6 px-6 bg-white rounded-lg shadow-md"
      >
        {/* First name / Last name */}
        <div className="flex flex-col md:flex-row gap-4">
          <LabeledInput label="First Name" name="first_name" type="text" required />
          <LabeledInput label="Last Name" name="last_name" type="text" required />
        </div>

        {/* Email */}
        <LabeledInput label="Email Address" name="email" type="email" required />

        {/* Phone number */}
        <LabeledInput
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="+61 412 345 678"
          required
        />

        {/* Terms & conditions */}
        <div className="flex items-center space-x-2 pt-2">
          <input type="checkbox" id="terms" name="terms" required />
          <label htmlFor="terms" className="text-sm">
            I agree to the{" "}
            <a href="/terms" className="text-primary hover:underline">Terms</a> and{" "}
            <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
          </label>
        </div>

        {/* Submit button */}
        <PrimaryButton
          text={loading ? "Creating Account..." : "Create Account"}
          type="submit"
          disabled={loading}
        />

        {/* Login link */}
        <span className="text-sm text-center">
          Already have an account?{" "}
          <a href="/learner/login" className="text-primary hover:underline font-semibold">
            Log In
          </a>
        </span>
      </form>
    </div>
  );
};

export default SignupForm;

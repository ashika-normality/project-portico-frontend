"use client";
import { useState } from "react";
import LabeledInput from "../../components/LabeledInput";
import PrimaryButton from "../../components/PrimaryButton";
import MildOrangeButton from "../../components/MildOrangeButton";
import TextInTheMiddle from "@/app/components/TextInTheMiddle";
import toast, { Toaster } from "react-hot-toast";
import googleIcon from "../../../public/Assets/google-icon.svg";
import facebookIcon from "../../../public/Assets/fb-black.svg";

const LearnerLoginForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    toast.success("Continue clicked! (OTP flow will come here)");
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div>
      <Toaster />

      {/* Heading */}
      <div className="py-3 text-primary w-2/3 text-2xl md:text-3xl font-raleway font-bold">
        <p>Learner Login</p>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-4 my-8" onSubmit={handleContinue}>
        <LabeledInput
          label="Email"
          name="email"
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          required
        />

        <PrimaryButton
          text={loading ? "Loading..." : "Continue"}
          type="submit"
          disabled={loading}
        />

        {/* Divider */}
        <div className="pt-4">
          <TextInTheMiddle text="or continue with" color="greyforline" />
        </div>

        {/* Social Buttons */}
        <div className="flex gap-6 mt-2">
          <MildOrangeButton
            icon={googleIcon}
            altIcon="Google Icon"
            text="Google"
            bgColor="mildorange"
            alignment="center"
          />
          <MildOrangeButton
            icon={facebookIcon}
            altIcon="Facebook Icon"
            text="Facebook"
            bgColor="mildorange"
            alignment="center"
          />
        </div>
      </form>
    </div>
  );
};

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default LearnerLoginForm;

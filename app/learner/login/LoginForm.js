"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LabeledInput from "../../components/LabeledInput";
import PrimaryButton from "../../components/PrimaryButton";
import MildOrangeButton from "../../components/MildOrangeButton";
import TextInTheMiddle from "@/app/components/TextInTheMiddle";
import toast, { Toaster } from "react-hot-toast";
import googleIcon from "../../../public/Assets/google-icon.svg";
import facebookIcon from "../../../public/Assets/fb-black.svg";
import axiosInstance from "@/app/utils/axiosInterceptor";
import { GoogleLogin } from "@react-oauth/google";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    sessionStorage.removeItem("emailForOtp");
  }, []);

  const handleEmailChange = (e) => setEmail(e.target.value);

  // ------------------- OTP FLOW -------------------
  const handleContinue = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/send-otp", { identifier: email });
      if (response.status === 200) {
        toast.success("OTP sent to your email! Redirecting...");
        sessionStorage.setItem("emailForOtp", email);
        setTimeout(() => router.push("/learner/otp"), 2000);
      }
    } catch (error) {
      if (error.response?.status === 404) toast.error("This email is not registered.");
      else toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ------------------- SOCIAL LOGIN -------------------
  const handleSocialLogin = async (provider, token) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post("/auth/social-login", { provider, token });
    if (response.status === 200) {
      const { accessToken, refreshToken, role, profilePhotoUrl } = response.data;

      console.log("=== Social login response ===", response.data); // Debug log

      // Save tokens
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Save profile image URL
      if (profilePhotoUrl) {
        console.log("=== Saving profile URL to localStorage ===", profilePhotoUrl);
        localStorage.setItem("socialProfileImageUrl", profilePhotoUrl);
      } else {
        console.log("=== No profile URL found ===");
        localStorage.removeItem("socialProfileImageUrl");
      }

      toast.success("Login successful!");
      router.push(`/${role}/profile`);
    }
  } catch (err) {
    console.error("Social login error:", err.response?.data || err.message);
    toast.error(err.response?.data?.message || "Social login failed.");
  } finally {
    setLoading(false);
  }
};


  const handleFacebookLogin = async () => {
    toast("Facebook login not implemented yet.", { icon: "⚠️" });
  };

  return (
    <div>
      <Toaster />
      <div className="py-3 text-primary w-2/3 text-2xl md:text-3xl font-raleway font-bold">
        <p>Learner Login</p>
      </div>

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

        <PrimaryButton text={loading ? "Loading..." : "Continue"} type="submit" disabled={loading} />

        <div className="pt-4">
          <TextInTheMiddle text="or continue with" color="greyforline" />
        </div>

        <div className="flex gap-6 mt-2">
          {/* Google login button styled like Facebook */}
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const token = credentialResponse?.credential;
              if (!token) {
                toast.error("Google token not found");
                return;
              }
              handleSocialLogin("google", token);
            }}
            onError={() => toast.error("Google login failed")}
            render={({ onClick, disabled }) => (
              <MildOrangeButton
                icon={googleIcon}
                altIcon="Google Icon"
                text="Google"
                bgColor="mildorange"
                alignment="center"
                onClick={onClick}
                disabled={disabled}
              />
            )}
          />

          {/* Facebook login button */}
          <MildOrangeButton
            icon={facebookIcon}
            altIcon="Facebook Icon"
            text="Facebook"
            bgColor="mildorange"
            alignment="center"
            onClick={handleFacebookLogin}
          />
        </div>
      </form>
    </div>
  );
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default LoginForm;

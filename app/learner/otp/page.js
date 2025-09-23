"use client";

import OtpForm from "./OtpForm";

const OtpPage = () => {
  // Get email from sessionStorage
  const email =
    typeof window !== "undefined"
      ? sessionStorage.getItem("emailForOtp")
      : "";

  return <OtpForm email={email} />;
};

export default OtpPage;




"use client";
import Image from "next/image";
import { GoogleOAuthProvider } from "@react-oauth/google"; // <-- import this
import carImage from "../../../public/Assets/login-learner-image.avif";
import LoginForm from "./LoginForm";

const LearnerLogin = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <div className="flex w-full justify-center items-center py-6 bg-gray-100 min-h-screen">
        <div className="flex flex-col md:flex-row mx-4 md:mx-16 w-full max-w-5xl min-h-[500px] bg-white rounded-portico-main overflow-hidden">

          {/* Image section */}
          <div className="w-full md:w-2/5">
            <Image
              src={carImage}
              alt="Car Image"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form section */}
          <div className="w-full md:w-3/5 flex items-start justify-center py-8">
            <div className="w-3/4 mx-auto">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>

  );
};

export default LearnerLogin;

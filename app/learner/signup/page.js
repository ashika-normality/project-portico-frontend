import SignupForm from "./SignupForm"; 

const Page = () => (
  <div className="w-full min-h-screen flex justify-center items-center bg-gray-200">
    <div className="flex flex-col md:flex-row w-full max-w-6xl min-h-[500px] bg-white rounded-lg shadow-lg overflow-hidden">
      
      {/* Image Section (on mobile it shows above content) */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <img
          src="/Assets/Signup-image.webp"
          alt="Signup Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-6">
        <h1 className="font-raleway text-2xl font-bold text-primary text-center mb-3">
          Learner Sign Up
        </h1>
        <p className="font-source-sans text-greydarker text-center mb-4">
          Create your account here!
        </p>
        <SignupForm />
        <span className="text-sm font-medium font-raleway text-center mt-4">
          Already have an account?{" "}
          <a href="login" className="text-primary hover:underline font-semibold">
            Log in
          </a>
        </span>
      </div>
    </div>
  </div>
);

export default Page;

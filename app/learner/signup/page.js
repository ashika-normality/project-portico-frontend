import SignupForm from "./SignupForm";

const Page = () => (
  <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
    <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
      
      {/* Left Image Section */}
      <div className="w-1/2 hidden md:flex items-center justify-center">
        <img
          src="/Assets/Signup-image.webp"
          alt="Signup Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-1/2 flex flex-col justify-center px-10 py-8">
        <h1 className="font-raleway text-2xl font-bold text-primary text-center">Learner Sign Up</h1>
        <p className="font-source-sans text-greydarker text-center mb-4">
          Create your account and start learning with us!
        </p>
        <SignupForm />
        <span className="text-sm font-medium font-raleway text-center mt-4">
          Already have an account?{" "}
          <a href="login" className="text-primary hover:underline font-semibold">
            Login
          </a>
        </span>
      </div>
    </div>
  </div>
);

export default Page;

import SignupForm from "./SignupForm";

const Page = () => (
  <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
    <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
      
      {/* Left Image Section */}
      <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-200">
        <span className="text-gray-500 text-lg">[ Image Placeholder ]</span>
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex flex-col space-y-4 px-8 py-10">
        <h1 className="font-raleway text-2xl font-bold text-primary text-center">Learner Sign Up</h1>
        <p className="font-source-sans text-greydarker text-center">
          Create your account and start learning with us!
        </p>
        <SignupForm />
        <span className="text-sm font-medium font-raleway text-center">
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

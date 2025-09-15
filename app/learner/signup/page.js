import SignupForm from "./SignupForm";

const page = () => (
  <div className="w-full flex justify-center px-4 items-start min-h-screen py-12 bg-[url('/Assets/background-image-signup.webp')] bg-cover bg-center bg-no-repeat">
    <div className="w-full md:w-1/2 flex flex-col space-y-2.5 justify-center items-center bg-white rounded-lg shadow-small px-2 py-8">
      <h1 className="font-raleway text-xl font-bold text-primary">Learner Sign Up</h1>
      <p className="font-source-sans text-greydarker">Sign up to get started with your learning journey!</p>
      <SignupForm />   {/* ← here is the connection */}
      <span className="text-sm font-medium font-raleway text-center">
        Already have an Account?{" "}
        <a href="/learner/login" className="text-primary hover:underline font-semibold">
          Login
        </a>
      </span>
    </div>
  </div>
);

export default page;

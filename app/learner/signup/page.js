const SignupForm = () => {
  return (
    <form className="space-y-4">
      
      {/* First + Last Name Row */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="First Name"
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Other Inputs */}
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition"
      >
        Sign Up
      </button>
    </form>
  );
};

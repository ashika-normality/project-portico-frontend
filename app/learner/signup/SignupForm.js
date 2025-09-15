"use client";

import { useForm } from "react-hook-form";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Learner Signup Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col space-y-4"
    >
      {/* First Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          {...register("firstName", { required: "First name is required" })}
          className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.firstName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.firstName.message}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          {...register("lastName", { required: "Last name is required" })}
          className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.lastName && (
          <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Number (Country Code + Number) */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <div className="flex space-x-2">
          <select
            {...register("countryCode", { required: true })}
            className="w-1/3 px-2 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="+1">+1 (US)</option>
            <option value="+44">+44 (UK)</option>
            <option value="+91">+91 (India)</option>
          </select>
          <input
            type="tel"
            {...register("phone", { required: "Phone number is required" })}
            className="flex-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Terms & Conditions */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          {...register("terms", {
            required: "You must accept the terms and conditions",
          })}
          className="w-4 h-4 text-primary border-gray-300 rounded"
        />
        <label className="text-sm text-gray-700">
          I agree to the{" "}
          <a href="#" className="text-primary hover:underline">
            Terms and Conditions
          </a>
        </label>
      </div>
      {errors.terms && (
        <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Create Account
      </button>
    </form>
  );
}

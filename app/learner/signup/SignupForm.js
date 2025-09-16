"use client";
import { useState } from "react";
import LabeledInput from "../../components/LabeledInput";
import PrimaryButton from "../../components/PrimaryButton";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
      {/* First Name & Last Name Row */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <LabeledInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Oscar"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-1">
          <LabeledInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Gavin"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Email */}
      <LabeledInput
        label="Email Address"
        name="email"
        type="email"
        placeholder="oscarhenrygavin@gmail.com"
        value={formData.email}
        onChange={handleChange}
        required
      />

      {/* Phone Number with Country Code */}
      <div className="flex flex-col">
        <label className="block text-sm font-medium text-black mb-1">
          Phone Number<span className="text-red-600">*</span>
        </label>
        <div className="flex space-x-2">
          {/* Country Code */}
          <input
            type="text"
            value="+61"
            disabled
            className="border rounded-md px-3 py-2 w-16 bg-gray-100 text-gray-600"
          />
          {/* Phone Number */}
          <input
            type="tel"
            name="phone"
            placeholder="4XX-XXX-XXX"
            value={formData.phone}
            onChange={handleChange}
            required
            className="border rounded-md px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Terms & Conditions */}
      <label className="flex items-center space-x-2 text-sm">
        <input
          type="checkbox"
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
          required
          className="w-4 h-4"
        />
        <span>
          I have read and agreed to the{" "}
          <a href="/terms" className="text-teal-600 hover:underline">
            Terms and Conditions
          </a>
        </span>
      </label>

      {/* Submit Button */}
      <PrimaryButton
        type="submit"
        text="Create Account"
        className="mt-4"
      />
    </form>
  );
}

"use client";
import { useState } from "react";

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
        {/* First Name */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="Oscar"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Last Name */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Gavin"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="oscarhenrygavin@gmail.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Phone with Fixed Country Code */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value="+61"
            disabled
            className="border rounded-md px-3 py-2 w-20 bg-gray-100 text-gray-600"
          />
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
          <a href="/terms" className="text-primary hover:underline">
            Terms and Conditions
          </a>
        </span>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-primary text-white font-semibold py-2 rounded-md transition 
                   cursor-pointer transform hover:scale-105 hover:bg-opacity-90 
                   active:bg-black active:bg-opacity-20"
      >
        Create Account
      </button>
    </form>
  );
}

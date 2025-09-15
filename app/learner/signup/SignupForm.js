"use client";
import { useState } from "react";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
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
      {/* First Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
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
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
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

      {/* Phone with Country Code */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <div className="flex space-x-2">
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            className="border rounded-md px-2 py-2 w-28 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
            <option value="+61">+61</option>
          </select>
          <input
            type="tel"
            name="phone"
            placeholder="9876543210"
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
        className="bg-primary text-white font-semibold py-2 rounded-md hover:bg-primary-dark transition"
      >
        Create Account
      </button>
    </form>
  );
}

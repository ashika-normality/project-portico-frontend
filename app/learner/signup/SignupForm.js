'use client'
import { useState } from "react";
import LabeledInput from "@/app/components/LabeledInput";
import PrimaryButton from "@/app/components/PrimaryButton";
import { Toaster, toast } from "react-hot-toast";
import axiosInstance from '@/app/utils/axiosInterceptor';
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    terms: false,
  });

  const [formStatus, setFormStatus] = useState({ loading: false, error: '', success: '' });
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue = value;
    if (name === "phone") {
      newValue = value.replace(/\D/g, "");
      if (newValue.length > 9) newValue = newValue.slice(0, 9);
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : newValue,
    });

    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!formData.terms) errors.terms = "You must accept the terms";

    if (formData.email) {
      const emailRegex = /^[A-Za-z][A-Za-z0-9._%+-]*@gmail\.com$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = "Email must start with a letter and end with @gmail.com";
      }
    }

    if (formData.phone) {
      if (!/^4\d{8}$/.test(formData.phone)) {
        errors.phone = "Phone must start with 4 and be 9 digits long";
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setFormStatus({ loading: true, error: '', success: '' });

    try {
      const response = await axiosInstance.post('/auth/register-learner', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobile: formData.phone,
      });

      toast.success(response.data.message || "Account created successfully!");
      setFormStatus({ loading: false, error: '', success: response.data.message });

      setTimeout(() => router.push('/learner/login'), 1000);
    } catch (error) {
      // User-friendly message
      const backendMessage = error.response?.data?.message;
      let userFriendlyMessage = backendMessage || 'Signup failed. Please try again.';

      if (!backendMessage && error.message.includes('Network Error')) {
        userFriendlyMessage = 'Cannot connect to server. Please check your internet connection.';
      } else if (error.response?.status === 500) {
        userFriendlyMessage = 'Server error. Please try again later.';
      }

      // Show toast
      toast.error(userFriendlyMessage);

      // Log as warning instead of error to avoid dev overlay
      console.warn("Handled signup error:", backendMessage || error.message);

      setFormStatus({ loading: false, error: userFriendlyMessage, success: '' });
    }
  };

  return (
    <div className="w-full">
      <Toaster toastOptions={{ duration: 8000 }} />
      <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4 py-3 px-6">

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
            {validationErrors.firstName && <p className="text-red-500 text-sm">{validationErrors.firstName}</p>}
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
            {validationErrors.lastName && <p className="text-red-500 text-sm">{validationErrors.lastName}</p>}
          </div>
        </div>

        <LabeledInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="oscar@gmail.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {validationErrors.email && <p className="text-red-500 text-sm">{validationErrors.email}</p>}

        <div className="flex space-x-2">
          <input
            type="text"
            value="+61"
            disabled
            className="border rounded-md px-3 py-2 w-16 bg-gray-100 text-gray-600"
          />
          <input
            type="tel"
            name="phone"
            placeholder="4XX XXX XXX"
            value={formData.phone}
            onChange={handleChange}
            required
            className="border rounded-md px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        {validationErrors.phone && <p className="text-red-500 text-sm">{validationErrors.phone}</p>}

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
        {validationErrors.terms && <p className="text-red-500 text-sm">{validationErrors.terms}</p>}

        <PrimaryButton
          type="submit"
          text={formStatus.loading ? "Creating Account..." : "Create Account"}
          disabled={formStatus.loading}
        />
      </form>
    </div>
  );
};

export default SignupForm;

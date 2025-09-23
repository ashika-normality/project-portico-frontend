// app/learner/profile/PersonalDetailsCard.jsx
'use client';
import React, { useEffect, useState } from 'react';
import LabeledDatePicker from '@/app/components/LabeledDatePicker';
import LabeledInput from '@/app/components/LabeledInput';
import DropDown from '@/app/components/DropDown';

export default function PersonalDetailsCard({ register, setValue, watch }) {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const selectedCountry = watch('country');
  const selectedState = watch('state');

  const API_KEY = process.env.NEXT_PUBLIC_COUNTRY_API_KEY;

  // Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('https://api.countrystatecity.in/v1/countries', {
          headers: { 'X-CSCAPI-KEY': API_KEY },
        });
        const data = await res.json();
        setCountries(data);
      } catch (err) {
        console.error('Error fetching countries:', err);
      }
    };
    fetchCountries();
  }, [API_KEY]);

  // Fetch states whenever country changes
  useEffect(() => {
    if (!selectedCountry) return;
    const fetchStates = async () => {
      try {
        const res = await fetch(
          `https://api.countrystatecity.in/v1/countries/${selectedCountry}/states`,
          { headers: { 'X-CSCAPI-KEY': API_KEY } }
        );
        const data = await res.json();
        setStates(data);
        setValue('state', '');
        setValue('city', '');
        setCities([]);
      } catch (err) {
        console.error('Error fetching states:', err);
      }
    };
    fetchStates();
  }, [selectedCountry, API_KEY, setValue]);

  // Fetch cities whenever state changes
  useEffect(() => {
    if (!selectedCountry || !selectedState) return;
    const fetchCities = async () => {
      try {
        const res = await fetch(
          `https://api.countrystatecity.in/v1/countries/${selectedCountry}/states/${selectedState}/cities`,
          { headers: { 'X-CSCAPI-KEY': API_KEY } }
        );
        const data = await res.json();
        setCities(data);
        setValue('city', '');
      } catch (err) {
        console.error('Error fetching cities:', err);
      }
    };
    fetchCities();
  }, [selectedCountry, selectedState, API_KEY, setValue]);

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
      <h2 className="text-black font-semibold text-lg">Personal Details</h2>

      {/* First & Last Name */}
      <div className="flex gap-4">
        <LabeledInput label="First Name" name="firstName" register={register} required />
        <LabeledInput label="Last Name" name="lastName" register={register} required />
      </div>

      {/* Email & Gender */}
      <div className="flex gap-4">
        <LabeledInput label="Email Address" name="email" type="email" register={register} required />
        <DropDown
          label="Gender"
          name="gender"
          register={register}
          options={[
            { value: '', label: 'Select Gender' },
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
          ]}
          required
        />
      </div>

      {/* Mobile & Date of Birth */}
      <div className="flex gap-4">
        <LabeledInput label="Mobile Number" name="mobile" type="tel" register={register} required />
        <LabeledDatePicker
          label="Date of Birth"
          name="dob"
          register={register}
          setValue={setValue}
          required
          showDay
          showMonth
          showYear
        />
      </div>

      {/* Address Line 1 & 2 */}
      <LabeledInput label="Address Line 1" name="address1" register={register} required />
      <LabeledInput label="Address Line 2" name="address2" register={register} />

      {/* Postal Code & Country */}
      <div className="flex gap-4">
        <LabeledInput label="Postal Code" name="postcode" register={register} required />
        <DropDown
          label="Country"
          name="country"
          register={register}
          options={[
            { value: '', label: 'Select Country' },
            ...countries.map((c) => ({
              value: c.iso2,
              label: c.name,
            })),
          ]}
          required
        />
      </div>

      {/* State & City/Suburb */}
      <div className="flex gap-4">
        <DropDown
          label="State"
          name="state"
          register={register}
          options={[
            { value: '', label: 'Select State' },
            ...states.map((s) => ({
              value: s.iso2,
              label: s.name,
            })),
          ]}
          required
        />
        <DropDown
          label="City/Suburb"
          name="city"
          register={register}
          options={[
            { value: '', label: 'Select City/Suburb' },
            ...cities.map((c) => ({
              value: c.name,
              label: c.name,
            })),
          ]}
          required
        />
      </div>
    </div>
  );
}

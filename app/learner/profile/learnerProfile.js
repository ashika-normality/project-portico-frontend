'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import LabeledInput from '@/app/components/LabeledInput';
import LabeledDatePicker from '@/app/components/LabeledDatePicker';
import LabeledSelect from '@/app/components/LabeledSelect';
import Modal from '@/app/components/Modal';
import visaIcon from '../../../public/Assets/visa.png';
import masterIcon from '../../../public/Assets/master.png';
import otherIcon from '../../../public/Assets/credit-card.png';

export default function LearnerProfileComponent() {
  const { register, setValue, handleSubmit, reset, watch, formState: { errors } } = useForm({ mode: "onBlur", reValidateMode: "onChange", });
  const { register: cardRegister, handleSubmit: handleCardSubmit, reset: resetCardForm, formState: { errors: cardErrors }, } = useForm({ mode: 'onBlur', });

  const issueDateValue = watch('issueDate');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [disableLicense, setDisableLicense] = useState(false);

  // Payment methods state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cards, setCards] = useState([]);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);

  const API_KEY = process.env.NEXT_PUBLIC_COUNTRY_API_KEY;

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

    // Load saved cards from localStorage
    const savedCards = localStorage.getItem('learner_cards');
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    }
  }, [API_KEY]);

  const fetchStates = async (countryCode) => {
    try {
      const res = await fetch(
        `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
        { headers: { 'X-CSCAPI-KEY': API_KEY } }
      );
      const data = await res.json();
      setStates(data);
    } catch (err) {
      console.error('Error fetching states:', err);
    }
  };

  const fetchCities = async (countryCode, stateCode) => {
    try {
      const res = await fetch(
        `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
        { headers: { 'X-CSCAPI-KEY': API_KEY } }
      );
      const data = await res.json();
      setCities(data);
    } catch (err) {
      console.error('Error fetching cities:', err);
    }
  };

  const openModal = () => setShowPaymentModal(true);
  const closeModal = () => setShowPaymentModal(false);

  const maskCardNumber = (num) => '**** **** **** ' + num.slice(-4);

  const getCardType = (num) => {
    if (num.startsWith('4')) return 'visa';
    if (num.startsWith('5')) return 'master';
    return 'other';
  };

  const onSubmitCard = (data) => {
    const newCards = [...cards, data];
    setCards(newCards);
    localStorage.setItem('learner_cards', JSON.stringify(newCards));
    resetCardForm({
      cardNumber: '',
      CardExpiryDate: '',
      cardHolderName: '',
      cvv: '',
      saveCard: false,
      defaultCard: false,
    });
    closeModal();
  };

  const removeCard = (index) => {
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
    localStorage.setItem('learner_cards', JSON.stringify(newCards));
    setMenuOpenIndex(null);
  };

  const makeDefault = (idx) => {
  const updatedCards = cards.map((card, i) => ({
    ...card,
    defaultCard: i === idx, 
  }));
  setCards(updatedCards);
};

const removeDefault = (idx) => {
  const updatedCards = cards.map((card, i) =>
    i === idx ? { ...card, defaultCard: false } : card
  );
  setCards(updatedCards);
};


  return (
    <div className="flex flex-col md:flex-row gap-6 px-6 py-8">
      {/* Left 70% */}
      <div className="md:w-7/12 w-full flex flex-col gap-6">
        {/* Headings */}
        <div className="flex flex-col gap-1">
          <h1 className="text-orange-500 text-2xl md:text-3xl font-bold mb-3">Learner Profile</h1>
          <p className="text-gray-500 text-sm">
            Manage your personal information and lesson preferences
          </p>
          <p className="text-orange-500 text-sm">
            Please note: when registering on behalf of a learner, ensure that the learner's details are provided instead of your own
          </p>
        </div>

        {/* Personal Details Card */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
          <h2 className="text-black font-semibold text-lg">Personal Details</h2>

          <div className="flex gap-4">
            <LabeledInput
              label="First Name"
              name="firstName"
              register={register}
              required
              rules={{
                pattern: {
                  value: /^[A-Za-z ]+$/,
                  message: "Name can contain only letters and spaces",
                },
              }}
              error={errors.firstName?.message}
            />
            <LabeledInput
              label="Last Name"
              name="lastName"
              register={register}
              required
              rules={{
                pattern: {
                  value: /^[A-Za-z ]+$/,
                  message: "Name can contain only letters and spaces",
                },
              }}
              error={errors.lastName?.message}
            />
          </div>

          <div className="flex gap-4">
            <LabeledInput
              label="Email Address"
              name="email"
              type="email"
              register={register}
              required
              rules={{
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              }}
              error={errors.email?.message}
            />

            <LabeledSelect
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

          <div className="flex gap-4 overflow-visible">
            <LabeledInput
              label="Mobile Number"
              name="mobile"
              type="tel"
              register={register}
              required
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, ""); // remove non-numbers
                if (value.length > 9) value = value.slice(0, 9); // limit 9 digits
                // Format: 3-3-3 (XXX-XXX-XXX)
                let formatted = value;
                if (value.length > 3 && value.length <= 6) {
                  formatted = value.slice(0, 3) + "-" + value.slice(3);
                } else if (value.length > 6) {
                  formatted =
                    value.slice(0, 3) +
                    "-" +
                    value.slice(3, 6) +
                    "-" +
                    value.slice(6);
                }
                setValue("mobile", formatted);
              }}
              rules={{
                pattern: {
                  value: /^4\d{2}-\d{3}-\d{3}$/,
                  message: "Phone must start with 4 and be in format 4XX-XXX-XXX",
                },
              }}
              error={errors.mobile?.message}
            />

            <LabeledDatePicker
              label="Date of Birth"
              name="dob"
              register={register}
              setValue={setValue}
              required
              showDay
              showMonth
              showYear
              maxDate={new Date()}
            />
          </div>

          <LabeledInput
            label="Address Line 1"
            name="address1"
            register={register}
            required
          />
          <LabeledInput label="Address Line 2" name="address2" register={register} />

          <div className="flex gap-4">
            <LabeledInput
              label="Postal Code"
              name="postcode"
              register={register}
              required
              onChange={(e) => {
                // Allow only numbers and max 4 digits
                let value = e.target.value.replace(/\D/g, '').slice(0, 4);
                setValue('postcode', value);
              }}
              rules={{
                validate: (val) => {
                  if (!val || val.length !== 4) return "Postal code must be exactly 4 digits";
                  return true;
                },
              }}
              error={errors.postcode?.message}
            />

            <LabeledSelect
              label="Country"
              name="country"
              register={register}
              options={[{ value: '', label: 'Select Country' }, ...countries.map(c => ({ value: c.iso2, label: c.name }))]}
              value={selectedCountry}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedCountry(val);
                setValue('country', val);
                setSelectedState('');
                setSelectedCity('');
                setValue('state', '');
                setValue('city', '');
                setStates([]);
                setCities([]);
                if (val) fetchStates(val);
              }}
              required
            />
          </div>

          <div className="flex gap-4">
            <LabeledSelect
              label="State"
              name="state"
              register={register}
              options={[{ value: '', label: 'Select State' }, ...states.map(s => ({ value: s.iso2, label: s.name }))]}
              value={selectedState}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedState(val);
                setValue('state', val);
                setSelectedCity('');
                setValue('city', '');
                setCities([]);
                if (val) fetchCities(selectedCountry, val);
              }}
              required
            />
            <LabeledSelect
              label="City/Suburb"
              name="city"
              register={register}
              options={[{ value: '', label: 'Select City/Suburb' }, ...cities.map(c => ({ value: c.name, label: c.name }))]}
              value={selectedCity}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedCity(val);
                setValue('city', val);
              }}
              required
            />
          </div>
        </div>


        {/* License Information Card */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-black font-semibold text-lg">License Information</h2>
            <label className="flex items-center space-x-2 text-gray-700 text-sm">
              <input
                type="checkbox"
                checked={disableLicense}
                onChange={(e) => setDisableLicense(e.target.checked)}
                className="w-4 h-4"
              />
              <span>I do not have my learner's license yet</span>
            </label>
          </div>
          <div className="flex gap-4">
            <LabeledInput
              label="License Type"
              name="licenseType"
              register={register}
              disabled={disableLicense}
              type="text"
              required
            />
            <LabeledInput
              label="License Number"
              name="licenseNumber"
              register={register}
              disabled={disableLicense}
              required
              rules={{
                pattern: {
                  value: /^[A-Za-z][0-9]{5,7}$/,
                  message: "License number must start with a letter and be 6-8 characters",
                },
              }}
              error={errors.licenseNumber?.message}
            />
          </div>
          <div className="flex gap-4 overflow-visible">
            <LabeledDatePicker
              label="Issue Date"
              name="issueDate"
              register={register}
              setValue={setValue}
              disabled={disableLicense}
              showDay
              showMonth
              showYear
              maxDate={new Date()}
              required
            />
            <LabeledDatePicker
              label="Expiry Date"
              name="expiryDate"
              register={register}
              setValue={setValue}
              disabled={disableLicense}
              showDay
              showMonth
              showYear
              minDate={issueDateValue ? new Date(issueDateValue) : undefined}
              required
            />
          </div>
        </div>

        {/* ---------------- Payment Methods Card ---------------- */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-black font-semibold text-lg">Payment Methods</h2>
            <button
              onClick={openModal}
              className="bg-orange-500 text-white font-semibold px-4 py-2 rounded hover:bg-orange-600 cursor-pointer"
            >
              + Add Card
            </button>
          </div>

          {/* Modal */}
          <Modal isOpen={showPaymentModal} onClose={closeModal} title="Add Your Payment Details">
            <form onSubmit={handleCardSubmit(onSubmitCard)} className="flex flex-col gap-4">
              {/* Card Number & Expiry */}
              <div className="flex gap-4">
                <LabeledInput
                  label="Card Number"
                  name="cardNumber"
                  register={cardRegister}
                  required
                  maxLength={19}
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, '');
                    if (val.length > 16) val = val.slice(0, 16);
                    val = val.replace(/(.{4})/g, '$1-');
                    if (val.endsWith('-')) val = val.slice(0, -1);
                    e.target.value = val;
                  }}
                />
                <LabeledInput
                  label="Expiry Date (MM/YY)"
                  name="CardExpiryDate"
                  register={cardRegister}
                  required
                  maxLength={5}
                  placeholder="MM/YY"
                  className="w-28"
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, '');
                    if (val.length > 4) val = val.slice(0, 4);
                    if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2);
                    e.target.value = val;
                  }}
                  onBlur={(e) => {
                    const [month, year] = e.target.value.split('/');
                    if (month && parseInt(month) > 12) e.target.value = '12' + (year ? '/' + year : '');
                  }}
                  rules={{
                    required: "Expiry date is required",
                    validate: (value) => {
                      const [month, year] = value.split('/');
                      if (!month || !year) return "Invalid expiry date";

                      const monthNum = parseInt(month);
                      if (monthNum < 1 || monthNum > 12) return "Month must be between 01 and 12";

                      const expiryDate = new Date(2000 + parseInt(year), monthNum - 1, 1);
                      const today = new Date();
                      expiryDate.setMonth(expiryDate.getMonth() + 1);
                      expiryDate.setDate(0);
                      return expiryDate >= today || "Expiry date cannot be in the past";
                    },
                  }}
                  error={cardErrors.CardExpiryDate?.message}
                />
              </div>

              {/* Cardholder Name & CVV */}
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <LabeledInput
                    label="Cardholder Name"
                    name="cardHolderName"
                    register={cardRegister}
                    required
                    rules={{
                      required: "Cardholder name is required",
                      pattern: {
                        value: /^[a-zA-Z\s]+$/,
                        message: "Name can contain only letters and spaces",
                      },
                    }}
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                    }}
                    error={cardErrors.cardHolderName?.message}
                  />
                </div>
                <div className="w-32 relative">
                  <LabeledInput
                    label="CVV"
                    name="cvv"
                    register={cardRegister}
                    required
                    type="password"
                    maxLength={3}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, '');
                      if (val.length > 3) val = val.slice(0, 3);
                      e.target.value = val;
                    }}
                    className="pr-10"
                  />
                  <img src={otherIcon.src} alt="CVV icon" className="absolute right-2 top-9 w-5 h-5" />
                </div>
              </div>

              {/* Checkboxes */}
              <label className="flex items-center gap-2">
                <input type="checkbox" {...cardRegister('saveCard')} className="w-4 h-4" />
                Save card for future information
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" {...cardRegister('defaultCard')} className="w-4 h-4" />
                Make it default
              </label>

              {/* Centered Submit Button */}
              <div className="flex justify-center mt-2">
                <button
                  type="submit"
                  className="bg-orange-500 text-white font-semibold px-6 py-2 rounded hover:bg-orange-600 cursor-pointer"
                >
                  Add Card Details
                </button>
              </div>
            </form>
          </Modal>

          {/* Display Saved Cards */}
          <div className="flex flex-col gap-3 mt-4">
            {cards.map((card, idx) => (
              <div key={idx} className="flex items-center justify-between bg-gray-100 p-3 rounded relative">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      getCardType(card.cardNumber) === 'visa'
                        ? visaIcon.src
                        : getCardType(card.cardNumber) === 'master'
                          ? masterIcon.src
                          : otherIcon.src
                    }
                    alt="card type"
                    className="w-6 h-6"
                  />
                  <div className="flex flex-col">
                    <span>{maskCardNumber(card.cardNumber)}</span>
                    <span className="text-sm text-gray-500">Expires {card.CardExpiryDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 relative">
                  {/* Default badge */}
                  {card.defaultCard && (
                    <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      Default
                    </div>
                  )}

                  {/* Menu icon */}
                  <div className="relative">
                    <img
                      src="/Assets/menu.png"
                      alt="menu"
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => setMenuOpenIndex(menuOpenIndex === idx ? null : idx)}
                    />
                    {menuOpenIndex === idx && (
                      <div className="absolute right-0 top-6 bg-white border rounded shadow-md z-10 w-40">
                        {/* Remove Card */}
                        <button
                          onClick={() => removeCard(idx)}
                          className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 w-full text-left cursor-pointer"
                        >
                          Remove Card
                        </button>

                        {/* Make Default / Remove Default */}
                        {!card.defaultCard ? (
                          <button
                            onClick={() => makeDefault(idx)}
                            className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 w-full text-left cursor-pointer"
                          >
                            Make Default
                          </button>
                        ) : (
                          <button
                            onClick={() => removeDefault(idx)}
                            className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 w-full text-left cursor-pointer"
                          >
                            Remove from Default
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact Card */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 mt-6">
          <h2 className="text-black font-semibold text-lg">Emergency Contact</h2>

          {/* Contact Name + Relationship */}
          <div className="flex gap-4">
            <LabeledInput
              label="Contact Name"
              name="emergencyName"
              register={register}
              required
              rules={{ required: "Contact name is required" }}
              error={errors.emergencyName?.message}
            />
            <LabeledInput
              label="Relationship"
              name="emergencyRelation"
              register={register}
              required
              rules={{ required: "Relationship is required" }}
              error={errors.emergencyRelation?.message}
            />
          </div>

          {/* Phone + Email */}
          <div className="flex gap-4">
            <LabeledInput
              label="Phone Number"
              name="emergencyPhone"
              type="tel"
              register={register}
              required
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.length > 9) value = value.slice(0, 9);
                let formatted = value;
                if (value.length > 3 && value.length <= 6) {
                  formatted = value.slice(0, 3) + "-" + value.slice(3);
                } else if (value.length > 6) {
                  formatted =
                    value.slice(0, 3) +
                    "-" +
                    value.slice(3, 6) +
                    "-" +
                    value.slice(6);
                }
                setValue("emergencyPhone", formatted);
              }}
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^4\d{2}-\d{3}-\d{3}$/,
                  message: "Phone must start with 4 and be in format 4XX-XXX-XXX",
                },
              }}
              error={errors.emergencyPhone?.message}
            />

            <LabeledInput
              label="Email"
              name="emergencyEmail"
              type="email"
              register={register}
              required
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              }}
              error={errors.emergencyEmail?.message}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => {
              reset();
            }}
            className="px-4 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-50 cursor-pointer"
          >
            Cancel
          </button>

          {/* Save Changes Button */}
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="md:w-5/12 w-full">{/* Right side empty */}</div>
    </div>
  );
}

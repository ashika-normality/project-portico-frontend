// components/PricingDetails.jsx
'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import { useState } from 'react';
import LabeledInput from '@/app/components/LabeledInput';
import LabeledMultiInput from '@/app/components/LabeledMultiInput';
import MildOrangeButton from '@/app/components/MildOrangeButton';
import { IoAddOutline } from 'react-icons/io5';
import AddPackagePopup from './AddPackagePopup';

export default function PricingDetails({ profile }) {
  const { register, setValue, watch, control } = useFormContext();

  const [showPackagePopup, setShowPackagePopup] = useState(false);

  // Manage the packages array in the form
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'packages', // Must match the field name in your form
  });

  // Watch current packages
  const existingPackages = watch('packages') || [];

  // Handler to receive new package from popup
  const handleAddPackage = (packageData) => {
    append({
      packageName: packageData.packageName.trim(),
      ratePerHour: parseFloat(packageData.ratePerHour) || 0,
      numberOfHours: parseInt(packageData.numberOfHours, 10),
      discount: packageData.discount ? parseFloat(packageData.discount) : 0,
      description: packageData.description.trim(),
    });
    setShowPackagePopup(false);
  };

  return (
    <div className="flex flex-col w-full bg-white rounded-xl shadow-equal p-8 space-y-6">
      {/* Section Title */}
      <h1 className="text-tonedblack text-lg font-bold font-raleway">
        Pricing & Packages
      </h1>

      {/* Inputs */}
      <div className="flex flex-col gap-6">
        {/* Hourly Rate */}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <LabeledInput
            label="Hourly Rate"
            required={true}
            preText="AU$"
            postText="/hour"
            placeholder="45.99"
            type="text"
            name="hourlyRate"
            register={register}
            defaultValue={profile?.hourlyRate || ''}
          />
        </div>

        {/* Other Packages Label */}
        <div>
          <span className="text-sm font-source-sans font-semibold">Other Packages:</span>
        </div>

        {/* List of Added Packages */}
        <div className="space-y-3">
          {existingPackages.length > 0 ? (
            fields.map((field, index) => {
              const pkg = existingPackages[index];
              return (
                <div
                  key={field.id} // use field.id from useFieldArray for stability
                  className="p-3 border border-gray-200 rounded-md bg-gray-50 flex justify-between items-start text-sm"
                >
                  <div className="space-y-1">
                    <div>
                      <strong>{pkg.packageName}</strong> - {pkg.numberOfHours} hour
                      {pkg.numberOfHours > 1 ? 's' : ''} at ${pkg.ratePerHour}/hr
                    </div>
                    {pkg.discount && (
                      <p className="text-gray-600 italic">Discount: {pkg.discount}%</p>
                    )}
                    {pkg.description && (
                      <p className="text-gray-600 italic">{pkg.description}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700 font-bold text-lg leading-none"
                    aria-label={`Remove ${pkg.packageName}`}
                  >
                    ✕
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-sm italic">No custom packages added yet.</p>
          )}
        </div>
      </div>

      {/* Add Package Button (Aligned to Left, Content Width) */}
      <div className="flex justify-end">
        <div>
            <MildOrangeButton
                text="Add Package"
                border="primary"
                icon={<IoAddOutline className="text-black" />}
                onClick={() => setShowPackagePopup(true)}
            />
        </div>
      </div>

      {/* Popup */}
      {showPackagePopup && (
        <AddPackagePopup
          onClose={() => setShowPackagePopup(false)}
          onAddPackage={handleAddPackage}
          hourlyRate={watch('hourlyRate')}
        />
      )}
    </div>
  );
}
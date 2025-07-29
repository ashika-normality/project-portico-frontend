
'use client';
import LabeledInput from '@/app/components/LabeledInput';
import LabeledSelect from '@/app/components/LabeledSelect';
import LabeledTextbox from '@/app/components/LabeledTextbox';
import PrimaryButton from '@/app/components/PrimaryButton';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const AddPackagePopup = ({ onClose, onAddPackage }) => {
  const [errors, setErrors] = useState({});
  const [packageName, setPackageName] = useState('');
  const [ratePerHour, setRatePerHour] = useState('');
  const [numberOfHours, setNumberOfHours] = useState('1');
  const [description, setDescription] = useState('');

  // Validate inputs
  const validate = () => {
    const newErrors = {};
    if (!packageName.trim()) newErrors.packageName = 'Package name is required';
    if (!ratePerHour.trim()) newErrors.ratePerHour = 'Rate per hour is required';
    if (!/^\d*\.?\d+$/.test(ratePerHour)) newErrors.ratePerHour = 'Must be a valid number';
    if (!numberOfHours) newErrors.numberOfHours = 'Number of hours is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const packageData = {
        packageName: packageName.trim(),
        ratePerHour: ratePerHour,
        numberOfHours: numberOfHours,
        description: description.trim(),
      };

      // Pass data to parent
      if (onAddPackage) {
        onAddPackage(packageData);
      }

      // Reset form
      setPackageName('');
      setRatePerHour('');
      setNumberOfHours('1');
      setDescription('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[99] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-tonedblack font-bold">Add New Package</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            aria-label="Close popup"
          >
            <IoClose size={30} />
          </button>
        </div>

        <div className="flex flex-col space-y-3">
          <div className="flex space-x-3">
            <LabeledInput
              name="packageName"
              label="Package Name"
              value={packageName}
              required={true}
              error={errors.packageName}
              onChange={(e) => {
                setPackageName(e.target.value);
                if (errors.packageName) setErrors(prev => ({ ...prev, packageName: '' }));
              }}
            />
            <LabeledInput
              name="ratePerHour"
              label="Rate per hour"
              postText={'AU$'}
              value={ratePerHour}
              required={true}
              error={errors.ratePerHour}
              onChange={(e) => {
                setRatePerHour(e.target.value);
                if (errors.ratePerHour) setErrors(prev => ({ ...prev, ratePerHour: '' }));
              }}
            />
          </div>

          <div className="flex space-x-3">
            <LabeledSelect
              label="Number of hours"
              name="numberOfHours"
              required={true}
              options={[
                { value: '1', label: '1 hour' },
                { value: '2', label: '2 hours' },
                { value: '3', label: '3 hours' },
                { value: '4', label: '4 hours' },
                { value: '5', label: '5 hours' },
                { value: '6', label: '6 hours' },
                { value: '7', label: '7 hours' },
                { value: '8', label: '8 hours' },
                { value: '9', label: '9 hours' },
                { value: '10', label: '10 hours' },
              ]}
              value={numberOfHours}
              error={errors.numberOfHours}
              onChange={(e) => {
                setNumberOfHours(e.target.value);
                if (errors.numberOfHours) setErrors(prev => ({ ...prev, numberOfHours: '' }));
              }}
            />
          </div>

          <div>
            <LabeledTextbox
              name="description"
              label="Description"
              value={description}
              rows={2}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-end pt-5">
            <div className="flex space-x-3">
              <PrimaryButton
                text="Add Package"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPackagePopup;
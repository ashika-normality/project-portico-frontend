'use client'
import { useEffect } from "react";

const LabeledTimePicker = ({
  label,
  name,
  value,
  register,
  setValue,
  defaultValue,
  style,
  disabled,
  onChange,
  required = false,
  error
}) => {
  useEffect(() => {
    if (setValue && defaultValue !== undefined && !value) {
      setValue(name, defaultValue);
    }
  }, [setValue, defaultValue, name, value]);

  // Determine if this is a controlled or uncontrolled input
  const isControlled = value !== undefined || onChange !== undefined;
  const isRegistered = register !== undefined;

  // Build input props based on control pattern
  const inputProps = {
    type: 'time',
    name,
    id: name,
    style,
    disabled,
    required,
    className: `w-full border border-greyforoutline font-source-sans rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary ${
      disabled ? 'bg-gray-50 text-gray-500' : 'bg-white'
    }`
  };

  // Add appropriate control props
  if (isControlled) {
    inputProps.value = value || '';
    inputProps.onChange = onChange;
  } else if (isRegistered) {
    Object.assign(inputProps, register(name));
  }

  return (
    <div className="flex flex-col space-y-1.5 w-full">
      <label htmlFor={name} className="text-sm font-source-sans font-semibold">
        {label}{required && <span className="text-redimportant">*</span>}
      </label>
      
      <input {...inputProps} />

      {error && (
        <span className="text-xs text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
};

export default LabeledTimePicker;